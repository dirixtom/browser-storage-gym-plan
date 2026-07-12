import { fakeLocalStorage } from '../support/local-storage-mock';
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  applyRaw,
  clearSavedWeight,
  getMeta,
  getRaw,
  getSavedWeight,
  kvDelete,
  kvSet,
  localSyncKeys,
  migrateLegacyKeys,
  migrateMeta,
  setSavedWeight,
  storageKey,
} from '../../src/lib/storage';

beforeEach(() => {
  fakeLocalStorage.clear();
});

test('kvSet writes the raw value and a live (non-deleted) timestamped meta', () => {
  kvSet('some_key', '42');
  assert.equal(getRaw('some_key'), '42');
  const meta = getMeta('some_key');
  assert.equal(meta?.deleted, false);
  assert.ok(meta && !Number.isNaN(Date.parse(meta.updated_at)));
});

test('kvDelete removes the raw value but leaves a deleted tombstone in meta', () => {
  kvSet('some_key', '42');
  kvDelete('some_key');
  assert.equal(getRaw('some_key'), null, 'raw value must be gone');
  const meta = getMeta('some_key');
  assert.equal(meta?.deleted, true, 'meta must record the tombstone, not disappear too');
});

test('applyRaw writes a value+meta pair without going through kvSet timestamp semantics', () => {
  applyRaw('remote_key', 'hello', { updated_at: '2020-01-01T00:00:00.000Z', deleted: false });
  assert.equal(getRaw('remote_key'), 'hello');
  assert.deepEqual(getMeta('remote_key'), { updated_at: '2020-01-01T00:00:00.000Z', deleted: false });
});

test('applyRaw removes the raw value when meta says deleted, even if a value is passed', () => {
  kvSet('remote_key', 'stale');
  applyRaw('remote_key', 'ignored-because-deleted', { updated_at: '2020-01-01T00:00:00.000Z', deleted: true });
  assert.equal(getRaw('remote_key'), null);
});

test('setSavedWeight/getSavedWeight/clearSavedWeight round-trip through storageKey()', () => {
  setSavedWeight('goblet-squat_phase2', 24);
  assert.equal(getSavedWeight('goblet-squat_phase2'), '24');
  assert.equal(getRaw(storageKey('goblet-squat_phase2')), '24');
  clearSavedWeight('goblet-squat_phase2');
  assert.equal(getSavedWeight('goblet-squat_phase2'), null);
});

test('localSyncKeys lists live weight/last-phase keys and tombstoned keys', () => {
  kvSet(storageKey('goblet-squat_phase2'), '20');
  kvDelete(storageKey('bench-press_phase1')); // tombstone only, never had a live value
  const keys = localSyncKeys();
  assert.ok(keys.has(storageKey('goblet-squat_phase2')));
  assert.ok(keys.has(storageKey('bench-press_phase1')));
});

test('migrateMeta stamps un-timestamped existing keys as now, without touching already-timestamped ones', () => {
  // Simulate pre-existing localStorage data with no meta sidecar at all.
  fakeLocalStorage.setItem(storageKey('goblet-squat_phase2'), '20');
  const before = getMeta(storageKey('goblet-squat_phase2'));
  assert.equal(before, null);

  migrateMeta();
  const after = getMeta(storageKey('goblet-squat_phase2'));
  assert.ok(after && !Number.isNaN(Date.parse(after.updated_at)));
  assert.equal(after?.deleted, false);

  // A key that already has meta must not be re-stamped.
  kvSet(storageKey('bench-press_phase1'), '10');
  const stamped = getMeta(storageKey('bench-press_phase1'))!;
  migrateMeta();
  assert.deepEqual(getMeta(storageKey('bench-press_phase1')), stamped);
});

test('migrateLegacyKeys moves an override to the canonical slug and tombstones the old key', () => {
  kvSet(storageKey('db-step-up-onto-step_phase0'), '15');
  migrateLegacyKeys();

  assert.equal(getSavedWeight('db-step-up_phase0'), '15', 'value moved to the canonical slug');
  assert.equal(getRaw(storageKey('db-step-up-onto-step_phase0')), null, 'old raw value gone');
  assert.equal(getMeta(storageKey('db-step-up-onto-step_phase0'))?.deleted, true, 'old key tombstoned');
});

test('migrateLegacyKeys does not overwrite an existing canonical value, but still tombstones the old key', () => {
  kvSet(storageKey('single-arm-row-tempo_phase3'), 'canonical-value');
  kvSet(storageKey('single-arm-row_phase3'), 'legacy-value');

  migrateLegacyKeys();

  assert.equal(
    getSavedWeight('single-arm-row-tempo_phase3'),
    'canonical-value',
    'canonical value must win, not be clobbered by the legacy one',
  );
  assert.equal(getRaw(storageKey('single-arm-row_phase3')), null, 'legacy key is still removed');
});
