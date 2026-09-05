// Per-exercise slide-out: description, tips and the editable per-phase weights.

function commitPhaseInput(input) {
  const exerciseKey = input.dataset.exerciseKey;
  const phaseIdx = parseInt(input.dataset.phaseIdx);
  if (!exerciseKey) return;
  const val = input.value.trim();
  if (val === '') {
    // Cleared — remove saved override
    try { localStorage.removeItem(storageKey(exerciseKey + '_phase' + phaseIdx)); } catch(e) {}
    input.classList.remove('custom');
  } else {
    const num = parseFloat(val);
    if (isNaN(num) || num < 0) return;
    setSavedWeight(exerciseKey + '_phase' + phaseIdx, num);
    input.value = num;
    input.classList.add('custom');
  }
  // Update main weight badges throughout the page
  refreshWeightBadges();
  // Also update the main current-phase weight input if it's the same phase
  if (_currentExercise === exerciseKey && _currentPhase === phaseIdx) {
    document.getElementById('weightInput').value = input.value;
  }
}

let _currentExercise = null;

let _currentPhase = 0;

function openModal(el) {
  const name = el.dataset.exercise;
  // Extract dumbbell count from badge text (e.g. "6.5kg × 2" → "× 2 dumbbells")
  const badge = el.querySelector('[data-weight-badge]');
  const badgeText = badge ? badge.textContent.trim() : '';
  const dbMatch = badgeText.match(/×\s*(\d+)/);
  const dbLabel = document.getElementById('dumbellCountLabel');
  if (dbLabel) {
    if (dbMatch && dbMatch[1] === '1') dbLabel.textContent = '× 1 dumbbell';
    else if (dbMatch) dbLabel.textContent = '× ' + dbMatch[1] + ' dumbbells';
    else dbLabel.textContent = '';
  }
  const phase = parseInt(el.dataset.phase);
  const data = EXERCISE_DATA[name];
  if (!data) return;

  _currentExercise = name;
  _currentPhase = phase;

  const displayName = (data.name || name).replace(' (tempo)', '');
  document.getElementById('modalTitle').textContent = displayName;
  document.getElementById('modalMuscles').textContent = data.muscles;
  document.getElementById('modalDesc').textContent = data.desc;
  document.getElementById('modalTip').textContent = data.tips;

  // Weight input — show saved or default for current phase
  const saved = getSavedWeight(name + '_phase' + phase);
  const defaultW = data.defaultWeights[phase];
  const inputEl = document.getElementById('weightInput');
  if (saved !== null) {
    inputEl.value = saved;
  } else if (defaultW === 0) {
    inputEl.value = '';
    inputEl.placeholder = 'bodyweight';
  } else {
    inputEl.value = defaultW;
  }
  document.getElementById('weightSavedMsg').style.display = 'none';

  // Phase weight grid — each cell is editable
  const phaseLabels = ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'];
  const grid = document.getElementById('weightPhases');
  grid.innerHTML = phaseLabels.map((label, i) => {
    const savedP = getSavedWeight(name + '_phase' + i);
    const dw = data.defaultWeights[i];
    const isBW = dw === 0;
    const value = savedP !== null ? savedP : (isBW ? '' : dw);
    const isCurrent = i === phase;
    const isCustom = savedP !== null;
    const cls = ['wpc-input'];
    if (isCurrent) cls.push('current');
    if (isCustom) cls.push('custom');
    if (isBW) cls.push('bodyweight');
    const placeholder = isBW ? 'BW' : 'kg';
    const disabled = isBW ? 'disabled' : '';
    return `<div class="weight-phase-cell">
      <div class="wpc-label">${label}</div>
      <input type="number" step="0.5" min="0" class="${cls.join(' ')}" value="${value}" placeholder="${placeholder}" ${disabled}
        data-exercise-key="${name}" data-phase-idx="${i}" />
    </div>`;
  }).join('');

  // Wire up input handlers (commit on blur / Enter)
  grid.querySelectorAll('.wpc-input').forEach(input => {
    input.addEventListener('blur', () => commitPhaseInput(input));
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); input.blur(); }
      if (e.key === 'Escape') { input.value = input.defaultValue; input.blur(); }
    });
  });

  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.getElementById('exerciseSlideout').classList.add('open');
  document.getElementById('slideoutBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = scrollbarWidth + 'px';
}

function closeModal() {
  document.getElementById('exerciseSlideout').classList.remove('open');
  document.getElementById('slideoutBackdrop').classList.remove('open');
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
}

function saveWeight() {
  const val = document.getElementById('weightInput').value;
  if (!val || !_currentExercise) return;
  const parsed = parseFloat(val);
  if (isNaN(parsed) || parsed < 0) return;

  setSavedWeight(_currentExercise + '_phase' + _currentPhase, parsed);

  // Update phase grid
  const cells = document.querySelectorAll('#weightPhases .wpc-value');
  if (cells[_currentPhase]) cells[_currentPhase].textContent = parsed + ' kg';

  // Flash saved message
  const msg = document.getElementById('weightSavedMsg');
  msg.style.display = 'inline';
  setTimeout(() => { msg.style.display = 'none'; }, 2000);

  // Refresh badges on page
  refreshWeightBadges();
}
