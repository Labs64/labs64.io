---
layout: page
title: "Business Telemetry Abstraction"
description: "Decoupled domain metrics"
permalink: /platform/telemetry/
use_modern: true
---

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Business Telemetry Abstraction</h1>
        <span>Observability is built-in. We utilize a thin, decoupled Business Telemetry abstraction to capture domain-specific metrics without polluting core logic.</span>
    </div>
</div>

<div class="L64M">
<section class="L64M_sec"><div class="L64M_w">
  <div class="L64M_zzwrap">
    <div class="L64M_zz">
      <div class="L64M_zz_txt">
        <h2>Auto-Instrumented Traces</h2>
        <p>OpenTelemetry Java Agents automatically trace requests as they jump across microservices, visualized in Grafana Tempo.</p>
        <ul>
          <li>The OTel Java Agent (Java) or <code>opentelemetry-instrument</code> (Python) attaches at deploy time.</li>
          <li>Application code records domain metrics through a thin Business Telemetry abstraction and imports no OpenTelemetry code.</li>
          <li>The same container image runs with or without observability.</li>
        </ul>
      </div>
      {% include l64-fig.html id="otel" %}
    </div>
    <div class="L64M_zz">
      <div class="L64M_zz_txt">
        <h2>Centralized Analytics</h2>
        <p>Application metrics and logs are systematically aggregated via Prometheus and Loki for rapid root-cause analysis.</p>
        <ul>
          <li>An OTel Collector ships traces to Tempo, logs to Loki and metrics to Prometheus.</li>
          <li>Grafana visualizes all three signals.</li>
          <li>Instrumentation is infrastructure-owned, so it cannot drift from the code it watches.</li>
        </ul>
      </div>
      {% include l64-fig.html id="observe-static" %}
    </div>
  </div>
  <nav class="L64M_related" aria-label="Related"><span>Related</span><a href="{{ '/platform/kubernetes/' | relative_url }}">Cloud-Native Kubernetes</a><a href="{{ '/products/auditflow/' | relative_url }}">AuditFlow</a><a href="{{ '/architecture/' | relative_url }}">Architecture overview</a></nav>
</div></section>
</div>

{% include l64-cta.html title="Ready to see how it fits together?" text="See how Business Telemetry threads through the request path across every module." label="See how it fits together" href="/architecture/" %}
