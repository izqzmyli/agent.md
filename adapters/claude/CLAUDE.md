# CLAUDE.md

## Project

Name: {{NAME}}
Type: {{TYPE}}

Stack:
- Language: {{LANGUAGE}}
- Framework: {{FRAMEWORK}}
- Package manager: {{PKG_MANAGER}}
- Test runner: {{TEST_RUNNER}}

Primary goal:
{{GOAL}}

---

## Operating Principles

Follow these rules in every task:

1. Solve the user's current task only.
2. Use the smallest safe change.
3. Do not refactor unrelated code.
4. Do not reformat unrelated files.
5. Do not add dependencies unless necessary.
6. Prefer existing project patterns.
7. Read only the files needed for the task.
8. Ask only when blocked; otherwise make a safe, minimal assumption.
9. Before destructive actions, ask for confirmation.
10. Keep responses concise.

---

## Token Economy Rules

Context is a limited resource.

Before reading files:
- Identify the smallest likely file set.
- Use targeted search before opening files.
- Prefer exact names, errors, routes, imports, symbols, and test names.
- Avoid broad repository scans unless narrow search fails.

Avoid reading unless required:
- dependency folders (`node_modules`, `.venv`, `vendor`)
- build outputs (`dist`, `.next`, `build`)
- generated files, coverage reports, lockfiles, minified files

When context grows too large:
- summarize durable decisions
- list changed files and checks run
- suggest `/compact`

---

## Work Protocol

For non-trivial tasks:

1. Understand the request.
2. Inspect only necessary files.
3. Write a short plan.
4. Make the minimal change.
5. Run the smallest useful validation.
6. Report concise results.

For trivial tasks, act directly.

Planning format:
```
Plan:
- Goal:
- Files:
- Change:
- Check:
```

Output format:
```
Done: {what changed, one line per file}
Check: {command} → {result} | not run: {reason}
Risk: {what to watch} | none
```

---

## Extra Docs

Load only when needed:
- `docs/ai/COMMANDS.md` — dev, test, build commands
- `docs/ai/CONTEXT.md` — architecture and key decisions
- `docs/ai/TASK_LOG.md` — active task state (read when continuing a session)
