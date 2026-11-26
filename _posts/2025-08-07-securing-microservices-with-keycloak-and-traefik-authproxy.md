---
layout: post
title: "Traefik forwardAuth with Keycloak: securing microservices at the edge (2026 update)"
description: "How Traefik's forwardAuth middleware and a Keycloak-issued JWT secure microservices at the edge: request flow, Keycloak endpoints and proxy settings, trusted headers, and the settings that changed in Traefik 3."
author:
  name: Labs64.IO Ecosystem
  url: https://labs64.io
image:
  url: /img/blog/securing-microservices-keycloak-hero.jpg
tags:
  - Traefik
  - Keycloak
  - forwardAuth
  - Auth Gateway
  - JWT
  - OIDC
  - Kubernetes
  - Helm
  - Security
---

> **Update, 25 Nov 2026.** This post was first published in August 2025 and describes the same pattern, rewritten against Traefik 3.8 and Keycloak 26 documentation and the current Labs64.IO Auth Gateway. The original described a role-mapping file; the Auth Gateway now derives routes and scopes from each module's OpenAPI contract and asks a central policy engine. The URL has not changed.

Every microservice needs to know who is calling and what that caller may do. If each service checks tokens by itself, the checks drift apart, and one forgotten check becomes a data leak. A common alternative is to decide once, at the edge, before the request reaches any service.

Traefik supports this with the **`forwardAuth`** middleware. This post explains how it works with Keycloak as the identity provider, which Keycloak and Traefik settings matter, and how the Labs64.IO Auth Gateway uses it. It is written for platform engineers, developers and the architects who set security boundaries. Facts come from the Traefik v3.8 and Keycloak documentation (Keycloak 26.8.2 was the latest release on 25 Nov 2026), the public Auth Gateway repository and the Helm chart; we did not run a new end-to-end test for this update.

**After reading, you will know:**

- how a request flows through `forwardAuth`, step by step,
- which Keycloak endpoints and proxy options an auth service depends on,
- how to pass a trusted identity to backends and prevent forged headers,
- which `forwardAuth` settings to set explicitly, and what is deprecated.

## Background: what forwardAuth does

The Traefik documentation describes `forwardAuth` in three sentences: the middleware delegates authentication to an external service; if the service answers with a 2XX code, access is granted and the original request is performed; otherwise the response from the authentication server is returned to the client.

That makes the auth service a small, separate decision point. It receives a copy of the request metadata, decides, and answers with a status code and optional headers.

![forwardAuth request flow: the client sends a request with a bearer token to Traefik; Traefik asks the auth service; the auth service verifies the token against Keycloak keys and answers 2XX with identity headers or 401 or 403; Traefik forwards to the backend or returns the answer](/img/blog/forwardauth-keycloak-flow.svg "forwardAuth with Keycloak"){:class="blog-center"}

Keycloak plays a different role: it issues tokens. The auth service does not call Keycloak for every request. It verifies the token signature with the public keys that Keycloak publishes, and caches them.

## The problem: three ways this goes wrong

- **Identity headers can be forged.** If a backend trusts `X-User` and a client can send `X-User`, authentication is decoration.
- **Keycloak behind a proxy misbehaves.** Without the right proxy settings, requests through a reverse proxy that perform origin checks can fail with 403.
- **Defaults are generous.** An auth service that has no limits on request or response bodies is a resource-exhaustion risk.

## The solution: four decisions

### Part 1: know the Keycloak endpoints

The Keycloak documentation lists the endpoints that applications and services should use, all under a realm:

| Purpose | Path |
| --- | --- |
| Discovery (all other endpoints and settings) | `/realms/{realm-name}/.well-known/openid-configuration` |
| Public keys (JWK) enabled by the realm | `/realms/{realm-name}/protocol/openid-connect/certs` |
| Logout (user agent is redirected) | `/realms/{realm-name}/protocol/openid-connect/logout` |

An auth service reads the discovery document or the keys endpoint, verifies the signature, issuer, audience and expiry of each token, and refreshes keys when the realm rotates them. `forwardAuth` serves bearer-token APIs; logout is a browser redirect to Keycloak and happens outside this flow.

### Part 2: configure Keycloak for a reverse proxy

Keycloak parses proxy headers according to its `proxy-headers` option, which accepts `forwarded` (RFC 7239) or `xforwarded` (`X-Forwarded-For`, `-Proto`, `-Host`, `-Port`, `-Prefix`). The documentation warns of two things:

- If you use a reverse proxy for anything other than TLS passthrough and do not set `proxy-headers`, requests via the proxy that perform origin checking return **403 Forbidden**.
- Keycloak accepts proxy headers from any source by default. Set `proxy-trusted-addresses` to the addresses (IPv4, IPv6 or CIDR) of your trusted proxies, so other sources are ignored. Do not use `forwarded` or `xforwarded` with TLS passthrough.

If TLS ends at the proxy (edge termination), the documentation says enabling HTTP through `http-enabled` is required.

### Part 3: configure the middleware explicitly

A minimal `forwardAuth` middleware needs only `address`. Several other settings deserve a conscious choice:

