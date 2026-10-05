# Reef → manta: approved MCP transition test

Date: 2026-10-05. The owner explicitly approved one 3,950-credit test. This is a new validation, not a claim that a transition was approved before the original six films were produced.

- Provider: Magnific MCP `video_generate`
- Creation: `rgA4Frwxtc`
- Model: `bytedance-seedance-pro-2.5`
- Requested output: 5 seconds, 1920×1080 / 16:9, 24 fps, native audio disabled
- Quoted and queued cost: 3,950 credits
- Start: rendered end-frame asset of reef creation `79VCSDbJAL`
- End: rendered start-frame asset of manta creation `vQUGtyoa47`
- Signed frame URLs intentionally excluded from repository documentation.
- One initial request failed argument validation before a creation was queued: mutually exclusive audio options. Removing `noMusic` while retaining `withSoundEffects: false` fixed it; the price remained 3,950 credits. Only one creation was queued.

## Prompt

Single continuous photoreal underwater camera movement. Begin exactly on the supplied reef end frame and continue a calm forward glide, preserving the camera height, direction, rocky reef geometry, teal illumination and suspended particles. Gradually reach the supplied manta scene first frame. End on that exact composition with a steady gentle forward drift. No cuts, dissolves, camera reversal, sudden exposure changes, text, logos or interface. One restrained cinematic connector, not a montage.

## Review status

Generation completed successfully. The result was displayed inline through Magnific. It is not integrated into the live website.

Magnific's read-only `video_analyze` compared the ordered reef → connector → manta chain (automated analysis, not a pixel-level or human acceptance test). It reported closely aligned reef framing and lighting at the first join, but a manta wingtip already present in the connector opening. Internal motion was described as smooth, without cuts or obvious morphing. At the second join it reported a significant mismatch: the connector manta faces away while the next film begins with it facing toward the camera; reef geometry and field of view also differ.

Decision: **not accepted for integration** on this evidence. No additional generation authorised or performed. A manual boundary review is still appropriate before a revised attempt. A completed generation does not prove that all five scene boundaries meet the assignment.
