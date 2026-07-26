---
layout: page
title: "Roadmap"
description: "What ships today, what is being worked on, and what is still an idea — module by module."
permalink: /roadmap/
---

<style>
.roadmap-section {
    padding: 40px 0;
    max-width: 900px;
    margin: 0 auto;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.roadmap-lead {
    font-size: 18px;
    line-height: 1.6;
    color: #334155;
}

.roadmap-callout {
    margin: 24px 0;
    padding: 20px 24px;
    border-radius: 12px;
    border-left: 6px solid #b91c1c;
    background: #fef2f2;
    color: #7f1d1d;
}

.roadmap-callout h2 {
    margin-top: 0;
    color: #7f1d1d;
}

.roadmap-callout p:last-child {
    margin-bottom: 0;
}

.road-table {
    width: 100%;
    border-collapse: collapse;
    margin: 24px 0;
    background: #fff;
}

.road-table th,
.road-table td {
    padding: 14px 16px;
    text-align: left;
    vertical-align: top;
    border-bottom: 1px solid #e2e8f0;
}

.road-table th {
    background: #f8fafc;
    font-weight: 700;
    color: #334155;
}

.road-table ul {
    margin: 0;
    padding-left: 18px;
}

.roadmap-tiers dt {
    font-weight: 700;
    margin-top: 16px;
    color: #334155;
}

.roadmap-tiers dt:first-child {
    margin-top: 0;
}

.roadmap-tiers dd {
    margin: 4px 0 0;
    color: #475569;
}

.roadmap-section h2 {
    margin-top: 48px;
}

.roadmap-section h2:first-of-type {
    margin-top: 0;
}
</style>

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Roadmap</h1>
        <span>What ships today, what is being worked on, and what is still an idea — module by module. No marketing gloss: this page states plainly what's real.</span>
    </div>
</div>

<div class="roadmap-section">
    <p class="roadmap-lead"><strong>No module has reached 1.0 yet. AuditFlow is the first module targeting a 1.0 release.</strong> Everything below reflects where each module actually stands today, not where it's headed.</p>

    <div class="roadmap-callout">
      <h2>Before you connect real money: Payment Gateway</h2>
      <p>Payment Gateway's PSP webhook signature verification is incomplete. Do not connect it to live funds until this is resolved — treat any current deployment as sandbox-only for payment flows.</p>
    </div>

    <h2>Module status</h2>
    <p>This table is generated directly from the same data file that drives every module page and the navigation menu, so it cannot drift out of sync with what those pages say.</p>

    <table class="road-table">
      <thead>
        <tr><th>Module</th><th>Status</th><th>Known gaps today</th></tr>
      </thead>
      <tbody>
        {% for m in site.data.modules %}
        <tr>
          <td>{% if m.url %}<a href="{{ m.url | relative_url }}">{{ m.name }}</a>{% else %}{{ m.name }}{% endif %}</td>
          <td>{% include module-status.html id=m.id %}</td>
          <td>
            {% if m.known_gaps and m.known_gaps != empty %}
            <ul>{% for gap in m.known_gaps %}<li>{{ gap }}</li>{% endfor %}</ul>
            {% else %}—{% endif %}
          </td>
        </tr>
        {% endfor %}
      </tbody>
    </table>

    <h2>What the status tiers mean</h2>
    <dl class="roadmap-tiers">
      <dt>Beta</dt>
      <dd>Deployable and used across the ecosystem today. The contract may still change before 1.0.</dd>
      <dt>Alpha</dt>
      <dd>Runs, but is incomplete, with known gaps. Expect breaking changes.</dd>
      <dt>Planned</dt>
      <dd>Committed on the roadmap. Not started — nothing to run yet.</dd>
      <dt>Exploring</dt>
      <dd>RFC or design stage only. This may or may not ship.</dd>
    </dl>
    <p>Those four are the whole ladder. There is deliberately no fifth, more-finished tier above Beta — nothing in the ecosystem has earned that yet.</p>

    <h2>Licensing</h2>
    <p>The Community Edition is licensed Apache 2.0, and it stays Apache 2.0. Nothing that ships in the Community Edition is ever removed from it or relicensed out from under you. The Enterprise Edition is additive only: it adds capability on top of the Community codebase, and it never forks or patches that codebase to do it.</p>

    <h2>The Enterprise seam</h2>
    <p>Structurally, the ecosystem separates two independent choices: which <strong>edition</strong> you run (Community or Enterprise) and which <strong>deployment mode</strong> you use (self-hosted or SaaS). These two axes are orthogonal — all four combinations are legitimate, and neither choice constrains the other. Where Enterprise applies, it deploys as a values overlay on the same Helm chart used for Community — never as a separate, forked chart. No specific Enterprise capability is called out here, because none is built yet.</p>

    <h2>Security posture</h2>
    <p>Security hardening is ongoing ahead of 1.0.</p>
</div>

<div class="row">
    <div class="col-md-12 NL_form_light NL_block">
        <div class="col-md-8 col-md-offset-2 NL_form_light_text">
            <h2>Want to see today's status for yourself?</h2>
            <span>Run any module locally and check its behavior against what this page says — no need to take our word for it.</span>
            <a href="{{ '/get-started/' | relative_url }}" class="NL_button button_main NL_dark_btn NL_wide_btn">
                Get started
            </a>
        </div>
    </div>
</div>
