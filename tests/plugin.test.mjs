import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('host half registers and disposes the Astryx skill', async () => {
  const registrations = []
  const disposers = []
  const ctx = {
    effect(factory) {
      disposers.push(factory())
    },
    skills: {
      register(skill) {
        registrations.push(skill)
        return () => {}
      },
    },
  }

  const host = await import('../lib/index.js')
  assert.deepEqual(host.inject, ['skills'])
  host.apply(ctx)
  assert.equal(registrations.length, 1)
  assert.equal(registrations[0].name, 'astryx')
  assert.equal(registrations[0].source, 'bundled')
  assert.match(registrations[0].content, /^# Astryx workflow/)
  assert.doesNotMatch(registrations[0].content, /^---\n/)

  for (const dispose of disposers.reverse()) dispose()
})

test('client half applies the Neutral token layer and removes its font', async () => {
  let factory
  globalThis.window = {
    __ModuleLoader__: {
      load(entry) {
        factory = entry.factory
      },
    },
  }

  const loadedStyles = []
  const removedStyles = []
  globalThis.document = {
    createElement(tag) {
      assert.equal(tag, 'style')
      return {
        dataset: {},
        textContent: '',
        remove() {
          removedStyles.push(this)
        },
      }
    },
    head: {
      append(node) {
        loadedStyles.push(node)
      },
    },
  }

  await import('../lib/client.js')
  assert.equal(typeof factory, 'function')
  const client = factory(() => {
    throw new Error('client bundle unexpectedly requested a runtime module')
  })
  assert.deepEqual(client.inject, ['theme'])

  let override
  let disposed = false
  const ctx = {
    effect(factory) {
      disposers.push(factory())
    },
    theme: {
      overrideTokens(source, tokens) {
        override = { source, tokens }
        return () => {
          disposed = true
        }
      },
    },
  }
  const disposers = []

  client.apply(ctx)
  assert.equal(override.source, 'dsh-plugin-astryx')
  assert.equal(override.tokens['--dsw-alias-bg-base'].light, '#f1f1f1')
  assert.equal(override.tokens['--dsw-alias-bg-base'].dark, '#1b1b1b')
  assert.equal(override.tokens['--dsw-alias-state-success-primary'].light, '#198100')
  assert.equal(override.tokens['--dsw-alias-label-primary-foreground'].dark, '#111111')
  assert.equal(override.tokens['--dsw-alias-file-diff-added-marker'].dark, '#97c897')
  assert.equal(override.tokens['--dsw-menu-surface-fill'].dark, 'rgba(38, 38, 38, 0.94)')
  assert.equal(loadedStyles.length, 1)
  assert.equal(loadedStyles[0].id, 'dsh-plugin-astryx-figtree')
  assert.match(loadedStyles[0].textContent, /font-family: "Astryx Figtree"/)
  assert.match(loadedStyles[0].textContent, /^.*data:font\/ttf;base64,/s)

  disposers[0]()
  assert.equal(disposed, true)
  assert.deepEqual(removedStyles, loadedStyles)
})

test('bundle metadata points at both halves and the discovery icon', async () => {
  const manifest = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'))
  assert.equal(manifest.dsh.bundle.patch, './cordis.patch.yml')
  assert.equal(manifest.dsh.client.platform, 'web')
  assert.equal(manifest.exports['./client'].default, './lib/client.js')
  assert.equal(manifest.icon, './icon.svg')
  assert.match(manifest.engines.dsh, /^>=0\.2\.2-rc\.1/)
})
