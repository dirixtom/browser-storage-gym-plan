import { useEffect, useRef, useState } from 'react';
import { XIcon } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Phase, Workout } from '@/data/phases';
import { badgeText, useWeight } from '@/hooks/useWeight';
import { cn } from '@/lib/utils';

export interface FullscreenTarget {
  phase: Phase;
  workout: Workout;
}

/**
 * One row in the big "tap to train" list. The weight badge is tap-to-edit:
 * an inline number input commits on blur/Enter and cancels on Escape
 * (stopPropagation so Escape doesn't close the whole view — legacy behavior).
 */
function FsRow({
  index,
  slug,
  name,
  setsReps,
  dumbbells,
  phaseIdx,
}: {
  index: number;
  slug: string;
  name: string;
  setsReps: string;
  dumbbells: number;
  phaseIdx: number;
}) {
  const w = useWeight(slug, phaseIdx);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  const startEdit = () => {
    if (w.isBodyweight) return; // bodyweight rows are not editable
    setDraft(w.override ?? (w.defaultWeight > 0 ? String(w.defaultWeight) : ''));
    setEditing(true);
  };

  const commit = () => {
    setEditing(false);
    const val = parseFloat(draft);
    if (!isNaN(val) && val >= 0) w.save(val);
  };

  return (
    <li className="grid grid-cols-[36px_1fr_auto_auto] items-center gap-5 border-b border-border px-2 py-5 last:border-b-0 max-md:grid-cols-[36px_1fr] max-md:grid-rows-[auto_auto] max-md:gap-x-4 max-md:gap-y-2.5 max-md:px-1 max-md:py-4">
      <span className="font-mono text-[1.1rem] font-medium text-muted max-md:row-start-1 max-md:text-[1.2rem]">
        {index + 1}
      </span>
      <span className="text-[1.6rem] leading-snug font-medium text-foreground max-md:col-start-2 max-md:row-start-1 max-md:text-[1.5rem]">
        {name}
      </span>
      {editing ? (
        <input
          ref={inputRef}
          type="number"
          step="0.5"
          min="0"
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              e.currentTarget.blur();
            }
            if (e.key === 'Escape') {
              e.stopPropagation(); // cancel edit only; keep the view open
              setEditing(false);
            }
          }}
          className="w-[110px] rounded-[5px] border border-orange bg-surface2 px-2.5 py-1.5 text-center font-mono text-[1.15rem] text-foreground outline-none max-md:col-start-2 max-md:row-start-2 max-md:justify-self-start [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          aria-label={`Weight for ${name} (kg)`}
        />
      ) : (
        <button
          onClick={startEdit}
          className={cn(
            'rounded-[5px] border px-3.5 py-[7px] font-mono text-[1.15rem] whitespace-nowrap transition-colors select-none max-md:col-start-2 max-md:row-start-2 max-md:justify-self-start max-md:px-3 max-md:py-1.5',
            w.isBodyweight
              ? 'cursor-default border-border bg-surface text-muted'
              : w.isCustom
                ? 'cursor-pointer border-orange-dim/25 bg-orange-dim/8 text-orange-dim hover:border-orange-dim/45 hover:bg-orange-dim/18'
                : 'cursor-pointer border-green/25 bg-green/8 text-green hover:border-green/45 hover:bg-green/18',
          )}
        >
          {badgeText(w, dumbbells)}
        </button>
      )}
      <span className="min-w-[90px] text-right font-mono text-[1.15rem] whitespace-nowrap text-orange-dim max-md:col-start-2 max-md:row-start-2 max-md:min-w-0 max-md:justify-self-end max-md:text-[1.2rem]">
        {setsReps}
      </span>
    </li>
  );
}

export function FullscreenTrainView({
  target,
  onClose,
}: {
  target: FullscreenTarget | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!target} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="overflow-y-auto bg-bg px-6 py-8 pb-[calc(2rem+env(safe-area-inset-bottom))] max-md:px-5 max-md:py-6">
        {target && (
          <div className="mx-auto max-w-[760px]">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="flex-1">
                <DialogDescription className="mb-2 font-mono text-[0.75rem] tracking-wider text-orange uppercase max-md:text-[0.85rem]">
                  {target.phase.title} · {target.phase.monthsLabel} · {target.workout.badge}
                </DialogDescription>
                <DialogTitle className="text-[2rem] leading-tight font-semibold tracking-tight text-foreground">
                  {target.workout.name}
                </DialogTitle>
              </div>
              <DialogClose className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-muted hover:text-foreground">
                <XIcon className="size-5" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>
            <ul>
              {target.workout.exercises.map((ex, i) => (
                <FsRow
                  key={`${ex.slug}-${i}`}
                  index={i}
                  slug={ex.slug}
                  name={ex.name}
                  setsReps={ex.setsReps}
                  dumbbells={ex.dumbbells}
                  phaseIdx={target.phase.index}
                />
              ))}
            </ul>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
