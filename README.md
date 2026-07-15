# HMI Parts — Process Wheel (Remotion Template)

**Author:** Muhhamad Zain

A circular, single-screen process explainer video template built with [Remotion](https://www.remotion.dev). The video features a circular ring split into 4 quadrant-arrows that draw in clockwise and build up cumulatively to explain how HMI Parts works.

## Compositions

The project includes 4 localized compositions in `src/Root.tsx`:

1. `ProcessWheel` (English Audio & English Text)
2. `ProcessWheelUrdu` (Urdu Audio & English Text)
3. `ProcessWheelMalayalam` (Malayalam Audio & English Text)
4. `ProcessWheelArabic` (Arabic Audio & English Text)

All text, icons, colors, and WhatsApp contact details are driven dynamically by React props.

## Background Design & Effects

To enhance the visual quality and fit the heavy machinery/industrial theme of HMI Parts, several background components have been added:
- **Blueprint CAD Grid (`BlueprintGrid`)**: A subtle coordinate grid mesh in the background, styled like technical blueprint paper.
- **Rotating Gears (`BackgroundGear`)**: Slowly rotating industrial outline cogs positioned in the top-right and bottom-left margins, reinforcing the mechanical theme.
- **Welding Sparks (`WeldingSparks`)**: Low-velocity, glowing orange/amber particles drifting slowly upwards from the bottom of the screen to give the video an energetic and dynamic feel.
- **Sound Effects (SFX)**: Integrated the `pop.mp3` sound effect for all step transitions and popups to ensure clean audio synchronization.

## Getting Started

### 1. Install Dependencies

Ensure you have [Node.js](https://nodejs.org) 18+ installed, then run:

```bash
npm install
```

### 2. Preview Live (Remotion Studio)

To open the interactive Remotion Studio in your browser:

```bash
npm start
```

This will run the studio on `http://localhost:3000`, where you can preview each composition, scrub through the timeline, and test different props.

### 3. Render Videos

To render all localized process videos at once:

```bash
npm run build-all
```

Alternatively, you can render individual language compositions:

```bash
# Render English
npm run build-process-wheel

# Render Urdu
npm run build-process-wheel-urdu

# Render Malayalam
npm run build-process-wheel-malayalam

# Render Arabic
npm run build-process-wheel-arabic
```

All rendered video outputs are saved under the `out/` directory (e.g., `out/process-wheel.mp4`).

## Assets & Structure

- `src/ProcessWheel.tsx`: The main video timeline component, handling animations, layouts, background particle layers, and SVG quadrant drawing.
- `src/Root.tsx`: The entry composition registrations defining default props and durations.
- `public/audio/`: Contains the music tracks, sound effects (`pop.mp3`), and localized voiceovers (`ar/`, `en/`, `ml/`, `ur/`).
- `public/photos/`: Contains local images and logo files (`hmi-logo.png`).
