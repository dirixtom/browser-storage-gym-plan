import type { Workout, WorkoutExercise } from '@/data/phases';
import { badgeText, useWeight } from '@/hooks/useWeight';
import { cn } from '@/lib/utils';

function ExerciseRow({
  exercise,
  index,
  phaseIdx,
  onOpenDetail,
}: {
  exercise: WorkoutExercise;
  index: number;
  phaseIdx: number;
  onOpenDetail: (ex: WorkoutExercise) => void;
}) {
  const w = useWeight(exercise.slug, phaseIdx);
  return (
    <li
      className="group flex cursor-pointer items-baseline gap-3 border-b border-border px-4 py-[7px] transition-colors last:border-b-0 hover:bg-surface2"
      onClick={() => onOpenDetail(exercise)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenDetail(exercise);
        }
      }}
    >
      <span className="w-3.5 shrink-0 font-mono text-[0.65rem] text-muted">{index + 1}</span>
      <span className="min-w-0 flex-1 text-[0.82rem] text-foreground group-hover:text-orange-dim">
        {exercise.name}
        <span className="ml-1 text-[0.65rem] text-border transition-colors group-hover:text-orange">ⓘ</span>
      </span>
      <span className="flex w-8 shrink-0 justify-center">
        {exercise.restPause && (
          <span
            className="rounded-xs border border-orange/40 bg-orange/10 px-1 font-mono text-[0.6rem] text-orange"
            title="Rest-pause last set: failure → rest 15–20 sec → failure → rest 15–20 sec → failure, 2–3 mini-sets"
          >
            RP
          </span>
        )}
      </span>
      <span
        className={cn(
          'w-[92px] shrink-0 rounded-xs border px-1.5 py-px text-center font-mono text-[0.65rem] whitespace-nowrap',
          w.isBodyweight
            ? 'border-border text-muted'
            : w.isCustom
              ? 'border-green/25 text-orange-dim'
              : 'border-green/25 text-green',
        )}
        title={w.isCustom ? 'Your saved weight' : undefined}
      >
        {badgeText(w, exercise.dumbbells)}
      </span>
      <span className="w-[104px] shrink-0 text-right font-mono text-[0.72rem] whitespace-nowrap text-orange-dim">
        {exercise.setsReps}
      </span>
    </li>
  );
}

export function WorkoutCard({
  workout,
  phaseIdx,
  onOpenFullscreen,
  onOpenDetail,
}: {
  workout: Workout;
  phaseIdx: number;
  onOpenFullscreen: (workout: Workout) => void;
  onOpenDetail: (ex: WorkoutExercise) => void;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-[#3e3e3a]">
      <div
        className="flex min-h-[60px] cursor-pointer flex-wrap items-baseline gap-2.5 border-b border-border px-4 pt-3.5 pb-2.5 transition-colors select-none hover:bg-surface2"
        onClick={() => onOpenFullscreen(workout)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenFullscreen(workout);
          }
        }}
      >
        <div className="shrink-0 rounded-xs bg-[rgba(232,93,47,0.1)] px-[7px] py-0.5 font-mono text-[0.65rem] tracking-wider text-orange uppercase">
          {workout.badge}
        </div>
        <div className="flex-auto text-[0.85rem] leading-tight font-medium text-foreground">
          {workout.name}
        </div>
        <span className="ml-auto font-mono text-[0.6rem] tracking-wider text-muted uppercase opacity-50">
          tap to expand
        </span>
      </div>
      <ul className="py-2">
        {workout.exercises.map((ex, i) => (
          <ExerciseRow
            key={`${ex.slug}-${i}`}
            exercise={ex}
            index={i}
            phaseIdx={phaseIdx}
            onOpenDetail={onOpenDetail}
          />
        ))}
      </ul>
    </div>
  );
}
