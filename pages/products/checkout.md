---
layout: page
title: "Checkout: Whitelabel Checkout and Order Workflow"
description: "A whitelabel checkout page and order workflow for the Labs64.IO Ecosystem — purchase orders, transactions, and payment through one drop-in flow."
permalink: /products/checkout/
use_cbpscroller: true
---

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Checkout: Whitelabel Checkout and Order Workflow</h1>
        <span>A checkout page and order workflow that can be fully branded to match your company's identity. Checkout takes a buyer from a purchase order through payment initiation to a completed transaction — currency and tax validation, PSP payment execution, and order events published for the rest of the ecosystem to consume.</span>
    </div>
</div>

<div class="row">
    <div class="col-md-8 col-md-offset-2">
        {% include module-banner.html id="checkout" %}
    </div>
</div>

<div class="row">
    <div id="cbp-so-scroller" class="cbp-so-scroller NL_intro">
        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left">
                <img src="{{ '/img/labs64.io-promo-01.png' | relative_url }}" alt="Seamless Integration">
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
            <figure class="cbp-so-side cbp-so-side-right">
                <img src="{{ '/img/labs64.io-promo-02.png' | relative_url }}" alt="Subscription Management">
            </figure>
        </section>

        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left">
                <img src="{{ '/img/labs64.io-promo-03.png' | relative_url }}" alt="Powered by the Ecosystem">
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>Powered by the Ecosystem</h2>
                <span>Checkout calls the Labs64.IO Payment Gateway to execute payments and the Auth Gateway for secure identity management, then publishes order and checkout events to RabbitMQ — where AuditFlow picks them up for the audit trail — ensuring a frictionless and secure user experience.</span>
            </article>
        </section>
    </div>
</div>

<div class="row">
    <div class="col-md-12 NL_form_light NL_block">
        <div class="col-md-8 col-md-offset-2 NL_form_light_text">
            <h2>Ready to integrate Checkout?</h2>
            <span>Run Checkout locally as part of the guided onboarding path.</span>
            <a href="{{ '/get-started/' | relative_url }}" class="NL_button button_main NL_dark_btn NL_wide_btn">
                Get started
            </a>
            {%- assign m = site.data.modules | where: "id", "checkout" | first -%}
            <p><a href="{{ m.repo }}">View the Checkout repository</a></p>
        </div>
    </div>
</div>
