---
layout: page
title: "Architecture"
description: "How the Labs64.IO modules fit together — the request path, the module map, and the extension points available today."
permalink: /architecture/
---

<style>
.arch-section {
    padding: 40px 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.arch-wrapper {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 20px;
}

.arch-section h2 {
    font-weight: 800;
    color: #853E29;
    font-size: 28px;
    margin-bottom: 16px;
}

.arch-section p {
    color: #475569;
    line-height: 1.7;
}

.arch-diagram {
    max-width: 100%;
    margin: 24px 0;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 16px;
    overflow-x: auto;
}

.arch-diagram svg {
    display: block;
    width: 100%;
    height: auto;
    max-width: 100%;
}

.arch-table {
    width: 100%;
    border-collapse: collapse;
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    margin: 20px 0;
}

.arch-table th, .arch-table td {
    padding: 14px 16px;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
    vertical-align: top;
}

.arch-table th {
    background: #f8fafc;
    font-weight: 700;
    color: #334155;
}

.arch-list {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 24px 28px;
    margin: 20px 0;
}

.arch-list li {
    margin-bottom: 12px;
    line-height: 1.6;
    color: #475569;
}

.arch-list li:last-child {
    margin-bottom: 0;
}

.arch-list code {
    background: #e2e8f0;
    color: #853E29;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.9em;
}

.arch-section code {
    background: #e2e8f0;
    color: #853E29;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.9em;
}

.arch-links {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin: 20px 0;
}

.arch-links a {
    display: inline-block;
    background: #f1f5f9;
    color: #334155;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 10px 16px;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
}

.arch-links a:hover {
    background: #e2e8f0;
    color: #0f172a;
}

.arch-note {
    background: #e2e8f0;
    border-left: 4px solid #d95e14;
    border-radius: 6px;
    padding: 16px 20px;
    color: #475569;
    margin: 20px 0;
}
</style>

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Architecture</h1>
        <span>How the Labs64.IO modules fit together — the request path, the module map, and the extension points available today.</span>
    </div>
</div>

<div class="arch-section">
    <div class="arch-wrapper">

        <h2>Mental model</h2>
        <p>
            Labs64.IO is a set of independent, polyglot services — Java/Spring Boot, Python/FastAPI, Vue —
            that sit behind <strong>one gateway</strong> and <strong>one auth plane</strong>. Every module
            is deployed from <strong>one chart library</strong>, and every module boundary is an
            <strong>OpenAPI-first contract</strong>: the API spec is written first, server and client code
            is generated from it, and the contract — not the implementation — is what other services and
            teams depend on.
        </p>
        <p>
            No module reaches into another module's process or database. Everything crosses a boundary
            either as a REST call through the gateway, or as an event on the message bus. That's the whole
            model — the rest of this page walks through it.
        </p>

        <h2>The request path</h2>
        <p>
            Every request, regardless of which module it targets, crosses the same edge before it reaches
            application code.
        </p>

        <div class="arch-diagram">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 460" role="img" aria-labelledby="labs64io-arch-title labs64io-arch-desc">
  <title id="labs64io-arch-title">Labs64.IO request and event path</title>
  <desc id="labs64io-arch-desc">A client request enters through Traefik, which forwards it to traefik-authproxy for ForwardAuth. The authproxy verifies the token and asks the central Cerbos PDP for an authorization decision, then routes the request to the target module. That module publishes domain events to RabbitMQ, which AuditFlow consumes and routes onward to configured sinks.</desc>

  <defs>
    <marker id="arrowhead" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569"></path>
    </marker>
  </defs>

  <g>
    <rect x="20" y="60" width="140" height="64" rx="8" fill="#ffffff" stroke="#475569" stroke-width="2"></rect>
    <text x="90" y="97" text-anchor="middle" font-size="16" font-weight="700" fill="#475569">Client</text>

    <rect x="220" y="60" width="150" height="64" rx="8" fill="#853E29" stroke="#853E29" stroke-width="2"></rect>
    <text x="295" y="90" text-anchor="middle" font-size="15" font-weight="700" fill="#e2e8f0">Traefik</text>
    <text x="295" y="108" text-anchor="middle" font-size="12" fill="#e2e8f0">gateway</text>

    <rect x="430" y="60" width="190" height="64" rx="8" fill="#853E29" stroke="#853E29" stroke-width="2"></rect>
    <text x="525" y="86" text-anchor="middle" font-size="14" font-weight="700" fill="#e2e8f0">traefik-authproxy</text>
    <text x="525" y="106" text-anchor="middle" font-size="12" fill="#e2e8f0">ForwardAuth /auth</text>

    <rect x="680" y="60" width="150" height="64" rx="8" fill="#d95e14" stroke="#d95e14" stroke-width="2"></rect>
    <text x="755" y="90" text-anchor="middle" font-size="15" font-weight="700" fill="#ffffff">Cerbos PDP</text>
    <text x="755" y="108" text-anchor="middle" font-size="12" fill="#ffffff">authz decision</text>

    <rect x="880" y="60" width="100" height="64" rx="8" fill="#ffffff" stroke="#475569" stroke-width="2"></rect>
    <text x="930" y="97" text-anchor="middle" font-size="15" font-weight="700" fill="#475569">Module</text>

    <line x1="160" y1="92" x2="212" y2="92" stroke="#475569" stroke-width="2" marker-end="url(#arrowhead)"></line>
    <line x1="370" y1="92" x2="422" y2="92" stroke="#475569" stroke-width="2" marker-end="url(#arrowhead)"></line>
    <line x1="620" y1="92" x2="672" y2="92" stroke="#475569" stroke-width="2" marker-end="url(#arrowhead)"></line>
    <line x1="830" y1="92" x2="872" y2="92" stroke="#475569" stroke-width="2" marker-end="url(#arrowhead)"></line>
  </g>

  <g>
    <rect x="430" y="150" width="380" height="56" rx="6" fill="#e2e8f0" stroke="#475569" stroke-width="1"></rect>
    <text x="620" y="171" text-anchor="middle" font-size="12" font-weight="700" fill="#475569">On success, authproxy sets trusted headers:</text>
    <text x="620" y="190" text-anchor="middle" font-size="11" fill="#475569">X-Auth-User, X-Auth-Scopes, X-Auth-Tenant, X-Request-ID</text>
  </g>

  <line x1="930" y1="124" x2="930" y2="260" stroke="#475569" stroke-width="2" marker-end="url(#arrowhead)"></line>

  <g>
    <rect x="880" y="260" width="100" height="64" rx="8" fill="#ffffff" stroke="#475569" stroke-width="2"></rect>
    <text x="930" y="297" text-anchor="middle" font-size="15" font-weight="700" fill="#475569">Module</text>

    <rect x="680" y="260" width="150" height="64" rx="8" fill="#d95e14" stroke="#d95e14" stroke-width="2"></rect>
    <text x="755" y="297" text-anchor="middle" font-size="15" font-weight="700" fill="#ffffff">RabbitMQ</text>

    <rect x="430" y="260" width="190" height="64" rx="8" fill="#853E29" stroke="#853E29" stroke-width="2"></rect>
    <text x="525" y="297" text-anchor="middle" font-size="15" font-weight="700" fill="#e2e8f0">AuditFlow</text>

    <rect x="220" y="260" width="150" height="64" rx="8" fill="#ffffff" stroke="#475569" stroke-width="2"></rect>
    <text x="295" y="290" text-anchor="middle" font-size="15" font-weight="700" fill="#475569">Sinks</text>
    <text x="295" y="308" text-anchor="middle" font-size="11" fill="#475569">(own persistence)</text>

    <line x1="872" y1="292" x2="838" y2="292" stroke="#475569" stroke-width="2" marker-end="url(#arrowhead)"></line>
    <line x1="672" y1="292" x2="628" y2="292" stroke="#475569" stroke-width="2" marker-end="url(#arrowhead)"></line>
    <line x1="422" y1="292" x2="378" y2="292" stroke="#475569" stroke-width="2" marker-end="url(#arrowhead)"></line>
  </g>

  <text x="20" y="40" font-size="13" font-weight="700" fill="#853E29">Request path</text>
  <text x="20" y="245" font-size="13" font-weight="700" fill="#853E29">Event path (per-tenant pipelines)</text>

  <text x="295" y="345" text-anchor="middle" font-size="11" fill="#475569">Unmatched routes fail closed (403)</text>
</svg>
        </div>

        <p>
            <strong>Traefik</strong> receives every request and forwards it to <code>traefik-authproxy</code>
            at <code>/auth</code> before routing it anywhere else. The authproxy verifies the OIDC/JWT token
            on the request, then asks the central <strong>Cerbos PDP</strong> for the authorization decision
            — policy evaluation is centralized, not duplicated per module.
        </p>
        <p>
            On success, the authproxy emits the trusted header contract that every upstream module relies
            on: <code>X-Auth-User</code>, <code>X-Auth-Scopes</code>, <code>X-Auth-Tenant</code> (set to
            <code>-</code> when the request is tenant-less), and <code>X-Request-ID</code>. All four are set
            on every 2xx response, and Traefik's <code>authResponseHeaders</code> always overwrite whatever a
            client supplied, so a module can trust these headers without re-validating them. Routes that
            don't match a known policy <strong>fail closed</strong> — they're rejected, not silently allowed
            through.
        </p>

        <h2>Module map</h2>
        <p>
            Five modules exist today. Each is a separate repository, ships independently, and communicates
            with the others only through REST calls that cross the gateway above, or through events over
            RabbitMQ into AuditFlow.
        </p>

        <table class="arch-table">
            <thead>
                <tr>
                    <th>Module</th>
                    <th>Status</th>
                    <th>What it owns</th>
                </tr>
            </thead>
            <tbody>
                {%- assign map_modules = "auditflow,auth-gateway,checkout,payment-gateway,customer-portal" | split: "," -%}
                {%- for mid in map_modules -%}
                {%- assign m = site.data.modules | where: "id", mid | first -%}
                <tr>
                    <td><a href="{{ m.url | relative_url }}">{{ m.name }}</a></td>
                    <td>{% include module-status.html id=m.id %}</td>
                    <td>{{ m.tagline }}</td>
                </tr>
                {%- endfor -%}
            </tbody>
        </table>

        <p>
            AuditFlow is the one exception to "REST through the gateway": it is reached only by consuming
            events published to RabbitMQ by the other modules, plus its own pipeline configuration — it does
            not expose a public write API that other modules call synchronously.
        </p>

        <h2>Database-per-service</h2>
        <p>
            Each module owns its own logical database, or databases. Credentials are never shared between
            services, and no module connects directly to another module's schema. If one module needs data
            that another module owns, it asks for it across the gateway as a REST call, or reacts to an
            event — it never reaches into the other service's storage.
        </p>

        <h2>Tenancy</h2>
        <p>
            AuditFlow's pipeline model is the reference implementation for tenant isolation across the
            ecosystem. Every pipeline belongs to exactly one tenant, and an event is routed only through the
            pipeline set owned by that event's tenant — there is no global pipeline list and no fall-through
            to another tenant's pipelines. Events that arrive with no tenant context belong to a reserved
            <code>_platform</code> pseudo-tenant, so tenant-less traffic is still isolated rather than
            silently merged into a shared bucket.
        </p>

        <h2>Observability</h2>
        <p>
            Observability is infrastructure-owned, not something each service builds for itself. Runtime
            auto-instrumentation — the OTel Java Agent for Java services, <code>opentelemetry-instrument</code>
            for Python services — attaches at deploy time and ships traces, logs, and metrics through an OTel
            Collector to Tempo (traces), Loki (logs), and Prometheus (metrics), visualized in Grafana.
        </p>
        <p>
            Services carry no OpenTelemetry SDK and do no instrumentation bootstrap of their own. The exact
            same container image runs with or without observability — it's toggled purely by deployment
            configuration, so instrumentation can never drift from the code it's watching.
        </p>

        <h2>Extension points available today</h2>
        <p>
            This is the complete list of ways to extend the platform without forking a module. If it isn't
            on this list, it isn't available yet.
        </p>
        <ul class="arch-list">
            <li>
                <strong>AuditFlow transformer plugins</strong> — a <code>transformers/&lt;name&gt;.py</code>
                file implementing <code>transform(input_data: dict) -&gt; dict</code>.
            </li>
            <li>
                <strong>AuditFlow sink plugins</strong> — a <code>sinks/&lt;name&gt;.py</code> file
                implementing <code>process(event_data: dict, properties: dict) -&gt; dict</code>.
            </li>
            <li>
                <strong>Runtime plugin mounts</strong> — <code>transformers_bootstrap/</code> and
                <code>sinks_bootstrap/</code>, mounted in via a ConfigMap volume so plugins can be added
                without rebuilding the image.
            </li>
            <li>
                <strong>Payment Gateway PSP SPI</strong> — a new Maven module under
                <code>payment-gateway-providers/&lt;name&gt;/</code> implementing <code>PaymentProvider</code>,
                and optionally <code>ProviderCheckoutSupport</code> and/or
                <code>ProviderWebhookSupport</code>.
            </li>
            <li>
                <strong>Pipelines as configuration</strong> — a per-tenant <code>tenants/&lt;tenantId&gt;.yaml</code>
                file, or a labelled ConfigMap, defines which sinks a tenant's events route through.
            </li>
            <li>
                <strong>Pipeline condition operators</strong> — the operators available for matching and
                routing events within a pipeline definition.
            </li>
            <li>
                <strong>Helm values overlays</strong> — on the published charts, for environment-specific
                configuration without patching the chart itself.
            </li>
        </ul>

        <h2>Go deeper</h2>
        <p>
            The pages below cover each architectural property in more depth, and the docs repository has the
            full technical reference.
        </p>
        <div class="arch-links">
            <a href="{{ '/platform/polyglot/' | relative_url }}">Polyglot Microservices</a>
            <a href="{{ '/platform/api-first/' | relative_url }}">API-First / Contract-Driven</a>
            <a href="{{ '/platform/scalability/' | relative_url }}">Stateless Scalability</a>
            <a href="{{ '/platform/kubernetes/' | relative_url }}">Cloud-Native Kubernetes</a>
            <a href="{{ '/platform/zero-trust/' | relative_url }}">Zero-Trust Edge Proxy</a>
            <a href="{{ '/platform/identity/' | relative_url }}">Federated Identity Management</a>
            <a href="{{ '/platform/authorization/' | relative_url }}">Policy-as-Code Authorization</a>
            <a href="{{ '/platform/telemetry/' | relative_url }}">Business Telemetry Abstraction</a>
            <a href="https://github.com/Labs64/labs64.io-docs">Documentation Repository</a>
        </div>

    </div>
</div>
