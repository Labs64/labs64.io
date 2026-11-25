---
layout: page
title: "Zero-Trust Edge Proxy"
description: "Secure ingress via the Auth Gateway"
permalink: /platform/zero-trust/
use_modern: true
---

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Zero-Trust Edge Proxy</h1>
        <span>Security starts at the edge. All inbound traffic is strictly evaluated by the Traefik-based Auth Gateway acting as our zero-trust entrypoint.</span>
    </div>
</div>

<div class="L64M">
<section class="L64M_sec"><div class="L64M_w">
  <div class="L64M_zzwrap">
    <div class="L64M_zz">
      <div class="L64M_zz_txt">
        <h2>Strict Ingress Validation</h2>
        <p>Requests are immediately validated against Keycloak OIDC tokens and precise Cerbos permission policies.</p>
        <ul>
          <li>Traefik forwards every request to the Auth Gateway before routing it anywhere.</li>
          <li>Identity and policy are checked before the request reaches a module.</li>
          <li>Routes that match no policy fail closed.</li>
        </ul>
      </div>
      {% include l64-fig.html id="edge-gate" %}
    </div>
    <div class="L64M_zz">
      <div class="L64M_zz_txt">
        <h2>Internal Isolation</h2>
        <p>Internal services do not expose public endpoints. They completely rely on the edge proxy for authentication checks.</p>
        <ul>
          <li>Internal services are reachable only through the edge.</li>
          <li>Client-supplied auth headers are always overwritten by the gateway.</li>
          <li>A module can trust the headers it receives.</li>
        </ul>
      </div>
      {% include l64-fig.html id="isolation" %}
    </div>
  </div>
  <nav class="L64M_related" aria-label="Related"><span>Related</span><a href="{{ '/products/auth-gateway/' | relative_url }}">Auth Gateway</a><a href="{{ '/platform/identity/' | relative_url }}">Federated Identity Management</a><a href="{{ '/platform/authorization/' | relative_url }}">Policy-as-Code Authorization</a></nav>
</div></section>
</div>

{% include l64-deepdive.html key="zero-trust" %}

{% include l64-cta.html title="Ready to see how it fits together?" text="See where the Auth Gateway sits in the request path, in front of every module." label="See how it fits together" href="/architecture/" %}
