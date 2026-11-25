---
layout: page
title: "Cloud-Native Kubernetes"
description: "Containerized ecosystem orchestration"
permalink: /platform/kubernetes/
use_modern: true
---

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Cloud-Native Kubernetes</h1>
        <span>The entire Labs64.IO platform is fully containerized and orchestrated via Kubernetes, providing self-healing infrastructure, rolling updates, and high availability.</span>
    </div>
</div>

<div class="L64M">
<section class="L64M_sec"><div class="L64M_w">
  <div class="L64M_zzwrap">
    <div class="L64M_zz">
      <div class="L64M_zz_txt">
        <h2>Helm Standardization</h2>
        <p>We use shared Helm libraries and templates to ensure a consistent, secure deployment topology across all 10+ repositories.</p>
        <ul>
          <li>Every module is deployed from one shared chart library.</li>
          <li>Environment differences live in values overlays, so a chart is never patched.</li>
          <li>ArgoCD applies the charts the same way everywhere.</li>
        </ul>
      </div>
      {% include l64-fig.html id="helm-std" %}
    </div>
    <div class="L64M_zz">
      <div class="L64M_zz_txt">
        <h2>Self-Healing Ecosystem</h2>
        <p>Kubernetes continuously monitors service health, automatically restarting failed pods and rerouting traffic.</p>
        <ul>
          <li>Failed pods are restarted without anyone paging a human first.</li>
          <li>Traffic stays on the healthy pods in the meantime.</li>
          <li>Stateless services make a restart safe.</li>
        </ul>
      </div>
      {% include l64-fig.html id="heal" %}
    </div>
  </div>
  <nav class="L64M_related" aria-label="Related"><span>Related</span><a href="{{ '/platform/scalability/' | relative_url }}">Stateless Scalability</a><a href="{{ '/platform/telemetry/' | relative_url }}">Business Telemetry Abstraction</a><a href="{{ '/architecture/' | relative_url }}">Architecture overview</a></nav>
</div></section>
</div>

{% include l64-cta.html title="Ready to see how it fits together?" text="See how the shared Helm charts and Kubernetes orchestration tie every module together." label="See how it fits together" href="/architecture/" %}
