import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'
import { execFileSync } from 'node:child_process'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const manifest = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'))
const font = await readFile(resolve(root, 'assets/Figtree.ttf'))
const fontDataUrl = `data:font/ttf;base64,${font.toString('base64')}`

await build({
  absWorkingDir: root,
  entryPoints: ['src/index.ts'],
  outfile: 'lib/index.js',
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'node22',
  sourcemap: true,
  loader: { '.md': 'text' },
  external: ['@deepseek-ai/cordis', '@deepseek-ai/dsh-*'],
  logLevel: 'info',
})

const client = await build({
  absWorkingDir: root,
  entryPoints: ['src/client/index.ts'],
  bundle: true,
  write: false,
  format: 'cjs',
  platform: 'browser',
  target: 'es2022',
  sourcemap: false,
  define: {
    __ASTRYX_FIGTREE_DATA_URL__: JSON.stringify(fontDataUrl),
  },
  external: ['@deepseek-ai/cordis', '@deepseek-ai/dsh-client-ui-theme/client'],
  logLevel: 'info',
})

const clientCode = client.outputFiles[0]?.text
if (clientCode === undefined) throw new Error('esbuild emitted no client bundle')

const wrapped = [
  'window.__ModuleLoader__.load({',
  `  id: ${JSON.stringify(manifest.name)},`,
  '  factory: (require) => {',
  '    var module = { exports: {} };',
  '    var exports = module.exports;',
  clientCode,
  '    return module.exports;',
  '  },',
  '});',
  '',
].join('\n')

await mkdir(resolve(root, 'lib'), { recursive: true })
await writeFile(resolve(root, 'lib/client.js'), wrapped)

execFileSync(resolve(root, 'node_modules/.bin/tsc'), ['--project', 'tsconfig.json'], {
  cwd: root,
  stdio: 'inherit',
})
