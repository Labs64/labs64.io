/*
 * Labs64.IO modern layer (vanilla JS, no jQuery). Loaded only for pages with `use_modern: true`.
 * Each behaviour starts only if its root element exists on the page.
 * Every request, response and event shown here is a labelled sample or simulation.
 */
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function qs(s, r) { return (r || document).querySelector(s); }
  function qsa(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  document.documentElement.classList.add('L64M_js');

  /* ---------- tiny JSON / YAML / header highlighter (input is trusted static text) ---------- */
  function values(s) {
    return s.replace(/("(?:[^"\\]|\\.)*")|(-?\b\d+(?:\.\d+)?\b)|\b(true|false|null)\b/g, function (m, str, num, lit) {
      if (str) { return '<span class="t-s">' + str + '</span>'; }
      return '<span class="t-n">' + (num || lit) + '</span>';
    });
  }
  function highlight(text) {
    return esc(text).split('\n').map(function (line) {
      var j = line.match(/^(\s*)("(?:[^"\\]|\\.)*")(\s*:\s*)(.*)$/);
      if (j) { return j[1] + '<span class="t-k">' + j[2] + '</span>' + j[3] + values(j[4]); }
      var y = line.match(/^(\s*-?\s*)([A-Za-z\/][^\s:"{}]*)(:)(.*)$/);
      if (y) { return y[1] + '<span class="t-k">' + y[2] + '</span>' + y[3] + values(y[4]); }
      return values(line);
    }).join('\n');
  }
  function highlightAll(root) {
    qsa('[data-hl] code', root).forEach(function (c) { c.innerHTML = highlight(c.textContent); });
  }

  /* ---------- A: module explorer ---------- */
  function initExplorer(root) {
    highlightAll(root);
    var tabs = qsa('.L64M_ex_grid [role="tab"]', root);
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        var p = document.getElementById(t.getAttribute('aria-controls'));
        if (p) { p.hidden = !on; }
      });
      if (focus) { tab.focus(); }
    }
    tabs.forEach(function (t, i) {
      t.tabIndex = i === 0 ? 0 : -1;
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var k = e.key, n = tabs.length, next = null;
        if (k === 'ArrowRight' || k === 'ArrowDown') { next = tabs[(i + 1) % n]; }
        if (k === 'ArrowLeft' || k === 'ArrowUp') { next = tabs[(i - 1 + n) % n]; }
        if (next) { e.preventDefault(); select(next, true); }
      });
    });
    qsa('.L64M_pn', root).forEach(function (pn) {
      var views = qsa('[data-view]', pn), panes = qsa('[data-view-pane]', pn);
      var badge = qs('[data-badge]', pn), send = qs('[data-send]', pn), timer = null;
      function show(v) {
        views.forEach(function (b) { b.setAttribute('aria-selected', b.getAttribute('data-view') === v ? 'true' : 'false'); });
        panes.forEach(function (p) { p.hidden = p.getAttribute('data-view-pane') !== v; });
      }
      views.forEach(function (b) { b.addEventListener('click', function () { show(b.getAttribute('data-view')); }); });
      if (send) {
        send.addEventListener('click', function () {
          clearTimeout(timer);
          send.disabled = true; badge.textContent = 'sending…'; badge.className = 'L64M_badge';
          timer = setTimeout(function () {
            badge.textContent = send.getAttribute('data-status'); badge.className = 'L64M_badge ok';
            show('res'); send.disabled = false; send.textContent = 'Send again';
          }, reduce ? 0 : 650);
        });
      }
    });
  }

  /* ---------- B: send / redact / deliver / replay demo ---------- */
  function initDemo(root) {
    var BODY = '{\n  "eventType": "order.shipped",\n  "sourceSystem": "warehouse/dispatch",\n  "tenantId": "V12345678",\n  "extra": {\n    "orderRef": "ORD-4711",\n    "customerEmail": "⟦ada@example.com⟧",\n    "ipAddress": "⟦203.0.113.7⟧"\n  }\n}';
    var CODE = {
      curl: 'curl -X POST https://your-host/api/v1/audit/publish \\\n  -H "Authorization: Bearer $TOKEN" \\\n  -H "Content-Type: application/json" \\\n  -d \'' + BODY.replace(/\n/g, '\n  ') + '\'',
      json: BODY
    };
    function render(text) { return highlight(text.replace(/[⟦⟧]/g, '')).replace(/(ada@example\.com|203\.0\.113\.7)/g, '<span class="x" data-x>$1</span>'); }
    var code = qs('[data-code]', root), go = qs('[data-go]', root), fail = qs('[data-fail]', root);
    var resp = qs('[data-resp]', root), stored = qs('[data-stored]', root), rb = qs('[data-rb]', root), sb = qs('[data-sb]', root);
    var sinks = { s3: qs('[data-sink="s3"]', root), dd: qs('[data-sink="dd"]', root), elk: qs('[data-sink="elk"]', root) };
    var timers = [];
    function T(f, ms) { timers.push(setTimeout(f, reduce ? Math.min(ms, 50) : ms)); }
    function show(l) { code.innerHTML = render(CODE[l]); }
    function setS(k, cls, txt, replay) {
      var e = sinks[k]; e.className = 'L64M_sink ' + cls;
      var t = qs('.stt', e); t.textContent = txt;
      if (replay) { var b = document.createElement('button'); b.type = 'button'; b.className = 'L64M_rp'; b.textContent = 'Replay'; b.addEventListener('click', replay); t.appendChild(b); }
    }
    function reset() {
      timers.forEach(clearTimeout); timers = [];
      ['s3', 'dd', 'elk'].forEach(function (k) { setS(k, '', 'idle'); });
      resp.innerHTML = '<span class="idle">Send an event to see the response.</span>';
      stored.innerHTML = '<span class="idle">Sensitive fields are masked before anything is stored.</span>';
      rb.textContent = 'waiting'; rb.className = 'L64M_badge'; sb.textContent = 'none yet'; sb.className = 'L64M_badge';
      go.disabled = false; go.textContent = 'Send event';
    }
    show('curl');
    qsa('[data-lang]', root).forEach(function (b) {
      b.addEventListener('click', function () {
        qsa('[data-lang]', root).forEach(function (x) { x.setAttribute('aria-selected', x === b ? 'true' : 'false'); });
        show(b.getAttribute('data-lang')); reset();
      });
    });
    function done() { go.disabled = false; go.textContent = 'Send again'; }
    go.addEventListener('click', function () {
      reset(); go.disabled = true; go.textContent = 'Sending…';
      var willFail = fail.checked;
      qsa('[data-x]', root).forEach(function (x) { x.classList.add('done'); });
      T(function () { rb.textContent = '200 OK'; rb.className = 'L64M_badge ok'; resp.textContent = 'X-Audit-Event-Id: fedcba98-7654-3210-fedc-ba9876543210\nX-Audit-Received-At: 2025-11-30T10:15:30Z'; }, 450);
      T(function () { sb.textContent = 'redacted'; sb.className = 'L64M_badge ok'; stored.innerHTML = highlight('{\n  "eventType": "order.shipped",\n  "extra": {\n    "orderRef": "ORD-4711",\n    "customerEmail": "[REDACTED]",\n    "ipAddress": "[REDACTED]"\n  }\n}').replace(/&quot;\[REDACTED\]&quot;|"\[REDACTED\]"/g, '<span class="x done">"[REDACTED]"</span>'); }, 900);
      ['s3', 'dd', 'elk'].forEach(function (k) { T(function () { setS(k, 'run', 'delivering'); }, 1200); });
      T(function () { setS('s3', 'ok', 'delivered · 41 ms'); }, 1900);
      T(function () { setS('dd', 'ok', 'delivered · 63 ms'); }, 2300);
      if (!willFail) {
        T(function () { setS('elk', 'ok', 'delivered · 88 ms'); done(); }, 2700);
      } else {
        T(function () { setS('elk', 'run', 'retry 1 of 5'); }, 2500);
        T(function () { setS('elk', 'run', 'retry 2 of 5'); }, 3300);
        T(function () {
          setS('elk', 'bad', 'parked in dead-letter queue', function () {
            setS('elk', 'run', 'replaying');
            T(function () { setS('elk', 'ok', 'delivered · 94 ms'); done(); }, 1100);
          });
          done();
        }, 4200);
      }
    });
  }

  /* ---------- C: follow a request ---------- */
  function initPath(root) {
    var STEPS = [
      { t: 'Your app', x: 'Calls a module API with a bearer token. Every request, whichever module it targets, crosses the same edge first.', c: 'POST /api/v1/payments', l: '/architecture/', ln: 'The request path below →' },
      { t: 'Auth Gateway', x: 'Traefik forwards the request here first. The gateway verifies the OIDC / JWT token and asks the central Cerbos PDP for the decision. On success it sets the trusted headers, and routes without a known policy fail closed.', c: 'X-Auth-User · X-Auth-Scopes · X-Auth-Tenant · X-Request-ID', l: '/products/auth-gateway/', ln: 'About Auth Gateway →' },
      { t: 'Payment Gateway', x: 'Creates the payment and executes it with the provider you configured, behind one API. Payment lifecycle events can be published to AuditFlow.', c: 'POST /api/v1/payments/{paymentId}/pay', l: '/products/payment-gateway/', ln: 'About Payment Gateway →' },
      { t: 'AuditFlow', x: 'Accepts the event with a single REST call and answers once its message broker (RabbitMQ or Amazon SQS) has stored it. Routing and delivery to the sinks then happen asynchronously.', c: 'POST /api/v1/audit/publish · 200', l: '/products/auditflow/', ln: 'About AuditFlow →' },
      { t: 'Reporting', x: 'Later, reports and metrics run over the events AuditFlow delivered. Each caller sees only their own tenant.', c: 'POST /metrics/query', l: '/products/reporting/', ln: 'About Reporting →' }
    ];
    var nodes = qsa('[data-step]', root), rows = qsa('[data-row]', root), nav = qs('.L64M_path_nodes', root);
    var title = qs('[data-title]', root), text = qs('[data-text]', root), call = qs('[data-call]', root), link = qs('[data-link]', root);
    var run = qs('[data-run]', root), timers = [];
    function set(i) {
      var s = STEPS[i];
      title.textContent = s.t; text.textContent = s.x; call.textContent = s.c; link.setAttribute('href', s.l); link.textContent = s.ln;
      nodes.forEach(function (n, k) {
        n.setAttribute('aria-pressed', k === i ? 'true' : 'false');
        n.classList.toggle('is-done', k < i && k < 4);
      });
      nav.style.setProperty('--p', String(Math.min(i, 3) / 4));
      rows.forEach(function (r) { r.classList.toggle('is-on', Number(r.getAttribute('data-row')) <= Math.min(i, 3)); });
    }
    function stop() { timers.forEach(clearTimeout); timers = []; run.disabled = false; run.textContent = 'Send again'; }
    nodes.forEach(function (n, i) { n.addEventListener('click', function () { stop(); run.textContent = 'Send a request'; set(i); }); });
    run.addEventListener('click', function () {
      timers.forEach(clearTimeout); timers = [];
      run.disabled = true; run.textContent = 'Sending…';
      rows.forEach(function (r) { r.classList.remove('is-on'); });
      set(0);
      [1, 2, 3].forEach(function (i) { timers.push(setTimeout(function () { set(i); if (i === 3) { run.disabled = false; run.textContent = 'Send again'; } }, reduce ? 0 : i * 1100)); });
    });
    rows.forEach(function (r) { r.classList.remove('is-on'); });
    set(0);
  }

  /* ---------- whitelabel swatches ---------- */
  function initTheme(root) {
    var card = qs('[data-theme-preview]', root), btns = qsa('[data-a]', root);
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        card.style.setProperty('--a', b.getAttribute('data-a'));
        card.style.setProperty('--b', b.getAttribute('data-b'));
        card.style.setProperty('--t', b.getAttribute('data-t'));
      });
    });
  }

  /* ---------- zig-zag widgets ---------- */
  function seen(el, fn) {
    if (!('IntersectionObserver' in window)) { fn(); return; }
    var io = new IntersectionObserver(function (e) { if (e[0].isIntersecting) { io.disconnect(); fn(); } }, { threshold: 0.35 });
    io.observe(el);
  }

  function initCloud(root) {
    var pods = qs('[data-pods]', root), n = 3, steps = qsa('[data-s]', root), nEl = qs('[data-n]', root), timers = [];
    function draw(state) {
      pods.innerHTML = '';
      for (var i = 0; i < n; i++) {
        var d = document.createElement('div'); d.className = 'L64M_pod ' + (state || 'run');
        d.innerHTML = '<i></i>pod-' + (i + 1); pods.appendChild(d);
      }
      nEl.textContent = n;
    }
    function sync() {
      timers.forEach(clearTimeout); timers = [];
      steps.forEach(function (s) { s.classList.remove('on'); });
      draw('pend');
      [0, 1, 2].forEach(function (i) { timers.push(setTimeout(function () { steps.forEach(function (s, k) { s.classList.toggle('on', k === i); }); }, reduce ? 0 : i * 700)); });
      timers.push(setTimeout(function () { draw('run'); }, reduce ? 0 : 2100));
    }
    qs('[data-sync]', root).addEventListener('click', sync);
    qs('[data-inc]', root).addEventListener('click', function () { if (n < 5) { n++; sync(); } });
    qs('[data-dec]', root).addEventListener('click', function () { if (n > 1) { n--; sync(); } });
    draw('run'); steps[2].classList.add('on');
  }

  function initContract(root) {
    var GEN = {
      java: [['Spring Boot service', 'server stubs from the contract', 'high-performance transactions'], ['Typed client', 'for other Java services', 'same contract']],
      py: [['FastAPI integration', 'server or client from the contract', 'flexible integrations'], ['Scripts and plugins', 'call the same API', 'same contract']],
      vue: [['Vue 3 app', 'typed API client', 'reactive UIs'], ['Mock server', 'build the UI before the backend', 'same contract']]
    };
    var out = qs('[data-gen]', root), pulse = qs('.L64M_pulse', root), tabs = qsa('[data-k]', root);
    highlightAll(root);
    function show(k) {
      out.innerHTML = GEN[k].map(function (r, i) { return '<div class="rw" style="animation-delay:' + (i * 90) + 'ms"><b>' + esc(r[0]) + '</b><small>' + esc(r[1]) + '</small></div>'; }).join('');
      pulse.classList.remove('go'); void pulse.offsetWidth; if (!reduce) { pulse.classList.add('go'); }
    }
    tabs.forEach(function (t) { t.addEventListener('click', function () { tabs.forEach(function (x) { x.setAttribute('aria-selected', x === t ? 'true' : 'false'); }); show(t.getAttribute('data-k')); }); });
    show('java');
  }

  function initObserve(root) {
    var tabs = qsa('[data-k]', root), views = qsa('[data-view]', root), logs = qs('[data-logs]', root);
    var LINES = [['INFO', 'checkout', 'order created', '07:35:20'], ['INFO', 'auth-gateway', 'token verified', '07:35:20'], ['INFO', 'payment-gateway', 'payment initiated', '07:35:21'], ['WARN', 'payment-gateway', 'provider slow, retrying', '07:35:22'], ['INFO', 'auditflow', 'event accepted', '07:35:23'], ['INFO', 'checkout', 'checkout completed', '07:35:24']];
    logs.innerHTML = LINES.map(function (l) { return '<div><span class="tm">' + l[3] + '</span> <span class="lv' + (l[0] === 'WARN' ? ' w' : '') + '">' + l[0] + '</span> ' + l[1] + ' · ' + l[2] + '</div>'; }).join('');
    function show(k) {
      views.forEach(function (v) { var on = v.getAttribute('data-view') === k; v.hidden = !on; v.classList.toggle('is-on', on); });
      tabs.forEach(function (x) { x.setAttribute('aria-selected', x.getAttribute('data-k') === k ? 'true' : 'false'); });
    }
    tabs.forEach(function (t) { t.addEventListener('click', function () { show(t.getAttribute('data-k')); }); });
    show('traces');
  }

  function initOpen(root) {
    var tabs = qsa('[data-k]', root), ee = qsa('[data-e="ee"]', root);
    function show(k) {
      tabs.forEach(function (x) { x.setAttribute('aria-selected', x.getAttribute('data-k') === k ? 'true' : 'false'); });
      ee.forEach(function (li, i) { li.hidden = k !== 'ee'; li.style.animationDelay = (i * 90) + 'ms'; });
    }
    tabs.forEach(function (t) { t.addEventListener('click', function () { show(t.getAttribute('data-k')); }); });
    show('ce');
  }

  function initEdge(root) {
    var btns = qsa('[data-k]', root), gates = qsa('[data-g]', root), out = qs('[data-out]', root), send = qs('[data-send]', root), kind = 'ok', timers = [];
    var RES = {
      ok: { stop: -1, text: '200 OK\nX-Auth-User: user-7f3a\nX-Auth-Scopes: purchase-order:write\nX-Auth-Tenant: V12345678\nX-Request-ID: 9c1f…' },
      none: { stop: 1, text: '401 Unauthorized\nno valid token, the request stops at the Auth Gateway' },
      scope: { stop: 2, text: '403 Forbidden\nCerbos policy denies this action' },
      route: { stop: 1, text: '403 Forbidden\nno matching policy: unknown routes fail closed' }
    };
    function clear() { gates.forEach(function (g) { g.className = ''; }); }
    function reset() { timers.forEach(clearTimeout); timers = []; clear(); out.innerHTML = '<span class="idle">Press Send to run the request.</span>'; send.disabled = false; send.textContent = 'Send'; }
    btns.forEach(function (b) { b.addEventListener('click', function () { kind = b.getAttribute('data-k'); btns.forEach(function (x) { x.setAttribute('aria-checked', x === b ? 'true' : 'false'); }); reset(); }); });
    send.addEventListener('click', function () {
      reset(); send.disabled = true; send.textContent = 'Sending…';
      var r = RES[kind], last = r.stop === -1 ? 3 : r.stop;
      gates.forEach(function (g, i) {
        timers.push(setTimeout(function () { g.className = 'run'; }, reduce ? 0 : i * 600));
        if (i <= last) { timers.push(setTimeout(function () { g.className = (i === r.stop) ? 'stop' : 'pass'; }, reduce ? 0 : i * 600 + 450)); }
      });
      timers.push(setTimeout(function () { gates.forEach(function (g, i) { if (i > last) { g.className = ''; } }); out.textContent = r.text; send.disabled = false; send.textContent = 'Send again'; }, reduce ? 0 : (last + 1) * 600 + 300));
    });
  }

  /* ---------- generic data-driven widgets (_data/widgets.yml) ---------- */
  function h(tag, cls, html) { var e = document.createElement(tag); if (cls) { e.className = cls; } if (html != null) { e.innerHTML = html; } return e; }

  function wxSteps(body, c) {
    var n = c.steps.length, cur = 0, timer = null;
    var ol = h('ol', 'L64M_flow3 L64M_flow3--x' + (c.ghost ? ' is-ghost' : '')); ol.style.setProperty('--n', n);
    c.steps.forEach(function (st, i) {
      var li = h('li', '', '<button type="button"><span class="ic">' + (i + 1) + '</span><span class="nm">' + esc(st.n) + '</span><span class="sb">' + esc(st.s || '') + '</span></button>');
      li.firstChild.addEventListener('click', function () { stop(); go(i); });
      ol.appendChild(li);
    });
    var det = h('div', 'L64M_stepd'); det.setAttribute('aria-live', 'polite');
    var ft = h('div', 'L64M_wd_ft');
    var play = h('button', 'L64M_btn L64M_btn--solid', 'Play'); play.type = 'button';
    ft.appendChild(play);
    body.appendChild(ol); body.appendChild(det); body.appendChild(ft);
    function go(i) {
      cur = i;
      qsa('li', ol).forEach(function (li, k) { li.classList.toggle('on', k === i); li.classList.toggle('done', k < i); });
      ol.style.setProperty('--p', n > 1 ? String(i / (n - 1)) : '0');
      var st = c.steps[i];
      det.innerHTML = '<p>' + esc(st.d) + '</p>' + (st.code ? '<pre class="L64M_code L64M_code--sm" data-hl><code>' + highlight(st.code) + '</code></pre>' : '');
    }
    function stop() { clearInterval(timer); timer = null; play.textContent = 'Play'; }
    play.addEventListener('click', function () {
      if (timer) { stop(); return; }
      play.textContent = 'Pause'; if (cur >= n - 1) { go(0); }
      timer = setInterval(function () { if (cur >= n - 1) { stop(); play.textContent = 'Replay'; return; } go(cur + 1); }, reduce ? 200 : 1300);
    });
    go(0);
  }

  function wxTabs(body, c) {
    var seg = h('div', 'L64M_seg L64M_seg--wrap'), out = h('div', 'L64M_gen L64M_gen--x'); out.setAttribute('aria-live', 'polite');
    seg.setAttribute('role', 'tablist');
    c.tabs.forEach(function (t, i) {
      var b = h('button', '', esc(t.n)); b.type = 'button'; b.setAttribute('role', 'tab'); b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      b.addEventListener('click', function () { qsa('button', seg).forEach(function (x) { x.setAttribute('aria-selected', x === b ? 'true' : 'false'); }); show(i); });
      seg.appendChild(b);
    });
    body.appendChild(seg); body.appendChild(out);
    function show(i) {
      var t = c.tabs[i], html = (t.rows || []).map(function (r, k) {
        return '<div class="rw' + (r.off ? ' off' : '') + '" style="animation-delay:' + (k * 70) + 'ms"><b>' + esc(r.h) + '</b><span>' + esc(r.t) + '</span>' + (r.tag ? '<small class="tg">' + esc(r.tag) + '</small>' : '') + '</div>';
      }).join('');
      if (t.code) { html += '<pre class="L64M_code L64M_code--sm" data-hl><code>' + highlight(t.code) + '</code></pre>'; }
      out.innerHTML = html;
    }
    show(0);
  }

  function wxTry(body, c) {
    var seg = h('div', 'L64M_seg L64M_seg--wrap'), gate = h('ol', 'L64M_gate'), out = h('pre', 'L64M_dd L64M_edge_out', '<span class="idle">Press Send to run it.</span>');
    var ft = h('div', 'L64M_wd_ft'), send = h('button', 'L64M_btn L64M_btn--solid', 'Send'), kind = 0, timers = [];
    seg.setAttribute('role', 'radiogroup'); send.type = 'button'; out.setAttribute('aria-live', 'polite');
    c.nodes.forEach(function (nm) { gate.appendChild(h('li', '', '<span class="dot"></span><span class="nm">' + esc(nm) + '</span>')); });
    c.options.forEach(function (o, i) {
      var b = h('button', '', esc(o.n)); b.type = 'button'; b.setAttribute('role', 'radio'); b.setAttribute('aria-checked', i === 0 ? 'true' : 'false');
      b.addEventListener('click', function () { kind = i; qsa('button', seg).forEach(function (x) { x.setAttribute('aria-checked', x === b ? 'true' : 'false'); }); reset(); });
      seg.appendChild(b);
    });
    ft.appendChild(send);
    [seg, gate, out, ft].forEach(function (e) { body.appendChild(e); });
    var lis = qsa('li', gate);
    function reset() { timers.forEach(clearTimeout); timers = []; lis.forEach(function (l) { l.className = ''; }); out.innerHTML = '<span class="idle">Press Send to run it.</span>'; send.disabled = false; send.textContent = 'Send'; }
    send.addEventListener('click', function () {
      reset(); send.disabled = true; send.textContent = 'Sending…';
      var o = c.options[kind];
      lis.forEach(function (l, i) {
        var st = o.states[i] || '';
        if (!st) { return; }
        timers.push(setTimeout(function () { l.className = 'run'; }, reduce ? 0 : i * 550));
        timers.push(setTimeout(function () { l.className = st === 'stop' ? 'stop' : (st === 'dup' ? 'dup' : 'pass'); }, reduce ? 0 : i * 550 + 400));
      });
      timers.push(setTimeout(function () { out.textContent = o.r; send.disabled = false; send.textContent = 'Send again'; }, reduce ? 0 : lis.length * 550 + 300));
    });
  }

  function wxPods(body, c) {
    var grid = h('div', 'L64M_pods L64M_pods--x'), info = h('div', 'L64M_wx_info'), note = h('p', 'L64M_cap', esc(c.note));
    note.style.margin = '12px 0 0'; note.style.textAlign = 'left';
    var ctl = h('div', 'L64M_wd_ft');
    body.appendChild(grid); body.appendChild(info); body.appendChild(ctl); body.appendChild(note);
    if (c.mode === 'heal') {
      var pods = [1, 2, 3, 4].map(function () { return 'run'; });
      var draw = function () {
        grid.innerHTML = '';
        pods.forEach(function (st, i) {
          var b = h('button', 'L64M_pod ' + st, '<i></i>pod-' + (i + 1) + '<small>' + ({ run: 'Running', down: 'Crashed', pend: 'Restarting' })[st] + '</small>'); b.type = 'button';
          b.addEventListener('click', function () {
            if (pods[i] !== 'run') { return; }
            pods[i] = 'down'; draw();
            setTimeout(function () { pods[i] = 'pend'; draw(); }, reduce ? 0 : 900);
            setTimeout(function () { pods[i] = 'run'; draw(); }, reduce ? 0 : 2200);
          });
          grid.appendChild(b);
        });
        var up = pods.filter(function (p) { return p === 'run'; }).length;
        info.innerHTML = 'Serving traffic from <b>' + up + ' of ' + pods.length + '</b> pods';
      };
      draw();
    } else {
      var lab = h('label', 'L64M_range', '<span>Load</span><input type="range" min="1" max="100" value="20"><b>20%</b>');
      var r = qs('input', lab), out = qs('b', lab);
      ctl.appendChild(lab);
      var render = function () {
        var load = Number(r.value), n = Math.max(1, Math.min(5, Math.ceil(load / 20)));
        out.textContent = load + '%';
        grid.innerHTML = ''; for (var i = 0; i < 5; i++) { grid.appendChild(h('div', 'L64M_pod ' + (i < n ? 'run' : 'off'), '<i></i>pod-' + (i + 1) + '<small>' + (i < n ? 'Running' : 'not needed') + '</small>')); }
        info.innerHTML = 'Autoscaler runs <b>' + n + ' instance' + (n > 1 ? 's' : '') + '</b> for this load';
      };
      r.addEventListener('input', render); render();
    }
  }

  function wxFanout(body, c) {
    var src = h('div', 'L64M_fo_src', '<span>' + esc(c.source) + '</span>' + (c.hub ? '<em>' + esc(c.hub) + '</em>' : '')), list = h('div', 'L64M_fo_list'), ft = h('div', 'L64M_wd_ft');
    var send = h('button', 'L64M_btn L64M_btn--solid', 'Send'), add = h('button', 'L64M_btn', esc(c.addLabel || 'Add')), added = false;
    send.type = 'button'; add.type = 'button';
    var items = c.targets.map(function (t) { return { n: t.n, s: t.s, on: t.on !== false }; });
    function draw() {
      list.innerHTML = '';
      items.forEach(function (it, i) {
        var row = h('label', 'L64M_fo_row' + (it.on ? ' on' : '') + (it.fresh ? ' fresh' : ''), '<input type="checkbox"' + (it.on ? ' checked' : '') + '><span class="nm">' + esc(it.n) + '</span><span class="sb">' + esc(it.s) + '</span><span class="st">' + (it.on ? 'on' : 'off') + '</span>');
        qs('input', row).addEventListener('change', function (e) { it.on = e.target.checked; it.fresh = false; draw(); });
        list.appendChild(row);
      });
    }
    send.addEventListener('click', function () {
      qsa('.L64M_fo_row', list).forEach(function (r, i) { r.classList.remove('hit'); void r.offsetWidth; if (r.classList.contains('on')) { setTimeout(function () { r.classList.add('hit'); }, reduce ? 0 : i * 250); } });
    });
    add.addEventListener('click', function () { if (added) { return; } added = true; items.push({ n: c.add.n, s: c.add.s, on: true, fresh: true }); add.disabled = true; draw(); });
    ft.appendChild(add); ft.appendChild(send);
    body.appendChild(src); body.appendChild(list); body.appendChild(ft);
    if (c.note) { var np = h('p', 'L64M_cap', esc(c.note)); np.style.margin = '12px 0 0'; np.style.textAlign = 'left'; body.appendChild(np); }
    draw();
  }

  function wxRedact(body) {
    var pre = h('pre', 'L64M_code L64M_code--sm'), st = h('p', 'L64M_wx_status', 'Not published yet.'), ft = h('div', 'L64M_wd_ft');
    var pub = h('button', 'L64M_btn L64M_btn--solid', 'Publish'), again = h('button', 'L64M_btn', 'Publish again, same eventId'), redacted = false;
    pub.type = 'button'; again.type = 'button'; again.disabled = true;
    function draw() {
      var e = redacted ? '<span class="x done">"[REDACTED]"</span>' : '<span class="x">"ada@example.com"</span>', ip = redacted ? '<span class="x done">"[REDACTED]"</span>' : '<span class="x">"203.0.113.7"</span>';
      pre.innerHTML = '{\n  <span class="t-k">"eventId"</span>: <span class="t-s">"fedcba98-…"</span>,\n  <span class="t-k">"eventType"</span>: <span class="t-s">"order.shipped"</span>,\n  <span class="t-k">"extra"</span>: {\n    <span class="t-k">"customerEmail"</span>: ' + e + ',\n    <span class="t-k">"ipAddress"</span>: ' + ip + '\n  }\n}';
    }
    pub.addEventListener('click', function () { redacted = true; draw(); st.textContent = 'Published. Sensitive fields were masked before anything was stored.'; again.disabled = false; pub.textContent = 'Reset'; pub.onclick = function () { redacted = false; draw(); st.textContent = 'Not published yet.'; again.disabled = true; pub.textContent = 'Publish'; pub.onclick = null; }; });
    again.addEventListener('click', function () { st.textContent = 'Same eventId seen again: processed at most once, so the retry is safe.'; });
    ft.appendChild(pub); ft.appendChild(again);
    [pre, st, ft].forEach(function (e) { body.appendChild(e); });
    draw();
  }

  function wxToken(body) {
    var LIFE = 20, left = LIFE, timer = null, decoded = false;
    var tok = h('div', 'L64M_tok2'), claims = h('pre', 'L64M_code L64M_code--sm'), bar = h('div', 'L64M_ttl', '<i></i>'), st = h('p', 'L64M_wx_status'), ft = h('div', 'L64M_wd_ft');
    var dec = h('button', 'L64M_btn', 'Decode'), fresh = h('button', 'L64M_btn L64M_btn--solid', 'Get a new token');
    dec.type = 'button'; fresh.type = 'button';
    function draw() {
      tok.innerHTML = '<span class="a">eyJhbGciOiJSUzI1NiJ9</span>.<span class="b">eyJzdWIiOiJ1c2VyLTdmM2EifQ</span>.<span class="c">c2lnbmF0dXJl</span>';
      claims.hidden = !decoded;
      claims.innerHTML = highlight('header:  { "alg": "RS256" }\npayload: { "sub": "user-7f3a",\n           "scope": "purchase-order:write",\n           "exp": "short-lived" }');
      dec.textContent = decoded ? 'Hide claims' : 'Decode';
      qs('i', bar).style.width = (left / LIFE * 100) + '%';
      st.textContent = left > 0 ? 'Valid for ' + left + ' s (sample lifetime). Any module can verify it without a session lookup.' : 'Expired: the request is rejected with 401. Get a new token.';
      bar.classList.toggle('gone', left <= 0);
    }
    function tick() { if (left > 0) { left--; draw(); } else { clearInterval(timer); timer = null; } }
    function start() { clearInterval(timer); left = LIFE; draw(); if (!reduce) { timer = setInterval(tick, 1000); } }
    dec.addEventListener('click', function () { decoded = !decoded; draw(); });
    fresh.addEventListener('click', start);
    ft.appendChild(dec); ft.appendChild(fresh);
    [tok, claims, bar, st, ft].forEach(function (e) { body.appendChild(e); });
    start();
  }

  function wxOtel(body) {
    var on = true, sw = h('label', 'L64M_toggle', '<input type="checkbox" checked><span class="trk"></span><span>OpenTelemetry Java Agent</span>'), out = h('div', 'L64M_obs L64M_obs--x');
    var rows = [['auth-gateway', 0, 14], ['checkout', 14, 72], ['payment-gateway', 30, 40], ['auditflow', 72, 24]];
    var cap = h('p', 'L64M_cap', 'The same container image runs with or without it. It is switched by deployment configuration only.'); cap.style.textAlign = 'left'; cap.style.marginTop = '12px';
    body.appendChild(sw); body.appendChild(out); body.appendChild(cap);
    function draw() {
      out.innerHTML = on ? rows.map(function (r, i) { return '<div class="L64M_sp is-on"><span>' + r[0] + '</span><div><i' + (i === 3 ? ' class="e"' : '') + ' style="--l:' + r[1] + '%;--w:' + r[2] + '%"></i></div></div>'; }).join('') : '<div class="L64M_obs_empty">No spans. The agent is off, so nothing is traced.</div>';
    }
    qs('input', sw).addEventListener('change', function (e) { on = e.target.checked; draw(); });
    draw();
  }

  function wxDeploy(body, c, mods) {
    var list = h('div', 'L64M_dep_list'), out = h('div', 'L64M_dep_out'), picked = {};
    mods.forEach(function (m, i) {
      var l = h('label', 'L64M_dep_row', '<input type="checkbox"><span>' + esc(m) + '</span>');
      qs('input', l).addEventListener('change', function (e) { picked[m] = e.target.checked; draw(); });
      list.appendChild(l);
    });
    body.appendChild(list); body.appendChild(out);
    function draw() {
      var names = mods.filter(function (m) { return picked[m]; });
      out.innerHTML = names.length ? names.map(function (m) { return '<span class="L64M_pod run"><i></i>' + esc(m) + '</span>'; }).join('') + '<p>' + names.length + ' of ' + mods.length + ' modules deployed. Nothing else runs.</p>' : '<p class="idle">Tick a module to deploy it. Only what you pick runs.</p>';
    }
    draw();
  }

  function wxFit(body, c) {
    var list = h('div', 'L64M_fit_list'), out = h('div', 'L64M_fit_out'); out.setAttribute('aria-live', 'polite');
    var boxes = c.needs.map(function (n, i) {
      var l = h('label', 'L64M_need', '<input type="checkbox"' + (i === 0 ? ' checked' : '') + '><span>' + esc(n.label) + '</span>');
      qs('input', l).addEventListener('change', draw); list.appendChild(l); return qs('input', l);
    });
    body.appendChild(list); body.appendChild(out);
    function draw() {
      var picked = c.needs.filter(function (n, i) { return boxes[i].checked; });
      if (!picked.length) { out.innerHTML = '<p class="idle">Tick what matters to you.</p>'; return; }
      var ee = picked.some(function (n) { return n.ee; });
      out.innerHTML = '<b class="' + (ee ? 'ee' : 'ce') + '">' + (ee ? 'Enterprise Edition fits.' : 'Community Edition covers this.') + '</b><ul>' + picked.map(function (n) { return '<li' + (n.ee ? ' class="ee"' : '') + '>' + esc(n.why) + '</li>'; }).join('') + '</ul>' + (ee ? '<p>You can mix editions and upgrade specific modules later.</p>' : '');
    }
    draw();
  }

  function initWx(root) {
    var c, mods = [];
    try { c = JSON.parse(root.getAttribute('data-cfg')); mods = JSON.parse(root.getAttribute('data-mods') || '[]'); } catch (e) { return; }
    var body = qs('.L64M_wx_body', root);
    var m = { steps: wxSteps, tabs: wxTabs, 'try': wxTry, pods: wxPods, fanout: wxFanout, redact: wxRedact, token: wxToken, otel: wxOtel, deploy: wxDeploy, fit: wxFit }[c.type];
    if (m) { m(body, c, mods); }
  }

  /* ---------- home: iceberg ---------- */
  function initIceberg(root) {
    var tabs = qsa('[role="tab"]', root), panels = qsa('[role="tabpanel"]', root), zones = qsa('.zone', root);
    function show(id) {
      tabs.forEach(function (t) { t.setAttribute('aria-selected', t.getAttribute('data-zone') === id ? 'true' : 'false'); });
      panels.forEach(function (p) { p.hidden = p.id !== 'ib-panel-' + id; });
      zones.forEach(function (z) { z.classList.toggle('is-on', z.getAttribute('data-zone') === id); });
    }
    tabs.forEach(function (t) { t.addEventListener('click', function () { show(t.getAttribute('data-zone')); }); });
    zones.forEach(function (z) { z.addEventListener('click', function () { show(z.getAttribute('data-zone')); }); });
    show(tabs[0].getAttribute('data-zone'));
  }

  function boot() {
    qsa('[data-l64-explorer]').forEach(initExplorer);
    qsa('[data-l64-iceberg]').forEach(initIceberg);
    qsa('[data-l64-demo]').forEach(initDemo);
    qsa('[data-l64-path]').forEach(initPath);
    qsa('[data-l64-wx]').forEach(initWx);
    qsa('[data-l64-cloud]').forEach(initCloud);
    qsa('[data-l64-contract]').forEach(initContract);
    qsa('[data-l64-observe]').forEach(initObserve);
    qsa('[data-l64-open]').forEach(initOpen);
    qsa('[data-l64-edge]').forEach(initEdge);
    qsa('[data-l64-theme]').forEach(initTheme);
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', boot); } else { boot(); }
}());
