---
layout: page
title: "Customer Portal"
description: "Self-service portal where your customers manage their own accounts, subscriptions, and billing visibility."
permalink: /products/customer-portal/
use_cbpscroller: true
use_modern: true
---

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Customer Portal</h1>
        <span>A Vue 3 single-page application intended as the self-service front door for your customers. Today it ships as a standalone frontend — there is no backend behind it yet, so account, subscription, and billing screens have nowhere to fetch real data from.</span>
    </div>
</div>

<div class="row">
    <div id="cbp-so-scroller" class="cbp-so-scroller NL_intro">
        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left L64M_fig">
                {% include l64-wx.html id="cp-ahead" %}
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>What Is Here Today, and What Is Planned</h2>
                <span>Customer Portal is a front-end shell: a Vue 3 single-page app with a home page and a cart page, served as a static image. The intent is a portal where your customers manage their own accounts, subscriptions and billing visibility without a support ticket. Those screens exist in the UI but have no backend to call yet. Treat them as a preview of the direction, not a working feature.</span>
            </article>
        </section>

        <section class="cbp-so-section">
            <article class="cbp-so-side cbp-so-side-left">
                <h2>A Modern Frontend Stack</h2>
                <span>Built with Vue 3 and the Composition API, styled with Bootstrap 5, and written in TypeScript. Vite drives the dev and build tooling, and Pinia holds client-side state. Playwright covers end-to-end flows and Vitest covers unit tests.</span>
            </article>
            <figure class="cbp-so-side cbp-so-side-right L64M_fig">
                {% include l64-wx.html id="cp-stack" %}
            </figure>
        </section>
    </div>
</div>

{% include l64-fit.html id="customer-portal" %}
{% include l64-deepdive.html key="customer-portal" %}

{%- assign m = site.data.modules | where: "id", "customer-portal" | first -%}
{% include l64-cta.html title="Ready to integrate Customer Portal?" text="Run Customer Portal locally as part of the guided onboarding path." label="Get started" href="https://labs64.io/docs/getting-started/quickstart.html" label2="View the Customer Portal repository" href2=m.repo %}
