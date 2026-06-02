#!/usr/bin/env node

const prompts = require('prompts');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

async function main() {
  console.log('\nagent.md — AI project instructions setup\n');

  const answers = await prompts(
    [
      {
        type: 'text',
        name: 'name',
        message: 'Project name',
        initial: path.basename(process.cwd()),
      },
      {
        type: 'text',
        name: 'goal',
        message: 'Primary goal (one sentence)',
      },
      {
        type: 'select',
        name: 'type',
        message: 'Project type',
        choices: [
          { title: 'fullstack', value: 'fullstack' },
          { title: 'frontend', value: 'frontend' },
          { title: 'backend', value: 'backend' },
          { title: 'CLI', value: 'CLI' },
          { title: 'library', value: 'library' },
          { title: 'mobile', value: 'mobile' },
          { title: 'WordPress', value: 'WordPress' },
          { title: 'other', value: 'other' },
        ],
      },
      {
        type: 'select',
        name: 'language',
        message: 'Language',
        choices: [
          { title: 'TypeScript', value: 'TypeScript' },
          { title: 'JavaScript', value: 'JavaScript' },
          { title: 'Python', value: 'Python' },
          { title: 'Go', value: 'Go' },
          { title: 'PHP', value: 'PHP' },
          { title: 'Rust', value: 'Rust' },
          { title: 'Other', value: 'Other' },
        ],
      },
      {
        type: 'text',
        name: 'framework',
        message: 'Framework (enter to skip)',
      },
      {
        type: 'select',
        name: 'pkgManager',
        message: 'Package manager',
        choices: [
          { title: 'pnpm', value: 'pnpm' },
          { title: 'npm', value: 'npm' },
          { title: 'yarn', value: 'yarn' },
          { title: 'uv', value: 'uv' },
          { title: 'composer', value: 'composer' },
          { title: 'go mod', value: 'go mod' },
          { title: 'none', value: 'none' },
        ],
      },
      {
        type: 'text',
        name: 'testRunner',
        message: 'Test runner (e.g. Vitest, Pytest, enter to skip)',
      },
      {
        type: 'multiselect',
        name: 'adapters',
        message: 'AI assistant(s)',
        choices: [
          { title: 'Claude Code', value: 'claude', selected: true },
          { title: 'Cursor', value: 'cursor' },
          { title: 'GitHub Copilot', value: 'copilot' },
          { title: 'Codex / OpenAI', value: 'codex' },
          { title: 'Generic', value: 'generic' },
        ],
        min: 1,
        instructions: false,
        hint: '- Space to select, Enter to confirm',
      },
    ],
    { onCancel: () => process.exit(1) }
  );

  const vars = {
    '{{NAME}}': answers.name,
    '{{GOAL}}': answers.goal || '—',
    '{{TYPE}}': answers.type,
    '{{LANGUAGE}}': answers.language,
    '{{FRAMEWORK}}': answers.framework || '—',
    '{{PKG_MANAGER}}': answers.pkgManager,
    '{{TEST_RUNNER}}': answers.testRunner || '—',
  };

  const dest = process.cwd();
  const created = [];

  for (const adapter of answers.adapters) {
    const src = path.join(ROOT, 'adapters', adapter);
    copyDir(src, dest, vars, created);
  }

  const docsSrc = path.join(ROOT, 'docs', 'ai');
  const docsDest = path.join(dest, 'docs', 'ai');
  copyDir(docsSrc, docsDest, vars, created);

  console.log('\nDone! Files created:');
  created.forEach(f => console.log(' ', path.relative(dest, f)));
  console.log();
}

function copyDir(src, dest, vars, created) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, vars, created);
    } else {
      let content = fs.readFileSync(srcPath, 'utf8');
      for (const [key, val] of Object.entries(vars)) {
        content = content.split(key).join(val);
      }
      fs.writeFileSync(destPath, content);
      created.push(destPath);
    }
  }
}

main().catch(err => {
  console.error(err.message);
  process.exit(1);
});
