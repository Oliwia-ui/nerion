# Nerion — Your dive computer. Inside your mask.

A cinematic product-design website for a scuba mask with an integrated dive-computer display. Scroll drives six opening films, followed by interactive product exploration, an illustrative visor preview and a diver-film finale. All dive values are simulated, not operating equipment or dive-planning guidance.

## Status

Local working prototype. **Not yet verified as submission-ready.** See [requirements and QA](docs/requirements-audit.md) for known gaps. The user confirmed that the assignment requires **at least four scenes**; the six opening scenes satisfy the scene-count requirement. The older Abyss Kit equipment sequence is a proposal, not the mandatory subject.

Repository: [Oliwia-ui/nerion](https://github.com/Oliwia-ui/nerion) — private. Initial source snapshot prepared on 2026-10-04; this does not claim historical incremental commits.

Live website URL: **Pending publication and verification.** `http://127.0.0.1:4173/` is a local preview, not a public submission URL. Website deployment remains a separate step. The raw originals remain outside this repository; the served media is included.

## Run locally

This working project serves `dist/` directly; it is not the older Vite project in the separately supplied source folder. No npm build is required.

```sh
python3 -m http.server 4173 --directory dist
```

Open `http://127.0.0.1:4173/?opening=1`. If port 4173 already hosts this project, use the existing server rather than starting another. Fonts and the model-viewer dependency may require internet access. Video is fetched as a blob for reliable seeking on a simple local server; opening the HTML directly as a file is not the supported preview method.

## Controls

- Scroll forward/backward through the film and product chapters.
- Drag the mask to rotate; user-controlled zoom is disabled so wheel scrolling moves the page.
- Select product feature tabs, preview the display, or enter the visor.
- Inside the visor, move the pointer to shift the ocean background; Escape exits.
- At the ending, return to the surface or disable the optional scroll loop. The loop waits for a fresh downward gesture after resting at the bottom.
- Audio starts off. The story does not depend on audio.

## Project files

| File | Role |
| --- | --- |
| `dist/index.html` | Entry document and script/style order |
| `dist/journey-timeline.js` | Six-scene timing, overlaps and letter animation math |
| `dist/journey.js`, `journey.css` | Scroll player, loading, posters and live text |
| `dist/product-world.js`, `product-world.css` | Pinned 3D mask, product stories and features |
| `dist/visor-view.js`, `visor-view.css` | First-person illustrative visor enhancements |
| `dist/deep-product.js`, `deep-product.css` | Scroll-scrubbed diver-film product finale |
| `dist/opening-cipher.js`, `opening-cipher.css` | Opening NERION cipher wordmark |
| `dist/scroll-loop.js` | Optional deliberate-gesture restart |
| `dist/assets/` | Served model, videos, stills and posters |

Legacy modules remain because existing observers and enhancements still depend on them. The newest modules progressively enhance the static document. There is no claim that every retained file is used by the current visual journey.

## Story and production evidence

- [Current storyboard](docs/storyboard.md)
- [Design research: workflow and four interactive references](docs/design-research.md)
- [Asset inventory and Magnific provenance](docs/media-workflow.md)
- [Transition inspection with frame pairs](docs/transition-audit.md)
- [Requirements and QA findings](docs/requirements-audit.md)
- `NERION_HANDOFF.md` contains historical decisions; the focused docs above supersede outdated assertions about current assets or completion.

## Tests

Requires Node.js with its built-in test runner:

```sh
node --test *.test.cjs
```

Thirteen tests passed on 2026-10-05. They cover timeline math, overlapping opacity, reversible seam lighting, seeking backpressure, failed-media poster retention, some reduced-motion behavior and scroll-loop gating. They are **not** proof of frame-matched cinematography, full accessibility or real-device performance.

To regenerate visual boundary evidence, install ffmpeg and run:

```sh
bash audit-media.sh
```

This only reads the served videos and writes derived inspection images into `docs/audit-media/`. Original raw files are never modified.

## Before submission

Resolve the documented transition and accessibility gaps, attach generation evidence, perform the remaining browser/device tests, then upload the local improvements to the existing repository and publish when authorised. Update the live URL above only after verifying a public deployment from a clean browser session.
