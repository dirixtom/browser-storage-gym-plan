import { useEffect, useState } from 'react';
import { getRaw, kvSet, LAST_PHASE_KEY } from '@/lib/storage';

/**
 * Current phase index (0–3), restored from kilo_last_phase after mount.
 *
 * The initial restore reads WITHOUT writing so it doesn't bump the sync
 * timestamp (mirrors the legacy showPhase(i, false)); only explicit user
 * switches persist. Remote reconcile can also move the phase: we re-read on
 * storage-change notifications only for the initial value, matching the
 * legacy refreshUI() which re-applied kilo_last_phase after a sync pull.
 */
export function useLastPhase(): [number, (i: number) => void] {
  const [phase, setPhaseState] = useState(0);

  useEffect(() => {
    const saved = getRaw(LAST_PHASE_KEY);
    if (saved !== null) {
      const i = parseInt(saved, 10);
      if (i >= 0 && i <= 3) setPhaseState(i);
    }
  }, []);

  const setPhase = (i: number) => {
    setPhaseState(i);
    kvSet(LAST_PHASE_KEY, String(i));
  };

  return [phase, setPhase];
}
