# 🪶 Aviara · Bird ID

**Free, offline AI bird song identifier for iOS and Android.**
Point your phone at any bird sound and Aviara names the species in seconds — no account, no subscription, no internet required after first setup.

---

## What It Does

Aviara listens through your microphone and runs the BirdNET neural network directly on your device to identify bird species from their calls and songs. It recognises over **6,500 species worldwide** and works entirely in your browser as an installable app (PWA).

---

## Features

### 🎙 Listen
Tap **Start** and hold your phone near a bird sound. Each detection appears as a card showing the common name, scientific name, confidence percentage, and a colour-coded conservation status badge. Tap any card to open full field notes for that species.

### 🌀 Timbre Space
A real-time acoustic visualiser that shows the *shape* of bird calls as glowing trails on screen. Six descriptors are computed live from the audio — Spectral Centroid, Spread, Flux, Flatness, Tonality, and RMS Energy — and plotted in a 2D timbre space. A heuristic classifier labels each call as **Alarm**, **Mating Song**, **Contact**, **Distress**, or **Ambient** in real time. Warm colours indicate noisy/alarm calls; cool colours indicate tonal/musical calls.

### 📊 Stats
A running log of everything detected in your sessions. Shows total detections, unique species count, a ranked leaderboard of your most-heard birds, and a full scrollable history. Export the entire history as a **CSV file** including conservation status and GPS coordinates.

### 🗺 Map
Plots every detection that had GPS enabled on an interactive OpenStreetMap. Tap any map marker to see the species, confidence, time, and location.

### ⚙️ Settings
- **Detection sensitivity** — slide to control the confidence threshold (5–60%)
- **GPS tagging** — optionally save coordinates with each detection
- **Screen-on lock** — keeps the display awake during a listening session
- **Model update** — re-download the latest BirdNET model at any time
- **Clear history** — wipe all saved detections

---

## Conservation Status Badges

Every detected species is looked up against IUCN Red List data (via iNaturalist and Wikipedia) and assigned a badge:

| Badge | Meaning |
|---|---|
| 🟢 **LC** | Least Concern |
| 🟡 **NT** | Near Threatened |
| 🟠 **VU** | Vulnerable |
| 🔴 **EN** | Endangered |
| 🔴 **CR** | Critically Endangered |
| ⬛ **DD** | Data Deficient |

Badges appear on detection cards, in the Stats history, and in the CSV export.

---

## How to Install

Aviara is a **Progressive Web App (PWA)** — no app store needed.

**iOS (Safari):** Open the URL → tap the Share icon → *Add to Home Screen*

**Android (Chrome):** Open the URL → tap the menu → *Add to Home Screen* (or accept the install prompt)

The BirdNET model (~52 MB) downloads once on first launch and is cached on your device.

---

## First Launch

On first open, three steps run automatically:

1. Species database loads (~6,500 labels)
2. BirdNET model downloads (one-time, ~52 MB, requires internet)
3. AI engine initialises

After that, every feature — identification, Timbre Space, Stats, Map — works with no internet connection.

---

## Privacy

- **No account required.** No sign-up, no login, no email.
- **No data leaves your device.** All AI inference runs locally via ONNX Runtime.
- **Location is optional.** GPS is only used to tag detections if you enable it in Settings.
- **No ads.** Ever.

---

## Tech Stack

| Component | Technology |
|---|---|
| AI Model | BirdNET V2.4 (Cornell Lab & TU Chemnitz) |
| Runtime | ONNX Runtime Web (WebAssembly) |
| Audio | Web Audio API — AnalyserNode, ScriptProcessorNode |
| Timbre engine | Custom JS signal processing (FFT descriptors, 60 fps) |
| Species info | iNaturalist API + Wikipedia REST API |
| Maps | Leaflet + OpenStreetMap |
| App shell | Single-file PWA with Service Worker caching |

---

## Credits

- **BirdNET** — Stefan Kahl, Connor Wood, Maximilian Eibl & the Cornell Lab of Ornithology
- **Species info** — iNaturalist community & Wikipedia contributors
- **Maps** — OpenStreetMap contributors, Leaflet.js

---

*Aviara is a free, open tool for anyone who wants to understand the birds around them.*
