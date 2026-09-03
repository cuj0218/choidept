import test from 'node:test';
import assert from 'node:assert/strict';
import { nextPersonaIndex, wrapIndex } from '../ui-state.js';

test('wraps persona indices', () => {
  assert.equal(wrapIndex(4, 4), 0);
  assert.equal(wrapIndex(-1, 4), 3);
});

test('maps directional and boundary keys', () => {
  assert.equal(nextPersonaIndex(0, 'ArrowRight', 4), 1);
  assert.equal(nextPersonaIndex(0, 'ArrowLeft', 4), 3);
  assert.equal(nextPersonaIndex(2, 'Home', 4), 0);
  assert.equal(nextPersonaIndex(1, 'End', 4), 3);
  assert.equal(nextPersonaIndex(2, 'Enter', 4), 2);
});
