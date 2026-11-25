---
layout: page
title: "Open Source Community"
description: "The Labs64.IO Ecosystem is proudly built in the open."
permalink: /open-source/
use_cbpscroller: true
use_modern: true
---

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Open Source Community</h1>
        <span>Transparency, collaboration, and developer autonomy are at the heart of Labs64.IO. We build in the open because we believe the best infrastructure is shaped by the community that uses it.</span>
    </div>
</div>

<div class="row">
    <div id="cbp-so-scroller" class="cbp-so-scroller NL_intro">
        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left L64M_fig">
                {% include l64-wx.html id="os-ce" %}
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>The Community Edition</h2>
                <span>The core of the Labs64.IO Ecosystem is entirely open source and free forever. Community modules are licensed under Apache 2.0, ensuring you have the freedom to inspect, modify, and self-host the code.</span>
            </article>
        </section>

        <section class="cbp-so-section">
            <article class="cbp-so-side cbp-so-side-left">
                <h2>No Artificial Limits</h2>
                <span>We don't cripple the open-source version. The Community Edition contains the full-featured code used in production by our Enterprise clients, so you can build and scale without constraints.</span>
            </article>
            <figure class="cbp-so-side cbp-so-side-right L64M_fig">
                {% include l64-wx.html id="os-nolimits" %}
            </figure>
        </section>

        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left L64M_fig">
                {% include l64-wx.html id="os-contrib" %}
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>Contribute to the Ecosystem</h2>
                <span>We welcome contributions across every repository in the workspace. Whether it's adding a new PSP to the Payment Gateway, creating a new AuditFlow sink, or improving our Helm charts, your PRs are always welcome.</span>
            </article>
        </section>
    </div>
</div>

<div class="L64M">
<section class="L64M_sec"><div class="L64M_w">
  <div class="L64M_head"><h2>Where to <span class="hl">start</span></h2><p>Run it, read how the repositories fit together, then send a pull request.</p></div>
  <nav class="L64M_related L64M_related--center" aria-label="Where to start">
    <a href="https://labs64.io/docs/development/contributing.html">Contributing guide</a>
    <a href="https://labs64.io/docs/development/workspace-repositories.html">Workspace repositories</a>
    <a href="https://labs64.io/docs/getting-started/run-the-full-ecosystem-locally.html">Run the full ecosystem locally</a>
    <a href="https://github.com/topics/labs64-io">Labs64.IO on GitHub</a>
  </nav>
</div></section>
</div>

{% include l64-cta.html title="Join the community" text="Explore the code on GitHub, then run it yourself with the guided onboarding path." label='<i class="fa fa-github "></i>Explore Labs64.IO on GitHub' href="https://github.com/Labs64/labs64.io-workspace" label2="Or get started running it locally" href2="https://labs64.io/docs/getting-started/quickstart.html" %}
