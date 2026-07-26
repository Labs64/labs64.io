---
layout: page
title: "Customer Portal"
description: "Self-service portal where your customers manage their own accounts, subscriptions, and billing visibility."
permalink: /products/customer-portal/
use_cbpscroller: true
---

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Customer Portal</h1>
        <span>A Vue 3 single-page application intended as the self-service front door for your customers. Today it ships as a standalone frontend — there is no backend behind it yet, so account, subscription, and billing screens have nowhere to fetch real data from.</span>
    </div>
</div>

<div class="row">
    <div class="col-md-8 col-md-offset-2">
        {% include module-banner.html id="customer-portal" %}
    </div>
</div>

<div class="row">
    <div id="cbp-so-scroller" class="cbp-so-scroller NL_intro">
        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left">
                <img src="{{ '/img/labs64.io-promo-01.png' | relative_url }}" alt="Modern Frontend Stack">
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>A Modern Frontend Stack</h2>
                <span>Built with Vue 3 and the Composition API, styled with Bootstrap 5 and Bootstrap Vue Next, and written in TypeScript. Vite drives the dev and build tooling, and Pinia holds client-side state. Cypress covers end-to-end flows and Vitest covers unit tests.</span>
            </article>
        </section>

        <section class="cbp-so-section">
            <article class="cbp-so-side cbp-so-side-left">
                <h2>Runtime Configuration, Not Hardcoding</h2>
                <span>The portal reads its runtime configuration from an <code>env.json</code> file mounted into the container as a Kubernetes ConfigMap, so the same built image can point at different environments without a rebuild. It is published as the <code>labs64/customer-portal-ui</code> image.</span>
            </article>
            <figure class="cbp-so-side cbp-so-side-right">
                <img src="{{ '/img/labs64.io-promo-02.png' | relative_url }}" alt="Runtime Configuration">
            </figure>
        </section>

        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left">
                <img src="{{ '/img/labs64.io-promo-03.png' | relative_url }}" alt="Where This Is Headed">
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>Where This Is Headed</h2>
                <span>The intent is a portal where your customers manage their own accounts, subscriptions, and billing visibility without a support ticket. Those screens exist in the UI, but they have no backend to call yet — treat them as a preview of the direction, not a working feature.</span>
            </article>
        </section>
    </div>
</div>

<div class="row">
    <div class="col-md-12 NL_form_light NL_block">
        <div class="col-md-8 col-md-offset-2 NL_form_light_text">
            <h2>Ready to integrate Customer Portal?</h2>
            <span>Join the Labs64.IO Ecosystem and start building modern digital commerce platforms today.</span>
            <form action="https://github.com/Labs64/labs64.io-workspace" method="GET">
                <button type="submit" class="NL_button button_main NL_dark_btn NL_wide_btn">
                    <i class="fa fa-github "></i>Explore Labs64.IO on GitHub
                </button>
            </form>
        </div>
    </div>
</div>
