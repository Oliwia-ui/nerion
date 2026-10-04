# Nerion website — AI development handoff

Updated: 3 October 2026.

### Latest display revision

2026-10-04 cinematic product finale: `deep-product.js`/`.css` replace the visible #depth content with a 680svh pinned product chapter using the existing `nerion-diver.mp4` and matching poster. Three scroll chapters cover the product, its integrated display, and an Enter the visor CTA. Simulated depth/heading/time readouts reveal after the first chapter; a mask thumbnail links back to #system. Adapted scroll-world guidance: blob-backed lazy loading, coalesced seeks, bounded damping, stopped idle animation, touch priming, and a static reduced-motion layout without video fetches. Existing footage retains its full landscape composition on narrow screens (no new portrait assets or generation). Original #depth nodes are hidden, retained for earlier observers. Browser verified film time moving forwards/backwards, mobile copy/readouts, visor open/close/focus; existing 11 tests pass.

2026-10-04 visor update: `visor-view.js`/`.css` enhance the existing dialog with a first-person mask rim/nose silhouette, smaller lens-fixed readouts, clear centre, and pointer-driven underwater background parallax. This is illustrative, not a verified optical simulation. Existing depth slider and Escape/close behavior remain; a product-stage Enter visor button restores focus on exit. Parallax is frame-coalesced, stops on close, recentres on pointer leave, and respects reduced motion. Browser verified pointer offsets and depth input; existing 11 tests pass.

2026-10-04 layout update: the product headline is higher, and the existing three feature tabs plus their detail panel now live inside the pinned product stage in `.product-features`. They remain visible alongside the mask throughout the product story, with original tab/keyboard listeners preserved. Compact desktop/mobile spacing reserves room for controls and the ribbon; reduced motion returns the panel to normal flow. The product anchor compensates for the global 85px scroll padding, and the first story is readable on arrival. Product-world assets now use v4. Browser checked at narrow and desktop widths; feature switching and all 11 existing tests passed.

Superseding update: the user subsequently requested the lens graphics alone, as a window over the 3D model, with the photo removed. `product-world.js` now creates an inline SVG HUD inspired by profile.png: curved scale, circular readouts, direction indicator, battery and gridded navigation graphic. It is transparent, aqua, scroll-revealed and labeled simulated. The 3D mask remains visible and draggable beneath it. The photo is no longer rendered in this reveal; its source asset is retained. Product-world CSS/JS cache versions are now v3. This is a native vector recreation, not a literal extraction of the image's illegible text.

The user asked to replace the floating data window with an existing mask image. `product-world.js` now uses `assets/profile.png`, the underwater close-up with a luminous display inside the lens. It dissolves in during the display chapter (or via the preview button), while the interactive model fades out; the model returns afterward. This is an exterior product visualization, not an actual first-person photograph. No new image was generated. `product-world.css` and `product-world.js` now use `?v=2`. Earlier references below to the generated numeric display panel describe the superseded implementation.

## Newest implementation — complete product world and return loop

This section supersedes earlier descriptions of the product section's scope and remaining work.

The user clarified that Nerion is a scuba-diving mask with an internal screen serving the role of a dive-computer display. It is a design project, but the user wants polished product-launch language. Keep the discrete footer note “DESIGN PROJECT — NOT AVAILABLE FOR PURCHASE”; do not invent certifications or tested safety capabilities.

The user approved a substantial animated product story after the existing films and a deliberate scroll return from the end to the opening. The six-film opening itself remains unchanged in this update.

New files:

- `dist/product-world.js`: four crossfading product narratives, scroll-driven camera movement, illustrative HUD overlay, interactive preview and reset buttons, revised product feature copy and footer copy.
- `dist/product-world.css`: 1100svh product track (1200svh on narrow screens), story/model/display composition, accessible static reduced-motion layout, dark ending.
- `dist/scroll-loop.js`: deliberate end-of-page return to top, black curtain, on/off toggle, wheel/touch/keyboard support, reduced-motion exclusion.
- `scroll-loop.test.cjs`: arrival/momentum protection, fresh-gesture activation, reduced-motion and upward-gesture exclusions.

