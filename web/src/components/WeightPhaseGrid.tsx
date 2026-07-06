import { useEffect, useRef, useState } from 'react';
import { useWeight } from '@/hooks/useWeight';
import { cn } from '@/lib/utils';

const PHASE_LABELS = ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'];

function PhaseCell({
  slug,
  phaseIdx,
  isCurrent,
}: {
  slug: string;
  phaseIdx: number;
  isCurrent: boolean;
}) {
  const w = useWeight(slug, phaseIdx);
  const isBW = w.defaultWeight === 0;
  const committed = w.override ?? (isBW ? '' : String(w.defaultWeight));
  const [draft, setDraft] = useState(committed);
  const editing = useRef(false);

  // Track external changes (sync pull, edits elsewhere) while not editing.
  useEffect(() => {
    if (!editing.current) setDraft(committed);
  }, [committed]);

  const commit = () => {
    editing.current = false;
    const val = draft.trim();
    if (val === '') {
      w.clear(); // cleared — remove override (tombstoned so the clear syncs)
    } else {
      const num = parseFloat(val);
      if (isNaN(num) || num < 0) {
        setDraft(committed);
        return;
      }
      w.save(num);
      setDraft(String(num));
    }
  };

  return (
    <div className="rounded bg-surface2 px-2 py-1.5 text-center">
      <div className="font-mono text-[0.58rem] tracking-wider text-muted uppercase">
        {PHASE_LABELS[phaseIdx]}
      </div>
      <input
        type="number"
        step="0.5"
        min="0"
        disabled={isBW}
        placeholder={isBW ? 'BW' : 'kg'}
        value={draft}
        onFocus={() => (editing.current = true)}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            e.currentTarget.blur();
          }
          if (e.key === 'Escape') {
            e.stopPropagation(); // cancel the edit, don't close the overlay
            editing.current = false;
            setDraft(committed);
            e.currentTarget.blur();
          }
        }}
        className={cn(
          'mt-0.5 w-full rounded-xs border border-transparent bg-transparent px-1 py-0.5 text-center font-mono text-[0.8rem] font-medium text-foreground transition-colors outline-none',
          'hover:not-disabled:border-border hover:not-disabled:bg-bg focus:border-primary focus:bg-bg',
          'disabled:cursor-default disabled:opacity-60',
          '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
          isCurrent && 'text-green',
          w.isCustom && 'text-orange-dim',
          isBW && 'text-muted',
        )}
        aria-label={`${PHASE_LABELS[phaseIdx]} weight`}
      />
    </div>
  );
}

/** Editable "weights across the year" grid (detail sheet + library). */
export function WeightPhaseGrid({ slug, currentPhase }: { slug: string; currentPhase?: number }) {
  return (
    <div className="mt-1 grid grid-cols-4 gap-1.5">
      {PHASE_LABELS.map((_, i) => (
        <PhaseCell key={i} slug={slug} phaseIdx={i} isCurrent={i === currentPhase} />
      ))}
    </div>
  );
}
