import { useEffect, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  api,
  pushItems,
  reconcileWithRemote,
  setSyncEnabled,
  type SyncItem,
} from '@/lib/sync';
import { migrateLegacyKeys, migrateMeta } from '@/lib/storage';

interface Me {
  loggedIn: boolean;
  github_login?: string;
  /** False when no backend answered — hide the auth button entirely. */
  available: boolean;
}

/**
 * Who am I? Fails quietly: with no backend reachable (static deploy) this
 * resolves to { available: false } and the app stays local-only, exactly like
 * the legacy app left its Sign-in button hidden.
 */
export function useMe() {
  return useQuery<Me>({
    queryKey: ['me'],
    staleTime: Infinity,
    queryFn: async () => {
      try {
        const res = await api('/api/me');
        if (!res.ok) return { loggedIn: false, available: false };
        const me = await res.json();
        return { loggedIn: !!me.loggedIn, github_login: me.github_login, available: true };
      } catch {
        return { loggedIn: false, available: false };
      }
    },
  });
}

export function login(): void {
  window.location.href = '/auth/github/login';
}

export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      try {
        await api('/auth/logout', { method: 'POST' });
      } catch {
        /* ignore */
      }
    },
    onSettled: () => {
      qc.setQueryData<Me>(['me'], (old) => ({ loggedIn: false, available: old?.available ?? true }));
    },
  });
}

/**
 * Bidirectional sync driver. While logged in:
 *  - pulls /api/sync on mount and on window focus (TanStack's refetchOnWindowFocus
 *    replaces the legacy manual focus listener),
 *  - merges newer-wins into localStorage (components re-render via the storage
 *    subscription), and pushes any local items that are newer.
 * Local edits flow through the module-level 800ms debounced push in lib/sync.ts,
 * which this hook enables/disables based on login state.
 */
export function useSync(): void {
  const { data: me } = useMe();
  const loggedIn = !!me?.loggedIn;
  const migrated = useRef(false);

  // One-time migrations before the first reconcile (mirrors legacy init order).
  if (typeof window !== 'undefined' && !migrated.current) {
    migrated.current = true;
    migrateMeta();
    migrateLegacyKeys();
  }

  useEffect(() => {
    setSyncEnabled(loggedIn);
  }, [loggedIn]);

  const reconciling = useRef(false);
  useQuery({
    queryKey: ['sync'],
    enabled: loggedIn,
    refetchOnWindowFocus: true,
    staleTime: 0,
    queryFn: async () => {
      if (reconciling.current) return null; // mirrors the legacy `busy` guard
      reconciling.current = true;
      try {
        const res = await api('/api/sync');
        if (!res.ok) return null;
        const remote: SyncItem[] = (await res.json()).items || [];
        const toPush = reconcileWithRemote(remote);
        await pushItems(toPush);
        return { pulled: remote.length, pushed: toPush.length };
      } catch {
        return null; // backend unreachable — stay local-only
      } finally {
        reconciling.current = false;
      }
    },
  });
}