These load after `system-scroll.js`, extending its DOM. The four stages are “Your dive computer. Inside your mask.” → “Information. In your field of view.” → “Look into the blue. Not down at a device.” → “Quietly extraordinary.” The mask rotates gently with scroll; dragging suspends the scripted camera within the current chapter. The overlay is labeled as illustrative, not live dive data.

The loop requires resting at the bottom for at least 600 ms, then a fresh downward gesture. Wheel momentum is not enough; upward scrolling is unaffected. Touch requires a fresh upward swipe begun at the bottom. Keyboard supports ArrowDown, PageDown and Space outside interactive controls. An end-of-page toggle disables the loop, and reduced-motion users never auto-loop. An opaque curtain hides the position reset and hash updates to #abyss. Native return links remain available.

Validation: all 11 reported tests passed after this update; product JavaScript syntax checks passed. The mobile-width product layout and display-preview toggle were inspected in the browser. The keyboard-triggered loop was observed returning the URL to #abyss and the story to the awakening. No console errors were observed. Desktop/short-height layout and real-device touch-loop behavior still deserve further visual QA.

## Latest follow-up — varied text motion and product focus

This update supersedes the earlier uniform-letter-animation description below:

- The user asked for a different text entrance in each scene, while keeping the experience about the product.
- `journey-timeline.js` now exports `letterPose(scene, index, count, local, leave)`.
- The six entrances are: alternating vertical assembly; center-out expansion; horizontal glide; upward stagger with slight rotation; gentle scale-down; and a unified soft fade/rise.
- These are deterministic, scroll-reversible scene variations, not random animation on every visit. All settle into a normal readable pose.
- Eyebrows now explicitly reference Nerion, the N—01 dive-mask concept, diver-centered design, and the mask presentation below. Main headlines are unchanged.
- The prominent draggable 3D mask remains above the ribbon in “Quietly extraordinary.” It is not inserted as an obstructive overlay over the films.
- Current cache versions: `journey-timeline.js?v=2`, `journey.js?v=3`, `system-scroll.js?v=2`, `system-scroll.css?v=2`.
- A new timeline test checks six distinct entrances and their settled/exit states. The active player/timeline tests passed after this change.
- A fresh narrow-screen screenshot now confirms the front-facing 3D mask and reduced HUD clutter. The ribbon's full sticky hold, short-height/desktop variants, keyboard behavior, and manual model dragging still merit verification. No paid assets were generated.

This document describes the actual local implementation, the user's direction, and the remaining verification work. Read the current files before editing; this is a handoff, not permission to rebuild or spend money.

## 1. Start here

Nerion is an intelligent diving-mask **product concept**. The website is an atmospheric underwater experience inspired by the immersive feeling of https://www.igloo.inc/, not a literal copy of its content or branding.

The user has supplied six cinematic films. They are now connected into one long, scroll-controlled opening journey. The next section is a product-focused, interactive 3D-mask presentation titled **“Quietly extraordinary.”**

**Latest requested changes, already implemented but not fully visually verified:**

1. Remove the repeating “BEYOND THE SURFACE · FOLLOW YOUR OWN CURRENT” ribbon from the opening films.
2. Move that ribbon to “Quietly extraordinary.”
3. Make that product section require more scrolling, so visitors have time to see it.
4. Place a prominent mask above the ribbon, making the section more about the product.

The ribbon has been moved; the product presentation now has a long sticky hold; the existing interactive GLB mask has been repositioned to start front-facing, with automatic rotation disabled. **Start the next session by visually checking this latest product presentation.** The user interrupted work to request this handoff before the final visual check was completed.

## 2. Working with the user

- The user explicitly asked: **ask before doing things**, especially generating media or making significant new changes. Once they approve a specific change, implement that scope without repeatedly asking about ordinary implementation steps.
- The user wants to generate videos themselves to reduce cost and usage. Give them prompts when requested, then use the files they provide.
- Do not generate paid media, buy credits, install services, publish, or make a new architectural direction without approval.
- Earlier paid-video discussions do **not** authorize further generations. The current film sequence uses the user's supplied files.
- Explain outcomes in plain, non-technical language. They prefer quick visual iteration.
- Preserve the original videos in Downloads. Work from derived copies in the project.
- Preserve the working opening: the user explicitly said it looked nice.
- Smoothness and enough scroll time matter more than piling on effects.

