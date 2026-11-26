---
layout: post
title: "One API for several payment providers: architecture of a multi-PSP gateway"
description: "What a multi-PSP payment gateway does, how a provider SPI, per-tenant configuration, idempotency and normalized outcomes fit together, and why automatic failover between providers needs care. Based on the Labs64.IO Payment Gateway."
author:
  name: Labs64.IO Ecosystem
  url: https://labs64.io
image:
  url: /img/blog/multi-psp-gateway-hero.png
tags:
  - Payment Gateway
  - PSP
  - Payments
  - Architecture
  - Idempotency
  - API Design
---

The first payment provider is easy: read the documentation, add the SDK, ship. The second one is where the trouble starts. Different APIs, different webhook formats, different ideas of what "pending" means, and one question you cannot postpone: if a request to provider A times out, did the customer pay or not?

This post explains the architecture of a **multi-PSP payment gateway**: one service between your applications and several payment service providers (PSPs). It uses the open-source Labs64.IO [Payment Gateway](/products/payment-gateway/) as the worked example, and it is honest about where that product stops. It is written for architects, CTOs and engineers who are deciding whether to build or adopt such a layer. Facts about the Payment Gateway come from its public repository, its OpenAPI contract and its source code as of 25 Nov 2026; the sections marked as design guidance are our reasoning and not product behaviour.

**After reading, you will know:**

- what a multi-PSP gateway is and which problems it solves,
- the five building blocks: provider SPI, tenant configuration, idempotency, normalized outcomes and webhooks,
- what the Payment Gateway does today for choosing a provider, and what it does not do,
- why failing over from one provider to another is dangerous without rules.

## Background: what a multi-PSP gateway is

A multi-PSP payment gateway is a service that gives your applications **one API** for creating and executing payments, and translates those calls to the APIs of several payment providers behind it. Your shop calls the gateway; the gateway talks to Stripe, PayPal or another provider. It is not a billing suite or a storefront; it is the payment API layer.

