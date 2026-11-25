---
layout: page
title: "API-First / Contract-Driven"
description: "Strict OpenAPI boundaries"
permalink: /platform/api-first/
use_modern: true
---

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>API-First / Contract-Driven</h1>
        <span>Every interaction within the Labs64.IO Ecosystem is governed by strict, contract-driven OpenAPI boundaries, ensuring complete consistency before a single line of code is written.</span>
    </div>
</div>

<div class="L64M">
<section class="L64M_sec"><div class="L64M_w">
  <div class="L64M_zzwrap">
    <div class="L64M_zz">
      <div class="L64M_zz_txt">
        <h2>Design Before Code</h2>
        <p>Teams design the interface in OpenAPI YAML first, ensuring peer review, design consensus, and security validation.</p>
        <ul>
          <li>Each module keeps its OpenAPI contract in its own repository, for example <code>openapi-audit-v1.yaml</code>.</li>
          <li>The contract, not the implementation, is what other services and teams depend on.</li>
          <li>Access rules are declared in the contract, operation by operation, so security is reviewed with the design.</li>
        </ul>
      </div>
      {% include l64-fig.html id="api-design" %}
    </div>
    <div class="L64M_zz">
      <div class="L64M_zz_txt">
        <h2>Automated SDKs</h2>
        <p>No manual boilerplate. Our services rely on OpenAPI-generated models and interfaces directly in <code>target/generated-sources</code>.</p>
        <ul>
          <li>Server interfaces and models are generated from the contract at build time.</li>
          <li>Generated sources are rebuilt from the spec, so they cannot drift from it.</li>
          <li>You implement the generated interface and write only business logic.</li>
        </ul>
      </div>
      {% include l64-fig.html id="api-codegen" %}
    </div>
  </div>
  <nav class="L64M_related" aria-label="Related"><span>Related</span><a href="{{ '/platform/authorization/' | relative_url }}">Policy-as-Code Authorization</a><a href="{{ '/platform/polyglot/' | relative_url }}">Polyglot Microservices</a><a href="{{ '/architecture/' | relative_url }}">Architecture overview</a></nav>
</div></section>
</div>

{% include l64-deepdive.html key="api-first" %}

{% include l64-cta.html title="Ready to see how it fits together?" text="See where OpenAPI contracts sit in the request path, alongside every module that shares them." label="See how it fits together" href="/architecture/" %}
