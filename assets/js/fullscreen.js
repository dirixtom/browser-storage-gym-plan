// Fullscreen "tap to train" view of a single workout card.

function openFullscreen(headerEl) {
  const card = headerEl.closest('.workout-card');
  const phaseSection = headerEl.closest('.phase-section');
  const phaseTitle = phaseSection.querySelector('.phase-title')?.textContent || '';
  const phaseMonths = phaseSection.querySelector('.phase-months')?.textContent || '';
  const badge = headerEl.querySelector('.workout-badge')?.textContent || '';
  const name = headerEl.querySelector('.workout-name')?.textContent || '';

  document.getElementById('fsPhaseLabel').textContent = phaseMonths + ' · ' + phaseTitle + ' · ' + badge;
  document.getElementById('fsTitle').textContent = name;

  const phaseIdxForCue = parseInt((phaseSection.id || '').replace('phase-', '')) || 0;
  const fsEffort = document.getElementById('fsEffort');
  fsEffort.innerHTML = `
    <div class="fs-effort-toggle" onclick="toggleFsGuide(this.parentElement)">
      <span>${EFFORT_CUES[phaseIdxForCue] || EFFORT_CUES[0]}</span>
      <span class="fs-effort-chevron">▾</span>
    </div>
    <div class="fs-effort-details">${(FS_GUIDE_DETAILS[phaseIdxForCue] || FS_GUIDE_DETAILS[0]).map(l => `<div>${l}</div>`).join('')}</div>
  `;
  fsEffort.classList.remove('open');

  // Build the rows from the card's exercise list
  const rows = card.querySelectorAll('.exercise-list .exercise-item');
  const list = document.getElementById('fsList');
  list.innerHTML = '';
  rows.forEach(row => {
    const num = row.querySelector('.ex-num')?.textContent || '';
    const exName = row.querySelector('.ex-name')?.cloneNode(true);
    if (exName) {
      const icon = exName.querySelector('.ex-info-icon');
      if (icon) icon.remove();
    }
    const exNameText = exName ? exName.textContent.trim() : '';
    const exerciseKey = row.dataset.exercise;
    const phaseIdx = parseInt(row.dataset.phase);
    const weightBadge = row.querySelector('[data-weight-badge]');
    const weightText = weightBadge ? weightBadge.textContent.trim() : '';
    const isBodyweight = weightBadge?.classList.contains('bodyweight');
    const sets = row.querySelector('.ex-sets')?.textContent || '';

    // Extract dumbbell count from weight text e.g. "6.5kg × 2"
    const dbMatch = weightText.match(/×\s*(\d+)\s*$/);
    const dbCount = dbMatch ? dbMatch[1] : null;

    const saved = exerciseKey ? getSavedWeight(exerciseKey + '_phase' + phaseIdx) : null;
    const isCustom = saved !== null;
    const hasInfo = exerciseKey && EXERCISE_DATA[exerciseKey];

    const li = document.createElement('li');
    li.className = 'fs-row';
    const weightCls = isBodyweight ? 'fs-weight bodyweight' : (isCustom ? 'fs-weight custom' : 'fs-weight');
    const nameCls = hasInfo ? 'fs-name expandable' : 'fs-name';
    const nameAttrs = hasInfo ? ` data-exercise-key="${exerciseKey}" onclick="toggleFsDesc(this)"` : '';
    const nameInner = hasInfo ? `${exNameText}<span class="fs-name-chevron">▾</span>` : exNameText;
    li.innerHTML = `
      <span class="fs-num">${num}</span>
      <span class="${nameCls}"${nameAttrs}>${nameInner}</span>
      <span class="fs-trailing">
        <span class="fs-trailing-left">
          <span class="${weightCls}" data-fs-weight data-exercise-key="${exerciseKey || ''}" data-phase-idx="${phaseIdx}" data-db-count="${dbCount || ''}" data-bodyweight="${isBodyweight ? '1' : ''}" onclick="editFsWeight(this)">${weightText}</span>
        </span>
        <span class="fs-sets">${sets}</span>
      </span>
    `;
    list.appendChild(li);
  });

  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  _savedScrollY = window.scrollY;
  document.getElementById('fsOverlay').classList.add('open');
  document.body.classList.add('fs-active');
  document.body.style.paddingRight = scrollbarWidth + 'px';
  document.body.style.top = '-' + _savedScrollY + 'px';
}

// Inline weight editor in fullscreen mode
function editFsWeight(badgeEl) {
  if (badgeEl.dataset.bodyweight === '1') return;
  if (badgeEl.querySelector('input')) return; // already editing

  const exerciseKey = badgeEl.dataset.exerciseKey;
  const phaseIdx = parseInt(badgeEl.dataset.phaseIdx);
  const dbCount = badgeEl.dataset.dbCount;
  const currentText = badgeEl.textContent.trim();
  // Parse current numeric value
  const numMatch = currentText.match(/^([0-9.]+)/);
  const currentVal = numMatch ? numMatch[1] : '';

  const input = document.createElement('input');
  input.type = 'number';
  input.step = '0.5';
  input.min = '0';
  input.value = currentVal;
  input.className = 'fs-weight-input';

  badgeEl.textContent = '';
  badgeEl.appendChild(input);
  input.focus();
  input.select();

  const commit = () => {
    const val = parseFloat(input.value);
    if (!isNaN(val) && val >= 0) {
      // Save to localStorage
      if (exerciseKey) setSavedWeight(exerciseKey + '_phase' + phaseIdx, val);
      // Update badge
      const newText = val + 'kg' + (dbCount ? ' × ' + dbCount : '');
      badgeEl.textContent = newText;
      badgeEl.classList.remove('bodyweight');
      badgeEl.classList.add('custom');
      // Update the underlying weight badges on the main page from saved state
      refreshWeightBadges();
    } else {
      badgeEl.textContent = currentText;
    }
  };

  const cancel = () => {
    badgeEl.textContent = currentText;
  };

  input.addEventListener('blur', commit);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); commit(); input.blur(); }
    else if (e.key === 'Escape') { cancel(); input.blur(); }
  });
}

function closeFullscreen() {
  document.getElementById('fsOverlay').classList.remove('open');
  document.body.classList.remove('fs-active');
  document.body.style.paddingRight = '';
  document.body.style.top = '';
  window.scrollTo(0, _savedScrollY || 0);
  // Reflect any weights edited in fullscreen on the main page
  refreshWeightBadges();
}

function toggleFsDesc(nameEl) {
  const li = nameEl.closest('.fs-row');
  const existing = li.querySelector('.fs-desc');
  if (existing) {
    existing.remove();
    li.classList.remove('expanded');
    return;
  }
  const data = EXERCISE_DATA[nameEl.dataset.exerciseKey];
  if (!data) return;
  const desc = document.createElement('div');
  desc.className = 'fs-desc';
  desc.innerHTML = `
    <div class="fs-desc-label">How to do it</div>
    <div class="fs-desc-text">${data.desc}</div>
    <div class="fs-desc-label">Tip</div>
    <div class="fs-desc-tip">${data.tips}</div>
  `;
  li.appendChild(desc);
  li.classList.add('expanded');
}
