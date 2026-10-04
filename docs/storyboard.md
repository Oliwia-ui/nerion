# Nerion — current storyboard

Documented 2026-10-04 from the current website, not a record of an approved pre-production storyboard. Six opening scenes are retained because the user clarified the minimum is four.

## Direction

- **Product:** a scuba mask with an integrated dive-computer display.
- **Audience:** recreational scuba divers and people exploring product design; the experience is not diving instruction.
- **Message:** dive information within the mask's field of view.
- **Identity:** Nerion; black/navy underwater world, restrained green highlights, calm and exploratory tone.
- **Current colour tokens:** background `#061416`, green `#c2f4aa`, foreground `#e6eeea`, muted `#91aaa6`. These intentionally differ from the early Abyss Kit proposal.
- **Typography:** Space Grotesk for product/display copy; DM Mono for labels and cipher.
- **Material direction:** dark technical mask housing, translucent lens, green optical information. The filmed mask and full-face GLB do not currently share identical geometry.
- **Camera:** existing supplied footage, from product portrait to ocean observation. The sequence is currently editorial dissolves, not a proven continuous camera flight.
- **Technical approach:** static HTML/CSS/JS, blob-backed video seeks, live HTML text, model-viewer for the mask. Films are landscape; on portrait screens they are contained rather than claiming a native portrait render.

## Opening scenes

Scroll ranges are in viewport-height units of the main film timeline. Overlap is 0.9 viewport heights between adjacent scenes; it is not 0.9 seconds of footage. Each source movie is approximately 8.04 seconds.

| Scene / range | Visual and camera action | HTML copy | Product purpose / handoff |
| --- | --- | --- | --- |
| 01 The Awakening / 0–5 | Black opening cipher; front-facing mask emerges. Scroll shifts monochrome toward colour. | Beyond the / surface. | Introduce the mask. Ends on mask portrait; next begins on a water droplet, so a true optical connector is missing. |
| 02 The First Ripple / 4.1–6.7 | Droplet and spreading circular water ripples; macro water detail. | One drop. / A new world. | Threshold into the ocean. Ripples dissolve into a submerged light shaft rather than physically continuing through the surface. |
| 03 Follow the Current / 5.8–9.8 | Diver travels through blue water under light from above. | Follow your / own current. | Establish scuba context. Diver position disappears at the reef handoff. |
| 04 Another Perspective / 8.9–12.9 | Camera surveys an underwater reef, with brighter cyan overhead. | There is more / beneath. | Show the environment the product is for. Reef geometry/framing changes at the next scene. |
| 05 The Encounter / 12–16 | Manta crosses above the reef and exits toward the light. | Let wonder / find you. | Emotional payoff of looking outward. Next scene starts substantially darker with different framing. |
| 06 Toward the Light / 15.1–19.9 | Underwater light finale. | Stay curious. / Go deeper. | Invite product exploration; green-dark wash transitions into the product section. |

At rest before scrolling, NERION decodes from random glyphs in a repeating green wordmark. The cipher dismisses on scroll and returns at the top. This is an intro, not an additional movie scene.

## Product sections following the six-scene film

### Interactive mask: #system

Long pinned stage: 1100svh desktop / 1200svh narrow screens. Four narrative phases:

1. Your dive computer. Inside your mask.
2. Information. In your field of view.
3. Look into the blue. Not down at a device.
4. Quietly extraordinary.

The GLB rotates with scroll and permits manual drag. Feature tabs remain visible with the mask. A transparent SVG display reveals above the model; it is illustrative, not validated optical output. Enter visor opens a modal with a mask-shaped border, static readouts, depth slider and pointer-shifted ocean background.

### Product in the water: #depth

A separate 680svh pinned chapter scrubs `nerion-diver.mp4` through three messages:

1. The ocean ahead. Your dive in view.
2. Your information. Not out of sight.
3. Look through Nerion.

Green sample depth, heading and dive-time readouts appear after the first message. The final CTA opens the visor; a mask thumbnail links to the product stage. These graphics illustrate the display concept; the third-person film is not a literal view through a working Nerion mask.

### Ending

Nerion. Back to the blue. Return-to-surface link, design-project disclosure and optional scroll-loop control. The closing screen is the page end; there is no intentional extra blank scroll tail.

## Next continuity work

Use the [transition audit](transition-audit.md) to select one scene–connector–scene proof. Do not claim the proof was approved before production: that chronology is unverified. Preserve the current site until a replacement transition is approved; ask before paid generation. Longer scene holds are acceptable, but cannot correct mismatched camera geometry by themselves.
