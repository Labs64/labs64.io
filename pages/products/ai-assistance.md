---
layout: page
title: "AI & MCP Gateway (exploring)"
description: "Design-stage exploration of agent-callable commerce APIs. Not yet scheduled."
permalink: /products/ai-assistance/
use_cbpscroller: true
use_modern: true
---

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>AI & MCP Gateway (exploring)</h1>
        <span>Design-stage exploration of what it would take to expose Labs64.IO commerce operations as agent-callable APIs via the Model Context Protocol (MCP). Nothing here is scheduled or built — this is early thinking about the shape of the problem, not a working module.</span>
    </div>
</div>

<div class="row">
    <div id="cbp-so-scroller" class="cbp-so-scroller NL_intro">
        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left L64M_fig">
                {% include l64-wx.html id="ai-concept" %}
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>What we're exploring</h2>
                <span>The idea is a gateway that would let AI agents call commerce operations — think checkout, invoicing, or account lookups — through a well-defined, agent-callable API surface using MCP. If it moves forward, it would sit alongside the existing modules rather than replace any of them. None of this is scheduled, and no code exists yet.</span>
            </article>
        </section>
    </div>
</div>

{% include l64-cta.html title="See what's already shipping" text="The AI & MCP Gateway isn't scheduled yet. Six modules are in the repositories today, from AuditFlow to Reporting. Run one of them to see the ecosystem." label="Get started" href="https://labs64.io/docs/getting-started/quickstart.html" label2="Or explore Labs64.IO on GitHub" href2="https://github.com/Labs64/labs64.io-workspace" %}
