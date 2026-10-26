PRAISY CINEMATIC VIDEO ASSETS

The three MP4 video files in this folder are connected in src/config.ts:
- /videos/praisy-hero.mp4 — homepage hero
- /videos/praisy-middle.mp4 — middle cinematic section
- /videos/praisy-finale.mp4 — bottom cinematic section

Each is H.264 MP4 at 1280x720, about 10 seconds long, with no audio. Poster images are extracted from their corresponding video files.

Mobile optimization:
- The *-mobile.mp4 variants are 854x480 H.264, 20 fps, muted/no-audio files for smaller mobile downloads and lower decode cost.
- Desktop remains on the original 1280x720 video assets. The React app selects the mobile variant up to 700 CSS pixels wide and mounts videos only while their section is in view.
