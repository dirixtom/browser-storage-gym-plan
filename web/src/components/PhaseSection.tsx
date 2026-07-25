import type { Phase, Workout, WorkoutExercise } from '@/data/phases';
import { EFFORT_LEGEND } from '@/data/guide';
import { WorkoutCard } from './WorkoutCard';

/** Best-effort port of the rotation note's orange <span> highlights. */
function RotationNote({ note }: { note: string }) {
  const [label, ...rest] = note.split(': ');
  const body = rest.join(': ');
  const parts = body.split(' · ');
  return (
    <div className="mb-3.5 inline-flex flex-wrap items-center gap-2 rounded border border-border bg-surface px-3 py-1.5 font-mono text-[0.72rem] text-muted">
      <span>{label}:</span>
      {parts.map((part, i) => (
        <span key={i} className="inline-flex items-center gap-2">
          {i > 0 && <span>·</span>}
          <span className={/[–→]/.test(part) ? 'text-orange' : undefined}>{part}</span>
        </span>
      ))}
    </div>
  );
}

export function PhaseSection({
  phase,
  onOpenFullscreen,
  onOpenDetail,
}: {
  phase: Phase;
  onOpenFullscreen: (workout: Workout) => void;
  onOpenDetail: (ex: WorkoutExercise) => void;
}) {
  return (
    <section>
      {/* Phase header */}
      <div className="mb-8 border-b border-border pb-6">
        <div className="mt-1.5 font-mono text-[0.72rem] tracking-wider text-orange uppercase">
          {phase.monthsLabel}
        </div>
        <h1 className="text-[1.9rem] leading-tight font-semibold tracking-tight text-foreground">
          {phase.title}
        </h1>
        <p className="mt-2.5 max-w-[540px] text-[0.9rem] leading-relaxed text-muted">{phase.goal}</p>
      </div>

      {/* Stats grid */}
      <div className="mb-8 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2">
        {phase.stats.map((stat) => (
          <div
            key={stat.label}
            className="flex min-h-16 flex-col justify-between gap-1 rounded-md border border-border bg-surface px-3.5 py-3"
          >
            <div className="font-mono text-[0.65rem] tracking-wider text-muted uppercase">
              {stat.label}
            </div>
            <div className="mt-auto text-[0.88rem] font-medium text-foreground">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Session structure */}
      <div className="mb-8 flex flex-col gap-3 rounded-lg border border-border bg-surface px-6 py-5 sm:flex-row sm:gap-0">
        {phase.sessionStructure.map((step, i) => (
          <div key={i} className="relative flex flex-1 items-center gap-2.5">
            {i > 0 && <span className="mr-2.5 hidden text-[0.9rem] text-border sm:inline">→</span>}
            <span className="font-mono text-[0.75rem] font-medium whitespace-nowrap text-orange">
              {step.time}
            </span>
            <span className="text-[0.8rem] leading-snug text-muted">{step.desc}</span>
          </div>
        ))}
      </div>

      {/* Workouts */}
      <div className="mb-3 font-mono text-[0.68rem] tracking-widest text-muted uppercase">
        {phase.workoutsLabel}
      </div>
      <RotationNote note={phase.rotationNote} />
      <div className="mb-3.5 rounded border border-orange/25 bg-surface px-3 py-1.5 font-mono text-[0.72rem] leading-relaxed text-orange-dim">
        {EFFORT_LEGEND[phase.index] ?? EFFORT_LEGEND[0]}
      </div>
      <div className="mb-8 grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-3 max-[400px]:grid-cols-1">
        {phase.workouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            phaseIdx={phase.index}
            onOpenFullscreen={onOpenFullscreen}
            onOpenDetail={onOpenDetail}
          />
        ))}
      </div>
    </section>
  );
}
