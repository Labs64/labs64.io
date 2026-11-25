---
layout: page
title: "Policy-as-Code Authorization"
description: "RBAC permissions"
permalink: /platform/authorization/
use_modern: true
---

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Policy-as-Code Authorization</h1>
        <span>We decoupled authorization from business logic. Labs64.IO uses Cerbos to evaluate fine-grained, policy-as-code permissions at runtime.</span>
    </div>
</div>

<div class="L64M">
<section class="L64M_sec"><div class="L64M_w">
  <div class="L64M_zzwrap">
    <div class="L64M_zz">
      <div class="L64M_zz_txt">
        <h2>Fine-Grained RBAC</h2>
        <p>Complex role-based and attribute-based access controls are handled independently from the core microservice logic.</p>
        <ul>
          <li>A central Cerbos policy decision point evaluates policy. It is not duplicated per module.</li>
          <li>Roles and attributes are decided outside the service, so modules stay small.</li>
          <li>Routes that match no known policy fail closed.</li>
        </ul>
      </div>
      {% include l64-fig.html id="rbac" %}
    </div>
    <div class="L64M_zz">
      <div class="L64M_zz_txt">
        <h2>Auditable Policies</h2>
        <p>Since permissions are defined as code, access rules can be code-reviewed, tested, and audited systematically.</p>
        <ul>
          <li>A change to who may do what goes through review like any other change.</li>
          <li>Policies are tested before they ship.</li>
          <li>Version history shows who changed access, and when.</li>
        </ul>
      </div>
      {% include l64-fig.html id="policy-review" %}
    </div>
  </div>
  <nav class="L64M_related" aria-label="Related"><span>Related</span><a href="{{ '/products/auth-gateway/' | relative_url }}">Auth Gateway</a><a href="{{ '/platform/zero-trust/' | relative_url }}">Zero-Trust Edge Proxy</a><a href="{{ '/platform/api-first/' | relative_url }}">API-First / Contract-Driven</a></nav>
</div></section>
</div>

{% include l64-deepdive.html key="authorization" %}

{% include l64-cta.html title="Ready to see how it fits together?" text="See where Cerbos policy evaluation sits in the request path, alongside the modules it protects." label="See how it fits together" href="/architecture/" %}
