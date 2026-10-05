# Nerion — reference and workflow research

Research date: 5 October 2026. Scope: the supplied scroll-world workflow and four first-party websites/interactive stories. This is a comparative design study, not a claim that Nerion reproduces their implementation or passes their performance standards.

## Evidence method

- **Observed** means visible first-party page content or a directly inspected browser state.
- **Published** means the site owner or repository author describes the behaviour; it was not independently exercised here.
- **Nerion decision** means our design interpretation, not a fact about the reference.
- Igloo was inspected in a live desktop browser before and after a scroll. Apple and Bruno were read through their publicly served page content; NASA through its official experience catalogue. Full device, accessibility and performance audits of those references were not performed. No claim is made about their exact easing curves, frame rate, implementation libraries unless published, or mobile behaviour beyond the explicitly described controls.

## 1. Supplied workflow: oso95/scroll-world

**Published:** The repository describes a pre-rendered camera journey driven by scroll position. Its pipeline makes scene stills, camera clips, and connectors conditioned on the actual rendered frames of adjacent clips. It separates asset generation from a portable JavaScript scrub engine and explicitly requests budget approval before generation. Its current README lists Monid and Higgsfield backends; this is not itself a Magnific implementation. [Repository README](https://github.com/oso95/scroll-world)

**Nerion decision:** Adopt the production principle, not the visual style or an unverified backend substitution: plan an ordered journey, preserve neighbouring boundary frames, test one complete scene–connector–scene unit, then repeat. A dissolve can soften a mismatched edit but cannot make two different geometries into a frame-matched camera flight. Scroll smoothing and source continuity are separate problems.

**Magnific adaptation:** The owner reports that the supplied footage was generated with Magnific. Record that as owner-confirmed provenance, not independently verified job history. The proposed process is to retain exact outgoing/incoming reference frames, check the chosen Magnific tool's available controls, obtain approval for any paid connector generation, and save prompt, model/version, settings, job ID and downloaded result. Do not assume a specific model supports both endpoints. Existing local media processing is not evidence of MCP generation. See [media-workflow.md](media-workflow.md) for the current evidence inventory.

## 2. Igloo Inc. — object-led atmosphere

**Observed:** The live page opened into a pale, foggy landscape with one central igloo object, peripheral brand/mission text, a scroll invitation and a sound-off control. Before and after scrolling, the object changed from a separated-block form to a closed form while the surrounding landscape and peripheral identity remained. These are sampled visual states, not a frame-by-frame measurement of its animation. Its text-only web extraction did not expose the scene, so the visual comparison used browser screenshots. [Igloo Inc.](https://www.igloo.inc/)

**Nerion decision:** Give each viewport one clear subject: the mask, diver or visor view. Keep green telemetry and navigation subordinate. Reuse a consistent water/lighting atmosphere around joins so a chapter change does not feel like a different website. The mask should remain recognisable while it rotates; dramatic motion must reveal the product, not obscure it.

**Do not copy:** Igloo's scene, block treatment, layout or identity. Nerion's dark water, green display and real product explanation are its own direction.

## 3. Apple AirPods Pro — spectacle tied to product information

**Observed in page content:** Apple's product page places a highlights/film entry before a closer-look section, then organises information into named product capabilities. The document exposes product imagery, descriptive image text, feature copy and deeper explanatory sections. This establishes the content hierarchy; this pass did not verify whether each visual sequence is scroll-scrubbed, autoplayed or otherwise animated. [Apple AirPods Pro](https://www.apple.com/airpods-pro/)

**Nerion decision:** Alternate emotional footage with a concrete explanation: a screen inside the mask, information in the field of view, and an interactive preview. Every large headline should answer what the product is or why its display placement matters. Put readable copy in HTML rather than into generated movie frames. Keep a direct route to the mask and visor instead of requiring visitors to replay the entire film to understand the product.

**Do not copy:** Apple's claims, specifications or certification language. Nerion's simulated readouts do not prove a functioning or certified dive computer.

## 4. Bruno Simon — playful exploration with recovery controls

**Observed in page content:** The portfolio invites visitors to drive through its world. Its documented controls cover keyboard, mouse, touch and gamepad; it exposes sound, quality, reset and respawn options. The creator identifies Three.js as its renderer and links its source. This is a freely explored interactive world, not evidence that every immersive site needs a linear scroll timeline. The control descriptions were read; all input modes were not physically tested. [Bruno Simon](https://bruno-simon.com/)

**Nerion decision:** Keep a small, understandable interaction set: drag the mask, preview the display, enter/exit the visor, and return to the beginning. Visitors should always know how to leave an experience or recover their view. Rotation should not capture wheel scrolling as unwanted model zoom. Optional ambient sound must remain user-controlled.

**Trade-off:** A game-like world rewards exploration but may bury product facts. Nerion should be playful at the mask, then return to a clear linear product story.

## 5. NASA Eyes / Mars 2020 landing — guided stages plus spatial explanation

**Published:** NASA presents Mars 2020 Entry Descent Landing as a step-by-step interactive 3D story, taking the visitor from orbit through atmospheric entry, parachute deployment and rover landing. Its Eyes catalogue also distinguishes exploratory simulations from guided experiences. This review used NASA's first-party description rather than measuring the interactive renderer. [NASA Eyes, Mars 2020 Entry Descent Landing](https://science.nasa.gov/eyes/)

**Nerion decision:** Chapter labels should orient the visitor within the dive, not merely decorate the scene. Build a simple progression from discovery to the mask, to its internal display, to underwater use. Use restrained readouts to explain the viewpoint. Unlike NASA's scientific simulations, Nerion's example HUD values must remain clearly labelled illustrative/simulated rather than real telemetry.

## Comparative conclusion

| Reference | Useful principle | Nerion application |
|---|---|---|
| scroll-world | Continuity belongs in the source-media pipeline | Inspect boundary frames; separate true connector work from presentation fixes |
| Igloo | One dominant object within a persistent atmosphere | Mask-led scenes, restrained green accents, coherent water colour |
| Apple | Cinematic introduction followed by specific benefits | Explain integrated display after establishing atmosphere |
| Bruno Simon | Interaction needs discoverable controls and recovery | Drag/reset mask, obvious visor exit, ordinary page scrolling |
| NASA Eyes | Guided stages make complex spatial stories understandable | Label the dive journey and clarify which information is simulated |

## Design and acceptance decisions for this revision

These are project decisions derived from the comparison, not claims of completed testing:

1. **Keep six opening scenes.** The owner clarified that the requirement is at least four; reducing the existing sequence solely to reach four is unnecessary.
2. **Prioritise continuity over more effects.** Hold the established palette across edits, avoid blank backgrounds during loading, and keep text away from busy transition moments. A colour treatment or editorial transition must be described honestly, not called a frame-identical connector.
3. **Keep the product understandable.** Maintain the live heading, three product features, recognisable mask and visor preview. The film supports those facts.
4. **Make backward scrolling coherent.** Transition state must come from scroll position, not a one-time forward-only animation. Test the same boundary in both directions.
5. **Preserve a non-motion route.** Static media, chapter copy and product controls must still explain Nerion without mandatory camera movement. Check legibility and touch reach separately on phones.
6. **Test a representative seam before spending.** Compare camera direction, silhouette, lighting and scale at the outgoing and incoming frames. If they cannot plausibly connect, local easing alone is insufficient; approve a new connector or accept an explicitly editorial transition.

## Remaining evidence, not filled in by research

- Exact Magnific prompts, settings and generation IDs for originals remain dependent on the owner's records.
- A verified MCP scene–connector–scene production proof is separate from the owner's report of Magnific origin.
- A continuous visual experience still needs forward/backward browser review at each seam; this document does not certify seamlessness.
- Deployment, teacher access and the live URL belong to the submission checklist, not this research task.

Related records: [storyboard](storyboard.md), [transition audit](transition-audit.md), [requirements audit](requirements-audit.md).
