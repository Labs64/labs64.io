---
layout: page
title: "Get Started"
description: "Run the Labs64.IO Ecosystem on your own machine — one module, the full stack, or your own cluster."
permalink: /get-started/
---

<style>
.gs-section {
    padding: 60px 0 40px 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.gs-overview {
    max-width: 1000px;
    margin: 0 auto 40px;
    padding: 0 20px;
}

.gs-overview-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    justify-content: center;
}

.gs-overview-card {
    flex: 1;
    min-width: 260px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 28px;
    text-decoration: none !important;
    color: inherit;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
    display: block;
}

.gs-overview-card:hover {
    box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.08);
    transform: translateY(-4px);
}

.gs-overview-tier {
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #d95e14;
    margin-bottom: 8px;
}

.gs-overview-title {
    font-size: 20px;
    font-weight: 800;
    color: #853E29;
    margin: 0 0 10px 0;
}

.gs-overview-desc {
    font-size: 15px;
    color: #64748b;
    line-height: 1.6;
    margin: 0;
}

.gs-tiers {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 20px;
}

.gs-tier {
    padding: 48px 0;
    border-top: 1px solid #e2e8f0;
}

.gs-tier:first-child {
    border-top: none;
    padding-top: 0;
}

.gs-tier-eyebrow {
    display: inline-block;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #d95e14;
    background: #fdf1e7;
    padding: 4px 12px;
    border-radius: 999px;
    margin-bottom: 12px;
}

.gs-tier h2 {
    font-size: 28px;
    font-weight: 800;
    color: #853E29;
    margin: 0 0 12px 0;
}

.gs-tier h3 {
    font-size: 17px;
    font-weight: 700;
    color: #334155;
    margin: 28px 0 10px 0;
}

.gs-tier p, .gs-tier li {
    color: #475569;
    line-height: 1.7;
}

.gs-tier pre {
    background: #0f172a;
    color: #e2e8f0;
    border-radius: 12px;
    padding: 18px 20px;
    overflow-x: auto;
    font-size: 14px;
    line-height: 1.6;
}

.gs-tier pre code {
    background: none;
    color: inherit;
    padding: 0;
}

.gs-tier code {
    background: #f1f5f9;
    color: #334155;
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 0.9em;
}

.gs-checklist {
    list-style: none;
    margin: 0;
    padding: 0;
}

.gs-checklist li {
    position: relative;
    padding-left: 28px;
    margin-bottom: 10px;
}

.gs-checklist li::before {
    content: "\2713";
    position: absolute;
    left: 0;
    top: 0;
    color: #1f6f43;
    font-weight: 700;
}

.gs-callout {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-left: 4px solid #d95e14;
    border-radius: 8px;
    padding: 16px 20px;
    margin: 16px 0;
    font-size: 15px;
}

.gs-callout p {
    margin: 0;
}

.gs-callout a {
    color: #d95e14;
    font-weight: 600;
}

.gs-links {
    margin: 6px 0 0 0;
    padding-left: 20px;
}
</style>

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Get Started</h1>
        <span>Three ways to run the Labs64.IO Ecosystem, depending on how much of it you want to see. Pick a tier below — each one lists exactly what to install, exactly what to run, and exactly how to tell it worked.</span>
    </div>
</div>

<div class="gs-section">
    <div class="gs-overview">
        <div class="gs-overview-grid">
            <a href="#tier-1" class="gs-overview-card">
                <span class="gs-overview-tier">Tier 1</span>
                <h3 class="gs-overview-title">One module</h3>
                <p class="gs-overview-desc">Clone AuditFlow and run it on its own with <code>just up</code>. The fastest way to see one part of the ecosystem end to end.</p>
            </a>
            <a href="#tier-2" class="gs-overview-card">
                <span class="gs-overview-tier">Tier 2</span>
                <h3 class="gs-overview-title">The whole ecosystem</h3>
                <p class="gs-overview-desc">Clone the workspace repo, fetch all 12 modules, and bring up a local k3d cluster behind the auth gateway.</p>
            </a>
            <a href="#tier-3" class="gs-overview-card">
                <span class="gs-overview-tier">Tier 3</span>
                <h3 class="gs-overview-title">Your own cluster</h3>
                <p class="gs-overview-desc">Add the published Helm charts to a cluster you already run — local, AWS, or bring-your-own infrastructure.</p>
            </a>
        </div>
    </div>

    <div class="gs-tiers">

        <div class="gs-tier" id="tier-1">
            <span class="gs-tier-eyebrow">Tier 1</span>
            <h2>Run one module</h2>
            <p>AuditFlow is the smallest complete slice of the ecosystem: an API that accepts events, a transformer, and a sink, connected by RabbitMQ. Running it alone is the quickest way to see the publish → route → land pattern that every module follows.</p>

            {% include module-banner.html id="auditflow" %}

            <h3>Prerequisites</h3>
            <p>Docker, Java 25, Maven, and <code>just</code>. The canonical, versioned list — with install commands for each tool — lives in one place; this page doesn't repeat it:</p>
            <div class="gs-callout">
                <p>See the <a href="https://github.com/Labs64/labs64.io-workspace#-prerequisites" target="_blank" rel="noopener">Prerequisites table in the workspace README</a>.</p>
            </div>
            <p>Java 25 specifically is enforced by a Maven build plugin — an older JDK on your <code>PATH</code> will fail the build before it gets anywhere near AuditFlow's code.</p>

            <h3>Commands</h3>
            <pre><code>git clone https://github.com/Labs64/labs64.io-auditflow.git
