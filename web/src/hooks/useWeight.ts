import { useSyncExternalStore, useCallback } from 'react';
import { EXERCISE_DATA } from '@/data/exercises';
import { clearSavedWeight, getSavedWeight, setSavedWeight, subscribe } from '@/lib/storage';

export interface WeightState {
  /** Saved override for this (slug, phase), or null. */
  override: string | null;
  /** Built-in default for this phase (0 = bodyweight). */
  defaultWeight: number;
  /** True when there is no override and the default is 0. */
  isBodyweight: boolean;
  /** True when an override is saved. */
  isCustom: boolean;
  /** Number to prefill an editor with (override, else default, else ''). */
  editValue: string;
  save: (val: number) => void;
  clear: () => void;
}

/**
 * Live view of one exercise's weight for one phase.
 *
 * Reads through localStorage via useSyncExternalStore, so every badge/cell
 * showing the same key re-renders on any edit anywhere (this replaces the
 * legacy refreshWeightBadges() DOM walk). The server snapshot is null so the
 * SSG build and the first client render both show the default — no hydration
 * mismatch.
 */
export function useWeight(slug: string, phaseIdx: number): WeightState {
  const name = `${slug}_phase${phaseIdx}`;
  const override = useSyncExternalStore(
    subscribe,
    () => getSavedWeight(name),
    () => null,
  );
  const defaultWeight = (EXERCISE_DATA as Record<string, { defaultWeights: readonly number[] }>)[
    slug
  ]?.defaultWeights[phaseIdx] ?? 0;

  const save = useCallback((val: number) => setSavedWeight(name, val), [name]);
  const clear = useCallback(() => clearSavedWeight(name), [name]);

  return {
    override,
    defaultWeight,
    isBodyweight: override === null && defaultWeight === 0,
    isCustom: override !== null,
    editValue: override ?? (defaultWeight === 0 ? '' : String(defaultWeight)),
    save,
    clear,
  };
}

/** Badge text exactly as the legacy app rendered it. */
export function badgeText(state: WeightState, dumbbells: number): string {
  if (state.override !== null) {
    return dumbbells > 0 ? `${state.override}kg × ${dumbbells}` : `${state.override}kg`;
  }
  return state.defaultWeight === 0 ? 'bodyweight' : `${state.defaultWeight}kg × ${dumbbells}`;
}
