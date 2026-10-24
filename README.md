# Labs64.IO :: Website

**labs64.io: the home of the Labs64.IO Ecosystem.**
*Part of the [Labs64.IO Ecosystem](https://labs64.io): positioning, product pages and the blog; technical documentation lives at labs64.io/docs.*

[![CI](https://github.com/Labs64/labs64.io/actions/workflows/labs64io-ci.yml/badge.svg)](https://github.com/Labs64/labs64.io/actions/workflows/labs64io-ci.yml)
[![Website](https://img.shields.io/badge/Website-labs64.io-E14817.svg)](https://labs64.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![📖 Documentation](https://img.shields.io/badge/📖-Documentation-AB6543.svg)](https://labs64.io/docs/)

<p align="center"><img src="docs/assets/website-hero.svg" alt="Website: The Labs64.IO Ecosystem at the centre with modules orbiting by maturity: AuditFlow and Auth Gateway in beta, Checkout, Payment Gateway and Customer Portal in alpha, Invoicing and AI &amp; MCP Gateway further out." width="880"></p>

[Why Website?](#why-website) · [Documentation](https://labs64.io/docs/) · [Build and test](#build-and-test) · [Ecosystem](#the-labs64io-ecosystem) · [labs64.io](https://labs64.io)

> [!NOTE]
> Module status, version and display name live only in `_data/modules.yml`. Never hand-write them into a page or the navigation.

## Why Website?

This repository is the public face of the platform: what it is, who it is for and where to start. It deliberately carries no onboarding steps, so there is exactly one place to keep those correct.

1. **Positioning, not procedures.** Product pages explain value and link to the docs for how.
2. **One source of truth for modules.** `_data/modules.yml` renders every status and name on the site.
3. **Readable by machines.** `llms.txt`, a sitemap and a feed are maintained with the content.

**A good fit if**

- You want to fix or improve the website copy, blog or product pages.
- You are adding a module and need it to appear in the catalogue.

**Probably not what you need if**

- You want to run, configure or integrate a module: the [documentation](https://labs64.io/docs/) is the source for that.

## Documentation

Looking for install steps, configuration or API reference? Everything technical lives in the **[documentation](https://labs64.io/docs/)**, deliberately not here. Start with the [Quickstart](https://labs64.io/docs/getting-started/quickstart.html).

## Build and test

```bash
just serve           # preview at http://localhost:4000 (Docker)
just build           # one-off production build
just permalink-check # legacy permalinks still resolve
```

Needs Docker. Posts are Markdown files in `_posts/` named `YYYY-MM-DD-slug.md`. The content guardrails, the redirect rules and the verification checklist are in `AGENTS.md`. Working on the code with an AI agent? [`AGENTS.md`](AGENTS.md) and [`CLAUDE.md`](CLAUDE.md) describe the layout, conventions and checks.

## The Labs64.IO Ecosystem

This repository is part of the [Labs64.IO Ecosystem](https://labs64.io): open-source building blocks for secure commerce platforms. Every module is documented at [labs64.io/docs](https://labs64.io/docs/).

| Module | What it does |
|---|---|
| [**AuditFlow**](https://github.com/Labs64/labs64.io-auditflow) | Publish once, route anywhere, lose nothing |
| [**Auth Gateway**](https://github.com/Labs64/labs64.io-authproxy) | One authenticated edge for every module |
| [**Payment Gateway**](https://github.com/Labs64/labs64.io-payment-gateway) | One API across multiple payment providers |
| [**Checkout**](https://github.com/Labs64/labs64.io-checkout) | Whitelabel checkout and order workflow |
| [**Customer Portal**](https://github.com/Labs64/labs64.io-customer-portal) | Self-service portal for your customers |

Built on [Commons](https://github.com/Labs64/labs64.io-commons), deployed with [Helm Charts](https://github.com/Labs64/labs64.io-helm-charts), developed in the [Workspace](https://github.com/Labs64/labs64.io-workspace), verified by [Tests](https://github.com/Labs64/labs64.io-tests) and documented in [Docs](https://github.com/Labs64/labs64.io-docs). Also from Labs64: [NetLicensing](https://netlicensing.io) for licensing-as-a-service and [GuideChimp](https://www.labs64.com/guidechimp/) for guided product tours.

## Contributing

We would love your help. Blog posts and corrections to product pages are the usual changes. Fork the repository, make your change on a branch, run the checks described in [`AGENTS.md`](AGENTS.md) and open a pull request. Not sure whether an idea fits? Open an issue first.

## License

Following files, directories and their contents are copyright Labs64. You may not reuse anything therein without permission: `_drafts/`, `_posts/`, `img/`, `pages/`, `resources/`. All other files and directories are licensed under the [MIT License](LICENSE) unless explicitly stated.

---

<p align="center">
  <a href="https://labs64.io"><img alt="Labs64.IO" src="https://labs64.io/docs/assets/images/labs64-logo.png" width="110"></a><br>
  <sub>Made by the <a href="https://labs64.io">Labs64</a> team and community.</sub>
</p>