## 3. Location, preview, and stack

Project root:

```text
/Users/oliwiajasionek/Documents/ChatGPT/Nerion
```

Local preview:

```text
http://127.0.0.1:4173/?opening=1#abyss
http://127.0.0.1:4173/?opening=1#system
```

`?opening=1` is a preview/cache-busting URL convention, not a feature flag. The six-film journey is enabled by the `film-journey` HTML class.

The app is plain HTML, CSS, and vanilla JavaScript. There is no current package.json/framework build workflow. **The files in `dist/` are the editable implementation**, not disposable build output.

If the local server is not already running, serve `dist/`, for example:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory /Users/oliwiajasionek/Documents/ChatGPT/Nerion/dist
```

Check whether the port is already occupied before starting another server. Use HTTP rather than opening index.html via `file://`; video fetching depends on HTTP.

Dependencies include Google Fonts (Space Grotesk and DM Mono) and Google's model-viewer component loaded from unpkg, version 4.0.0. There is no Lenis dependency. Scroll smoothing is applied to cinematic values, not by hijacking native page scrolling.

There is a `.openai/hosting.json` file. This handoff does not establish or authorize a public deployment.

At the last inspection, `dist/`, `.openai/`, and the root test files were untracked in Git. Do not run destructive cleanup, reset, or assume untracked files are expendable. No commit was made for these changes.

## 4. Creative direction

The experience should feel mysterious, premium, underwater, and product-led:

- Begin in a black abyss.
- A mask descends into view as the user scrolls.
- The opening begins monochrome, then gradually reveals teal/blue color.
- Letters enter from alternating vertical directions and assemble into readable sentences.
- Films overlap with soft cinematic dissolves instead of separate pages jumping into view.
- Allow the image and copy time to settle before moving on.
- After the cinematic story, let visitors spend time looking at and rotating the product.
- The repeating ribbon now belongs to the product section, **not** over the films.

Important distinction: the supplied shots have different compositions and are **not frame-matched continuous camera footage**. The user approved soft dissolves as the way to connect them. Do not claim the sequence is a physically uninterrupted camera shot.

## 5. Current page sequence

| Order | Scene | Main copy |
| --- | --- | --- |
| 1 | Mask awakening | Beyond the / surface. |
| 2 | Water ripple | One drop. / A new world. |
| 3 | Diver swimming | Follow your / own current. |
| 4 | Reef glide | There is more / beneath. |
| 5 | Manta encounter | Let wonder / find you. |
| 6 | Surface light | Stay curious. / Go deeper. |
| 7 | Product section | Quietly / extraordinary. |
| 8 | Feature tabs | Adaptive optic; Environmental array; In-view intelligence |
| 9 | Older deep-ocean section | Less between you and the blue. |
| 10 | Footer | Stay curious. Go deeper. |

The six films live inside `#abyss`, sharing a single sticky `.abyss-stage`. `journey.js` constructs their scene markup at runtime.

Legacy intermediate sections remain in the source but are hidden:

- `#surface`: original “Beyond the surface” holographic hero, hidden by `skip-surface`.
- `#legacy-vision`: old “Go deeper” 3D scene.
- `#legacy-drift`: earlier standalone diver-film section.

Do not accidentally bring those scenes back. The user removed the older middle mask presentation because it felt laggy.

Runtime anchors `#vision` and `#drift` now point within the film journey: ripple entry and diver entry respectively. `#system` is the product section. Links to `#surface` are rewritten to `#abyss`.

## 6. Main implementation files

All following paths are relative to the project root.

