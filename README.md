# ⛳ Golf Swing Analyzer

A real-time golf swing analysis tool that runs entirely in the browser — no server, no install, no build tools required.

## Features

- **Live webcam analysis** — pose detection runs on your live camera feed
- **Video file upload** — analyze a pre-recorded MP4, MOV, or WebM swing
- **Real-time pose overlay** — full skeleton drawn over the video using MediaPipe Pose
- **Swing phase detection** — automatically identifies Address, Backswing, Top of Swing, Downswing, and Follow-through
- **Spine angle measurement** — calculates tilt of the torso from vertical in degrees
- **Hip rotation tracking** — measures delta from address baseline with live sparkline history
- **Balance indicator** — left/right weight distribution bar updated every frame
- **Swing score panel** — ✓ GOOD / ✗ FIX badges for Spine Angle, Hip Rotation, and Balance
- **3-second swing recorder** — capture a clip and replay it with a frame-by-frame scrubber

## Quick Start

No installation needed. Open the file directly or serve it locally:

```bash
# Option 1 — open directly in Chrome/Edge
open golf-swing-analyzer/index.html

# Option 2 — serve locally (recommended for webcam access)
cd golf-swing-analyzer
python3 -m http.server 8080
# then open http://localhost:8080 in Chrome or Edge
```

> **Browser requirement:** Chrome or Edge recommended. MediaPipe's WASM runtime has the best support in Chromium-based browsers.

## Usage

### Live Webcam Mode
1. Click **▶ Start Camera** and allow camera access
2. Stand in frame so your full body (head to ankles) is visible
3. **Hold your address position for ~1 second** — the app calibrates your hip baseline
4. Swing and watch the metrics, phase badge, and scores update in real time
5. Click **⏺ Record Swing** to capture a 3-second clip, then **⏵ Replay** to review

### Video File Mode
1. Click **📂 Upload Video** and select an MP4/MOV/WebM file
2. The video plays automatically with pose analysis running on every frame
3. Use **⏸ Pause** and the seek bar to scrub to any moment
4. Scores and metrics update as you scrub through the video

## Camera Setup

| Angle | Best For |
|---|---|
| **Face-on** (front/back) | Spine angle, balance — best overall |
| **Down-the-line** (side) | Hip rotation |
| **45° diagonal** | Good all-round if hip rotation score is low |

**Tips:**
- Camera at hip height, 6–10 feet from the subject
- Full body in frame (head to feet)
- Face a light source — avoid backlighting
- Plain background improves detection accuracy

## Scoring Thresholds

| Metric | Pass Condition |
|---|---|
| Spine Angle | 15° – 50° tilt from vertical |
| Hip Rotation | ≥ 20° delta from address baseline |
| Balance | Left-weight fraction 35% – 65% |

## Technology

| Component | Technology |
|---|---|
| Pose detection | [MediaPipe Pose](https://google.github.io/mediapipe/solutions/pose) via CDN |
| Rendering | HTML5 Canvas |
| UI | Vanilla JS + CSS (no frameworks) |
| Dependencies | Zero — single HTML file, CDN only |

## File Structure

```
golf-swing-analyzer/
└── index.html    ← entire app (HTML + CSS + JS)
```

## Browser Compatibility

| Browser | Webcam | File Upload |
|---|---|---|
| Chrome 90+ | ✅ | ✅ |
| Edge 90+ | ✅ | ✅ |
| Firefox | ⚠️ limited | ⚠️ limited |
| Safari | ❌ | ❌ |

## License

MIT
