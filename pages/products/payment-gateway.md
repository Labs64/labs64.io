---
layout: page
title: "Payment Gateway: One API, Multiple PSPs"
description: "Unify your billing logic with the Labs64.IO Payment Gateway. A single abstraction layer over payment service providers, extensible via a provider SPI."
permalink: /products/payment-gateway/
use_cbpscroller: true
---

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Payment Gateway: One API, Multiple PSPs</h1>
        <span>Facilitate seamless and secure online payments. The Payment Gateway microservice provides a common abstraction over payment service providers, so you can accept payments and manage transactions through one API.</span>
    </div>
</div>

<div class="row">
    <div class="col-md-8 col-md-offset-2">
        <p style="background:#fef2f2;border-left:4px solid #b91c1c;color:#7f1d1d;padding:12px 16px;border-radius:8px;">
            <strong>Before you connect real money:</strong> PSP webhook signature verification is incomplete. Do not connect Payment Gateway to live funds until this is resolved — treat any current deployment as sandbox-only for payment flows.
        </p>
    </div>
</div>

<div class="row">
    <div id="cbp-so-scroller" class="cbp-so-scroller NL_intro">
        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left">
                <img src="{{ '/img/labs64.io-promo-01.png' | relative_url }}" alt="Eliminate Vendor Lock-In">
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>Eliminate Vendor Lock-In</h2>
                <span>Don't tie your core business logic to a single payment processor. Payment Gateway's PSP abstraction (SPI) lets you add a new provider as a self-contained module — implementing <code>PaymentProvider</code> and, optionally, <code>ProviderCheckoutSupport</code> / <code>ProviderWebhookSupport</code> — without changing existing code, and standardizes webhook handling across whichever providers you add.</span>
            </article>
        </section>

        <section class="cbp-so-section">
            <article class="cbp-so-side cbp-so-side-left">
                <h2>Unified Abstraction & Webhook Normalization</h2>
                <span>A single RESTful API for one-time and recurring payments. The gateway automatically translates proprietary PSP webhooks into standardized internal events for your ecosystem.</span>
            </article>
            <figure class="cbp-so-side cbp-so-side-right">
                <img src="{{ '/img/labs64.io-promo-02.png' | relative_url }}" alt="Unified Abstraction">
            </figure>
        </section>

        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left">
                <img src="{{ '/img/labs64.io-promo-03.png' | relative_url }}" alt="Invoicing & Security">
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>Idempotent Payments & Secure Handling</h2>
                <span>Idempotent, distributed-lock-backed payment processing means retries never double-charge. Works in tandem with the Auth Gateway to ensure all payment requests are strictly authenticated and authorized at the edge.</span>
            </article>
        </section>
    </div>
</div>

<div class="row">
    <div class="col-md-12 NL_form_light NL_block">
        <div class="col-md-8 col-md-offset-2 NL_form_light_text">
            <h2>Ready to integrate the Payment Gateway?</h2>
            <span>Run Payment Gateway locally as part of the guided onboarding path.</span>
            <a href="/docs/getting-started/" class="NL_button button_main NL_dark_btn NL_wide_btn NL_cta_btn">
                Get started
            </a>
            {%- assign m = site.data.modules | where: "id", "payment-gateway" | first -%}
            <p><a href="{{ m.repo }}">View the Payment Gateway repository</a></p>
        </div>
    </div>
</div>
