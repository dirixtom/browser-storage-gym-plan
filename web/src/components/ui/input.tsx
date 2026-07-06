import * as React from 'react';
import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-9 w-full min-w-0 rounded-md border border-border bg-surface2 px-3 py-1 text-base text-foreground transition-colors outline-none placeholder:text-muted disabled:pointer-events-none disabled:opacity-50 md:text-sm',
        'focus-visible:border-primary focus-visible:ring-primary/30 focus-visible:ring-[2px]',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
