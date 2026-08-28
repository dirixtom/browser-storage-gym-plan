import { PHASES } from '@/data/phases';
import { cn } from '@/lib/utils';

export function PhaseTabs({
  current,
  onSelect,
}: {
  current: number;
  onSelect: (i: number) => void;
}) {
  return (
    <nav
      className="mx-auto flex max-w-[900px] flex-wrap gap-1.5 px-8 pt-8 max-sm:gap-1 max-sm:px-4"
      aria-label="Phase navigation"
    >
      {PHASES.map((phase) => {
        const active = phase.index === current;
        const done = !!phase.completed && !active;
        return (
          <button
            key={phase.index}
            data-phase={phase.index}
            onClick={() => onSelect(phase.index)}
            aria-current={active ? 'page' : undefined}
            data-completed={phase.completed ? '' : undefined}
            title={phase.completed ? `${phase.tabName} — completed` : undefined}
            className={cn(
              'inline-flex cursor-pointer items-baseline gap-2 rounded-md border px-3.5 py-2 font-sans text-[0.85rem] whitespace-nowrap transition-all max-sm:flex-auto max-sm:justify-center max-sm:px-2.5 max-sm:py-[7px]',
              active
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-transparent text-muted hover:border-muted hover:bg-surface hover:text-foreground',
              done && 'border-border/50 text-muted/50 hover:text-muted',
            )}
          >
            <span
              className={cn(
                'font-mono text-[0.7rem] max-sm:text-[0.85rem]',
                active ? 'font-semibold text-primary-foreground' : 'max-sm:text-foreground',
              )}
            >
              P{phase.index + 1}
            </span>
            <span className="max-sm:hidden">{phase.tabName}</span>
            {phase.completed && (
              <span
                aria-label="completed"
                className={cn('font-mono text-[0.7rem]', active ? 'opacity-80' : 'opacity-50')}
              >
                ✓
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
