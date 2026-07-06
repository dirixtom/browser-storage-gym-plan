// Wire-format regression tests for the storage key transform.
//
// These keys live in users' localStorage AND in the Postgres kv_item table.
// If any assertion here fails, the change would orphan existing data — do not
// "fix" the test; fix the code.
//
// Run from web/:  npm test

import assert from 'node:assert/strict';
import { test } from 'node:test';

// storage.ts guards window access at call time, so importing it under Node is
// safe — but it's TypeScript. Re-declare the transform here EXACTLY as both
// the legacy app (index.html) and src/lib/storage.ts define it, and lock the
// source file to the same text below.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const storageKey = (name) => 'kilo_weight_' + name.toLowerCase().replace(/[^a-z0-9]/g, '_');

test('storageKey matches the legacy transform byte-for-byte', () => {
  assert.equal(storageKey('goblet-squat_phase2'), 'kilo_weight_goblet_squat_phase2');
  assert.equal(storageKey('db-bent-over-row_phase0'), 'kilo_weight_db_bent_over_row_phase0');
  assert.equal(storageKey('DB-Bulgarian-Split-Squat_phase3'), 'kilo_weight_db_bulgarian_split_squat_phase3');
  assert.equal(storageKey('v-up-with-db-pass_phase1'), 'kilo_weight_v_up_with_db_pass_phase1');
});

test('src/lib/storage.ts contains the exact same transform', () => {
  const src = fs.readFileSync(
    path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'lib', 'storage.ts'),
    'utf8',
  );
  assert.match(
    src,
    /'kilo_weight_' \+ name\.toLowerCase\(\)\.replace\(\/\[\^a-z0-9\]\/g, '_'\)/,
    'storage.ts storageKey() transform changed — this breaks every existing key',
  );
  assert.match(src, /META_PREFIX = 'kilo_meta_'/);
  assert.match(src, /SYNC_KEY_RE = \/\^\(kilo_weight_\|kilo_last_phase\$\)\//);
});
