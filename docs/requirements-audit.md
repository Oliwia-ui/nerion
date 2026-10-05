# Requirements and QA — 2026-10-04

## Continuity and research follow-up — 2026-10-05

Added source-linked `design-research.md` covering the supplied scroll-world workflow and four first-party interactive references. Observation limits are explicit. Broader joins, longer reading holds, shared seam lighting and restrained desktop motion now improve the existing montage; all 13 tests pass. Source-frame mismatches remain, so continuous frame-matched camera production is still not claimed. GitHub now exists as a private repository with one initial commit; phone and transition follow-ups are local, not pushed. The older table below records the initial audit and is superseded by these dated follow-ups.

## Phone follow-up — 2026-10-05

Added `dist/mobile.css`: phone product stage uses reserved grid rows, 44px product controls, larger supporting copy, 48px feature tabs, safe-area spacing, and hidden sound control during product chapters to prevent overlap. Visor controls/readouts and finale text have larger phone sizes. Short viewports retain scroll access to taller stages. The cipher is now hidden for reduced motion so it cannot cover the static story. Desktop rules remain unchanged. Narrow browser preview and visor open/close checked; product controls measured approximately 44px and no horizontal document overflow at the observed 491×906 viewport. Requested smaller viewport preview also inspected, but exact-device certification is still pending because browser viewport overrides previously differed from effective sizes. All 12 automated tests pass. Changes are local, not pushed or deployed in this follow-up. The historical findings below describe the pre-fix audit; full physical-phone, contrast and reduced-motion browser QA remain outstanding.

## Basis

Compared current working `dist/` against the supplied `i-n/assignment-brief.md`, with the earlier A2 Abyss Kit document as additional guidance, not a compulsory equipment storyline. The user clarified **at least four** scenes. This is an audit, not an assertion of teacher approval or a complete WCAG certification.

## Acceptance status

| Requirement | Status | Evidence / next action |
| --- | --- | --- |
| Original subject and identity | Present | Nerion mask and integrated dive display; distinct story and green identity. Brand/model rights not independently verified. |
| At least four scenes | Met | Six named opening films, documented in storyboard. |
| Forward/backward scroll timeline | Implemented; automated pass | Coalesced-seek and timeline tests. Real-device performance still needs checking. |
| Connected transitions, no visible jumps | Not yet met as frame-matched continuity | All five inspected source joins change composition; see frame pairs and transition audit. Dissolves are not a substitute for matched camera geometry. |
| Prove one transition before remaining production | Not evidenced | No dated approval record located. Do not invent retrospective chronology. |
| Short readable HTML text | Implemented; readability improvements needed | Text is live HTML. Several secondary labels use 5–8px sizes. Contrast over moving frames has not been measured. |
| Scroll instruction, chapters, ending/CTA | Present | Cipher scroll prompt, six scene labels, product/visor CTAs, footer return and loop controls. |
| Magnific adaptation | Partial evidence | User confirms Magnific origin; exact model settings and MCP generation record still needed. Current code uses adapted blob-seeking and overlap principles. |
| Reduced motion | Partial | Six static scenes/no movie fetch covered by test; visible mode status absent and opening cipher CSS has a conflict described below. |
| Media failure | Partial automated verification | Failed opening-video fetch keeps poster/HTML; no complete browser network-failure exercise or WebGL-disabled test performed. |
| Keyboard and focus | Partial | Existing tab roles and focus styles; previous visor open/Escape/focus-return checks passed. Full-page keyboard/screen-reader audit pending. |
| Desktop/mobile | Partial browser verification | Actual sizes below; not a claim that the full target matrix passed. |
| Source/documentation | Improved | README, storyboard, media provenance inventory and transition/QA evidence created. Editable model source and generation records remain incomplete. |
| Research supplied workflow plus four sites | Evidence incomplete | Older README lists references, but no dated comparative analysis was located. A reference list is not proof of research. |
| GitHub with incremental commits | Deferred | No repository creation, remote changes, commits or push performed. |
| Published site and README URL | Deferred | README clearly marks public URL pending; localhost is not submission deployment. |

## Tests run

`node --test *.test.cjs`: all twelve tests passed, including the added regression test for failed video fetch retaining poster/HTML with no repeated retry on scroll. These tests use fake DOM/video objects and do not replace visual or hardware tests.

Source media dimensions/frame rates/durations verified with ffprobe. Five boundary pairs extracted with ffmpeg and inspected visually. No original assets modified. No credits spent.

## Browser findings

- At an actual **390×844** viewport, the product headline, feature panel and three controls fit with no document horizontal overflow. Feature panel bottom was approximately 779px.
- Product controls measured **36px high**, below the requested 44px touch target; feature tabs measured 48px high.
- Sound control overlaps the lower feature-description area at this size. Several labels are too small for comfortable reading.
- Additional requested viewport overrides did not consistently equal the effective CSS viewport. Actual readings were **330×717**, **1107×692**, and **1477×830**, all without document horizontal overflow at the inspected product state. At 330px the controls wrapped to roughly 82px total height.
- Therefore do **not** mark 430×932, 1440×900 or 1920×1080 as passed. Retest with verified CSS viewport dimensions, plus physical iOS/Android hardware when available. Temporary viewport override was reset.
- Browser error-log query returned no errors during the checked states; this is not a clean-session network audit.

## Priority corrections before submission

1. **Continuity:** produce/approve one true boundary-matched connector, then repair the remaining joins or get explicit acceptance of editorial dissolves.
2. **Reduced-motion opening:** `journey.css` expands the stage into six static scenes, but `opening-cipher.css` still absolutely fills that stage. At scroll zero this can cover the static story and centre the wordmark far below the initial viewport. Hide/reflow the cipher in reduced-motion mode and verify in a real browser. Add a visible reduced-motion indicator.
3. **Touch/readability:** increase product controls and other small interactive targets to at least 44×44px; avoid sound-control overlap; enlarge supporting text and verify AA contrast against actual film frames.
4. **Product consistency:** the generated conventional mask and full-face GLB are visually different. Select one reference geometry before generating replacement footage; do not silently replace the approved design.
5. **Full QA:** test blocked/slow video requests, failed GLB/WebGL, keyboard-only navigation, reduced motion, forward/reverse at each join, rapid touch scrolling and the four exact target sizes. Record browser/device and date.
6. **Production evidence:** attach available Magnific generation settings and distinguish web-created assets from demonstrated MCP workflow.

## Release checklist (later, not authorised in this audit)

- Resolve or explicitly disclose remaining findings.
- Assemble portable source assets and model/generation provenance without copying credentials.
- Create the dedicated repository and meaningful commits when requested; do not fabricate historical commits.
- Publish, test a clean public session and add the verified URL to README.

This audit intentionally leaves the approved visuals unchanged. It identifies the work remaining rather than marking incomplete criteria as complete.
