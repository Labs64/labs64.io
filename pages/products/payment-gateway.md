---
layout: page
title: "Payment Gateway: One API, Multiple PSPs"
description: "Unify your billing logic with the Labs64.IO Payment Gateway. A single abstraction layer over payment service providers, extensible via a provider SPI."
permalink: /products/payment-gateway/
use_cbpscroller: true
use_modern: true
---

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Payment Gateway: One API, Multiple PSPs</h1>
        <span>Facilitate seamless and secure online payments. The Payment Gateway microservice provides a common abstraction over payment service providers, so you can accept payments and manage transactions through one API.</span>
    </div>
</div>

<div class="row">
    <div id="cbp-so-scroller" class="cbp-so-scroller NL_intro">
        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left L64M_fig">
                {% include l64-wx.html id="pg-spi" %}
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>Eliminate Vendor Lock-In</h2>
                <span>Don't tie your core business logic to a single payment processor. Payment Gateway's PSP abstraction (SPI) lets you add a new provider as a self-contained module — implementing <code>PaymentProvider</code> and, optionally, <code>ProviderCheckoutSupport</code> / <code>ProviderWebhookSupport</code> — without changing existing code, and standardizes webhook handling across whichever providers you add. Stripe and PayPal ship today, alongside a NoOp provider for tests (<a href="{{ '/blog/2026/05/09/adding-stripe-to-payment-gateway/' | relative_url }}">how we added Stripe</a>).</span>
            </article>
        </section>

        <section class="cbp-so-section">
            <article class="cbp-so-side cbp-so-side-left">
                <h2>Unified Abstraction & Webhook Normalization</h2>
                <span>A single RESTful API for one-time and recurring payments. The gateway automatically translates proprietary PSP webhooks into standardized internal events for your ecosystem.</span>
            </article>
            <figure class="cbp-so-side cbp-so-side-right L64M_fig">
                {% include l64-wx.html id="pg-webhook" %}
            </figure>
        </section>

        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left L64M_fig">
                {% include l64-wx.html id="pg-idem" %}
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>Idempotent Payments & Secure Handling</h2>
                <span>Send an <code>Idempotency-Key</code> and a replay returns the first result, so retries never double-charge (<a href="{{ '/blog/2026/06/07/why-we-moved-payment-idempotency-from-postgresql-to-redis/' | relative_url }}">why we moved idempotency to Redis</a>). Works in tandem with the Auth Gateway to ensure all payment requests are strictly authenticated and authorized at the edge.</span>
            </article>
        </section>
    </div>
</div>

{% include l64-fit.html id="payment-gateway" %}
{% include l64-deepdive.html key="payment-gateway" %}

{%- assign m = site.data.modules | where: "id", "payment-gateway" | first -%}
{% include l64-cta.html title="Ready to integrate the Payment Gateway?" text="Run Payment Gateway locally as part of the guided onboarding path." label="Get started" href="https://labs64.io/docs/getting-started/quickstart.html" label2="View the Payment Gateway repository" href2=m.repo %}
