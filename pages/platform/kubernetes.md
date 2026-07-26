---
layout: page
title: "Cloud-Native Kubernetes"
description: "Containerized ecosystem orchestration"
permalink: /platform/kubernetes/
use_cbpscroller: true
---

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Cloud-Native Kubernetes</h1>
        <span>The entire Labs64.IO platform is fully containerized and orchestrated via Kubernetes, providing self-healing infrastructure, rolling updates, and high availability.</span>
    </div>
</div>

<div class="row">
    <div id="cbp-so-scroller" class="cbp-so-scroller NL_intro">
        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left">
                <img src="{{ '/img/labs64.io-promo-02.png' | relative_url }}" alt="Helm Standardization">
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>Helm Standardization</h2>
                <span>We use shared Helm libraries and templates to ensure a consistent, secure deployment topology across all 10+ repositories.</span>
            </article>
        </section>
        <section class="cbp-so-section">
            <article class="cbp-so-side cbp-so-side-left">
                <h2>Self-Healing Ecosystem</h2>
                <span>Kubernetes continuously monitors service health, automatically restarting failed pods and rerouting traffic.</span>
            </article>
            <figure class="cbp-so-side cbp-so-side-right">
                <img src="{{ '/img/labs64.io-promo-01.png' | relative_url }}" alt="Self-Healing Ecosystem">
            </figure>
        </section>

    </div>
</div>

<div class="row">
    <div class="col-md-12 NL_form_light NL_block">
        <div class="col-md-8 col-md-offset-2 NL_form_light_text">
            <h2>Ready to see how it fits together?</h2>
            <span>See how the shared Helm charts and Kubernetes orchestration tie every module together.</span>
            <a href="{{ '/architecture/' | relative_url }}" class="NL_button button_main NL_dark_btn NL_wide_btn NL_cta_btn">
                See how it fits together
            </a>
        </div>
    </div>
</div>
