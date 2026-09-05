// Exercise catalogue and the category grouping used by the library panel.
//
// The catalogue itself lives in data/exercises.json, keyed by the same slug as
// each workout row's data-exercise attribute. Because it is fetched, the page has
// to be served over HTTP — see the README.
let EXERCISE_DATA = {};

async function loadExerciseData() {
  const res = await fetch('data/exercises.json', { cache: 'no-cache' });
  if (!res.ok) throw new Error('HTTP ' + res.status + ' fetching data/exercises.json');
  EXERCISE_DATA = await res.json();
  _libraryItems = null; // the categorised list is derived from EXERCISE_DATA
}

// Maps exercise slug → primary category for filter chips
const CATEGORIES = ['All', 'Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Glutes', 'Core'];

function categorise(slug, muscles) {
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

// Build a categorised list once
let _libraryItems = null;

function getLibraryItems() {
  if (_libraryItems) return _libraryItems;
  _libraryItems = Object.keys(EXERCISE_DATA).map(slug => {
    const data = EXERCISE_DATA[slug];
    return {
      slug,
      name: data.name || slug,
      muscles: data.muscles || '',
      desc: data.desc || '',
      tips: data.tips || '',
      defaultWeights: data.defaultWeights || [0,0,0,0],
      category: categorise(slug, data.muscles || '')
    };
  }).sort((a, b) => a.name.localeCompare(b.name));
  return _libraryItems;
}
