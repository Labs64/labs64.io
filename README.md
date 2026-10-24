# Labs64.IO :: Website

**labs64.io: the home of the Labs64.IO Ecosystem.**
*Part of the [Labs64.IO Ecosystem](https://labs64.io): positioning, product pages and the blog; technical documentation lives at labs64.io/docs.*

[![CI](https://github.com/Labs64/labs64.io/actions/workflows/labs64io-ci.yml/badge.svg)](https://github.com/Labs64/labs64.io/actions/workflows/labs64io-ci.yml)
[![Website](https://img.shields.io/badge/Website-labs64.io-E14817.svg)](https://labs64.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![📖 Documentation](https://img.shields.io/badge/📖-Documentation-AB6543.svg)](https://labs64.io/docs/)

<p align="center"><img src="docs/assets/website-hero.svg" alt="Website: The Labs64.IO Ecosystem at the centre with modules orbiting by maturity: AuditFlow and Auth Gateway in beta, Checkout, Payment Gateway and Customer Portal in alpha, Invoicing and AI &amp; MCP Gateway further out." width="880"></p>

[**Get started**](https://labs64.io/docs/getting-started/) · [Features](#features) · [AI agents](#using-website-with-ai-agents) · [Ecosystem](#the-labs64io-ecosystem) · [Documentation](https://labs64.io/docs/) · [labs64.io](https://labs64.io)

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

## Features

- **Jekyll site**: posts, pages, blog pagination and a module catalogue.
- **Module catalogue**: status and names rendered from `_data/modules.yml`.
- **SEO continuity**: legacy permalinks kept with redirect stubs and a permalink regression check.
- **Machine-readable context**: `llms.txt`, sitemap and feed.
- **Docker-first**: serve, build and link-check without installing Ruby.

## Using Website with AI agents

The website tells agents what Labs64.IO is and where the authoritative pages are.

- **`llms.txt`.** A machine-readable summary of positioning and the service catalogue.
- **Facts are in one place.** Module status is data, not prose; an agent should read `_data/modules.yml` rather than infer it from a page.
- **Working on the site with an agent?** [`AGENTS.md`](AGENTS.md) and [`CLAUDE.md`](CLAUDE.md) describe guardrails and verification.

## The Labs64.IO Ecosystem

Website is one module of the [Labs64.IO Ecosystem](https://labs64.io); [every module is documented here](https://labs64.io/docs/).

| Module | What it does | Link |
|---|---|---|
| **AuditFlow** | Audit-event routing pipeline | [labs64.io-auditflow](https://github.com/Labs64/labs64.io-auditflow) |
| **API Gateway** | Authenticating, policy-enforcing edge for all modules | [labs64.io-authproxy](https://github.com/Labs64/labs64.io-authproxy) |
| **Payment Gateway** | One API over multiple payment providers | [labs64.io-payment-gateway](https://github.com/Labs64/labs64.io-payment-gateway) |
| **Checkout** | Embeddable, brandable checkout | [labs64.io-checkout](https://github.com/Labs64/labs64.io-checkout) |
| **Customer Portal** | Customer self-service UI | [labs64.io-customer-portal](https://github.com/Labs64/labs64.io-customer-portal) |
| **Commons** | Shared Java and Python libraries | [labs64.io-commons](https://github.com/Labs64/labs64.io-commons) |
| **Helm Charts** | Kubernetes deployment for every module | [labs64.io-helm-charts](https://github.com/Labs64/labs64.io-helm-charts) |
| **Workspace** | Dev container and multi-repo tooling | [labs64.io-workspace](https://github.com/Labs64/labs64.io-workspace) |
| **Tests** | Cross-module regression suite | [labs64.io-tests](https://github.com/Labs64/labs64.io-tests) |
| **Docs** | Published documentation | [labs64.io-docs](https://github.com/Labs64/labs64.io-docs) |
| **NetLicensing** | Licensing-as-a-Service: license and entitlement management | [netlicensing.io](https://netlicensing.io) |
| **GuideChimp** | Interactive guided product tours | [labs64.com/guidechimp](https://www.labs64.com/guidechimp/) |

## Contributing

We would love your help. Blog posts and corrections to product pages are the usual changes. Fork the repository, make your change on a branch, run the checks described in [`AGENTS.md`](AGENTS.md) and open a pull request. Not sure whether an idea fits? Open an issue first and we will talk it through; that is a perfectly good way to start.

## License

Following files, directories and their contents are copyright Labs64. You may not reuse anything therein without permission: `_drafts/`, `_posts/`, `img/`, `pages/`, `resources/`. All other files and directories are licensed under the [MIT License](LICENSE) unless explicitly stated.

---

<p align="center">
  <a href="https://labs64.io"><img alt="Labs64.IO" src="https://labs64.io/docs/assets/images/labs64-logo.png" width="110"></a><br>
  <sub>Made by the <a href="https://labs64.io">Labs64</a> team and community.</sub>
</p>
