---
layout: page
title: "Stateless Scalability"
description: "Seamless horizontal auto-scaling"
permalink: /platform/scalability/
use_modern: true
---

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Stateless Scalability</h1>
        <span>Built for the cloud, every microservice in the Labs64.IO ecosystem is completely stateless, enabling seamless and instant horizontal auto-scaling.</span>
    </div>
</div>

<div class="L64M">
<section class="L64M_sec"><div class="L64M_w">
  <div class="L64M_zzwrap">
    <div class="L64M_zz">
      <div class="L64M_zz_txt">
        <h2>Elastic Workloads</h2>
        <p>As demand spikes, our services automatically provision additional instances using Kubernetes Horizontal Pod Autoscalers.</p>
        <ul>
          <li>Services are stateless, so more instances can simply be added.</li>
          <li>Scaling follows load rather than manual changes.</li>
          <li>Instances are removed again when demand falls.</li>
        </ul>
      </div>
      {% include l64-fig.html id="hpa" %}
    </div>
    <div class="L64M_zz">
      <div class="L64M_zz_txt">
        <h2>Database-Per-Service</h2>
        <p>Scaling compute is easy, but scaling data is hard. We use a strictly decoupled database-per-service model to prevent bottlenecks.</p>
        <ul>
          <li>Each module owns its own logical database, except AuditFlow, which owns no persistent store.</li>
          <li>No module connects to another module's schema.</li>
          <li>Needing another module's data means a REST call across the gateway, or reacting to an event.</li>
        </ul>
      </div>
      {% include l64-fig.html id="db-per-service" %}
    </div>
  </div>
  <nav class="L64M_related" aria-label="Related"><span>Related</span><a href="{{ '/platform/kubernetes/' | relative_url }}">Cloud-Native Kubernetes</a><a href="{{ '/products/auditflow/' | relative_url }}">AuditFlow</a><a href="{{ '/architecture/' | relative_url }}">Architecture overview</a></nav>
</div></section>
</div>

{% include l64-cta.html title="Ready to see how it fits together?" text="See how stateless services fit into the request path and scale across the module map." label="See how it fits together" href="/architecture/" %}
