#!/usr/bin/env bash
# scripts/permalink-check.sh — every permalink that existed before must still exist.
set -euo pipefail

BASELINE="${1:-.permalink-baseline}"
[[ -f "$BASELINE" ]] || { echo "baseline not found: $BASELINE" >&2; exit 1; }
[[ -d _site ]] || { echo "_site not found — run 'just build' first" >&2; exit 1; }

find _site -name '*.html' | sed 's|^_site||' | LC_ALL=C sort > /tmp/permalinks-current
missing="$(comm -23 <(LC_ALL=C sort "$BASELINE") /tmp/permalinks-current)"

if [[ -n "$missing" ]]; then
  echo "FAIL: permalinks that no longer resolve:" >&2
  echo "$missing" >&2
  exit 1
fi
echo "OK: all $(wc -l < "$BASELINE" | tr -d ' ') baseline permalinks still resolve"
