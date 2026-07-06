import { login, useLogout, useMe } from '@/hooks/useSync';

/**
 * Sign in / Sign out. Hidden entirely when no backend answered /api/me,
 * mirroring the legacy app (static deploys never show a sync button).
 */
export function AuthButton() {
  const { data: me } = useMe();
  const logout = useLogout();

  if (!me?.available) return null;

  return (
    <button
      className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border bg-surface px-3.5 py-2 font-mono text-[0.72rem] tracking-wide text-foreground uppercase transition-all hover:border-orange hover:text-orange-dim"
      onClick={() => (me.loggedIn ? logout.mutate() : login())}
      title={
        me.loggedIn ? 'Synced — click to sign out' : 'Sign in with GitHub to sync across devices'
      }
    >
      {me.loggedIn ? 'Sign out' : 'Sign in'}
    </button>
  );
}
