---
layout: page
title: "Architecture"
description: "How the Labs64.IO modules fit together — the request path, the module map, and the extension points available today."
permalink: /architecture/
use_modern: true
---

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Architecture</h1>
        <span>How the Labs64.IO modules fit together — the request path, the module map, and the extension points available today.</span>
    </div>
</div>

<div class="L64M">

<section class="L64M_sec">
  <div class="L64M_w">
    <div class="L64M_head"><h2>The <span class="hl">mental model</span></h2>
      <p>Labs64.IO is a set of independent, polyglot services — Java/Spring Boot, Python/FastAPI, Vue — that sit behind one gateway and one auth plane.</p></div>
    <div class="L64M_pcards">
      <div class="L64M_pc"><b>1</b><h3>One gateway, one auth plane</h3><p>Every request crosses the same edge before it reaches application code.</p></div>
      <div class="L64M_pc"><b>2</b><h3>One chart library</h3><p>Every module is deployed from the same chart library, the same way everywhere.</p></div>
      <div class="L64M_pc"><b>3</b><h3>OpenAPI-first contracts</h3><p>The API spec is written first and server and client code is generated from it. The contract, not the implementation, is what other services and teams depend on.</p></div>
      <div class="L64M_pc"><b>4</b><h3>Boundaries are REST or events</h3><p>No module reaches into another module's process or database. Everything crosses a boundary as a REST call through the gateway, or as an event on the message bus.</p></div>
    </div>
  </div>
</section>

<section class="L64M_sec L64M_sec--alt" id="request-path">
  <div class="L64M_w">
    <div class="L64M_head"><h2>The <span class="hl">request path</span></h2>
      <p>Every request, regardless of which module it targets, crosses the same edge before it reaches application code. Send one and click each stop.</p></div>
    {% include l64-path.html %}
    <div class="L64M_prose">
      <p><strong>Traefik</strong> receives every request and forwards it to the <strong>Auth Gateway</strong> at <code>/auth</code> before routing it anywhere else. The Auth Gateway verifies the OIDC/JWT token on the request, then asks the central <strong>Cerbos PDP</strong> for the authorization decision — policy evaluation is centralized, not duplicated per module.</p>
      <p>On success, the Auth Gateway emits the trusted header contract that every upstream module relies on: <code class="nw">X-Auth-User</code>, <code class="nw">X-Auth-Scopes</code>, <code class="nw">X-Auth-Tenant</code> (set to <code>-</code> when the request is tenant-less), and <code class="nw">X-Request-ID</code>. All four are set on every 2xx response, and Traefik's <code>authResponseHeaders</code> always overwrite whatever a client supplied, so a module can trust these headers without re-validating them. Routes that don't match a known policy <strong>fail closed</strong> — they're rejected, not silently allowed through.</p>
    </div>
  </div>
</section>

<section class="L64M_sec" id="modules">
  {%- assign available_modules = site.data.modules | where: "group", "available" -%}
  <div class="L64M_w" style="max-width:900px">
    <div class="L64M_head"><h2>The <span class="hl">module map</span></h2>
      <p>{{ available_modules.size }} modules exist today. Each is a separate repository, ships independently, and communicates with the others only through REST calls that cross the gateway above. Audit events go to AuditFlow's API as well; AuditFlow buffers them on its own message broker, RabbitMQ or Amazon SQS.</p></div>
    <table class="L64M_cmp">
      <thead><tr><th>Module</th><th>Status</th><th>What it owns</th></tr></thead>
      <tbody>
        {%- for m in available_modules -%}
        <tr><td><a href="{{ m.url | relative_url }}" class="L64M_link">{{ m.name }}</a></td><td>{% include module-status.html id=m.id %}</td><td>{{ m.tagline }}</td></tr>
        {%- endfor -%}
      </tbody>
    </table>
  </div>
</section>

