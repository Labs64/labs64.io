---
layout: page
title: "Reporting: Reports Over Your Stored Events"
description: "Read-only reports for the Labs64.IO Ecosystem: a reviewed metric catalogue over ClickHouse and S3, where each customer sees its own rows only."
permalink: /products/reporting/
---

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Reporting: Reports Over Your Stored Events</h1>
        <span>AuditFlow routes your events and keeps no database. Reporting is the read side: your backend asks for a named metric on behalf of one customer, and gets that customer's numbers, enforced in the query and again by a row policy on the server.</span>
    </div>
</div>

<div class="row">
    <div class="col-md-8 col-md-offset-2">
        {% include module-banner.html id="reporting" %}

        <h2>A metric is a reviewed definition</h2>
        <p>A catalogue names the table, the aggregation, the dimensions and the filters. Adding a metric adds a catalogue entry, not an endpoint. A request picks names from it and never carries SQL; every value is a bound parameter.</p>

        <h2>One store, many customers</h2>
        <p>Every query filters on the caller's scope, and a ClickHouse row policy applies the same scope to a query that forgot. Your backend authenticates the customer and translates its plan into groups and days of history: the service knows no plan names.</p>

        <h2>Events, traces and bodies</h2>
        <p>Metrics by range and up to two dimensions, events paged by cursor, every event of one correlation ID, and an event's archived request and response from S3 when the plan allows it.</p>

        <p><a href="{{ '/docs/modules/reporting/' | relative_url }}">Read the documentation</a> · <a href="https://github.com/Labs64/labs64.io-reporting">Source on GitHub</a></p>
    </div>
</div>