cd labs64.io-auditflow
just up</code></pre>

            <h3>How long it takes</h3>
            <p>First run is dominated by Maven dependency resolution and container image builds; later runs are substantially faster.</p>

            <h3>You'll know it worked when…</h3>
            <p>Publish an event and watch it route:</p>
            <pre><code>curl -sS -X POST http://localhost:8080/audit/publish \
  -H 'Content-Type: application/json' \
  -d '{"eventType":"demo.event","payload":{"hello":"world"}}'</code></pre>
            <ul class="gs-checklist">
                <li>The <code>curl</code> command above returns a response instead of a connection error.</li>
                <li>Swagger UI at <a href="http://localhost:8080/swagger-ui.html">http://localhost:8080/swagger-ui.html</a> loads and lists the AuditFlow API.</li>
                <li>The transformer's docs at <a href="http://localhost:8081/docs">http://localhost:8081/docs</a> and the sink's docs at <a href="http://localhost:8082/docs">http://localhost:8082/docs</a> both load.</li>
                <li>The RabbitMQ management UI at <a href="http://localhost:15673">http://localhost:15673</a> (<code>guest</code> / <code>guest</code>) shows the event moving through its queues.</li>
            </ul>
        </div>

        <div class="gs-tier" id="tier-2">
            <span class="gs-tier-eyebrow">Tier 2</span>
            <h2>Run the whole ecosystem</h2>
            <p>The workspace repo is the entry point that orchestrates all 12 independent repositories with one <code>justfile</code>: it clones every module, builds every image, and deploys the lot to a local k3d cluster behind the auth gateway.</p>

            <h3>Prerequisites</h3>
            <p>Everything from Tier 1, plus k3d, Helm, the <code>helm-diff</code> plugin, Helmfile, and kubectl — or skip installing any of it individually and open the repo in the bundled DevContainer instead.</p>
            <div class="gs-callout">
                <p>Full versions and install commands: <a href="https://github.com/Labs64/labs64.io-workspace#-prerequisites" target="_blank" rel="noopener">Prerequisites table in the workspace README</a>.</p>
            </div>

            <h3>Commands</h3>
            <pre><code>git clone https://github.com/Labs64/labs64.io-workspace.git labs64.io
cd labs64.io
just doctor      # verify tooling before spending time
just clone       # fetch all 12 repositories
just up          # build images, create the k3d cluster, deploy</code></pre>
            <p><code>just doctor</code> is worth running first — it checks every tool above is installed and prints its version, before anything else spends time building.</p>

            <h3>How long it takes</h3>
            <p>First run is dominated by Maven dependency resolution and container image builds — now across every cloned module, plus the initial k3d cluster bring-up; later runs are substantially faster.</p>

            <h3>You'll know it worked when…</h3>
            <ul class="gs-checklist">
                <li><code>http://gateway.localhost</code> responds, instead of connection-refused — the edge is routing.</li>
                <li>The aggregated API docs served by the <code>api-docs</code> chart list endpoints from more than one module, not just one.</li>
                <li><code>kubectl get pods</code> against the local cluster shows a pod for each cloned module, in a <code>Running</code> state.</li>
            </ul>
        </div>

        <div class="gs-tier" id="tier-3">
            <span class="gs-tier-eyebrow">Tier 3</span>
            <h2>Deploy to your own cluster</h2>
            <p>Every module ships as a published Helm chart. If you already run a Kubernetes cluster — locally, on AWS, or on your own infrastructure — you don't need the workspace repo at all; add the chart repository and install what you need.</p>

            <h3>Prerequisites</h3>
            <p>Helm 3.x and kubectl configured against the cluster you intend to deploy to (see the same <a href="https://github.com/Labs64/labs64.io-workspace#-prerequisites" target="_blank" rel="noopener">Prerequisites table</a> for exact versions).</p>

            <h3>Commands</h3>
            <pre><code>helm repo add labs64io https://labs64.github.io/labs64.io-helm-charts
helm repo update
helm search repo labs64io</code></pre>
            <p>For AWS QA/Staging/Prod sizing, or bringing your own infrastructure, don't improvise values from scratch — the deployment modes are already documented:</p>
            <div class="gs-callout">
                <p>See <a href="https://github.com/Labs64/labs64.io-helm-charts#deployment-modes" target="_blank" rel="noopener">Deployment Modes in the helm-charts README</a> for Local Development, AWS QA/Staging/Prod, and BYO Infra.</p>
            </div>

            <h3>How long it takes</h3>
            <p>Adding and searching the chart repository only fetches a small index file over the network. Installing a chart against your own cluster is bounded by that cluster's own image pulls and startup, not by anything on this page.</p>

            <h3>You'll know it worked when…</h3>
            <ul class="gs-checklist">
                <li><code>helm search repo labs64io</code> lists chart names and versions, instead of returning an empty result.</li>
                <li>Those are the same chart versions you can pass to <code>helm install</code> / <code>helm diff upgrade</code> against your cluster.</li>
            </ul>
        </div>

    </div>
</div>
