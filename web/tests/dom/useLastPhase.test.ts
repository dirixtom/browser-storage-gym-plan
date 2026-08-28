import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { FIRST_ACTIVE_PHASE } from '@/data/phases';
import { useLastPhase } from '@/hooks/useLastPhase';
import { LAST_PHASE_KEY } from '@/lib/storage';

describe('useLastPhase', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('defaults to the first phase not marked completed when nothing is saved', () => {
    const { result } = renderHook(() => useLastPhase());
    expect(result.current[0]).toBe(FIRST_ACTIVE_PHASE);
  });

  it('restores a previously saved phase after mount, without bumping its sync timestamp', () => {
    localStorage.setItem(LAST_PHASE_KEY, '2');
    const { result } = renderHook(() => useLastPhase());
    expect(result.current[0]).toBe(2);
    // The restore is a read-only mount effect (mirrors legacy showPhase(i, false)):
    // it must not have written a meta sidecar, i.e. not gone through kvSet.
    expect(localStorage.getItem('kilo_meta_' + LAST_PHASE_KEY)).toBeNull();
  });

  it('ignores an out-of-range saved value and keeps the default', () => {
    localStorage.setItem(LAST_PHASE_KEY, '9');
    const { result } = renderHook(() => useLastPhase());
    expect(result.current[0]).toBe(FIRST_ACTIVE_PHASE);
  });

  it('setPhase updates state and persists via kvSet (bumps the sync timestamp)', () => {
    const { result } = renderHook(() => useLastPhase());
    act(() => result.current[1](3));
    expect(result.current[0]).toBe(3);
    expect(localStorage.getItem(LAST_PHASE_KEY)).toBe('3');
    expect(localStorage.getItem('kilo_meta_' + LAST_PHASE_KEY)).not.toBeNull();
  });
});
