---
layout: post
title: "Vibe-Coding GammaLedger: My Experiment in AI-Powered App Building"
description: "One trader’s journey from Excel burnout to building GammaLedger — an AI-assisted, open-source tool for smarter options portfolio tracking"
author:
  name: An Indie Dev Fueled by Curiosity (and ☕)
  url: https://gammaledger.com
image:
  url: https://raw.githubusercontent.com/r-brown/GammaLedger/refs/heads/main/assets/img/gammaledger-banner-03.png
tags:
  - internal
  - AI-Assisted Development
  - Indie Development
  - GitHub Copilot
  - Perplexity Labs
  - Options Trading
  - JavaScript
  - Financial Software
  - OFX
  - Software Engineering
  - AI Tools
  - Development Workflow
  - Agile Methodologies
  - Vibe-Coding
  - Coding Productivity
  - Developer Experience
  - User-Centric Design
  - Continuous Improvement
  - Open Source Development
  - Community Engagement
  - Financial Literacy
  - Options Trading Strategies
  - GammaLedger
  - Options Tracking
  - Options Trading
  - Options Analysis
  - Options Journal
  - Trade Tracking
  - Trading Journal
  - Portfolio Tracking
  - Performance Metrics
  - Trading Tech
  - Financial Analytics
  - Portfolio Management
  - Risk Management
  - Trading Analytics
  - Fintech
  - Options
  - StockMarket
  - Finance
  - Options Strategies
  - MultiLeg Strategies
  - Cash-Secured Puts
  - Wheel Strategy
  - PMCC
  - Iron Condor
  - Covered Calls
  - Credit Spreads
---

## The Genesis: From Spreadsheet Hell to Purposeful Architecture

Every trader has been there. You sit down with a spreadsheet, tracking your options positions across multiple brokers, manually calculating Greeks, rolling positions, and staring at walls of numbers trying to extract meaning. The moment arrives when you realize: *this is unsustainable*.

For me, that moment came after months of managing my options trading activity - PMCC cycles, wheel strategy assignments, credit spreads, collars - through increasingly convoluted Excel sheets. I wasn't just tracking positions; I was manually recalculating unrealized P&L, trying to remember which leg belonged to which strategy, and constantly fighting with formatting and formula errors. The spreadsheet became a symptom of a deeper need: a purpose-built tool that understood the language of options trading.

The seed was planted: *What if I could build this myself?*

The problem was immediate and stark. I'm a software developer, yes, but JavaScript was never my stronghold. Domain expertise in options Greeks, position accounting, and financial data normalization? That lived in research papers and trading forums, not in my daily toolkit. And time - the most precious resource - was in short supply. Between work, the complexity of building a financial application from scratch, and the sheer scope of what I wanted to accomplish, traditional development felt like climbing Everest without oxygen.

Then I considered: *What if I didn't have to do this alone? What if I could "partner" with AI?*

## The Hypothesis: Can AI Help Us Vibe-Code?

*"Vibe-coding"* became my shorthand for a development philosophy that might sound reckless to enterprise architects but felt intuitive to someone at the intersection of necessity and constraint. The idea was simple: use modern AI coding assistants not as replacements for thinking, but as force multipliers for iteration. Instead of getting stuck on syntax, documentation, or the exact API call syntax, I could rapidly prototype, validate ideas, and pivot based on what actually worked.

The stakes felt oddly appropriate for an indie project. I wasn't building infrastructure for a million users. I was solving a personal problem with the potential to help other options traders facing the same spreadsheet predicament.

## From Perplexity to Reality: The Skeleton Phase

![GammaLedger - from Spreadsheet Hell to Purposeful Architecture](/img/blog/gammaledger-vibe-coding-01.png "GammaLedger - from Spreadsheet Hell to Purposeful Architecture"){:class="blog-center"}

My journey began in **Perplexity Labs**. I sketched out the initial concept: a web application that could ingest options positions, display them in a unified dashboard, calculate basic Greeks, track P&L, and export data. The conversation with Perplexity was less about perfect architecture and more about exploring the problem space. What data did I actually need? How should positions be normalized across different brokers? What was the minimal viable feature set?

Perplexity helped me think through these questions without the friction of starting with a blank file. The AI suggested structures, asked clarifying questions, and helped me avoid obvious pitfalls. Within an hour, I had a rough mental model of the application architecture.

Then came the leap: creating the actual skeleton.

I used Perplexity Labs to generate a basic HTML/CSS/JavaScript scaffold. Nothing fancy - a responsive layout, a mock dashboard structure, placeholder forms for entering positions. It wasn't production code; it was a wireframe in executable form. The beauty was that I could *immediately see* whether my mental model actually worked in practice.

