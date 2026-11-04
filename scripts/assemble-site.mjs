import { access, copyFile, cp, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export async function assembleSite(repositoryRoot) {
  const root = resolve(repositoryRoot);
  const portfolio = join(root, 'apps/portfolio/dist');
  const storefront = join(root, 'apps/storefront/dist');
  const output = join(root, 'dist');

  // Check both builds before replacing the generated deployment directory.
  await Promise.all([
    access(join(portfolio, 'index.html')),
    access(join(storefront, 'index.html')),
  ]);
  await rm(output, { recursive: true, force: true });
  await cp(portfolio, output, { recursive: true });
  await cp(storefront, join(output, 'demo'), { recursive: true });
  await copyFile(join(output, 'index.html'), join(output, '404.html'));
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  await assembleSite(fileURLToPath(new URL('../', import.meta.url)));
  console.log('Assembled portfolio and storefront in dist/');
}
