---
layout: page
title: "Notifications (planned)"
description: "Planned module for transactional and operational messages. An advance design guide in the documentation; not yet built."
permalink: /products/notifications/
use_cbpscroller: true
use_modern: true
---

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Notifications (planned)</h1>
        <span>Notifications will centralize delivery of transactional and operational messages: it is intended to receive meaningful domain events, apply tenant and recipient preferences, and deliver through configured channels. The documentation holds an advance design guide. There is no repository and nothing to run yet.</span>
    </div>
</div>

<div class="row">
    <div id="cbp-so-scroller" class="cbp-so-scroller NL_intro">
        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left L64M_fig">
                {% include l64-wx.html id="notif-scope" %}
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>Intended Behaviour</h2>
                <span>Channels such as email and webhooks, tenant-aware reusable templates, recipient and tenant preferences, and a record of accepted, delivered and failed attempts. Integrations should be designed around business events, such as a completed payment or an issued invoice, rather than around a delivery provider. This is intent, not a shipped module.</span>
            </article>
        </section>
    </div>
</div>

{% include l64-cta.html title="See what's already shipping" text="Notifications isn't built yet. Six modules are in the repositories today, from AuditFlow to Reporting. Run one of them to see the ecosystem." label="Get started" href="https://labs64.io/docs/getting-started/quickstart.html" label2="Or explore Labs64.IO on GitHub" href2="https://github.com/Labs64/labs64.io-workspace" %}