| File | Purpose |
| --- | --- |
| `dist/index.html` | Page structure, retained legacy sections, product markup, script/style loading |
| `dist/journey-timeline.js` | Pure timeline math: scene durations, overlap, color and text reveal timing |
| `dist/journey.js` | Active six-film player, DOM construction, lazy loading, seek scheduling, per-letter motion |
| `dist/journey.css` | Film layout, dissolves, typography, blue overlay, responsive/reduced-motion behavior; shared ribbon styles |
| `dist/system-scroll.js` | Latest product sticky wrapper, mask setup, relocated ribbon and scroll tracking |
| `dist/system-scroll.css` | Latest product hold length, mask/title layout, ribbon position, HUD hiding during product focus |
| `dist/nerion.js` | Menu, feature tabs, general page progress, optional ambient audio |
| `dist/nerion.css` | Base typography and layout; contains broad element selectors that can affect new sections |
| `dist/magic.js` / `magic.css` | Existing HUD, visor UI, discovery effects, ambient graphics |
| `dist/smooth.css` | Earlier performance-oriented effect overrides |
| `dist/performance-check.js` | Optional performance diagnostics; inspect before using |
| `dist/opening.js` / `opening.css` | Earlier single-video opening; JS returns early in `film-journey` mode |
| `dist/abyss.js` / `abyss.css` | Older introductory 3D-mask implementation and shared sticky/visibility styles |
| `dist/cinematic.js` / `cinematic.css` | Old Go-deeper presentation; JS returns early in `film-journey` mode |
| `dist/drift.js` / `drift.css` | Older standalone diver scrubber; JS returns early in `film-journey` mode |
| `dist/hologram.js` / `hologram.css` | Original split-mask hologram; bypassed by `skip-surface` |

Current root classes in index.html:

```html
<html lang="en" class="abyss-active skip-surface film-journey">
```

`abyss-active` is toggled by the journey to hide the regular header/HUD during the cinematic section. `product-focus` is toggled by system-scroll.js to hide distracting HUD pieces during the product hold.

Script order matters. `journey-timeline.js` must load before `journey.js`. `system-scroll.js` runs after journey and the existing page scripts. It moves existing product DOM nodes rather than replacing them, preserving listeners attached by other modules.

CSS order matters too. `system-scroll.css` currently loads last. The newest script/style query versions are `journey.js?v=2`, `system-scroll.js?v=2`, and `system-scroll.css?v=2`. Refresh the browser and bump relevant query versions when necessary.

## 7. Assets and source mapping

Original user-provided files, all in `/Users/oliwiajasionek/Downloads/`:

| Scene | Original filename | Web asset under `dist/assets/` |
| --- | --- | --- |
| Mask | `a-cinematic-underwater-pr_r1050066.mov` | `nerion-opening.mp4` |
| Ripple | `an-extreme-closeup-cinema_r1050066.mov` | `journey-ripple.mp4` |
| Diver | `a-lone-adult-diver-wearin_r1050066.mov` | `journey-swim.mp4` |
| Reef | `continue-naturally-from-t_r1050066.mov` | `journey-reef.mp4` |
| Manta | `continue-directly-from-th_r1050066.mov` | `journey-manta.mp4` |
| Surface light | `continue-directly-from-th_r1050066 (1).mov` | `journey-light.mp4` |

Do not confuse the two similarly named `continue-directly` files: **the one with `(1)` is surface light; the one without it is the manta**.

Poster files:

- `nerion-opening-poster.jpg`: a representative frame around six seconds into the mask clip, not its first frame.
- `journey-ripple.jpg`, `journey-swim.jpg`, `journey-reef.jpg`, `journey-manta.jpg`, `journey-light.jpg`: first-frame posters from the derived clips.

Other assets retained:

- `mask.glb`: interactive 3D product model.
- `mask.png`: existing transparent product image, with substantial empty space in its composition.
- `ocean.png`, `diver.png`, `profile.png`: older artwork.
- `nerion-diver.mp4` and `diver-poster.jpg`: earlier generated diver film, no longer the active six-film sequence's diver asset. Do not confuse it with `journey-swim.mp4`.

The opening movie depicts a conventional diving mask, while the existing GLB is a different/full-face concept. The user accepted the movie and asked to retain/add a 3D product presentation. This visual mismatch is known; do not silently regenerate or replace either asset. Ask if consistent geometry becomes a design priority.