That skeleton became my GitHub repository: [GammaLedger](https://github.com/r-brown/GammaLedger){:target="_blank"}.

## The Iterative Leap: GitHub Copilot in Agentic Mode

Publishing to GitHub wasn't just about version control; it was about creating a constraint that would drive development forward. Public code forces you to think about structure, even if initially messy. More importantly, it opened the door to the next phase: serious AI-assisted development.

I switched to **GitHub Copilot in Agentic mode within VSCode**. This was different from the traditional autocomplete experience. Agentic mode meant I could have a conversation with the AI about what I wanted to accomplish, and Copilot would generate not just snippets but coherent, multi-file changes. It understood context across the entire repository.

The workflow became something like this:

1. **Describe the feature or fix** in plain language: "I need to add support for importing OFX files from brokers. The parser should extract transaction records and map them to our position schema."

2. **Copilot explores the codebase**, understands the existing patterns, and generates a comprehensive solution - often touching multiple files simultaneously.

3. **I review, test, and refine**. Sometimes Copilot's first pass is 80% there; sometimes it's 30%. But the friction of getting from zero to *something testable* drops dramatically.

4. **Iterate and validate** against actual use cases - real OFX files from Interactive Brokers, real position data from my trading account.

This agentic approach became the engine of [GammaLedger's](https://gammaledger.com){:target="_blank"} development. Features that would have taken days of research, trial, and error could be prototyped in hours.

## The AI Stack: Pluralism in Problem-Solving

I didn't stick with a single AI vendor. The philosophy was pragmatic: different tools excel at different problems.

**ChatGPT-5 Codex and Claude Sonnet 4.5** became my primary coding partners. ChatGPT's Codex model excels at code generation from high-level descriptions. Claude Sonnet, meanwhile, shines at reasoning through complex problems - like the subtle differences in how various brokers report the same position data, or the mathematical nuances of calculating implied volatility for different strike prices.

When a feature felt stuck - say, implementing P&L graphs for multi-leg strategies - I'd often pose the problem to both and compare their approaches. They'd frequently suggest different implementation paths, and comparing them forced me to actually *understand* the problem rather than just copy-pasting code.

**Google Gemini and Grok** served different roles. Gemini became invaluable for researching financial domain knowledge - explaining the mechanics of a poor man's covered call (PMCC) from first principles, or helping me understand the tax implications of assignment. Grok's strength was in thinking laterally about product decisions: "If traders care most about this, what's the simplest way to show it?"

**OpenAI's broader ecosystem** was useful for consultation on best practices, particularly around options trading math. I'd ask questions like: "What's the standard formula for Max Risk, and how does it differ across different strategies?" The responses weren't always code, but they contextualized the code I needed to write.

This pluralistic approach - consulting multiple AIs for different dimensions of the problem - meant I rarely felt trapped. If one tool wasn't helpful on a particular task, another usually was.

## The Paradox: AI Velocity vs. The Dependency Trap

As my reliance on AI development tools deepened, I encountered a phenomenon I'd call the **"Feature Regression Lottery."**

AI models are constantly evolving. Claude Sonnet v1 behaved differently from v2. ChatGPT-4 to ChatGPT-4 Turbo brought subtle changes in code generation patterns. GitHub Copilot updates would occasionally generate code that broke previously working features. It wasn't dramatic - nothing catastrophic - but accumulated technical debt manifested as mysterious bugs.

Here's the core problem: **When you build with AI assistance, you're building against a moving target.**

A feature might work perfectly after generation. But three months later, when you need to modify it or extend it, you return to that code and realize it uses deprecated libraries, outdated API patterns, or approaches that no longer align with how the current AI tools would solve the problem. The API changes, the library gets updated, and suddenly you're manually debugging and rewriting code you didn't fully understand in the first place.

This creates a peculiar burden for indie projects. As GammaLedger grew from a scrappy prototype to something more substantial, I had to invest time in:

- **Regression testing**: After major feature additions or library upgrades, manually verifying that existing functionality still works. This is tedious and error-prone precisely because the original code feels "AI-generated" and thus less familiar than if I'd written it myself.

- **Code archaeology**: Understanding the intent behind AI-generated code when you need to modify it. Sometimes the code is elegant and obvious; often it's functional but cryptic.

- **Version pinning and compatibility management**: Becoming almost obsessive about which versions of dependencies work together, because the combination was validated at a specific point in time.

- **Documentation burden**: AI generates code fast, but it doesn't always document *why* it chose one approach over another. When you need to refactor, that lost context hurts.

For a hobby project with one developer, this is manageable and even instructive. For a growing project with multiple collaborators, it becomes a serious challenge. You can't just hand someone a 2,000-line AI-generated module and expect them to modify it confidently.

## The Dividends: Capability Multiplication

But here's the flip side - and it's genuinely remarkable.

Without AI assistance, I wouldn't have built GammaLedger at all. The time investment would have been prohibitive. Learning JavaScript deeply, researching OFX file formats, understanding options math, navigating brokers' WebAPIs, wrestling with deployments and configuration - the scope would have stretched across months or years.

Instead, I went from zero to a functional, useful application in weeks. That's not hyperbole; it's the compounding effect of removing friction at every step.

**Time compression**: Traditional development for an indie project means long stretches of friction - getting unstuck on syntax, debugging integration issues, researching documentation. AI assistance collapses this friction. You spend less time Googling and more time thinking about design.

**Skill multiplication**: I could leverage AI to bridge knowledge gaps. I didn't need to become an expert in JavaScript idioms before building something meaningful. The AI could suggest idiomatic patterns, and I could learn by reading its suggestions.

**Rapid validation**: The fast iteration cycle meant I could test hypotheses about the product quickly. "Does the UI feel intuitive?" "Is this the right way to represent a position?" These questions got answered in hours rather than days of deliberation.

**Feature richness without burnout**: OFX export support, API integrations, local data persistence, multiple dashboard widgets, strategy-level reporting - these are non-trivial features. Built traditionally, I might have shipped a much simpler MVP to preserve sanity. With AI, I could ambitious without self-destructing.

**Learning acceleration**: I actually *learned* more JavaScript by reading well-generated code than I would have by starting from scratch. The AI modeled patterns; I could read them, understand them (mostly), and improve upon them.

## The Big Picture Problem: Supervision Remains Non-Negotiable

![GammaLedger - Options Tracking Reimagined](/img/blog/gammaledger-vibe-coding-02.png "GammaLedger - Options Tracking Reimagined"){:class="blog-center"}

Here's the honest truth that no amount of AI capability changes: **Someone still needs to think about the whole.**

AI is phenomenal at solving discrete problems. "Generate a function to parse CBOE options data." "Create a React component for displaying positions." "Implement a Postgres migration for tracking strategy metadata." These are bounded problems with clear success criteria. AI excels here.

But the architecture? The product strategy? Whether the app should prioritize ease-of-use or feature depth? Whether to support desktop deployment via Electron or stay web-only? Whether to open-source or monetize? **These questions require human judgment with skin in the game.**

The failure mode I see most often with AI-assisted projects is the loss of intentionality. If you're not careful, you end up with a sprawling codebase that does a lot of things adequately but nothing remarkably well. The AI happily implements whatever you ask for, but without a human ruthlessly curating scope and priorities, you get feature bloat and architectural confusion.

GammaLedger avoided this trap because I remained the bottleneck for big decisions. Every major feature went through my filter: *Does this serve the core mission - making options tracking simple and trustworthy?* Every technical choice asked: *Does this align with my strategy for deployment and maintenance?* (This is why I chose local-first data persistence; I wasn't going to build backend infrastructure if I could avoid it.)

The AI was a tool, not a decision-maker.

## Lessons and Patterns for AI-Assisted Development

If you're considering a similar approach for a project of your own, here are patterns that worked:

**1. Start with clarity on the problem.**
Spend time articulating what you're solving before you ask AI to code. Vague briefs generate vague code. Clear problem statements generate focused solutions.

**2. Use AI for breadth, not depth.**
Let AI generate multiple approaches; you choose which one aligns with your vision. Don't default to its first suggestion.

**3. Treat AI output as a starting point, not gospel.**
Review generated code with the same skepticism you'd apply to a pull request from a junior developer. Because that's essentially what it is - highly optimized code from someone (or something) unfamiliar with your specific context.

**4. Invest in tests early.**
Unit tests, integration tests, end-to-end tests. They're not just safety nets; they're your documentation of expected behavior. When AI output changes, tests are your early-warning system.

**5. Pin dependencies aggressively.**
If you find a combination of library versions that works, lock them down. The dependency graph shouldn't be a moving target while you're building.

**6. Maintain architectural ownership.**
Use AI for feature implementation. Keep architecture, data modeling, and strategic decisions firmly in your hands.

**7. Document the "why," not just the "what."**
AI can describe code; humans need to document intent. Why did you choose this approach over alternatives? What assumptions does this code make? Write it down.

## The Broader Implication: AI as a Democratizer with Caveats

The broader implication of my GammaLedger journey is that AI coding assistants genuinely lower the barrier to building functional software. You no longer need deep expertise in a specific language or domain to ship something useful.

For indie developers, hobbyists, and bootstrapped products, this is transformative. You can solve your own problem, iterate rapidly, and ship with real value.

But this democratization comes with a responsibility: **someone still needs to own the vision.** The AI doesn't care whether your project succeeds or fails. It'll happily generate code that's technically correct but strategically misaligned. It won't tell you when you're solving the wrong problem or when you've lost sight of your core mission.

The most effective AI-assisted projects I've seen - including *GammaLedger* 😉 have clear human leadership that uses AI as leverage, not as a replacement for thinking.

## Conclusion: The Future is Hybrid

As I continue developing GammaLedger, my relationship with AI tools continues to evolve. They're not becoming less important; they're becoming more integrated into my workflow. But they're also revealing their limitations more starkly: the tendency toward code drift, the regression challenges, the need for constant human supervision.

The future of indie software development isn't "AI will build your app for you." It's "AI will remove friction from *your* app building, but you remain the driver."

GammaLedger exists today because I was willing to trust an AI to help me think through problems, generate code, and iterate rapidly. But it works - and will continue to work - because I refused to trust AI with the big picture.

The lesson: **Embrace AI as a collaborator, but keep human judgment on the throne.**

---

*[GammaLedger](https://gammaledger.com){:target="_blank"} is an open-source options tracking application built with AI-assisted development, [available on GitHub](https://github.com/r-brown/GammaLedger){:target="_blank"}. It demonstrates that modern AI tools can help solve meaningful problems, but the human vision driving those tools remains irreplaceable.*