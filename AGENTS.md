Operational guide for Claude Code when working in the `labs64.io` repository.

## 1) Mission and Scope
Use this repository to maintain the Labs64.IO marketing/docs website (Jekyll), including:
- Content updates (homepage, blog posts, metadata, navigation)
- Local development workflows (Docker-first)
- Quality checks before merge/deploy
- Ongoing maintenance of links, sitemap, and data files

Primary goals:
- Preserve canonical URLs and SEO continuity
- Keep content accurate with Labs64.IO positioning
- Avoid regressions in generated pages and metadata

## 2) Source of Truth
When information conflicts, prefer this order:
1. Live canonical website intent and legal pages (`https://labs64.io`, linked legal pages)
2. Repository configuration and data (`_config.yml`, `_data/*.yml`)
3. Existing content pages and blog posts
4. Legacy redirect files (`*_301.md`) only for backward compatibility

## 3) Repository Layout (What to Edit)
- `index.md`: homepage content
- `blog/index.html`: blog listing and pagination UI
- `_posts/*.md`: canonical blog posts
- `_posts/*_301.md`: legacy redirect stubs for old no-trailing-slash URLs
- `_data/navigation.yml`: top navigation links
- `_data/services.yml`: footer links grouped by section
- `_data/images.yml`: image attribution/credits map
- `_includes/*.html`: shared templates/partials
- `_layouts/*.html`: page templates
- `_config.yml`: production site config and metadata
- `_config_dev.yml`: local override config
- `llms.txt`: machine-readable context for LLM/agent consumers

Do not edit generated output:
- `_site/` is build output and should not be committed

## 4) Content Guardrails
- Keep Labs64.IO positioning consistent: API-first, modular, open-core, agentic-ready ecosystem.
- Prefer modular recommendations over all-at-once adoption in strategic content.
- Default to GDPR-aware language for data handling and compliance contexts.
- Use concise, factual technical claims; avoid unverifiable promises.
- Preserve existing permalink strategy unless migration/redirect is explicitly requested.
- Module status, version, and known gaps live **only** in `_data/modules.yml`, rendered via `_includes/module-status.html` / `_includes/module-banner.html`. Never hand-edit a status, version, or module display name into a page or into `navigation.yml` — that creates a second source of truth that will drift.

Copyright and reuse constraints from repository guidance:
- Do not reuse contents from `_drafts/`, `_posts/`, `img/`, `pages/`, `resources/` outside permitted contexts without approval.
- Other files are MIT-licensed unless otherwise stated.

## 5) Blog Post Workflow
### 5.1 Create a post
Preferred: create file directly in `_posts/` named:
`YYYY-MM-DD-slug.md`

Alternative helper:
- `just new-post "Post Title"` creates a draft in `_drafts/`
- Review and adjust content
- `just publish "draft_filename.md"` moves it to `_posts/` with the current date

### 5.2 Front matter expectations
For published posts, include at least:
- `layout: post`
- `title`
- `description`
- `author.name` and optional `author.url`
- `image.url` (plus optional `image.hide`, `image.width`)
- `tags` list

Recommended extras:
- `sitemap.images` for major illustrations
- `canonical` when cross-posting or consolidating URLs

Caveat:
- Always review the front matter before publishing to ensure dates, slugs, and layouts are correct.

### 5.3 Redirect compatibility
For existing posts, this repository keeps redirect companions (`*_301.md`) that map legacy no-slash URLs to canonical trailing-slash URLs.

When adding a new canonical post, add a matching redirect file if the URL strategy requires backward compatibility:
- `layout: redirect`
- `permalink: /blog/.../slug` (no trailing slash)
- `redirect_to: /blog/.../slug/` (trailing slash)
- `sitemap.exclude: true`

Use `_layouts/redirect.html` conventions.

## 6) Images and Credits
- Blog thumbnail/hero images are referenced via post front matter `image.url`.
- Keep image credit metadata in `_data/images.yml` aligned with any newly added images.
- `credit-tracker.html` resolves display credit from `_data/images.yml` by `source` path.
- If adding a new image, add matching attribution entry to avoid missing credit text.

## 7) Local Development and Build
## 7.1 Docker-first (recommended)
Use Docker Compose from repo root:
```bash
cd labs64.io-website
docker compose up --build
```

Site endpoints in current config:
- `http://localhost:4000`
- LiveReload on `35729`

Stop:
```bash
docker compose down
```

Notes:
- `docker-compose.yml` serves with drafts/future posts and merged config (`_config.yml,_config_dev.yml`).
- `DOCKER_SETUP.md` references using `just serve` or `docker compose ...` directly.

## 7.2 Native Ruby toolchain — broken on this machine
The native Ruby toolchain is **not usable here**: `Gemfile.lock` pins `BUNDLED WITH 4.0.16`, and that bundler version is not installed (`bundle -v` fails with `Could not find 'bundler' (4.0.16)`). Do not attempt `bundle install` / `bundle exec` directly — **`bundle` must never be invoked directly** on this machine. All builds, doctor checks, and link-proofing go through Docker via the `just` recipes below.

## 8) Verification Checklist Before Commit
Run as applicable from repo root. All of these go through Docker via `just` — never invoke `bundle` directly.

1) Jekyll diagnostics:
```bash
just doctor
```

2) Build site:
```bash
just build
```

3) Banned marketing-claim scan:
```bash
just claim-check
```

4) Permalink regression check (every pre-existing permalink must still resolve; builds first):
```bash
just permalink-check
```

5) Optional link checking (can be noisy on external links):
```bash
just proofer
```

Manual checks:
- Homepage renders without Liquid/template errors
- Blog list pagination still works
- New/edited posts show hero image and metadata correctly
- Redirect pages resolve to canonical URL
- Navigation/footer links still valid

## 9) Deployment and Release Notes
This repository does not include an explicit CI/CD deployment workflow in the visible tree.

Until a dedicated pipeline is documented, treat deployment process as external and do not assume automatic publish behavior.

For safe release prep:
- Keep commits focused (content vs template vs config)
- Mention any URL/permalink changes in commit notes
- Include redirect additions/removals explicitly
- Report if deployment mechanism is unknown or out-of-band

## 10) Maintenance Playbook
Regular tasks:
- Keep `_data/navigation.yml` and `_data/services.yml` current with valid URLs
- Review `llms.txt` when strategic positioning or service catalog changes
- Ensure `robots.txt`, `sitemap.xml`, and `feed.xml` remain consistent with canonical URLs
- Prune stale references to removed pages and old campaign links
- Keep Docker/Jekyll/Bundler instructions in sync with actual scripts/files

## 11) Editing Rules for Claude Code
- Make minimal, targeted edits; avoid broad reformatting.
- Preserve existing style, Liquid patterns, and front matter conventions.
- Do not remove legacy redirects unless explicitly requested.
- Do not edit `_site/` outputs.
- Call out ambiguity instead of guessing (especially deployment behavior).
- If you detect unrelated unexpected file changes, pause and ask for direction.

## 12) Useful File References
- `README.md`
- `DOCKER_SETUP.md`
- `docker-compose.yml`
- `Dockerfile`
- `justfile`
- `_new_post.sh`
- `_layouts/post.html`
- `_layouts/redirect.html`
- `_includes/credit-tracker.html`
- `_config.yml`
- `_config_dev.yml`
- `llms.txt`
