import { fakeLocalStorage } from '../support/local-storage-mock';
import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { getMeta, getRaw, kvSet } from '../../src/lib/storage';
import {
  applyRemote,
  collectItem,
  flush,
  pushItems,
  reconcileWithRemote,
  setSyncEnabled,
  type SyncItem,
} from '../../src/lib/sync';

const originalFetch = globalThis.fetch;

beforeEach(() => {
  fakeLocalStorage.clear();
  setSyncEnabled(false);
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  setSyncEnabled(false);
});

test('collectItem snapshots the wire format for an unset key', () => {
  const item = collectItem('kilo_weight_never_set');
  assert.equal(item.value, null);
  assert.equal(item.deleted, false);
  assert.equal(item.updated_at, new Date(0).toISOString());
});

test('collectItem reflects a live kvSet value and its meta timestamp', () => {
  kvSet('kilo_weight_goblet_squat_phase2', '20');
  const item = collectItem('kilo_weight_goblet_squat_phase2');
  assert.equal(item.value, '20');
  assert.equal(item.deleted, false);
  assert.equal(item.updated_at, getMeta('kilo_weight_goblet_squat_phase2')?.updated_at);
});

test('applyRemote applies a strictly newer remote item and reports true', () => {
  kvSet('k', 'old');
  const remote: SyncItem = { item_key: 'k', value: 'new', deleted: false, updated_at: '2999-01-01T00:00:00.000Z' };
  const applied = applyRemote(remote);
  assert.equal(applied, true);
  assert.equal(getRaw('k'), 'new');
});

test('applyRemote ignores an older-or-equal remote item and reports false', () => {
  kvSet('k', 'local-value');
  const localMeta = getMeta('k')!;
  const sameAge: SyncItem = { item_key: 'k', value: 'remote-value', deleted: false, updated_at: localMeta.updated_at };
  const applied = applyRemote(sameAge);
  assert.equal(applied, false, 'a tie must not let remote overwrite local (avoids update loops)');
  assert.equal(getRaw('k'), 'local-value');
});

test('reconcileWithRemote: remote-only key is applied locally, not queued for push', () => {
  const remote: SyncItem[] = [
    { item_key: 'kilo_weight_only_remote_phase0', value: '30', deleted: false, updated_at: new Date().toISOString() },
  ];
  const toPush = reconcileWithRemote(remote);
  assert.equal(toPush.length, 0);
  assert.equal(getRaw('kilo_weight_only_remote_phase0'), '30');
});

test('reconcileWithRemote: local-only key (newer than -Infinity) is queued for push, not clobbered', () => {
  kvSet('kilo_weight_only_local_phase0', '11');
  const toPush = reconcileWithRemote([]);
  assert.equal(toPush.length, 1);
  assert.equal(toPush[0].item_key, 'kilo_weight_only_local_phase0');
  assert.equal(getRaw('kilo_weight_only_local_phase0'), '11');
});

test('reconcileWithRemote: newer remote wins over an older local value', () => {
  kvSet('kilo_weight_race_phase0', 'local-old');
  const remote: SyncItem[] = [
    { item_key: 'kilo_weight_race_phase0', value: 'remote-new', deleted: false, updated_at: '2999-01-01T00:00:00.000Z' },
  ];
  const toPush = reconcileWithRemote(remote);
  assert.equal(toPush.length, 0);
  assert.equal(getRaw('kilo_weight_race_phase0'), 'remote-new');
});

test('reconcileWithRemote: newer local wins over an older remote value', () => {
  kvSet('kilo_weight_race_phase0', 'local-new');
  const remote: SyncItem[] = [
    { item_key: 'kilo_weight_race_phase0', value: 'remote-old', deleted: false, updated_at: '1970-01-02T00:00:00.000Z' },
  ];
  const toPush = reconcileWithRemote(remote);
  assert.equal(toPush.length, 1);
  assert.equal(getRaw('kilo_weight_race_phase0'), 'local-new', 'must not be overwritten by the stale remote value');
});

function fakeFetch(handler: (url: string, init?: RequestInit) => Response | Promise<Response>) {
  globalThis.fetch = ((url: string, init?: RequestInit) => Promise.resolve(handler(url, init))) as typeof fetch;
}

test('flush pushes queued edits and adopts the server-returned timestamp', async () => {
  setSyncEnabled(true);
  kvSet('kilo_weight_flush_phase0', '99'); // enqueues via registerSyncQueue

  let sentBody: any = null;
  const serverTs = '2999-06-01T00:00:00.000Z';
  fakeFetch((url, init) => {
    sentBody = JSON.parse(init!.body as string);
    return new Response(
      JSON.stringify({ items: sentBody.items.map((i: any) => ({ ...i, updated_at: serverTs })) }),
      { status: 200 },
    );
  });

  await flush();

  assert.equal(sentBody.items[0].item_key, 'kilo_weight_flush_phase0');
  assert.equal(getMeta('kilo_weight_flush_phase0')?.updated_at, serverTs);
});

test('flush re-queues on a network failure so the next flush retries', async () => {
  setSyncEnabled(true);
  kvSet('kilo_weight_retry_phase0', '5');

  fakeFetch(() => {
    throw new Error('offline');
  });
  await flush(); // swallows the error, keeps the key pending

  let sentBody: any = null;
  fakeFetch((url, init) => {
    sentBody = JSON.parse(init!.body as string);
    return new Response(JSON.stringify({ items: [] }), { status: 200 });
  });
  await flush();

  assert.ok(sentBody, 'the retried flush must actually send the previously-failed key');
  assert.equal(sentBody.items[0].item_key, 'kilo_weight_retry_phase0');
});

test('pushItems silently swallows a network failure (offline push from reconcile)', async () => {
  fakeFetch(() => {
    throw new Error('offline');
  });
  await assert.doesNotReject(() => pushItems([collectItem('kilo_weight_whatever_phase0')]));
});
