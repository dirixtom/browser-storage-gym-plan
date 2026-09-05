// Saved weights in localStorage, and reflecting them on the workout rows.
//
// The kilo_weight_<slug>_phase<n> key format is shared verbatim with the app
// repo and its sync table — changing storageKey() orphans saved data.

function storageKey(name) { return 'kilo_weight_' + name.toLowerCase().replace(/[^a-z0-9]/g, '_'); }

function getSavedWeight(name) {
  try { return localStorage.getItem(storageKey(name)); } catch(e) { return null; }
}

function setSavedWeight(name, val) {
  try { localStorage.setItem(storageKey(name), val); } catch(e) {}
}

function getDisplayWeight(name, phaseIdx) {
  const saved = getSavedWeight(name + '_phase' + phaseIdx);
  if (saved !== null) return saved + ' kg';
  const data = EXERCISE_DATA[name];
  if (!data) return null;
  const w = data.defaultWeights[phaseIdx];
  return w === 0 ? 'bodyweight' : w + ' kg';
}

function refreshWeightBadges() {
  document.querySelectorAll('[data-weight-badge]').forEach(badge => {
    const item = badge.closest('[data-exercise]');
    if (!item) return;
    const name = item.dataset.exercise;
    const phase = parseInt(item.dataset.phase);
    const saved = getSavedWeight(name + '_phase' + phase);
    const defaultText = badge.dataset.defaultText || badge.textContent;
    if (saved !== null) {
      // Preserve the dumbbell count from default text (e.g. "× 2")
      const dbMatch = defaultText.match(/×\s*\d+\s*$/);
      const dbSuffix = dbMatch ? ' ' + dbMatch[0] : '';
      badge.textContent = saved + 'kg' + dbSuffix;
      badge.classList.remove('bodyweight');
      badge.style.color = 'var(--orange-dim)';
      badge.title = 'Your saved weight';
    } else {
      // Restore default
      badge.textContent = defaultText;
      badge.style.color = '';
      badge.title = '';
      if (defaultText.toLowerCase().includes('bodyweight')) {
        badge.classList.add('bodyweight');
      } else {
        badge.classList.remove('bodyweight');
      }
    }
  });
}
