// Categorised, alphabetised list of all exercises for the Library panel.
import { EXERCISE_DATA, type Exercise } from './exercises';
import { categorise, type Category } from './categories';

export interface LibraryItem extends Exercise {
  slug: string;
  category: Exclude<Category, 'All'>;
}

export const LIBRARY_ITEMS: LibraryItem[] = Object.entries(EXERCISE_DATA)
  .map(([slug, data]) => ({
    slug,
    ...(data as Exercise),
    category: categorise(slug, data.muscles),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));