The derived MP4s retain native resolution and use H.264, yuv420p, CRF 20, GOP 8, faststart, and no audio. The five later clips were given a subtle shared grade during encoding:

```text
eq=saturation=0.88:brightness=-0.015,colorbalance=bs=0.025
```

The originals are untouched. The five later MP4s total approximately 20 MB. The blue page overlay and initial grayscale transition are additional runtime effects.

## 8. Film scrolling behavior

`journey-timeline.js` defines lengths in viewport-height units:

```js
const lengths = [5, 2.6, 4, 4, 4, 4.8];
const overlap = 0.9;
```

The total timeline is 19.9 viewport-height units after subtracting five overlaps. The scroll container is 20.9 viewport heights including the sticky viewport. On large or small screens this is intentionally a long journey.

For each join, the outgoing film stays opaque underneath while the incoming film fades over it. The outgoing layer disappears only after the new one fully covers it. This avoids repeated dips to black.

The opening retains its previous pacing:

- Fade out of black near the start.
- Begin letter assembly around 28% of its local progress, with staggered letters.
- Reveal color between approximately 32% and 68%.
- Reach the last video frame by approximately 76%, allowing a reading hold.
- Let text disperse before the next scene completes its dissolve.

Later scenes have earlier letter entrances, readable middle holds, and exit dispersal. The final title holds until the overall fade to the product section.

Runtime details worth preserving:

- Native scroll stays native.
- One bounded requestAnimationFrame loop damps cinematic position with a roughly 130 ms time constant.
- It stops when settled and does not run endlessly at idle.
- No new seek is assigned while `video.seeking` is true.
- `seeked` applies the latest pending target, supporting reverse scrolling.
- Videos are fetched as blobs and assigned object URLs so seeking also works with servers without HTTP Range support.
- Only nearby clips are fetched; only visible clips are actively sought.
- Posters remain until a usable video frame is available; failures retain still imagery.
- Muted playback priming is provided for touch devices.
- Hidden-document work is suppressed.
- Object URLs are revoked on non-BFCache page exit.

Under reduced motion, the films are not fetched. Six static, readable poster scenes replace the pinned scrubbed sequence.

On portrait/narrow displays the landscape footage is **contained**, not aggressively cropped. Black space above/below is intentional to preserve the full subject. No native portrait video set was generated or authorized.

## 9. Latest product section implementation

`system-scroll.js` creates:

```text
#system
  .system-scroll-track
    .system-scroll-stage (sticky)
      .section-heading
      .system-title
      .model-stage
        #mask-model
      .system-ribbon
        .journey-ribbon-track
  .feature-tabs
  #feature-detail
```

The hold is 340svh on desktop and 360svh at widths up to 600px. The sticky stage is one viewport tall with a 580px minimum. Feature tabs remain outside the pinned stage, below it, so they stay normally accessible.

The repeating ribbon moves by one repeated phrase over the hold, using scroll progress rather than a perpetual timer. It is decorative and aria-hidden. The exact repeated text is:

```text
BEYOND THE SURFACE  ·  FOLLOW YOUR OWN CURRENT  ·
```

The model is above the ribbon. Latest runtime overrides:

```text
camera-orbit: 90deg 90deg 110%
field-of-view: 30deg
auto-rotate: removed
hint: ↔ DRAG THE MASK · EXPLORE IN 3D
```

Camera controls remain enabled; visitors can rotate it themselves. There is a subtle blue product spotlight. The original HTML still contains the old camera settings and auto-rotate attribute; the latest script deliberately overrides them at runtime.

During `product-focus`, the magic toolbar, cockpit, status and depth rail are hidden to reduce clutter. The ordinary site header remains available. Reduced-motion users get the same product content without the extended sticky hold or moving ribbon.

## 10. Tests and verification status

Run from the project root:

```sh
node --test journey-player.test.cjs journey-timeline.test.cjs opening-scroll.test.cjs drift-scroll.test.cjs transition-smoothing.test.cjs
node --check dist/journey.js
node --check dist/system-scroll.js
```

The full listed test suite passed again while preparing this handoff (8 reported tests, no failures).

