---
layout: page
title: "Policy-as-Code Authorization"
description: "Cedar RBAC permissions"
permalink: /platform/authorization/
use_cbpscroller: true
---

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Policy-as-Code Authorization</h1>
        <span>We decoupled authorization from business logic. Labs64.IO uses AWS Cedar to evaluate fine-grained, policy-as-code permissions at runtime.</span>
    </div>
</div>

<div class="row">
    <div id="cbp-so-scroller" class="cbp-so-scroller NL_intro">
        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left">
                <img src="{{ '/img/labs64.io-promo-03.png' | prepend: site.baseurl | prepend: site.url }}" alt="Fine-Grained RBAC">
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
                <img src="{{ '/img/labs64.io-promo-01.png' | prepend: site.baseurl | prepend: site.url }}" alt="Auditable Policies">
            </figure>
        </section>

    </div>
</div>

<div class="row">
    <div class="col-md-12 NL_form_light NL_block">
        <div class="col-md-8 col-md-offset-2 NL_form_light_text">
            <h2>Ready to explore the code?</h2>
            <span>Join the Labs64.IO Ecosystem and start building modern digital commerce platforms today.</span>
            <form action="https://github.com/topics/labs64-io" method="GET">
                <button type="submit" class="NL_button button_main NL_dark_btn NL_wide_btn">
                    <i class="fa fa-github "></i>Explore Labs64.IO on GitHub
                </button>
            </form>
        </div>
    </div>
</div>
