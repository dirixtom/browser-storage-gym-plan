import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Split a "3 × 8–12 each" style string into a fixed-shape numeric core
 * ("3 × 8–12") and a free-floating suffix (" each" / " each side" / "").
 * Lets the core align in a fixed-width column while the suffix, which
 * varies a lot in length, doesn't force that column wider for every row.
 */
export function splitSetsReps(setsReps: string): { core: string; suffix: string } {
  const m = setsReps.match(/^(\d+ × [\d–]+)(.*)$/);
  return m ? { core: m[1], suffix: m[2] } : { core: setsReps, suffix: '' };
}
