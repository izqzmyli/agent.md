# agent.md

Universal AI coding instructions for any project.

Run once at the start of a project → get a ready-to-use AI setup tailored to your stack.

## Usage

```bash
npx github:izqzmyli/agent.md
```

Answers a few questions, then generates the right files for your AI assistant.

## What it generates

| Assistant | File |
|---|---|
| Claude Code | `CLAUDE.md` |
| Cursor | `.cursorrules` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Codex / OpenAI | `AGENTS.md` |
| Generic | `AI.md` |

Plus `docs/ai/` — three lightweight files for commands, architecture notes, and task state.

## Structure

```
adapters/     per-tool templates
docs/ai/      COMMANDS.md · CONTEXT.md · TASK_LOG.md
examples/     filled examples by project type
bin/init.js   CLI
```

## Philosophy

- One command, no config files, no install.
- Works with any language or framework.
- Templates are minimal — only what actually helps the AI.
