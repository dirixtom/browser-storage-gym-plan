import { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon, XIcon } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { EXERCISE_DATA, type Exercise } from '@/data/exercises';
import { EFFORT_CUES, FS_GUIDE_DETAILS } from '@/data/guide';
import type { Phase, Workout, WorkoutExercise } from '@/data/phases';
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
 * The exercise name is also tap-to-expand, revealing the how-to/tip so lifters
 * can check form mid-set without leaving this view.
 */
function FsRow({
  index,
  exercise,
  phaseIdx,
}: {
  index: number;
  exercise: WorkoutExercise;
  phaseIdx: number;
}) {
  const { slug, name, setsReps, dumbbells, restPause } = exercise;
  const info = (EXERCISE_DATA as Record<string, Exercise>)[slug];
  const w = useWeight(slug, phaseIdx);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [expanded, setExpanded] = useState(false);
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
    <li className="grid grid-cols-[36px_1fr_auto] items-center gap-4 border-b border-border px-2 py-5 last:border-b-0 max-md:grid-cols-[36px_1fr] max-md:grid-rows-[auto_auto] max-md:gap-x-4 max-md:gap-y-2.5 max-md:px-1 max-md:py-4">
      <span className="font-mono text-[1.1rem] font-medium text-muted max-md:row-start-1 max-md:text-[1.2rem]">
        {index + 1}
      </span>
      {info ? (
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
          className="flex min-w-0 cursor-pointer items-baseline gap-1.5 text-left text-[1.6rem] leading-snug font-medium text-foreground max-md:col-start-2 max-md:row-start-1 max-md:text-[1.5rem]"
        >
          {name}
          <ChevronDownIcon
            className={cn('size-4 shrink-0 text-muted transition-transform', expanded && 'rotate-180')}
          />
        </button>
      ) : (
        <span className="min-w-0 text-[1.6rem] leading-snug font-medium text-foreground max-md:col-start-2 max-md:row-start-1 max-md:text-[1.5rem]">
          {name}
        </span>
      )}
      <span className="flex items-center gap-3 max-md:col-start-2 max-md:row-start-2 max-md:w-full max-md:justify-between">
        <span className="flex items-center gap-2">
          <span className="flex w-9 shrink-0 justify-center">
            {restPause && (
              <span
                className="rounded-xs border border-orange/40 bg-orange/10 px-1 font-mono text-[0.65rem] text-orange"
                title="Rest-pause last set: failure → rest 15–20 sec → failure → rest 15–20 sec → failure, 2–3 mini-sets"
              >
                RP
              </span>
            )}
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
              className="w-[124px] rounded-[5px] border border-orange bg-surface2 px-2 py-1.5 text-right font-mono text-[1.05rem] text-foreground outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              aria-label={`Weight for ${name} (kg)`}
            />
          ) : (
            <button
              onClick={startEdit}
              className={cn(
                'w-[124px] rounded-[5px] border px-2 py-[7px] text-right font-mono text-[1.05rem] whitespace-nowrap transition-colors select-none',
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
        </span>
        <span className="w-[94px] shrink-0 text-right font-mono text-[1.05rem] whitespace-nowrap text-orange-dim">
          {setsReps}
        </span>
      </span>
      {expanded && info && (
        <div className="col-span-3 max-md:col-span-2 -mt-1 pb-1">
          <div className="mb-1 font-mono text-[0.62rem] tracking-widest text-muted uppercase">
            How to do it
          </div>
          <p className="text-[0.9rem] leading-relaxed text-foreground">{info.desc}</p>
          <div className="mt-3 mb-1 font-mono text-[0.62rem] tracking-widest text-muted uppercase">Tip</div>
          <p className="rounded-md bg-surface2 px-3 py-2.5 text-[0.85rem] leading-relaxed text-muted">
            {info.tips}
          </p>
        </div>
      )}
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
  const [showGuide, setShowGuide] = useState(false);

  return (
    <Dialog
      open={!!target}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="overflow-y-auto bg-bg px-6 py-8 pb-[calc(2rem+env(safe-area-inset-bottom))] max-md:px-5 max-md:py-6">
        {target && (
          <div key={target.workout.id} className="mx-auto max-w-[760px]">
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

            <div className="mb-6 rounded-md border-l-2 border-orange bg-surface px-4 py-2.5">
              <button
                type="button"
                aria-expanded={showGuide}
                onClick={() => setShowGuide((v) => !v)}
                className="flex w-full cursor-pointer items-center justify-between gap-3 text-left font-mono text-[0.8rem] leading-relaxed text-orange-dim"
              >
                <span>{EFFORT_CUES[target.phase.index] ?? EFFORT_CUES[0]}</span>
                <ChevronDownIcon
                  className={cn('size-4 shrink-0 transition-transform', showGuide && 'rotate-180')}
                />
              </button>
              {showGuide && (
                <ul className="mt-2.5 flex flex-col gap-1.5 border-t border-border pt-2.5">
                  {(FS_GUIDE_DETAILS[target.phase.index] ?? FS_GUIDE_DETAILS[0]).map((line, i) => (
                    <li key={i} className="text-[0.8rem] leading-relaxed text-muted">
                      {line}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <ul>
              {target.workout.exercises.map((ex, i) => (
                <FsRow key={`${ex.slug}-${i}`} index={i} exercise={ex} phaseIdx={target.phase.index} />
              ))}
            </ul>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