![A multi-PSP gateway: applications call one API; the gateway applies idempotency, picks the tenant's provider configuration, and calls a provider adapter behind the provider SPI; webhooks from the providers flow back through the same gateway into one set of statuses](/img/blog/multi-psp-gateway-architecture.svg "One API in front of several providers"){:class="blog-center"}

Typical reasons teams adopt one:

- they use more than one provider (by market, by payment method, or as a hedge),
- several applications or merchants need payments and want credentials and rules kept per merchant,
- they want one place for retry safety and one set of payment states.

It is probably not worth it if you have one provider and one application, and its SDK does what you need: then the abstraction is overhead. The Payment Gateway README says the same.

## The problem: three failure modes of "just add another PSP"

- **Double charge.** A network timeout on a payment call leaves the outcome unknown. A client that retries may charge twice.
- **Many dialects.** Each provider has its own statuses and webhook payloads. Application code fills with provider-specific branches.
- **Secrets and rules everywhere.** Provider credentials end up in every application that takes payments.

## The solution: five building blocks

### Part 1: a provider SPI

The first building block is a narrow interface that every provider adapter implements. In the Payment Gateway, the core contract is `PaymentProvider`, a Java interface in the `providers-spi` module with two methods: `provider()`, which returns the provider identifier, and `execute(context)`, which executes a prepared payment attempt and returns a normalized result.

The documentation of the interface sets rules that matter more than the signature:

- An adapter owns the communication with its PSP and turns a **definitive** PSP outcome into a normal result. Only a returned result lets the gateway change a transaction's state.
- If the adapter cannot tell what happened after execution started, it must throw `ProviderExecutionException`. Input validation that is guaranteed to have no side effect at the PSP uses `ProviderValidationException`.
- Providers must not persist gateway state or publish gateway events.

The repository ships three adapters: Stripe, PayPal and a NoOp provider for tests. Adding another is a new module against the SPI, not a change to the core. We did not find an Adyen adapter, so do not assume one exists.

### Part 2: provider configuration per tenant

Credentials and settings live in the gateway, per tenant. The API exposes `/payment-definitions` for the globally supported provider definitions, and `/payment-providers` to create, read, update and delete a **tenant payment provider** from one of those definitions. The OpenAPI contract states that the request must include a complete and valid PSP configuration. Each payment is created for one `paymentProviderId`, so the application says which of its configured providers to use.

### Part 3: idempotent execution

Idempotency answers the double-charge problem. The `pay` operation is the one marked as idempotent in the controller. A caller sends an `Idempotency-Key` header; a replay with the same key returns the first result instead of charging again, and reuse of a key with a different request body fails with the error code `IDEMPOTENCY_CONFLICT`. Keys are stored in Redis, with defaults of three hours for the stored result (`redisTtl`) and five minutes for the processing timeout (`processingTimeout`), both configurable. The story of that choice is in [Why we moved payment idempotency from PostgreSQL to Redis](/blog/2026/06/07/why-we-moved-payment-idempotency-from-postgresql-to-redis/).

### Part 4: one set of outcomes

The `pay` operation's contract distinguishes three results, and the distinction is the heart of the design:

- a definitive decline is HTTP 200 with the transaction status `FAILED`,
- an unknown outcome, where a durable transaction exists but the PSP did not answer clearly, is HTTP 200 with the status `PENDING` and normalized status details,
- HTTP 502 is reserved for upstream failures where no transaction can be returned.

The normalized detail codes in the SPI include `AWAITING_CUSTOMER`, `PROCESSING`, `PROVIDER_UNAVAILABLE`, `PROVIDER_AUTHENTICATION_FAILED`, `PROVIDER_RESPONSE_INVALID`, `COMPLETED`, `PAYMENT_FAILED`, `DECLINED`, `CANCELLED`, `EXPIRED` and `PROVIDER_REJECTED`. Application code branches on these, not on provider-specific strings. See [Payment state policy and provider outcomes](/blog/2026/07/20/payment-state-policy-provider-outcomes/).

### Part 5: webhooks and returns

Providers report some outcomes later, by webhook. The gateway exposes `/providers/{provider}/webhooks`, plus return and cancel endpoints for provider checkout sessions. Per the README, terminal transactions are never overwritten by a late event, and each provider's signing secret must be configured so signatures are checked. For the Stripe case, see [Adding Stripe to Payment Gateway](/blog/2026/05/09/adding-stripe-to-payment-gateway/).

### What about routing by cost, region or fallback?

This is the question many teams ask first, so here is the plain answer: **the Payment Gateway does not choose a provider by cost, region or availability.** The caller selects the provider by passing `paymentProviderId` when it creates the payment. We found no routing-rule or fallback code in the repository.

That is a deliberate boundary, and the next section is design guidance (ours, not product behaviour) on how to build routing on top safely.

## The outcome

| Question | Answer in the Payment Gateway |
| --- | --- |
| One API for several providers | Yes: one REST contract, adapters behind a SPI |
| Which providers ship | Stripe, PayPal and a NoOp test provider |
| Who picks the provider | The caller, per payment (`paymentProviderId`) |
| Retry safety | `Idempotency-Key` on `pay`, Redis-backed |
| Unknown outcome | `PENDING` with normalized status details |
| Automatic routing or failover | Not provided |

## Trade-offs and design guidance

**If you add routing yourself, keep the choice in your own service**, in front of the gateway: the rule (by country, by payment method, by cost) selects a `paymentProviderId`, and the gateway executes it. This keeps pricing logic out of the payment core.

**Fail over only on definitive outcomes.** Moving a payment from provider A to provider B is safe after A reports a definitive decline or a validation failure with no side effect. It is dangerous after an unknown outcome (`PENDING`): provider A may still complete the charge, and provider B would charge the customer again. The `ProviderExecutionException` rule in the SPI exists for this reason. Resolve the unknown outcome first, through a webhook or a status query, then decide.

**Keep one idempotency key per business attempt**, and do not reuse it across providers for a different request body, since the gateway rejects that with `IDEMPOTENCY_CONFLICT`.

**Plan reconciliation separately.** We found no reconciliation feature in the repository. Comparing your ledger with the provider's settlement reports remains your job.

Other trade-offs:

- One more network hop and one more service to run, secure and monitor. The README says the service trusts `X-Auth-*` headers, so it must sit behind the [Auth Gateway](/products/auth-gateway/).
- A common denominator hides provider features. Use the `extra` field and adapter modules for the rest.
- Provider credentials in one place need strict access control on `/payment-providers`.

## Apply it to your own architecture

- Decide who owns provider selection: the caller, or a routing service of your own.
- Always send an `Idempotency-Key` from the code that calls `pay`.
- Treat `PENDING` as a state to resolve, not as a failure to retry on another provider.
- Make webhooks reachable and verified before real money flows.
- Test each provider in its sandbox before production.

## Key takeaways

- A multi-PSP gateway gives your applications one contract and keeps provider differences behind an interface.
- The Payment Gateway ships Stripe, PayPal and a test provider, and the caller picks the provider for each payment.
- Idempotency and a distinct `PENDING` state make retries safe.
- Automatic failover between providers is not built in; add it carefully and only on definitive outcomes.
- Reconciliation with provider reports stays a separate job.

## Related reading

- [Payment Gateway](/products/payment-gateway/)
- [Adding Stripe to Payment Gateway](/blog/2026/05/09/adding-stripe-to-payment-gateway/)
- [Why we moved payment idempotency from PostgreSQL to Redis](/blog/2026/06/07/why-we-moved-payment-idempotency-from-postgresql-to-redis/)
- [Payment state policy and provider outcomes](/blog/2026/07/20/payment-state-policy-provider-outcomes/)
