---
layout: page
title: "Auth Gateway: Federated Identity and RBAC at the Edge"
description: "Secure your microservices with zero-trust architecture, Keycloak integration, and Cerbos-based policies using the Labs64.IO Auth Gateway."
permalink: /products/auth-gateway/
use_cbpscroller: true
use_modern: true
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
            <figure class="cbp-so-side cbp-so-side-left L64M_fig">
                {% include l64-w-edge.html %}
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>Zero-Trust Architecture at the Edge</h2>
                <span>Operating at the edge of your network, the Auth Gateway acts as an intelligent shield. It verifies OIDC/JWT tokens from your identity provider (Keycloak, Entra ID, Auth0, Okta or any other OIDC provider) and denies whatever it cannot verify.</span>
            </article>
        </section>

        <section class="cbp-so-section">
            <article class="cbp-so-side cbp-so-side-left">
                <h2>Cerbos-Based Policies & Auth Context</h2>
                <span>Define highly granular, verifiable permission rules using the Cerbos policy language. Routes and scopes are derived from each module's OpenAPI spec, unknown routes fail closed, and the gateway translates external tokens into a standardized internal context, passing it downstream safely.</span>
            </article>
            <figure class="cbp-so-side cbp-so-side-right L64M_fig">
                {% include l64-wx.html id="gw-contract" %}
            </figure>
        </section>

        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left L64M_fig">
                {% include l64-wx.html id="gw-simplify" %}
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>Simplify Downstream Services</h2>
                <span>By handling token validation and policy enforcement at the gateway, your individual microservices can remain lightweight, focusing purely on business logic rather than complex authentication flows. The gateway also applies per-user rate limits and standard security headers, and serves one Swagger UI for every installed module.</span>
            </article>
        </section>
    </div>
</div>

{% include l64-fit.html id="auth-gateway" %}
{% include l64-deepdive.html key="auth-gateway" %}

{%- assign m = site.data.modules | where: "id", "auth-gateway" | first -%}
{% include l64-cta.html title="Ready to secure your stack?" text="Run Auth Gateway locally as part of the guided onboarding path." label="Get started" href="https://labs64.io/docs/getting-started/quickstart.html" label2="View the Auth Gateway repository" href2=m.repo %}
