import { useMemo, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { CATEGORIES, type Category } from '@/data/categories';
import { LIBRARY_ITEMS } from '@/data/library';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { WeightPhaseGrid } from './WeightPhaseGrid';

export function ExerciseLibrary({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [category, setCategory] = useState<Category>('All');
  const [search, setSearch] = useState('');
  const isMobile = useMediaQuery('(max-width: 768px)');

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return LIBRARY_ITEMS.filter((item) => {
      if (category !== 'All' && item.category !== category) return false;
      if (!term) return true;
      return item.name.toLowerCase().includes(term) || item.muscles.toLowerCase().includes(term);
    });
  }, [category, search]);

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className={isMobile ? 'max-h-[90dvh]' : 'w-[480px] max-w-[50vw] sm:max-w-[480px]'}
      >
        <SheetHeader className="pb-2">
          <SheetTitle>Exercise Library</SheetTitle>
          <SheetDescription className="font-mono text-[0.7rem]">
            {filtered.length} exercise{filtered.length === 1 ? '' : 's'}
          </SheetDescription>
        </SheetHeader>

        <div className="px-6 pb-3">
          <Input
            type="text"
            placeholder="Search exercises..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="font-mono text-[0.8rem]"
            aria-label="Search exercises"
          />
        </div>

        <div className="px-6 pb-3">
          <ToggleGroup
            type="single"
            value={category}
            onValueChange={(v) => setCategory((v as Category) || 'All')}
            aria-label="Filter by category"
          >
            {CATEGORIES.map((cat) => (
              <ToggleGroupItem key={cat} value={cat}>
                {cat}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <Accordion type="single" collapsible className="flex flex-col gap-2">
            {filtered.map((item) => (
              <AccordionItem key={item.slug} value={item.slug}>
                <AccordionTrigger>
                  <span className="flex flex-col gap-0.5 text-left">
                    <span className="text-[0.85rem] text-foreground">{item.name}</span>
                    <span className="font-mono text-[0.62rem] tracking-wide text-muted uppercase">
                      {item.category} · {item.muscles}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="mb-1.5 font-mono text-[0.62rem] tracking-widest text-muted uppercase">
                    How to do it
                  </div>
                  <p className="text-[0.85rem] leading-relaxed text-foreground">{item.desc}</p>
                  <div className="mt-3 mb-1.5 font-mono text-[0.62rem] tracking-widest text-muted uppercase">
                    Tip
                  </div>
                  <p className="rounded-md bg-surface2 px-3 py-2.5 text-[0.82rem] leading-relaxed text-muted">
                    {item.tips}
                  </p>
                  <div className="mt-3 mb-1.5 font-mono text-[0.62rem] tracking-widest text-muted uppercase">
                    Weights across the year
                  </div>
                  <WeightPhaseGrid slug={item.slug} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {filtered.length === 0 && (
            <p className="py-8 text-center font-mono text-[0.75rem] text-muted">
              No exercises match your search.
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
