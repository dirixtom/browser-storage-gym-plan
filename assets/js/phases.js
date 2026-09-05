// Phase tabs and the phase drawer.

const PHASE_NAMES = ['Phase 1 — Foundation', 'Phase 2 — Building', 'Phase 3 — Intensity', 'Phase 4 — Mastery'];

function showPhase(index) {
  document.querySelectorAll('.phase-section').forEach((s, i) => s.classList.toggle('visible', i === index));
  document.querySelectorAll('.phases-drawer-item').forEach((b, i) => b.classList.toggle('active', i === index));
  document.querySelectorAll('.phase-tab').forEach((b, i) => b.classList.toggle('active', i === index));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  refreshWeightBadges();
  try { localStorage.setItem('kilo_last_phase', index); } catch(e) {}
}

function togglePhases() {
  const drawer = document.getElementById('phasesDrawer');
  const bd = document.getElementById('phasesBackdrop');
  const open = drawer.classList.toggle('open');
  bd.classList.toggle('open', open);
}

function pickPhase(index) {
  showPhase(index);
  togglePhases();
}
