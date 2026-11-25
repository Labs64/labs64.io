---
layout: page
title: "Open-core, API-first microservices for business workflows"
description: "Labs64.IO is an open-core ecosystem of API-first microservices for audit, payments and checkout: modular, self-hostable and built for GDPR-aware business workflows."
permalink: /
sitemap:
  priority: 0.8
no-cache: true
use_cbpscroller: true
use_modern: true
---
<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Open-core microservices for business workflows</h1>
        <span>The Labs64.IO Ecosystem offers a comprehensive suite of interconnected microservices designed to streamline and automate critical business workflow steps.</span>
        <div class="row">
            <div id="contact" class="col-md-8 col-md-offset-2">
                <a href="https://labs64.io/docs/getting-started/quickstart.html"
                   class="NL_button button_main NL_light_btn NL_wide_btn" role="button"><i class="fa fa-rocket"></i>Getting Started</a>
            </div>
        </div>
    </div>
</div>

<div class="L64M">
<section class="L64M_sec" id="modules"><div class="L64M_w">
  <div class="L64M_head"><h2>Pick a module. <span class="hl">See the API.</span></h2><p>Every module is an API-first service. Click one to see a real request from its OpenAPI contract, then send it.</p></div>
  {% include l64-explorer.html %}
</div></section>
</div>

{% include l64-iceberg.html %}

{% include l64-paths.html %}

<div class="row">
    <div id="cbp-so-scroller" class="cbp-so-scroller NL_intro">
        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left L64M_fig">
                {% include l64-w-cloud.html %}
            </figure>
            <article id="speed-to-market" class="cbp-so-side cbp-so-side-right">
                <h2>Cloud-Native & Kubernetes Ready</h2>

                <span>Distributed via shared Helm charts and optimized for ArgoCD. Deploy the Labs64.IO Ecosystem on any cloud provider or bare-metal Kubernetes cluster with confidence.</span>
            </article>
        </section>
    </div>
</div>

<div class="row">
    <div class="col-md-12 NL_form_light NL_block">
        <div class="col-md-8 col-md-offset-2 NL_form_light_text">
            <h2>Join Ecosystem Insiders</h2>
            <span>Be the first to build on the new ecosystem.</span>
            <br><br>
            <script id = 'formScript313099000024369001' src = 'https://crm.zoho.eu/crm/WebFormServeServlet?rid=b9653ac6f1ea187694002f8ae9548390e28b552e859319ea656451f8800addc241f20b0e1fc47057ff6c96a5c868ffcegidcbf3c9b40022370d6b88ed01cb518e088d588244750aa9053d338e528379810f&script=$sYG'>
</script>
        </div>
    </div>
</div>

<div class="row">
    <div id="cbp-so-scroller" class="cbp-so-scroller NL_intro">
        <section class="cbp-so-section">
            <article id="scalability" class="cbp-so-side cbp-so-side-left">
                <h2>API-First & Polyglot</h2>

                <span>We believe in using the right tool for the job. Java for high-performance transactions, Python for flexible integrations, and Vue 3 for reactive UIs. All communicating via strict, OpenAPI-first contracts.</span>
            </article>
            <figure class="cbp-so-side cbp-so-side-right L64M_fig">
                {% include l64-w-contract.html %}
            </figure>
        </section>

        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left L64M_fig">
                {% include l64-w-observe.html %}
            </figure>
            <article id="core-business" class="cbp-so-side cbp-so-side-right">
                <h2>Built-in Observability</h2>

                <span>Don't guess what's happening. Our modules come with OpenTelemetry Java Agents, Tempo for traces, Micrometer/Prometheus for metrics, and Loki for logs—all auto-instrumented via our Helm charts.</span>
            </article>
        </section>

        <section class="cbp-so-section">
            <article id="tailored-solutions" class="cbp-so-side cbp-so-side-left">
                <h2>Open Core, Apache 2.0 Forever</h2>

                <span>Start free with our Apache 2.0 Community Edition — nothing in it is ever taken back. Add our Enterprise Edition when you need extra capability, dedicated SLAs, and expert architecture consulting.</span>
            </article>
            <figure class="cbp-so-side cbp-so-side-right L64M_fig">
                {% include l64-w-open.html %}
            </figure>
        </section>

        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left L64M_fig">
                {% include l64-w-edge.html %}
            </figure>
            <article id="security-and-ompliance" class="cbp-so-side cbp-so-side-right">
                <h2>Security & Identity at the Edge</h2>

                <span>Zero-trust architecture built-in. Our Auth Gateway leverages Traefik, Keycloak OIDC, and Cerbos policies to enforce strict network and access controls before requests ever hit your internal services.</span>
            </article>
        </section>
    </div>
</div>

<div class="L64M">
<section class="L64M_sec" id="agents"><div class="L64M_w">
  <div class="L64M_zz">
    <div class="L64M_zz_txt">
      <h2>Built for AI agents too</h2>
      <p>An agent uses Labs64.IO the way any other client does: it gets a token, calls a REST API and reads an OpenAPI contract.</p>
      <ul>
        <li>Give each agent its own identity and only the scopes its task needs.</li>
        <li>Read the OpenAPI contract instead of guessing, and generate a client or a tool definition from it.</li>
        <li>Send an <code>Idempotency-Key</code> so a retried call is safe, and read the status to know what to do next.</li>
      </ul>
      <p style="margin-top:16px"><a class="L64M_link" href="https://labs64.io/docs/introduction/ai-agents.html">Read the AI-agents guide</a></p>
    </div>
    {% include l64-wx.html id="agent-status" %}
  </div>
</div></section>
</div>

<div class="L64M">
<section class="L64M_sec L64M_sec--alt" id="who"><div class="L64M_w">
  <div class="L64M_head"><h2>Who is <span class="hl">behind it</span></h2><p>Labs64 GmbH builds Labs64.IO in Munich, in the open.</p></div>
  <div class="L64M_fit2 L64M_trust">
    <div class="L64M_fitc"><h3>Built in the open</h3><p>Every module, the Helm charts and the documentation live in public repositories. Community modules are Apache 2.0, and nothing in them is taken back.</p><a class="L64M_link" href="{{ '/open-source/' | relative_url }}">How we build in the open</a></div>
    <div class="L64M_fitc"><h3>Labs64 also builds NetLicensing and GuideChimp</h3><p>Two other Labs64 products sit next to the ecosystem. NetLicensing handles entitlement checks and licensing, and GuideChimp gives interactive onboarding and product tours.</p><a class="L64M_link" href="https://netlicensing.io">NetLicensing</a> · <a class="L64M_link" href="https://www.labs64.com/guidechimp/">GuideChimp</a></div>
  </div>
</div></section>
</div>

{% include l64-cta.html title="Ready to build on the ecosystem?" text="Start with one module and add the next when your workflow needs it." label="Get started" href="https://labs64.io/docs/getting-started/quickstart.html" label2="Read how the modules fit together" href2="/architecture/" %}