| Field | Documented behaviour | Recommendation |
| --- | --- | --- |
| `address` | Authentication server address; required | Use the in-cluster service URL |
| `authResponseHeaders` | Headers copied from the auth response onto the forwarded request, replacing conflicting ones | List every identity header you want backends to trust |
| `authRequestHeaders` | Request headers sent to the auth service; all if empty | Restrict if you do not want to send everything |
| `maxResponseBodySize` | Limit for the auth response body; over it, 401. Unset means unlimited | Set it; the documentation strongly recommends a limit |
| `maxBodySize` / `forwardBody` | Body sent to the auth service; off by default; forwarding breaks streaming | Leave `forwardBody` off unless the decision needs the body |
| `trustForwardHeader` | **Deprecated**; will be removed in the next major version | Configure `forwardedHeaders.trustedIPs` on the entry point instead |

The deprecation is the main change since our first version of this post, which set `trustForwardHeader: true`. The documentation's replacement: the entry point strips any `X-Forwarded-*` headers sent by untrusted clients and keeps those from trusted proxies, so by the time `forwardAuth` runs the headers can be trusted.

### Part 4: pass a trusted identity, and strip the token

The Auth Gateway sets four headers on every successful decision: `X-Auth-User` (the `preferred_username` or `sub` claim), `X-Auth-Scopes`, `X-Auth-Tenant` (`-` for calls without a tenant) and `X-Request-ID` (echoed if well-formed, otherwise generated). Its code comment explains a deliberate detail: it sends **every** header on every 2xx response, empty or `-` when not applicable, so that `authResponseHeaders` always overwrite any value a client tried to supply.

The Helm chart configures it like this (values from the chart; the address is built from the service name and namespace):

```yaml
spec:
  forwardAuth:
    address: http://<auth-gateway>.<namespace>.svc.cluster.local:<port>/auth
    trustForwardHeader: false
    maxResponseBodySize: 8192
    authResponseHeaders:
      - X-Auth-User
      - X-Auth-Scopes
      - X-Auth-Tenant
      - X-Request-ID
```

Two choices stand out. `trustForwardHeader` is `false` by default in the chart. `maxResponseBodySize` is 8192 bytes, which the chart comment calls a guard against denial of service, since the response carries only identity headers and no body.

The route then uses a `chain`: `forwardAuth` first, because it needs the caller's bearer token, then a `headers` middleware that sets `Authorization` to an empty value, which deletes the header before the request reaches the backend. A comment in the chart gives the reason for this order: a native Gateway API filter would run before `forwardAuth`, and so before the token is checked. Backends see only the trusted `X-Auth-*` headers and never the token. For the ordering rule and the stripping of inbound `X-Auth-*` headers, read [Trusted headers: the contract between the gateway and your modules](/blog/2026/02/25/trusted-header-contract/) and [From Traefik IngressRoute to the Gateway API](/blog/2025/12/14/gateway-api-traefik-migration/).

## The outcome

| Question | Answer |
| --- | --- |
| Who verifies tokens | One auth service at the edge, using Keycloak's published keys |
| What do backends trust | `X-Auth-*` headers that clients cannot forge, because they are overwritten on every success |
| Do backends see the JWT | No; `Authorization` is removed after the decision |
| What if no policy matches | The Auth Gateway denies: its README states it fails closed |

## Trade-offs

- Every request pays for one extra call to the auth service. Keep it in the cluster and keep its handler fast. The Auth Gateway code notes it uses a plain synchronous handler because blocking calls inside an async handler stalled the event loop under load.
- A central auth service is a single point of failure for all routes. Run replicas and watch the readiness endpoint.
- Backends that trust headers must never be reachable around the gateway. Use network policies.
- `forwardAuth` handles bearer tokens. Browser login flows with redirects need an OIDC-aware component in front, which is outside this article.

## Apply it to your own cluster

- Set `proxy-headers` and `proxy-trusted-addresses` in Keycloak.
- Configure `forwardedHeaders.trustedIPs` on the Traefik entry point; leave `trustForwardHeader` unset.
- Set `maxResponseBodySize` and list `authResponseHeaders` explicitly.
- Chain `forwardAuth` with removal of `Authorization`, in that order.
- Test the denied paths: no token, expired token, wrong scope, unknown route.

## Key takeaways

- `forwardAuth` grants access on a 2XX answer and returns the auth service's answer otherwise.
- Verify tokens with Keycloak's published keys; do not call Keycloak per request.
- Keycloak behind a proxy needs `proxy-headers`, and `proxy-trusted-addresses` to limit who may set them.
- `trustForwardHeader` is deprecated; trust is configured on the entry point.
- Overwrite identity headers on every success and remove the token before the backend.

## Related reading

- [Traefik middleware on Kubernetes: a complete reference](/blog/2026/12/28/traefik-middleware-kubernetes-reference/)
- [Auth Gateway](/products/auth-gateway/)
- [Traefik forwardAuth documentation](https://doc.traefik.io/traefik/v3.8/reference/routing-configuration/http/middlewares/forwardauth/){:target="_blank"}{:rel="noopener nofollow"}
- [Keycloak: configuring a reverse proxy](https://www.keycloak.org/server/reverseproxy){:target="_blank"}{:rel="noopener nofollow"}
