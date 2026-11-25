---
layout: page
title: "AuditFlow: Reliable Audit Trails for Enterprise Compliance"
description: "Capture business-critical events across all microservices with redacted, structured JSON logs and pluggable sinks."
permalink: /products/auditflow/
use_cbpscroller: true
use_modern: true
---

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>AuditFlow: Reliable Audit Trails for Enterprise Compliance</h1>
        <span>Maintain a comprehensive record of all critical system and user activities. The Auditing microservice provides detailed logs for compliance, security monitoring, troubleshooting, and understanding user behavior, enhancing accountability and transparency.</span>
    </div>
</div>

<div class="row">
    <div id="cbp-so-scroller" class="cbp-so-scroller NL_intro">
        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left L64M_fig">
                {% include l64-wx.html id="redact" %}
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>Compliance Ready & Reliably Delivered</h2>
                <span>Built to support audit and compliance work, for example evidence for SOC 2, HIPAA and GDPR accountability. Sensitive fields are masked before anything is stored, and delivery is idempotent with retries over hours and a replayable dead-letter queue, so events reach your sink of record without being silently lost.</span>
            </article>
        </section>

        <section class="cbp-so-section">
            <article class="cbp-so-side cbp-so-side-left">
                <h2>Structured JSON & Pluggable Sinks</h2>
                <span>Capture rich, highly queryable context rather than plain text strings. Seamlessly route logs to external sinks (e.g., S3, Datadog, ELK) using our pluggable <code>auditflow-sink</code> integrations.</span>
            </article>
            <figure class="cbp-so-side cbp-so-side-right L64M_fig">
                {% include l64-wx.html id="sinks" %}
            </figure>
        </section>

        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left L64M_fig">
                {% include l64-wx.html id="af-how" %}
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>How It Works</h2>
                <span>AuditFlow consists of two core components: a high-throughput <code>auditflow-api</code> that your microservices call to record domain events, and a flexible routing layer (<code>auditflow-sink</code>) that securely forwards events to your long-term storage or SIEM platform of choice.</span>
            </article>
        </section>
    </div>
</div>

<div class="L64M">
<section class="L64M_sec L64M_sec--alt"><div class="L64M_w">
  <div class="L64M_head"><h2>Publish once. <span class="hl">Route anywhere.</span></h2><p>Send an event, watch it get redacted and delivered, then break a sink on purpose to see a retry end in the dead-letter queue and a replay.</p></div>
  {% include l64-demo.html %}
</div></section>
</div>

{% include l64-fit.html id="auditflow" %}
{% include l64-deepdive.html key="auditflow" %}

{%- assign m = site.data.modules | where: "id", "auditflow" | first -%}
{% include l64-cta.html title="Ready to integrate AuditFlow?" text="Run AuditFlow locally as part of the guided onboarding path." label="Get started" href="https://labs64.io/docs/getting-started/quickstart.html" label2="View the AuditFlow repository" href2=m.repo %}
