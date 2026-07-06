// Exercise categories for the library filter chips, ported verbatim from the
// legacy app (including its precedence order and fall-through to 'Arms').

export const CATEGORIES = ['All', 'Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Glutes', 'Core'] as const;
export type Category = (typeof CATEGORIES)[number];

export function categorise(slug: string, muscles: string): Exclude<Category, 'All'> {
  const m = (muscles || '').toLowerCase();
  if (slug.includes('curl') || slug.includes('tricep') || slug.includes('skull') || m.includes('biceps') || m.includes('triceps') || m.includes('brachi') || m.includes('forearm')) return 'Arms';
  if (slug.includes('floor-press') || slug.includes('close-grip') || slug.includes('push-up') || m.includes('chest') || m.includes('pectorals')) return 'Chest';
  if (slug.includes('shrug') || slug.includes('lateral-raise') || slug.includes('front-raise') || slug.includes('overhead-press') || slug.includes('arnold') || slug.includes('upright-row') || slug.includes('rear-delt') || slug.includes('face-pull')) return 'Shoulders';
  if (slug.includes('row') || slug.includes('shrug') || m.includes('lats') || m.includes('upper back') || m.includes('rhomboids') || m.includes('trapez')) return 'Back';
  if (slug.includes('bridge') || m.includes('glutes')) return 'Glutes';
  if (slug.includes('squat') || slug.includes('lunge') || slug.includes('deadlift') || slug.includes('calf') || slug.includes('step-up') || m.includes('quads') || m.includes('hamstrings') || m.includes('calves')) return 'Legs';
  if (m.includes('core') || m.includes('abdominis') || m.includes('obliques') || m.includes('hip flexors') || slug.includes('plank') || slug.includes('crunch') || slug.includes('leg-raise') || slug.includes('hollow') || slug.includes('windmill') || slug.includes('woodchop') || slug.includes('russian') || slug.includes('dead-bug') || slug.includes('bird-dog') || slug.includes('heel-tap') || slug.includes('v-up') || slug.includes('mountain-climber') || slug.includes('seated-knee-tuck') || slug.includes('suitcase-carry') || slug.includes('ab-rollout') || slug.includes('side-plank')) return 'Core';
  return 'Arms';
}
