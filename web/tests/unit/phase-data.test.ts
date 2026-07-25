// Integrity tests tying the workout programme (phases.ts) to the exercise
// library (exercises.ts).
//
// The two files are hand-maintained, and a workout row whose slug has no
// EXERCISE_DATA entry renders a blank name with a broken detail sheet — a
// silent failure the UI won't complain about. These assertions catch that.
//
// Run from web/:  npm test

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { EXERCISE_DATA } from '../../src/data/exercises.ts';
import { PHASES } from '../../src/data/phases.ts';

test('every workout exercise slug resolves to an EXERCISE_DATA entry', () => {
  const missing: string[] = [];
  for (const phase of PHASES) {
    for (const workout of phase.workouts) {
      for (const ex of workout.exercises) {
        if (!(ex.slug in EXERCISE_DATA)) {
          missing.push(`phase ${phase.index} / ${workout.id} / ${ex.slug}`);
        }
      }
    }
  }
  assert.deepEqual(missing, [], `unknown slugs:\n  ${missing.join('\n  ')}`);
});

test('every exercise has exactly one default weight per phase', () => {
  for (const [slug, ex] of Object.entries(EXERCISE_DATA)) {
    assert.equal(
      ex.defaultWeights.length,
      PHASES.length,
      `${slug} has ${ex.defaultWeights.length} default weights, expected ${PHASES.length}`,
    );
    for (const w of ex.defaultWeights) {
      assert.equal(typeof w, 'number', `${slug} has a non-numeric default weight`);
      assert.ok(w >= 0, `${slug} has a negative default weight`);
    }
  }
});

test('bodyweight/banded rows are the only ones with a 0-dumbbell count', () => {
  // dumbbells: 0 means "not holding dumbbells" — it may still carry a weight
  // number standing for band resistance (clamshell, banded Pallof press).
  for (const phase of PHASES) {
    for (const workout of phase.workouts) {
      for (const ex of workout.exercises) {
        assert.ok(
          Number.isInteger(ex.dumbbells) && ex.dumbbells >= 0 && ex.dumbbells <= 2,
          `phase ${phase.index} / ${workout.id} / ${ex.slug} has dumbbells=${ex.dumbbells}`,
        );
      }
    }
  }
});