<section class="L64M_sec L64M_sec--alt">
  <div class="L64M_w">
    <div class="L64M_zzwrap">
      <div class="L64M_zz">
        <div class="L64M_zz_txt">
          <h2>Database-per-service</h2>
          <p>Each module owns its own logical database, or databases — every module except AuditFlow, which owns no persistent store of its own. Audit events live in each tenant's configured sinks, which are the systems of record.</p>
          <ul>
            <li>Credentials are never shared between services.</li>
            <li>No module connects directly to another module's schema.</li>
            <li>If one module needs data that another owns, it asks across the gateway as a REST call, or reacts to an event.</li>
          </ul>
        </div>
        {% include l64-fig.html id="db-per-service" %}
      </div>
      <div class="L64M_zz">
        <div class="L64M_zz_txt">
          <h2>Tenancy</h2>
          <p>AuditFlow's pipeline model is the reference implementation for tenant isolation across the ecosystem. Every pipeline belongs to exactly one tenant, and an event is routed only through the pipeline set owned by that event's tenant.</p>
          <ul>
            <li>There is no global pipeline list and no fall-through to another tenant's pipelines.</li>
            <li>Events that arrive with no tenant context belong to a reserved <code>_platform</code> pseudo-tenant, so tenant-less traffic is isolated rather than merged into a shared bucket.</li>
          </ul>
        </div>
        {% include l64-fig.html id="tenancy" %}
      </div>
      <div class="L64M_zz">
        <div class="L64M_zz_txt">
          <h2>Observability</h2>
          <p>Observability is infrastructure-owned, not something each service builds for itself. Runtime auto-instrumentation — the OTel Java Agent for Java services, <code>opentelemetry-instrument</code> for Python services — attaches at deploy time and ships traces, logs, and metrics through an OTel Collector to Tempo (traces), Loki (logs), and Prometheus (metrics), visualized in Grafana.</p>
          <ul>
            <li>Services carry no OpenTelemetry SDK and do no instrumentation bootstrap of their own.</li>
            <li>The exact same container image runs with or without observability. It is toggled purely by deployment configuration, so instrumentation can never drift from the code it is watching.</li>
          </ul>
        </div>
        {% include l64-fig.html id="otel" %}
      </div>
    </div>
  </div>
</section>

<section class="L64M_sec">
  <div class="L64M_w">
    <div class="L64M_head"><h2>Extension points <span class="hl">available today</span></h2>
      <p>This is the complete list of ways to extend the platform without forking a module. If it isn't on this list, it isn't available yet.</p></div>
    <div class="L64M_pcards L64M_pcards--3">
      <div class="L64M_pc"><h3>AuditFlow transformer plugins</h3><p>A <code>transformers/&lt;name&gt;.py</code> file implementing <code>transform(input_data: dict) -&gt; dict</code>.</p></div>
      <div class="L64M_pc"><h3>AuditFlow sink plugins</h3><p>A <code>sinks/&lt;name&gt;.py</code> file implementing <code>process(event_data: dict, properties: dict) -&gt; dict</code>.</p></div>
      <div class="L64M_pc"><h3>Runtime plugin mounts</h3><p><code>transformers_bootstrap/</code> and <code>sinks_bootstrap/</code>, mounted in via a ConfigMap volume so plugins can be added without rebuilding the image.</p></div>
      <div class="L64M_pc"><h3>Payment Gateway PSP SPI</h3><p>A new Maven module under <code>payment-gateway-providers/&lt;name&gt;/</code> implementing <code>PaymentProvider</code>, and optionally <code>ProviderCheckoutSupport</code> and/or <code>ProviderWebhookSupport</code>.</p></div>
      <div class="L64M_pc"><h3>Pipelines as configuration</h3><p>A per-tenant <code>tenants/&lt;tenantId&gt;.yaml</code> file, or a labelled ConfigMap, defines which sinks a tenant's events route through.</p></div>
      <div class="L64M_pc"><h3>Pipeline condition operators</h3><p>The operators available for matching and routing events within a pipeline definition.</p></div>
      <div class="L64M_pc"><h3>Helm values overlays</h3><p>On the published charts, for environment-specific configuration without patching the chart itself.</p></div>
    </div>
  </div>
</section>

<section class="L64M_sec L64M_sec--alt">
  <div class="L64M_w">
    <div class="L64M_head"><h2>Go <span class="hl">deeper</span></h2>
      <p>The pages below cover each architectural property in more depth, and the docs repository has the full technical reference.</p></div>
    <nav class="L64M_related L64M_related--center" aria-label="Architecture topics">
      <a href="{{ '/platform/polyglot/' | relative_url }}">Polyglot Microservices</a>
      <a href="{{ '/platform/api-first/' | relative_url }}">API-First / Contract-Driven</a>
      <a href="{{ '/platform/scalability/' | relative_url }}">Stateless Scalability</a>
      <a href="{{ '/platform/kubernetes/' | relative_url }}">Cloud-Native Kubernetes</a>
      <a href="{{ '/platform/zero-trust/' | relative_url }}">Zero-Trust Edge Proxy</a>
      <a href="{{ '/platform/identity/' | relative_url }}">Federated Identity Management</a>
      <a href="{{ '/platform/authorization/' | relative_url }}">Policy-as-Code Authorization</a>
      <a href="{{ '/platform/telemetry/' | relative_url }}">Business Telemetry Abstraction</a>
      <a href="https://github.com/Labs64/labs64.io-docs">Documentation Repository</a>
    </nav>
  </div>
</section>

</div>

{% include l64-deepdive.html key="architecture" %}

{% include l64-cta.html title="Ready to see it run?" text="The documentation covers the architecture in depth, and the Quickstart puts the platform on a Kubernetes cluster." label="Read the architecture docs" href="https://labs64.io/docs/introduction/architecture.html" label2="Quickstart" href2="https://labs64.io/docs/getting-started/quickstart.html" %}
