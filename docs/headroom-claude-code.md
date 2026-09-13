# Headroom + Claude Code (macOS)

[Headroom](https://github.com/headroomlabs-ai/headroom) compresses tool outputs, logs,
files and RAG chunks before they reach the model. It runs as a local proxy; Claude Code
is pointed at it via `ANTHROPIC_BASE_URL`.

Verified against **headroom 0.37.0**.

## Install

```bash
bash scripts/setup-headroom.sh
```

The script backs up `~/.claude.json`, `~/.claude/settings.json` and
`~/.claude/settings.local.json` to `~/.headroom-backups/<timestamp>/` before anything
touches them.

## Run

```bash
headroom wrap claude --1m --memory
```

Flags that matter:

| Flag | Why |
| --- | --- |
| `--1m` | Behind a custom `ANTHROPIC_BASE_URL` Claude Code drops the `context-1m` beta header and caps at 200k. This restores it. |
| `--tool-search true` | Default on. Without it a custom base URL makes Claude Code load every tool schema eagerly, inflating local context. |
| `--memory` | Persistent cross-session memory. |
| `--code-memory none` | Skip the Serena MCP registration if you don't want it at user scope. |
| `--no-mcp` | Skip Headroom MCP registration — compression markers then become unactionable. |

## Verify it is working

```bash
headroom doctor      # routing + proxy health; 'claude: routed' is the row that matters
headroom savings     # durable token savings over time
headroom dashboard   # live savings (proxy must be running)
headroom inspect     # original vs compressed content for recent requests
```

Measured locally on a 400-row JSON tool result: **55.4% reduction, 15,744 tokens saved**.
Headroom's own headline for coding agents is ~20%; JSON-heavy payloads are where it wins.

## What gets changed on disk

- `~/.claude.json` — an `mcpServers.headroom` entry is **added**. Purely additive; nothing
  existing is rewritten.
- `~/.claude.json` — `headroom wrap claude` also registers Serena at user scope unless you
  pass `--code-memory none`.
- `~/.local/share/uv/tools/headroom-ai/` — the isolated tool environment.

## Disable / remove

```bash
headroom unwrap claude          # undo the Claude Code wiring
uv tool uninstall headroom-ai   # remove the tool
# or: bash scripts/setup-headroom.sh --uninstall
```

Running plain `claude` (without `headroom wrap`) already bypasses the proxy entirely —
nothing is intercepted unless you launch through the wrapper.
