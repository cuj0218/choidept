import test from 'node:test';
import assert from 'node:assert/strict';
import { personas } from '../portfolio-data.js';

function element() {
  const classes = new Set();
  return {
    dataset: {},
    attributes: new Map(),
    listeners: new Map(),
    classList: {
      add: (name) => classes.add(name),
      remove: (name) => classes.delete(name),
      toggle(name) {
        if (classes.has(name)) {
          classes.delete(name);
          return false;
        }
        classes.add(name);
        return true;
      },
    },
    addEventListener(type, listener) {
      this.listeners.set(type, listener);
    },
    setAttribute(name, value) {
      this.attributes.set(name, value);
    },
    querySelectorAll() {
      return [];
    },
    focus() {},
    innerHTML: '',
    textContent: '',
    src: '',
    alt: '',
    tabIndex: 0,
  };
}

test('rapid persona changes keep the latest content and image', async () => {
  const ids = Object.fromEntries([
    'persona-image',
    'persona-label',
    'persona-title',
    'persona-description',
    'persona-chips',
    'proof-list',
    'case-list',
    'experience-list',
    'mobile-nav',
  ].map((id) => [id, element()]));
  const personaButtons = personas.map(() => element());
  const identityOs = element();
  const menuToggle = element();
  let reducedMotion = false;

  globalThis.document = {
    getElementById: (id) => ids[id],
    querySelector: (selector) => selector === '.identity-os' ? identityOs : menuToggle,
    querySelectorAll: (selector) => selector === '[data-persona]' ? personaButtons : [],
  };
  globalThis.window = globalThis;
  globalThis.window.matchMedia = () => ({ matches: reducedMotion });
  globalThis.IntersectionObserver = class {
    observe() {}
  };

  await import('../script.js');

  personaButtons[1].listeners.get('click')();
  reducedMotion = true;
  personaButtons[3].listeners.get('click')();
  await new Promise((resolve) => setTimeout(resolve, 180));

  const latestPersona = personas[3];
  assert.deepEqual({
    title: ids['persona-title'].textContent,
    image: ids['persona-image'].src,
    alt: ids['persona-image'].alt,
    selected: personaButtons[3].attributes.get('aria-selected'),
  }, {
    title: latestPersona.title,
    image: latestPersona.image,
    alt: latestPersona.alt,
    selected: 'true',
  });
});
