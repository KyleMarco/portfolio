import assert from 'node:assert/strict';
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { assembleSite } from './assemble-site.mjs';

test('assembles both apps, their assets, and the Pages fallback without stale files', async (t) => {
  const root = await mkdtemp(join(tmpdir(), 'portfolio-site-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  for (const app of ['portfolio', 'storefront']) {
    const output = join(root, 'apps', app, 'dist');
    await mkdir(join(output, 'assets'), { recursive: true });
    await writeFile(join(output, 'index.html'), `<title>${app}</title>`);
    await writeFile(join(output, 'assets/app.js'), app);
  }
  await mkdir(join(root, 'dist'));
  await writeFile(join(root, 'dist/stale.js'), 'old build');

  await assembleSite(root);

  for (const [path, expected] of [
    ['index.html', '<title>portfolio</title>'],
    ['404.html', '<title>portfolio</title>'],
    ['assets/app.js', 'portfolio'],
    ['demo/index.html', '<title>storefront</title>'],
    ['demo/assets/app.js', 'storefront'],
  ]) {
    assert.equal(await readFile(join(root, 'dist', path), 'utf8'), expected);
  }
  await assert.rejects(access(join(root, 'dist/stale.js')));
});

test('preserves the previous deployment output if either app has not been built', async (t) => {
  const root = await mkdtemp(join(tmpdir(), 'portfolio-site-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'dist'));
  await writeFile(join(root, 'dist/index.html'), 'previous build');

  await assert.rejects(assembleSite(root));
  assert.equal(await readFile(join(root, 'dist/index.html'), 'utf8'), 'previous build');
});
