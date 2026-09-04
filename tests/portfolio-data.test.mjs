import test from 'node:test';
import assert from 'node:assert/strict';
import {
  personas,
  headlineMetrics,
  cases,
  experience,
  links,
  pageCopy,
} from '../portfolio-data.js';

test('defines four unique public personas', () => {
  assert.equal(personas.length, 4);
  assert.deepEqual(personas.map(({ id }) => id), ['creator', 'beauty', 'student', 'kkami']);
  assert.equal(new Set(personas.map(({ id }) => id)).size, 4);
  for (const persona of personas) {
    assert.match(persona.image, /^\/assets\/characters\/.+\.webp$/);
    assert.ok(persona.description.length >= 25);
    assert.ok(persona.chips.length >= 2);
  }
});

test('keeps the hero proof set concise and sourced', () => {
  assert.deepEqual(headlineMetrics.map(({ value }) => value), ['28K+', '15M+', '6.7%+']);
  assert.ok(headlineMetrics.every(({ publication }) => publication === 'public'));
});

test('contains evidence-led cases and a bounded research status', () => {
  assert.deepEqual(cases.map(({ id }) => id), ['choigpt', 'beauty-growth', 'oliveyoung', 'australian-cruise', 'creator-ops']);
  assert.ok(cases.every(({ context, responsibility, system, result }) =>
    [context, responsibility, system, result].every(Boolean)));
  assert.ok(experience.some(({ status }) => status === 'prototype / pilot calibration'));
});

test('does not publish private Manus or personal data', () => {
  const serialized = JSON.stringify({ personas, headlineMetrics, cases, experience, links });
  assert.doesNotMatch(serialized, /private payout|revenue share|phone number|home address|tax id/i);
  assert.doesNotMatch(serialized, /010-[0-9]/);
  assert.equal(serialized.includes('official OpenAI partner'), false);
});

test('provides complete Korean and English page copy', () => {
  for (const language of ['ko', 'en']) {
    for (const key of ['nav', 'hero', 'proof', 'work', 'experience', 'profile', 'contact', 'footer']) {
      assert.ok(pageCopy[language][key]);
    }
  }
  assert.equal(pageCopy.ko.hero.title, '모두가 AI를 쉽게, 최피티.');
  assert.equal(pageCopy.en.hero.title, 'Making AI easy for everyone.');
});

test('localizes all personas, cases, and experience records', () => {
  for (const item of [...personas, ...cases, ...experience]) {
    for (const language of ['ko', 'en']) {
      assert.ok(item.copy?.[language] ?? item.role?.[language]);
    }
  }
});
