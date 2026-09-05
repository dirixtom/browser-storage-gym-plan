// Searchable exercise library panel with category chips.

let _activeCategory = 'All';

let _searchTerm = '';

let _expandedSlug = null;

function openLibrary() {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  _savedScrollY = window.scrollY;
  document.getElementById('libraryPanel').classList.add('open');
  document.getElementById('libraryBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = scrollbarWidth + 'px';

  // Render chips on first open
  const chipsEl = document.getElementById('libraryChips');
  if (!chipsEl.dataset.rendered) {
    chipsEl.innerHTML = CATEGORIES.map(cat => 
      `<button class="library-chip${cat === _activeCategory ? ' active' : ''}" data-cat="${cat}" onclick="setLibraryCategory('${cat}')">${cat}</button>`
    ).join('');
    chipsEl.dataset.rendered = '1';
  }

  // Hook up search
  const searchEl = document.getElementById('librarySearch');
  if (!searchEl.dataset.hooked) {
    searchEl.addEventListener('input', e => {
      _searchTerm = e.target.value.trim().toLowerCase();
      renderLibrary();
    });
    searchEl.dataset.hooked = '1';
  }

  renderLibrary();
}

function closeLibrary() {
  document.getElementById('libraryPanel').classList.remove('open');
  document.getElementById('libraryBackdrop').classList.remove('open');
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
}

function setLibraryCategory(cat) {
  _activeCategory = cat;
  document.querySelectorAll('.library-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.cat === cat);
  });
  renderLibrary();
}

function renderLibrary() {
  const items = getLibraryItems();
  const filtered = items.filter(item => {
    if (_activeCategory !== 'All' && item.category !== _activeCategory) return false;
    if (_searchTerm && !item.name.toLowerCase().includes(_searchTerm) && !item.muscles.toLowerCase().includes(_searchTerm)) return false;
    return true;
  });

  document.getElementById('libraryCount').textContent = filtered.length + ' of ' + items.length + ' exercises';

  const body = document.getElementById('libraryBody');
  if (filtered.length === 0) {
    body.innerHTML = '<div class="library-empty">No exercises match your filters.</div>';
    return;
  }

  body.innerHTML = filtered.map(item => `
    <div class="lib-item${item.slug === _expandedSlug ? ' expanded' : ''}" data-slug="${item.slug}">
      <div class="lib-item-header" onclick="toggleLibraryItem('${item.slug}')">
        <div class="lib-item-name">${item.name}</div>
        <div class="lib-item-muscle">${item.category}</div>
        <span class="lib-item-chevron">›</span>
      </div>
      <div class="lib-item-body">
        <div class="lib-item-content">
          <div class="lib-section-label">Muscles worked</div>
          <div class="lib-desc">${item.muscles}</div>
          <div class="lib-section-label">How to do it</div>
          <div class="lib-desc">${item.desc}</div>
          <div class="lib-section-label">Tip</div>
          <div class="lib-tip">${item.tips}</div>
          <div class="lib-section-label">Weights across the year (editable)</div>
          <div class="lib-weight-grid">
            ${['Phase 1','Phase 2','Phase 3','Phase 4'].map((label, i) => {
              const saved = getSavedWeight(item.slug + '_phase' + i);
              const dw = item.defaultWeights[i];
              const isBW = dw === 0;
              const value = saved !== null ? saved : (isBW ? '' : dw);
              const isCustom = saved !== null;
              const cls = ['wpc-input'];
              if (isCustom) cls.push('custom');
              if (isBW) cls.push('bodyweight');
              const placeholder = isBW ? 'BW' : 'kg';
              const disabled = isBW ? 'disabled' : '';
              return `<div class="weight-phase-cell">
                <div class="wpc-label">${label}</div>
                <input type="number" step="0.5" min="0" class="${cls.join(' ')}" value="${value}" placeholder="${placeholder}" ${disabled}
                  data-exercise-key="${item.slug}" data-phase-idx="${i}"
                  onblur="commitPhaseInput(this); refreshLibraryItem('${item.slug}')"
                  onkeydown="if(event.key==='Enter'){event.preventDefault();this.blur();}else if(event.key==='Escape'){this.value=this.defaultValue;this.blur();}" />
              </div>`;
            }).join('')}
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function toggleLibraryItem(slug) {
  // Accordion: collapse currently-expanded if any, then expand the clicked (unless same)
  const wasExpanded = _expandedSlug === slug;
  _expandedSlug = wasExpanded ? null : slug;
  document.querySelectorAll('.lib-item').forEach(el => {
    el.classList.toggle('expanded', el.dataset.slug === _expandedSlug);
  });
}

// After saving a weight from inside the library, update the library row so the .custom class flips correctly
function refreshLibraryItem(slug) {
  // Re-render the inputs without collapsing the panel — just refresh classes
  const item = document.querySelector('.lib-item[data-slug="' + CSS.escape(slug) + '"]');
  if (!item) return;
  item.querySelectorAll('.wpc-input').forEach(input => {
    const phaseIdx = parseInt(input.dataset.phaseIdx);
    const saved = getSavedWeight(slug + '_phase' + phaseIdx);
    input.classList.toggle('custom', saved !== null);
  });
}
