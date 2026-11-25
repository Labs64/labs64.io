---
layout: page
title: "Federated Identity Management"
description: "Keycloak OIDC centralized auth"
permalink: /platform/identity/
use_modern: true
---

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Federated Identity Management</h1>
        <span>User authentication and SSO are fully centralized using Keycloak, providing robust OpenID Connect (OIDC) identity management across all modules.</span>
    </div>
</div>

<div class="L64M">
<section class="L64M_sec"><div class="L64M_w">
  <div class="L64M_zzwrap">
    <div class="L64M_zz">
      <div class="L64M_zz_txt">
        <h2>Seamless Single Sign-On</h2>
        <p>Users authenticate once and gain seamless access across the Payment Gateway, Checkout, and ecosystem tooling.</p>
        <ul>
          <li>Keycloak provides federated OpenID Connect identity for the whole ecosystem.</li>
          <li>One sign-in is accepted by every module behind the gateway.</li>
          <li>The Auth Gateway verifies the token before any module sees the request.</li>
        </ul>
      </div>
      {% include l64-fig.html id="sso" %}
    </div>
    <div class="L64M_zz">
      <div class="L64M_zz_txt">
        <h2>Standardized Tokens</h2>
        <p>Short-lived JWTs ensure that authentication states remain secure and completely stateless across all microservices.</p>
        <ul>
          <li>Short-lived JWTs mean no server-side session store.</li>
          <li>On success the gateway sets trusted headers: <code>X-Auth-User</code>, <code>X-Auth-Scopes</code>, <code>X-Auth-Tenant</code> and <code>X-Request-ID</code>.</li>
          <li>Modules trust those headers and do not re-validate the token.</li>
        </ul>
      </div>
      {% include l64-fig.html id="token" %}
    </div>
  </div>
  <nav class="L64M_related" aria-label="Related"><span>Related</span><a href="{{ '/products/auth-gateway/' | relative_url }}">Auth Gateway</a><a href="{{ '/platform/zero-trust/' | relative_url }}">Zero-Trust Edge Proxy</a><a href="{{ '/platform/authorization/' | relative_url }}">Policy-as-Code Authorization</a></nav>
</div></section>
</div>

{% include l64-deepdive.html key="identity" %}

{% include l64-cta.html title="Ready to see how it fits together?" text="See where Keycloak OIDC sits in the request path, alongside the modules that rely on it." label="See how it fits together" href="/architecture/" %}
