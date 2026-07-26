#!/usr/bin/env bash
# scripts/claim-check.sh — fails if a banned marketing claim reappears.
# Scope: marketing + docs surfaces only. _posts/ is archival and exempt.
set -uo pipefail

PATTERN='tamper-proof|tamper proof|immutable|AGPL|LGPL|dual licens|in minutes|within minutes|generally available'
TARGETS=(index.md pages _data llms.txt)

hits="$(grep -rEin --include='*.md' --include='*.yml' --include='*.html' --include='*.txt' \
          "$PATTERN" "${TARGETS[@]}" 2>/dev/null || true)"

if [[ -n "$hits" ]]; then
  echo "FAIL: banned claim(s) found:" >&2
  echo "$hits" >&2
  echo >&2
  echo "These claims must map to shipped behaviour. See" >&2
  echo "../.agents/superpowers/specs/2026-07-26-website-onboarding-journey-design.md" >&2
  echo "(one directory up — that spec lives in the workspace root repo, not here)" >&2
  exit 1
fi
echo "OK: no banned claims"
