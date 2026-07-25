import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { PHASES } from '@/data/phases';
import { EFFORT_LEGEND, GUIDE_SECTIONS } from '@/data/guide';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 mb-1.5 font-mono text-[0.62rem] tracking-widest text-muted uppercase first:mt-0">
      {children}
    </div>
  );
}

export function TrainingGuideSheet({
  open,
  onClose,
  phase,
}: {
  open: boolean;
  onClose: () => void;
  phase: number;
}) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const phaseTitle = PHASES[phase]?.title ?? '';

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className={isMobile ? 'max-h-[90dvh]' : 'w-[480px] max-w-[50vw] sm:max-w-[480px]'}
      >
        <SheetHeader className="pb-2">
          <SheetTitle>Training Guide</SheetTitle>
          <SheetDescription className="font-mono text-[0.7rem] tracking-wider text-orange uppercase">
            {phaseTitle}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <p className="rounded-md border-l-2 border-orange bg-surface2 px-3 py-2.5 text-[0.85rem] leading-relaxed text-orange-dim">
            {EFFORT_LEGEND[phase] ?? EFFORT_LEGEND[0]}
          </p>

          {GUIDE_SECTIONS.map((section) => {
            const isPhase1Exception = section.id === 'phase1';
            return (
              <div
                key={section.id}
                className={cn(
                  isPhase1Exception && phase === 0 && 'rounded-md border border-orange/40 px-3 py-2 -mx-3',
                )}
              >
                <SectionLabel>{section.title}</SectionLabel>
                {section.body.map((p, i) => (
                  <p key={i} className="mb-1.5 text-[0.88rem] leading-relaxed text-foreground last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
