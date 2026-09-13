#!/usr/bin/env bash
#
# Install and configure Headroom (headroomlabs-ai/headroom) for Claude Code on macOS.
#
#   bash scripts/setup-headroom.sh
#
# What it does:
#   1. Checks the Mac (Apple Silicon vs Intel — Intel has no native wheels yet).
#   2. Installs uv + Python 3.13 if missing, then `headroom-ai[all]` as an isolated uv tool.
#   3. BACKS UP ~/.claude.json and ~/.claude/settings.json before anything touches them.
#   4. Registers the Headroom MCP server.
#   5. Runs `headroom doctor` to verify.
#
# It never edits Claude Code config itself — `headroom wrap claude` does that, and
# only after the backups above exist. Nothing here writes API keys or secrets.
#
# Undo: see scripts/setup-headroom.sh --uninstall

set -euo pipefail

BACKUP_DIR="$HOME/.headroom-backups/$(date +%Y%m%d-%H%M%S)"
say()  { printf '\033[1;36m==>\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m[!]\033[0m %s\n' "$*"; }
die()  { printf '\033[1;31m[x]\033[0m %s\n' "$*" >&2; exit 1; }

if [[ "${1:-}" == "--uninstall" ]]; then
  say "Undoing Headroom setup"
  command -v headroom >/dev/null && headroom unwrap claude || warn "headroom not on PATH; skipping unwrap"
  command -v uv >/dev/null && uv tool uninstall headroom-ai || warn "uv not found; remove headroom manually"
  say "Done. Your Claude Code backups are under ~/.headroom-backups/ if you need to restore."
  exit 0
fi

[[ "$(uname -s)" == "Darwin" ]] || die "This script targets macOS. On Linux the uv install works the same; skip the brew steps."

ARCH="$(uname -m)"
if [[ "$ARCH" != "arm64" ]]; then
  warn "Intel Mac detected. Headroom ships native wheels for Apple Silicon and Linux only."
  warn "Use the Docker install instead: docker pull ghcr.io/headroomlabs-ai/headroom:latest"
  read -r -p "Continue with the pip install anyway? [y/N] " ans
  [[ "$ans" == "y" || "$ans" == "Y" ]] || exit 1
fi

# --- 1. Backups first, before anything can touch Claude Code config -----------
say "Backing up existing Claude Code config to $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"
for f in "$HOME/.claude.json" "$HOME/.claude/settings.json" "$HOME/.claude/settings.local.json"; do
  [[ -f "$f" ]] && cp -p "$f" "$BACKUP_DIR/$(basename "$f")" && say "  saved $(basename "$f")"
done
[[ -z "$(ls -A "$BACKUP_DIR")" ]] && say "  (no existing config found — nothing to back up)"

# --- 2. Toolchain -------------------------------------------------------------
if ! command -v uv >/dev/null; then
  say "Installing uv"
  curl -LsSf https://astral.sh/uv/install.sh | sh
  export PATH="$HOME/.local/bin:$PATH"
fi

if ! uv python find 3.13 >/dev/null 2>&1; then
  say "Fetching Python 3.13 (Headroom's dashboard \$-figure needs <3.14)"
  uv python install 3.13
fi

# --- 3. Headroom --------------------------------------------------------------
say "Installing headroom-ai[all] (large: pulls torch/transformers, allow ~5-10 min)"
uv tool install --python 3.13 "headroom-ai[all]"
uv tool update-shell || true
export PATH="$HOME/.local/bin:$PATH"

command -v headroom >/dev/null || die "headroom not on PATH. Add: export PATH=\"\$HOME/.local/bin:\$PATH\" to your ~/.zshrc"
say "Installed $(headroom --version)"

# --- 4. MCP server ------------------------------------------------------------
say "Registering the Headroom MCP server (headroom_compress / headroom_retrieve / headroom_stats)"
headroom mcp install || warn "MCP install reported a problem — check 'headroom mcp status'"

# --- 5. Verify ----------------------------------------------------------------
say "Starting proxy for the health check"
headroom proxy --port 8787 >/tmp/headroom-proxy.log 2>&1 &
PROXY_PID=$!
sleep 20
headroom doctor || true
kill "$PROXY_PID" 2>/dev/null || true

cat <<EOF

-------------------------------------------------------------------------------
Done. Launch Claude Code through Headroom with:

    headroom wrap claude --1m --memory

  --1m      keeps the 1M context window (a custom base URL otherwise caps it at 200k)
  --memory  persistent cross-session memory

Verify it is actually saving:   headroom doctor   /   headroom savings   /   headroom dashboard
Undo everything:                bash scripts/setup-headroom.sh --uninstall
Config backups:                 $BACKUP_DIR
-------------------------------------------------------------------------------
EOF
