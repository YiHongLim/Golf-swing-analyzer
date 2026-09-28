# ⛳ Golf Swing Analyzer

A real-time golf swing analysis tool that runs in the browser, powered by [MediaPipe Pose](https://google.github.io/mediapipe/solutions/pose) and OpenAI GPT-4o-mini coaching tips.

## Features

- **Live webcam analysis** — pose detection on your live camera feed
- **Video file upload** — analyze a pre-recorded MP4, MOV, or WebM swing
- **Real-time pose overlay** — full skeleton drawn over the video
- **Swing phase detection** — Address → Backswing → Top of Swing → Downswing → Follow-through
- **Spine angle** — torso tilt from vertical in degrees
- **Hip rotation** — delta from address baseline with live sparkline history
- **Balance indicator** — left/right weight distribution bar
- **Swing score panel** — ✓ GOOD / ✗ FIX badges for Spine Angle, Hip Rotation, and Balance
- **AI coaching tips** — GPT-4o-mini analyses your swing metrics after each swing and gives personalised feedback
- **3-second swing recorder** — capture and replay with frame-by-frame scrubber

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- An [OpenAI API key](https://platform.openai.com/api-keys)
- Chrome or Edge browser (MediaPipe WASM requires a Chromium browser)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YiHongLim/Golf-swing-analyzer.git
cd Golf-swing-analyzer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your OpenAI API key

Create a `.env` file in the project root:

```bash
cp .env.example .env   # if .env.example exists, otherwise create manually
```

Open `.env` and set your key:

```
OPENAI_API_KEY=sk-proj-your-key-here
```

> ⚠️ The `.env` file is listed in `.gitignore` and will never be committed to the repository.

### 4. Start the server

```bash
npm start
```

You should see:

```
⛳ Golf Swing Analyzer running at http://localhost:3000
   OpenAI key loaded: YES ✓
```

### 5. Open the app

Open **[http://localhost:3000](http://localhost:3000)** in **Chrome or Edge**.

---

## Usage

### Live Webcam Mode
1. Click **▶ Start Camera** and allow camera access
2. Stand so your **full body** (head to ankles) is visible in frame
3. **Hold your address position for ~1 second** — the app calibrates your hip baseline
4. Swing — watch the metrics, phase badge, and scores update in real time
5. Click **⏺ Record Swing** to capture a 3-second clip, then **⏵ Replay** to review frame by frame

### Video File Mode
1. Click **📂 Upload Video** and select an MP4, MOV, or WebM file
2. The video plays automatically with pose analysis running on every frame
3. Use **⏸ Pause** and the seek bar to scrub to any moment
4. Scores and metrics update as you scrub

### AI Coaching Tips
- After each swing completes (phase returns to **Address** after **Follow-through**), your swing metrics are automatically sent to OpenAI
- The **💡 AI Swing Tips** card in the right panel displays 2–3 personalised coaching tips based on your actual numbers
- Requires the server to be running with a valid `OPENAI_API_KEY` in `.env`

---

## Camera Setup

| Angle | Best For |
|---|---|
| **Face-on** (camera facing front or back) | Spine angle, balance — best overall |
| **Down-the-line** (camera on the side) | Hip rotation |
| **45° diagonal** | Good all-round — recommended if hip rotation score is low |

**Tips for best detection:**
- Camera at **hip height**, **6–10 feet** from the subject
- Full body in frame — head to feet must be visible
- **Face a light source** — avoid standing in front of a bright window
- Plain, uncluttered background improves landmark accuracy

---

## Scoring Thresholds

| Metric | Pass Condition |
|---|---|
| Spine Angle | 15° – 50° tilt from vertical |
| Hip Rotation | ≥ 20° delta from address baseline |
| Balance | Left-weight fraction 35% – 65% |

---

## Project Structure

```
Golf-swing-analyzer/
├── index.html          ← Single-page app (HTML + CSS + JS)
├── server.js           ← Express proxy server (holds OpenAI key server-side)
├── package.json
├── package-lock.json
├── .env                ← Your API key (git-ignored, never committed)
├── .gitignore
└── README.md
```

---

## Technology

| Component | Technology |
|---|---|
| Pose detection | [MediaPipe Pose](https://google.github.io/mediapipe/solutions/pose) via CDN |
| AI coaching | [OpenAI GPT-4o-mini](https://platform.openai.com/) |
| Backend proxy | [Express](https://expressjs.com/) + [dotenv](https://github.com/motdotla/dotenv) |
| Rendering | HTML5 Canvas |
| Frontend | Vanilla JS + CSS — no frameworks |

---

## Browser Compatibility

| Browser | Webcam | File Upload | AI Tips |
|---|---|---|---|
| Chrome 90+ | ✅ | ✅ | ✅ |
| Edge 90+ | ✅ | ✅ | ✅ |
| Firefox | ⚠️ limited | ⚠️ limited | ✅ |
| Safari | ❌ | ❌ | ✅ |

---

## License

MIT
