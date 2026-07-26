---
layout: page
title: "Policy-as-Code Authorization"
description: "RBAC permissions"
permalink: /platform/authorization/
use_cbpscroller: true
---

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Policy-as-Code Authorization</h1>
        <span>We decoupled authorization from business logic. Labs64.IO uses Cerbos to evaluate fine-grained, policy-as-code permissions at runtime.</span>
    </div>
</div>

<div class="row">
    <div id="cbp-so-scroller" class="cbp-so-scroller NL_intro">
        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left">
                <img src="{{ '/img/labs64.io-promo-03.png' | relative_url }}" alt="Fine-Grained RBAC">
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>Fine-Grained RBAC</h2>
                <span>Complex role-based and attribute-based access controls are handled independently from the core microservice logic.</span>
            </article>
        </section>
        <section class="cbp-so-section">
            <article class="cbp-so-side cbp-so-side-left">
                <h2>Auditable Policies</h2>
                <span>Since permissions are defined as code, access rules can be code-reviewed, tested, and audited systematically.</span>
            </article>
            <figure class="cbp-so-side cbp-so-side-right">
                <img src="{{ '/img/labs64.io-promo-01.png' | relative_url }}" alt="Auditable Policies">
            </figure>
        </section>

    </div>
</div>

<div class="row">
    <div class="col-md-12 NL_form_light NL_block">
        <div class="col-md-8 col-md-offset-2 NL_form_light_text">
            <h2>Ready to see how it fits together?</h2>
            <span>See where Cerbos policy evaluation sits in the request path, alongside the modules it protects.</span>
            <a href="{{ '/architecture/' | relative_url }}" class="NL_button button_main NL_dark_btn NL_wide_btn NL_cta_btn">
                See how it fits together
            </a>
        </div>
    </div>
</div>
