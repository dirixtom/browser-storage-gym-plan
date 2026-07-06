import * as React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cn } from '@/lib/utils';

function ToggleGroup({ className, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      className={cn('flex flex-wrap items-center gap-1.5', className)}
      {...props}
    />
  );
}

function ToggleGroupItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn(
        'inline-flex items-center justify-center rounded-md border border-border bg-transparent px-3 py-1 font-mono text-xs text-muted transition-colors outline-none hover:bg-surface hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring cursor-pointer',
        'data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
