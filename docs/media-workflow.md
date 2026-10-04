# Media inventory and Magnific workflow

## Provenance

The user confirmed the supplied generated media was made in Magnific. This is **user-reported provenance**. No generation history export or prompt/model metadata for the six current films was located in the inspected folders. Generic `Lavf` encoder tags do not identify an AI model. Exact model versions, seeds, generation IDs, credits and original prompts remain unverified.

Magnific MCP account/catalog access was verified earlier in this task. That read-only check does not establish that the existing films were generated through MCP rather than Magnific's web interface. No paid generation was performed during this audit.

## Original asset location (local, not included in this working project)

`/Users/oliwiajasionek/Documents/Codex/2026-10-01/i-n/nerion-scroll-world/public/media/raw/`

Twelve videos plus `model.glb` were inspected there. Original files were not modified, moved or uploaded.

## Active opening footage

Mapping follows the historical conversion record in `NERION_HANDOFF.md`; dimensions and durations were independently probed. It is not a cryptographic match between original and re-encoded video.

| Original | Current served asset in dist/assets | Scene |
| --- | --- | --- |
| a-cinematic-underwater-pr_r1050066.mov | nerion-opening.mp4 | Mask |
| an-extreme-closeup-cinema_r1050066.mov | journey-ripple.mp4 | Ripple |
| a-lone-adult-diver-wearin_r1050066.mov | journey-swim.mp4 | Diver |
| continue-naturally-from-t_r1050066.mov | journey-reef.mp4 | Reef |
| continue-directly-from-th_r1050066.mov | journey-manta.mp4 | Manta |
| continue-directly-from-th_r1050066 (1).mov | journey-light.mp4 | Light |

All six raw originals: HEVC, 1920×1080, 24fps, approximately 8.041667 seconds. All six served derivatives: H.264, 1920×1080, 24fps, same probed duration. The historical handoff records short-GOP encoding, no audio, and a restrained shared grade; these settings should be rechecked if assets are replaced.

The five other numbered originals `01.mp4`–`05.mp4` are HEVC 1080p/24fps, approximately 5.041667 seconds each. `nerion.mp4` is HEVC 1080p/24fps, approximately 30.08 seconds. They belong to earlier production work; they are not the six current opening sources above.

## Other active media

- `mask.glb`: SHA-256 `ebfaae74df61017c2dee21f5e229de568bdb7e2732393c96cfcddd17d4aa5a38`, identical to raw `model.glb`. GLB source confirmed; an editable Blender file was not found in the inspected project files.
- `nerion-diver.mp4`: separate product-finale film, H.264 1280×720, 30fps, approximately 8.033008 seconds. Its original-to-derivative mapping remains unconfirmed; do not confuse it with `journey-swim.mp4`.
- `mask.png`, `ocean.png`, `profile.png`, `diver.png`: supplied artwork; exact creation settings and licensing evidence not inspected.
- Opening poster: representative mask frame, not first-frame identical. Later journey JPG posters are documented as first-frame extracts. The website does not currently use AVIF/WebP posters.

The current movie mask and full-face interactive GLB differ. Consistent product geometry is a remaining design issue, not something a colour grade fixes.

## How scrolling controls the media

`journey-timeline.js` defines six lengths `[5, 2.6, 4, 4, 4, 4.8]` and five overlaps of `0.9`, giving 19.9 viewport-height units of active opening timeline. The containing section includes an extra viewport for its pinned stage. `journey.js` maps scroll position into this timeline, eases toward the target with time-based damping, and converts each clip's local progress to `video.currentTime`.

Only nearby videos are fetched, as blobs, avoiding dependence on HTTP range support. New seeks wait while a decoder is already seeking. Posters remain available when clips fail. Reduced-motion mode avoids film fetches and exposes static scenes. Live HTML handles all headings; generated footage is not used to render website text. The product finale uses a separate, similarly coalesced player.

## Evidence still needed

For each current film, provide available Magnific project/creation ID, prompt, exact model/version, duration/resolution settings, reference images or keyframes, date and any cost/approval record. If unavailable, mark it unavailable—never invent retrospective generation logs. The older `docs/video-production.md` in the supplied Vite folder describes a night shipwreck story and cannot serve as the production record of these current films.

The required proof transition must be documented as a new validation if no historical approval exists. Merely renaming files or importing them into Magnific does not establish an MCP-generation workflow.
