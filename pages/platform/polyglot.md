---
layout: page
title: "Polyglot Microservices"
description: "Domain-optimized tech stacks"
permalink: /platform/polyglot/
use_modern: true
---

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Polyglot Microservices</h1>
        <span>The Labs64.IO Ecosystem is built using a polyglot microservices architecture, ensuring we use the right tool for the job. From Java for transactional performance to Python for rapid integrations.</span>
    </div>
</div>

<div class="L64M">
<section class="L64M_sec"><div class="L64M_w">
  <div class="L64M_zzwrap">
    <div class="L64M_zz">
      <div class="L64M_zz_txt">
        <h2>Optimized Performance</h2>
        <p>We leverage Spring Boot for our Payment Gateway and AuditFlow to guarantee high throughput and reliability.</p>
        <ul>
          <li>Java and Spring Boot carry the Payment Gateway and the AuditFlow API.</li>
          <li>A new payment provider plugs in as its own Maven module.</li>
          <li>Boundaries stay REST calls through the gateway, or events on the bus.</li>
        </ul>
      </div>
      {% include l64-fig.html id="poly-java" %}
    </div>
    <div class="L64M_zz">
      <div class="L64M_zz_txt">
        <h2>Flexible Integrations</h2>
        <p>Python and FastAPI run AuditFlow's sink and transformer layer, so a new destination or data mapping is a small plugin rather than a project.</p>
        <ul>
          <li>AuditFlow sinks and transformers are plain Python files.</li>
          <li>Plugins are mounted through a ConfigMap, so no image rebuild is needed.</li>
          <li>Vue 3 covers the user interfaces.</li>
        </ul>
      </div>
      {% include l64-fig.html id="poly-python" %}
    </div>
  </div>
  <nav class="L64M_related" aria-label="Related"><span>Related</span><a href="{{ '/platform/api-first/' | relative_url }}">API-First / Contract-Driven</a><a href="{{ '/products/payment-gateway/' | relative_url }}">Payment Gateway</a><a href="{{ '/products/auditflow/' | relative_url }}">AuditFlow</a></nav>
</div></section>
</div>

{% include l64-deepdive.html key="polyglot" %}

{% include l64-cta.html title="Ready to see how it fits together?" text="See how the Java, Python, and Vue services fit together across the module map." label="See how it fits together" href="/architecture/" %}
