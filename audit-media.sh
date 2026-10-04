#!/bin/bash
# Read-only inspection of source media; derived review images go in docs/audit-media.
set -euo pipefail
mkdir -p docs/audit-media
clips=(nerion-opening journey-ripple journey-swim journey-reef journey-manta journey-light)
for ((i=0; i<5; i++)); do
  next=$((i+1))
  ffmpeg -hide_banner -loglevel error -y -sseof -0.1 -i "dist/assets/${clips[i]}.mp4" -i "dist/assets/${clips[next]}.mp4" -filter_complex '[0:v]scale=480:270,setsar=1[a];[1:v]scale=480:270,setsar=1[b];[a][b]hstack=inputs=2[out]' -map '[out]' -frames:v 1 "docs/audit-media/join-${next}.jpg"
done
ffmpeg -hide_banner -loglevel error -y -i docs/audit-media/join-1.jpg -i docs/audit-media/join-2.jpg -i docs/audit-media/join-3.jpg -i docs/audit-media/join-4.jpg -i docs/audit-media/join-5.jpg -filter_complex 'vstack=inputs=5[out]' -map '[out]' -frames:v 1 docs/audit-media/opening-boundaries.jpg
