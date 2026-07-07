import { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { PHASES, type Workout, type WorkoutExercise } from '@/data/phases';
import { useLastPhase } from '@/hooks/useLastPhase';
import { useSync } from '@/hooks/useSync';
import { queryClient } from '@/lib/queryClient';
import { AuthButton } from './AuthButton';
import { ExerciseDetailSheet, type DetailTarget } from './ExerciseDetailSheet';
import { ExerciseLibrary } from './ExerciseLibrary';
import { FullscreenTrainView, type FullscreenTarget } from './FullscreenTrainView';
import { PhaseSection } from './PhaseSection';
import { PhaseTabs } from './PhaseTabs';
import { TrainingGuideSheet } from './TrainingGuideSheet';

/** One overlay open at a time (replaces the legacy Escape-precedence ladder). */
type Overlay =
  | { type: 'detail'; target: DetailTarget }
  | { type: 'fullscreen'; target: FullscreenTarget }
  | { type: 'library' }
  | { type: 'guide' }
  | null;

function Shell() {
  const [phase, setPhase] = useLastPhase();
  const [overlay, setOverlay] = useState<Overlay>(null);
  useSync();

  const current = PHASES[phase] ?? PHASES[0];

  const openDetail = (ex: WorkoutExercise) =>
    setOverlay({
      type: 'detail',
      target: { slug: ex.slug, phase: current.index, dumbbells: ex.dumbbells, restPause: ex.restPause },
    });

  const openFullscreen = (workout: Workout) =>
    setOverlay({ type: 'fullscreen', target: { phase: current, workout } });

  const close = () => setOverlay(null);

  const selectPhase = (i: number) => {
    setPhase(i);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="mx-auto flex max-w-[900px] flex-wrap items-start justify-between gap-6 px-8 pt-10 pb-2 max-sm:gap-3 max-sm:px-4 max-sm:pt-6 max-sm:pb-3">
        <div className="flex flex-col gap-1 max-sm:w-full">
          <div className="font-display text-[2rem] leading-none text-orange">Kilo</div>
          <div className="font-mono text-[0.7rem] tracking-wider text-muted uppercase">
            1-year programme
          </div>
        </div>
        <div className="flex flex-wrap gap-2 max-sm:w-full max-sm:[&>button]:flex-1 max-sm:[&>button]:justify-center">
          <AuthButton />
          <button
            className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border bg-surface px-3.5 py-2 font-mono text-[0.72rem] tracking-wide text-foreground uppercase transition-all hover:border-orange hover:text-orange-dim"
            onClick={() => setOverlay({ type: 'guide' })}
            aria-label="Open training guide"
          >
            <span className="text-base leading-none text-orange">?</span>
            Guide
          </button>
          <button
            className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border bg-surface px-3.5 py-2 font-mono text-[0.72rem] tracking-wide text-foreground uppercase transition-all hover:border-orange hover:text-orange-dim"
            onClick={() => setOverlay({ type: 'library' })}
            aria-label="Open exercise library"
          >
            <span className="text-base leading-none text-orange">≡</span>
            Library
          </button>
        </div>
      </header>

      <PhaseTabs current={phase} onSelect={selectPhase} />

      <main className="mx-auto max-w-[900px] px-8 py-8 max-sm:px-4">
        <PhaseSection phase={current} onOpenFullscreen={openFullscreen} onOpenDetail={openDetail} />
      </main>

      <footer className="mx-auto flex max-w-[900px] flex-wrap justify-between gap-4 border-t border-border px-8 pt-6 pb-12 font-mono text-[0.7rem] text-muted max-sm:px-4">
        <span>Kilo — 1 year dumbbell programme</span>
        <span>3 sessions / week · floor + 2 dumbbells · no bench</span>
      </footer>

      <ExerciseDetailSheet target={overlay?.type === 'detail' ? overlay.target : null} onClose={close} />
      <FullscreenTrainView
        target={overlay?.type === 'fullscreen' ? overlay.target : null}
        onClose={close}
      />
      <ExerciseLibrary open={overlay?.type === 'library'} onClose={close} />
      <TrainingGuideSheet open={overlay?.type === 'guide'} onClose={close} phase={current.index} />
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Shell />
    </QueryClientProvider>
  );
}
