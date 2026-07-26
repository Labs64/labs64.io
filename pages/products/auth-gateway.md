---
layout: page
title: "Auth Gateway: Federated Identity and RBAC at the Edge"
description: "Secure your microservices with zero-trust architecture, Keycloak integration, and Cerbos-based policies using the Labs64.IO Auth Gateway."
permalink: /products/auth-gateway/
use_cbpscroller: true
---

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Auth Gateway: Federated Identity & RBAC</h1>
        <span>Centralize and manage user identities and access privileges across your entire ecosystem. The IAM microservice ensures secure authentication, authorization, and user provisioning, giving you granular control over who can access what resources.</span>
    </div>
</div>

<div class="row">
    <div id="cbp-so-scroller" class="cbp-so-scroller NL_intro">
        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left">
                <img src="{{ '/img/labs64.io-promo-01.png' | relative_url }}" alt="Zero-Trust Architecture">
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>Zero-Trust Architecture at the Edge</h2>
                <span>Operating at the edge of your network, the Auth Gateway acts as an intelligent shield. With out-of-the-box support for Keycloak OIDC, it manages federated identity and strict network policies seamlessly.</span>
            </article>
        </section>

        <section class="cbp-so-section">
            <article class="cbp-so-side cbp-so-side-left">
                <h2>Cerbos-Based Policies & Auth Context</h2>
                <span>Define highly granular, verifiable permission rules using the Cerbos policy language. The gateway translates external tokens into a standardized internal context, passing it downstream safely.</span>
            </article>
            <figure class="cbp-so-side cbp-so-side-right">
                <img src="{{ '/img/labs64.io-promo-02.png' | relative_url }}" alt="Cerbos Policies">
            </figure>
        </section>

        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left">
                <img src="{{ '/img/labs64.io-promo-03.png' | relative_url }}" alt="Simplify Microservices">
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>Simplify Downstream Services</h2>
                <span>By handling token validation and policy enforcement at the gateway, your individual microservices can remain lightweight, focusing purely on business logic rather than complex authentication flows.</span>
            </article>
        </section>
    </div>
</div>

<div class="row">
    <div class="col-md-12 NL_form_light NL_block">
        <div class="col-md-8 col-md-offset-2 NL_form_light_text">
            <h2>Ready to secure your stack?</h2>
            <span>Run Auth Gateway locally as part of the guided onboarding path.</span>
            <a href="/docs/getting-started/" class="NL_button button_main NL_dark_btn NL_wide_btn NL_cta_btn">
                Get started
            </a>
            {%- assign m = site.data.modules | where: "id", "auth-gateway" | first -%}
            <p><a href="{{ m.repo }}">View the Auth Gateway repository</a></p>
        </div>
    </div>
</div>
