---
layout: page
title: "Checkout: Whitelabel Checkout and Order Workflow"
description: "A whitelabel checkout page and order workflow for the Labs64.IO Ecosystem: purchase orders, validation, consents and checkout transactions, with the payment hand-off still to come."
permalink: /products/checkout/
use_cbpscroller: true
use_modern: true
---

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Checkout: Whitelabel Checkout and Order Workflow</h1>
        <span>A checkout page and order workflow that can be fully branded to match your company's identity. Checkout takes a buyer from a purchase order to a recorded checkout transaction: currency and tax validation, required consents, and tenant-scoped storage. Handing the transaction to the Payment Gateway and publishing order events are on the way.</span>
    </div>
</div>

<div class="row">
    <div id="cbp-so-scroller" class="cbp-so-scroller NL_intro">
        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left L64M_fig">
                {% include l64-whitelabel.html %}
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>Seamless Integration</h2>
                <span>Designed to sit flawlessly on top of the Labs64.IO Ecosystem, Checkout provides a ready-made Vue 3 frontend and Spring Boot backend so you don't have to build a checkout page from scratch. Embed or link to the checkout flow directly from your main application.</span>
            </article>
        </section>

        <section class="cbp-so-section">
            <article class="cbp-so-side cbp-so-side-left">
                <h2>Purchase Orders & Transactions</h2>
                <span>Checkout owns Purchase Orders — items, prices, quantities, currency and tax validation, and calculated totals — and the Checkout Transactions created when a buyer initiates payment, stored in Checkout's own PostgreSQL database. Consent tracking ensures required consents are accepted before checkout proceeds.</span>
            </article>
            <figure class="cbp-so-side cbp-so-side-right L64M_fig">
                {% include l64-wx.html id="co-orders" %}
            </figure>
        </section>

        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left L64M_fig">
                {% include l64-wx.html id="co-eco" %}
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>Built for the Ecosystem</h2>
                <span>Checkout is designed to sit behind the Auth Gateway, in front of the Payment Gateway, and to publish order events to AuditFlow. Today it takes its identity and scopes from the Auth Gateway's trusted headers. The hand-off to the Payment Gateway and the AuditFlow events are not built yet, so a checkout transaction is recorded but no payment is executed.</span>
            </article>
        </section>
    </div>
</div>

{% include l64-fit.html id="checkout" %}
{% include l64-deepdive.html key="checkout" %}

{%- assign m = site.data.modules | where: "id", "checkout" | first -%}
{% include l64-cta.html title="Ready to integrate Checkout?" text="Run Checkout locally as part of the guided onboarding path." label="Get started" href="https://labs64.io/docs/getting-started/quickstart.html" label2="View the Checkout repository" href2=m.repo %}
