---
layout: page
title: "Reporting: Reports Over Your Stored Events"
description: "Read-only reports for the Labs64.IO Ecosystem: a reviewed metric catalogue over ClickHouse and S3, where each customer sees its own rows only."
permalink: /products/reporting/
use_cbpscroller: true
use_modern: true
---

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Reporting: Reports Over Your Stored Events</h1>
        <span>AuditFlow routes your events and keeps no database. Reporting is the read side: your backend asks for a named metric on behalf of one customer, and gets that customer's numbers, enforced in the query and again by a row policy on the server.</span>
    </div>
</div>

<div class="row">
    <div id="cbp-so-scroller" class="cbp-so-scroller NL_intro">
        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left L64M_fig">
                {% include l64-wx.html id="rp-catalogue" %}
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>A Metric Is a Reviewed Definition</h2>
                <span>A catalogue names the table, the aggregation, the dimensions and the filters. Adding a metric adds a catalogue entry, not an endpoint. A request picks names from it and never carries SQL; every value is a bound parameter.</span>
            </article>
        </section>

        <section class="cbp-so-section">
            <article class="cbp-so-side cbp-so-side-left">
                <h2>One Store, Many Customers</h2>
                <span>Every query filters on the caller's scope, and a ClickHouse row policy applies the same scope to a query that forgot. Your backend authenticates the customer and translates its plan into groups and days of history: the service knows no plan names.</span>
            </article>
            <figure class="cbp-so-side cbp-so-side-right L64M_fig">
                {% include l64-wx.html id="rp-scope" %}
            </figure>
        </section>

        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left L64M_fig">
                {% include l64-wx.html id="rp-ops" %}
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>Events, Traces and Bodies</h2>
                <span>Metrics by range and up to two dimensions, events paged by cursor, every event of one correlation ID, and an event's archived request and response from S3 when the plan allows it.</span>
            </article>
        </section>
    </div>
</div>

{% include l64-fit.html id="reporting" %}
{% include l64-deepdive.html key="reporting" %}

{%- assign m = site.data.modules | where: "id", "reporting" | first -%}
{% include l64-cta.html title="Ready to try Reporting?" text="Docker only: the README starts the service next to a ClickHouse with a small demo tenant." label="Read the documentation" href="https://labs64.io/docs/modules/reporting/" label2="View the Reporting repository" href2=m.repo %}
