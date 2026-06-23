# Kilo — 1 Year Training Plan

A simple personal training-plan app: a 1-year, 3-sessions-per-week dumbbell programme
(floor + two dumbbells, no bench), split into four progressive phases.

It's a single, self-contained HTML file — no build step, no dependencies.

## Usage

Open `kiloplan.html` in any browser. To use it on your phone/tablet, open it from a hosted
copy (e.g. GitHub Pages) or sync the file to the device.

- Switch between phases with the tabs at the top.
- Tap any exercise for a description, tips, and an editable weight for each phase.
- Tap a workout card title for a big, hands-free "tap to train" fullscreen view.

## Weights

Custom weights you enter are saved in the browser's `localStorage`. They persist on the
same browser/device but are **not** shared across devices and are cleared if you clear site
data. Exercises without a saved value fall back to the built-in default for that phase.
