---
layout: page
title: "AuditFlow: Reliable Audit Trails for Enterprise Compliance"
description: "Capture business-critical events across all microservices with redacted, structured JSON logs and pluggable sinks."
permalink: /products/auditflow/
use_cbpscroller: true
---

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>AuditFlow: Reliable Audit Trails for Enterprise Compliance</h1>
        <span>Maintain a comprehensive record of all critical system and user activities. The Auditing microservice provides detailed logs for compliance, security monitoring, troubleshooting, and understanding user behavior, enhancing accountability and transparency.</span>
    </div>
</div>

<div class="row">
    <div class="col-md-8 col-md-offset-2">
        {% include module-banner.html id="auditflow" %}
    </div>
</div>

<div class="row">
    <div id="cbp-so-scroller" class="cbp-so-scroller NL_intro">
        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left">
                <img src="{{ '/img/labs64.io-promo-01.png' | relative_url }}" alt="Compliance Ready">
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>Compliance Ready & Reliably Delivered</h2>
                <span>Built to help you meet rigorous compliance standards such as SOC2, HIPAA, and GDPR. Sensitive fields are redacted before events leave your service, and delivery is idempotent with automatic retries and a replayable dead-letter queue, so events reach your sink of record without being silently lost.</span>
            </article>
        </section>

        <section class="cbp-so-section">
            <article class="cbp-so-side cbp-so-side-left">
                <h2>Structured JSON & Pluggable Sinks</h2>
                <span>Capture rich, highly queryable context rather than plain text strings. Seamlessly route logs to external sinks (e.g., S3, Datadog, ELK) using our pluggable <code>auditflow-sink</code> integrations.</span>
            </article>
            <figure class="cbp-so-side cbp-so-side-right">
                <img src="{{ '/img/labs64.io-promo-02.png' | relative_url }}" alt="Structured JSON">
            </figure>
        </section>

        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left">
                <img src="{{ '/img/labs64.io-promo-03.png' | relative_url }}" alt="How It Works">
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>How It Works</h2>
                <span>AuditFlow consists of two core components: a high-throughput <code>auditflow-api</code> that your microservices call to record domain events, and a flexible routing layer (<code>auditflow-sink</code>) that securely forwards events to your long-term storage or SIEM platform of choice.</span>
            </article>
        </section>
    </div>
</div>

<div class="row">
    <div class="col-md-12 NL_form_light NL_block">
        <div class="col-md-8 col-md-offset-2 NL_form_light_text">
            <h2>Ready to integrate AuditFlow?</h2>
            <span>Join the Labs64.IO Ecosystem and start building modern digital commerce platforms today.</span>
            <form action="https://github.com/Labs64/labs64.io-workspace" method="GET">
                <button type="submit" class="NL_button button_main NL_dark_btn NL_wide_btn">
                    <i class="fa fa-github "></i>Explore Labs64.IO on GitHub
                </button>
            </form>
        </div>
    </div>
</div>
