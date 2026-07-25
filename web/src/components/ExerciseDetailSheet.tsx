import { useEffect, useRef, useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { EXERCISE_DATA, type Exercise } from '@/data/exercises';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useWeight } from '@/hooks/useWeight';
import { WeightPhaseGrid } from './WeightPhaseGrid';

export interface DetailTarget {
  slug: string;
  phase: number;
  dumbbells: number;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 mb-1.5 font-mono text-[0.62rem] tracking-widest text-muted uppercase first:mt-0">
      {children}
    </div>
  );
}

function DetailBody({ target }: { target: DetailTarget }) {
  const data = (EXERCISE_DATA as Record<string, Exercise>)[target.slug];
  const w = useWeight(target.slug, target.phase);
  const [draft, setDraft] = useState(w.editValue);
  const [savedFlash, setSavedFlash] = useState(false);
  const flashTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Keep the input in step with edits made in the phase grid below (legacy
  // commitPhaseInput synced the main input when the same phase was edited).
  useEffect(() => {
    setDraft(w.editValue);
  }, [w.editValue]);

  useEffect(() => () => clearTimeout(flashTimer.current), []);

  if (!data) return null;

  const save = () => {
    const parsed = parseFloat(draft);
    if (!draft || isNaN(parsed) || parsed < 0) return;
    w.save(parsed);
    setSavedFlash(true);
    clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setSavedFlash(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 pb-6">
      <SectionLabel>How to do it</SectionLabel>
      <p className="text-[0.88rem] leading-relaxed text-foreground">{data.desc}</p>

      <SectionLabel>Tip</SectionLabel>
      <p className="rounded-md bg-surface2 px-3 py-2.5 text-[0.85rem] leading-relaxed text-muted">
        {data.tips}
      </p>

      <SectionLabel>Your weight — current phase</SectionLabel>
      <div className="mt-1 flex items-center gap-2.5">
        <input
          type="number"
          step="0.5"
          min="0"
          placeholder={w.defaultWeight === 0 && w.override === null ? 'bodyweight' : 'kg'}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save();
          }}
          className="w-[90px] rounded border border-border bg-surface2 px-2.5 py-1.5 text-center font-mono text-[0.85rem] text-foreground outline-none focus:border-orange [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          aria-label="Weight for current phase (kg)"
        />
        {target.dumbbells > 0 && (
          <span className="font-mono text-[0.75rem] text-muted">
            × {target.dumbbells} dumbbell{target.dumbbells > 1 ? 's' : ''}
          </span>
        )}
        <button
          className="cursor-pointer rounded bg-orange px-3.5 py-1.5 font-mono text-[0.72rem] text-white transition-opacity hover:opacity-85"
          onClick={save}
        >
          Save
        </button>
        {savedFlash && <span className="font-mono text-[0.68rem] text-green">Saved ✓</span>}
      </div>

      <SectionLabel>Weights across the year</SectionLabel>
      <WeightPhaseGrid slug={target.slug} currentPhase={target.phase} />
    </div>
  );
}

export function ExerciseDetailSheet({
  target,
  onClose,
}: {
  target: DetailTarget | null;
  onClose: () => void;
}) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const data = target ? (EXERCISE_DATA as Record<string, Exercise>)[target.slug] : undefined;
  // Modal title strips the "(tempo)" suffix, like the legacy openModal.
  const displayName = data?.name.replace(' (tempo)', '') ?? '';

  return (
    <Sheet open={!!target} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side={isMobile ? 'bottom' : 'right'} className={isMobile ? 'max-h-[85dvh]' : ''}>
        {target && data && (
          <>
            <SheetHeader>
              <SheetTitle className="text-[1.05rem] leading-tight">{displayName}</SheetTitle>
              <SheetDescription className="mt-1 font-mono text-[0.65rem] tracking-wider text-orange uppercase">
                {data.muscles}
              </SheetDescription>
            </SheetHeader>
            <DetailBody target={target} />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
