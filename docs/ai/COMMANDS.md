# Commands
<!-- Load only when running commands is part of the task. -->

Install:  [COMMAND]
Dev:      [COMMAND]
Build:    [COMMAND]
Typecheck:[COMMAND]
Lint:     [COMMAND]
Test all: [COMMAND]
Test one: [COMMAND] {file}

## Notes
- Prefer targeted over full.
- Do not run build unless task touches bundler, config, or release.
- Do not run full test suite unless task affects broad behavior.