Current active-journey tests cover:

- Overlap coverage at all five joins, forwards and backwards.
- At most two overlapping visible film scenes.
- Opening grayscale progression and readable copy holds.
- Lazy loading of nearby clips.
- Forward/reverse seeking and seek backpressure.
- Settling without an endless animation loop.
- Six still scenes and no video requests for reduced motion.

The other three test files cover retained older implementations. Their passing does not constitute visual coverage of the new product hold.

Browser verification completed for the six-film journey before the ribbon relocation:

- All six scenes rendered.
- Video seekable ranges were nonzero.
- Mask/ripple overlap was visually inspected.
- Diver, reef, manta and finale shots were visually inspected.
- Desktop and narrow-screen layouts were inspected.
- No console errors were observed during that check.

After the ribbon relocation, the product layout was inspected once on a narrow screen. This revealed a rear-facing rotating mask and HUD clutter. Code was then changed to the front-facing camera, disabled auto-rotation, and `product-focus` HUD suppression.

**Those last camera/HUD refinements still need a fresh browser check.** There is also no dedicated automated test yet for system-scroll.js. Do not tell the user that these latest visual refinements have been fully verified.

## 11. Recommended next steps

1. Reload the HTTP preview and visit `#system`.
2. Scroll slightly past the anchor landing offset into the sticky hold. Base CSS uses an 85px scroll-padding-top; the first anchor view can differ from the fully pinned state.
3. Confirm the mask starts facing forward, is large enough, and remains rotatable.
4. Confirm the title, model, drag hint, ribbon, and header do not overlap on desktop, narrow portrait, and short-height windows.
5. Confirm the ribbon is absent from all six films and appears only in the product section.
6. Scroll through the entire product hold; confirm the ribbon moves smoothly and the tabs become reachable afterward.
7. Confirm hidden HUD controls do not remain keyboard-focusable while product-focus is active, and that the normal UI returns afterward.
8. Add focused tests for the new product wrapper and scroll behavior if continuing implementation.
9. Show the user the result and ask what they want to refine next. Do not start generating another batch of films.

## 12. Pitfalls and guardrails

- The base CSS contains global h1 rules. The journey's `.journey-title` explicitly resets position, inset, transform, width and text alignment. Preserve those resets.
- Do not replace the seekable blob strategy with plain remote video URLs without testing the actual host's range support.
- Avoid expensive blur/filter effects on large moving layers; earlier holographic treatments caused perceived lag.
- Avoid continuous frame loops when nothing is changing.
- Keep old hidden sections stable until their references in magic.js and other scripts are understood. Deleting them can break code that still queries their nodes.
- The active journey and the old opening are separate implementations. Editing opening.js alone does not change the current six-film experience.
- The relocated ribbon still uses shared styles from journey.css. Removing those styles as “unused by the film” will break the product ribbon.
- Tests use DOM/video mocks. They do not prove real-device decode performance, visual polish, or Safari behavior.
- Do not describe simulated depth/HUD data as real diving instrumentation or safety guidance. This is a product concept.

## 13. Copyable continuation brief

> Continue the existing Nerion website at `/Users/oliwiajasionek/Documents/ChatGPT/Nerion`. Read `NERION_HANDOFF.md` and the current files first. Preserve the approved six-film scroll journey. The latest changes move the repeating “Beyond the surface / Follow your own current” ribbon into “Quietly extraordinary,” give that product section a longer sticky scroll hold, and present the existing interactive 3D mask above the ribbon. Verify the latest front-facing mask and HUD-hiding changes visually before making further changes. Ask me before major new edits or paid generation; I can create and supply media myself. Prioritize smooth scrolling, clear product focus, readable text and gradual black-to-blue transitions.

## 14. What to send to another AI

Send this Markdown file together with the **project folder**, including `dist/assets/` and the tests. This document alone contains context, not the actual website or video binaries.

For a remote AI, the `/Users/...` paths will not exist. It should use the corresponding files from the supplied project folder. Include the original MOV files separately only if it needs to re-edit/re-encode them; the current site works from the MP4 copies already in `dist/assets/`.
