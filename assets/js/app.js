// Page bootstrap: loads the exercise catalogue and wires up the page-level
// event handlers. Loaded last, after every other script in assets/js.

// Kick the fetch off immediately — nothing on the page needs it until the user
// opens an exercise, a workout or the library.
loadExerciseData().catch(err => {
  console.error(err);
  document.getElementById('dataError')?.removeAttribute('hidden');
});

// Allow Enter key in weight input
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('weightInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') saveWeight();
  });
  // Snapshot original HTML weight values so we can reset to them when a saved override is cleared
  document.querySelectorAll('[data-weight-badge]').forEach(badge => {
    if (!badge.dataset.defaultText) badge.dataset.defaultText = badge.textContent;
  });
  try {
    const saved = localStorage.getItem('kilo_last_phase');
    // With nothing stored, stay on the markup default (the first phase not
    // marked completed) rather than jumping back to a finished phase.
    if (saved !== null) showPhase(parseInt(saved));
  } catch(e) {}
  refreshWeightBadges();
});

// Close modal on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (document.getElementById('fsOverlay').classList.contains('open')) {
      closeFullscreen();
    } else if (document.getElementById('libraryPanel').classList.contains('open')) {
      closeLibrary();
    } else if (document.getElementById('guidePanel').classList.contains('open')) {
      closeGuide();
    } else if (document.getElementById('phasesDrawer').classList.contains('open')) {
      togglePhases();
    } else {
      closeModal();
    }
  }
});
