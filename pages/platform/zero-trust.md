---
layout: page
title: "Zero-Trust Edge Proxy"
description: "Secure ingress via Traefik Authproxy"
permalink: /platform/zero-trust/
use_cbpscroller: true
---

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Zero-Trust Edge Proxy</h1>
        <span>Security starts at the edge. All inbound traffic is strictly evaluated by a Traefik-based Authproxy acting as our zero-trust entrypoint.</span>
    </div>
</div>

<div class="row">
    <div id="cbp-so-scroller" class="cbp-so-scroller NL_intro">
        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left">
                <img src="{{ '/img/labs64.io-promo-03.png' | prepend: site.baseurl | prepend: site.url }}" alt="Strict Ingress Validation">
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>Strict Ingress Validation</h2>
                <span>Requests are immediately validated against Keycloak OIDC tokens and precise Cedar permission policies.</span>
            </article>
        </section>
        <section class="cbp-so-section">
            <article class="cbp-so-side cbp-so-side-left">
                <h2>Internal Isolation</h2>
                <span>Internal services do not expose public endpoints. They completely rely on the edge proxy for authentication checks.</span>
            </article>
            <figure class="cbp-so-side cbp-so-side-right">
                <img src="{{ '/img/labs64.io-promo-02.png' | prepend: site.baseurl | prepend: site.url }}" alt="Internal Isolation">
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
