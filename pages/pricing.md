---
layout: page
title: "Open Core: Apache 2.0 Forever, Enterprise Add-Ons"
description: "Labs64.IO Community Edition is Apache 2.0 and stays Apache 2.0, forever. Enterprise Edition adds capability, assurance, and SLAs on top — it never takes anything back."
permalink: /pricing/
use_modern: true
---

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Pricing & Licensing</h1>
        <span>The Labs64.IO Ecosystem is <strong>open core</strong>. Everything in the Community Edition — core, SDKs, contracts, clients, and every shipped integration — is licensed Apache 2.0 and stays that way forever; nothing is ever moved out of it. The Enterprise Edition adds capability, dedicated SLAs, and managed services on top, for teams that need to scale with guarantees.</span>
    </div>
</div>

<div class="L64M">

<section class="L64M_sec"><div class="L64M_w">
  <div class="L64M_ed2">
    <div class="L64M_edcard">
      <h2>Community Edition</h2><span class="tg">Apache 2.0, free forever</span>
      <p>Open source and free forever. For developers, startups and teams who want to self-host and manage their own infrastructure.</p>
      <ul>
        <li>Source code access</li>
        <li>Apache 2.0 licence</li>
        <li>Self-hosted with Helm and ArgoCD</li>
        <li>Community support on GitHub</li>
      </ul>
      <a href="https://github.com/Labs64/labs64.io-workspace" class="L64M_btn"><i class="fa fa-github"></i> Get started on GitHub</a>
    </div>
    <div class="L64M_edcard ee">
      <span class="flag">For production</span>
      <h2>Enterprise Edition</h2><span class="tg">Commercial licence, additive</span>
      <p>Commercial licence and support, for organizations that need commercial protections, dedicated SLAs and expert guidance.</p>
      <ul>
        <li>Everything in Community stays</li>
        <li>Additive modules under a commercial licence</li>
        <li>Dedicated SLAs and support channels</li>
        <li>Architectural consulting</li>
        <li>Managed SaaS deployment, as an optional add-on</li>
      </ul>
      <a href="mailto:info@labs64.io" class="L64M_btn L64M_btn--solid">Contact sales</a>
    </div>
  </div>
</div></section>

<section class="L64M_sec L64M_sec--alt"><div class="L64M_w">
  <div class="L64M_head"><h2>Which edition <span class="hl">fits?</span></h2><p>Tick what matters to you. The answer follows the comparison table below.</p></div>
  <div class="L64M_fitwrap">{% include l64-wx.html id="pricing-fit" %}</div>
</div></section>

<section class="L64M_sec"><div class="L64M_w" style="max-width:900px">
  <div class="L64M_head"><h2>Feature <span class="hl">comparison</span></h2></div>
  <table class="L64M_cmp">
    <thead><tr><th>Feature</th><th class="c">Community</th><th class="c">Enterprise</th></tr></thead>
    <tbody>
      <tr><td>Source code access</td><td class="c"><i class="fa fa-check y" aria-label="Included"></i></td><td class="c"><i class="fa fa-check y" aria-label="Included"></i></td></tr>
      <tr><td>License</td><td class="c">Apache 2.0</td><td class="c">Commercial (additive modules)</td></tr>
      <tr><td>Self-hosted (Helm / ArgoCD)</td><td class="c"><i class="fa fa-check y" aria-label="Included"></i></td><td class="c"><i class="fa fa-check y" aria-label="Included"></i></td></tr>
      <tr><td>Support</td><td class="c">Community (GitHub issues)</td><td class="c">Dedicated SLAs & support channels</td></tr>
      <tr><td>Architectural consulting</td><td class="c"><i class="fa fa-times n" aria-label="Not included"></i></td><td class="c"><i class="fa fa-check y" aria-label="Included"></i></td></tr>
      <tr><td>Managed SaaS deployment</td><td class="c"><i class="fa fa-times n" aria-label="Not included"></i></td><td class="c">Optional add-on</td></tr>
    </tbody>
  </table>
  <p class="L64M_cap" style="max-width:700px"><strong>No take-backs:</strong> nothing that ships in the Community Edition is ever removed or relicensed. Enterprise Edition only adds — it never forks the Community codebase or changes its behavior.</p>
</div></section>

<section class="L64M_sec"><div class="L64M_w">
  <div class="L64M_head"><h2>Four ways to <span class="hl">operate it</span></h2>
    <p>Choose the operating model that matches your team's appetite for running infrastructure. The exact commercial packaging and service availability are agreed separately; these describe the intended shape.</p></div>
  <div class="L64M_tiers">
    <div class="L64M_tier"><h3>Community Edition</h3><dl><dt>You operate</dt><dd>Your cluster, integrations, upgrades and support process.</dd><dt>Labs64.IO</dt><dd>Public software and documentation.</dd><dt>Best fit</dt><dd>Teams evaluating or self-supporting.</dd></dl></div>
    <div class="L64M_tier"><h3>Managed SaaS</h3><dl><dt>You operate</dt><dd>Minimal platform infrastructure.</dd><dt>Labs64.IO</dt><dd>Operates the agreed managed environment.</dd><dt>Best fit</dt><dd>Teams focused on product delivery.</dd></dl></div>
    <div class="L64M_tier"><h3>Assisted Enterprise</h3><dl><dt>You operate</dt><dd>Your environment, with shared operational responsibility.</dd><dt>Labs64.IO</dt><dd>Guidance, enablement and agreed support.</dd><dt>Best fit</dt><dd>Regulated or enterprise-owned platforms.</dd></dl></div>
    <div class="L64M_tier"><h3>Bespoke</h3><dl><dt>You operate</dt><dd>A tailored environment and integration model.</dd><dt>Labs64.IO</dt><dd>Solution design and delivery by agreement.</dd><dt>Best fit</dt><dd>Specialized constraints or integrations.</dd></dl></div>
  </div>
  <p class="L64M_cap">Every tier shares the same foundations: explicit identity, secret management, tenant boundaries, backups, observability and an incident response path. <a class="L64M_link" href="https://labs64.io/docs/operate-manage/deployment-tiers.html">Read the deployment tiers</a>.</p>
</div></section>

<section class="L64M_sec L64M_sec--alt"><div class="L64M_w">
  <div class="L64M_head"><h2>Frequently asked <span class="hl">questions</span></h2></div>
  <div class="L64M_faq">
    {%- for f in site.data["faq-pricing"] -%}
    <details><summary>{{ f.q }}</summary><p>{{ f.a }}</p></details>
    {%- endfor -%}
  </div>
</div></section>

</div>
