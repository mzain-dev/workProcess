import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Audio,
  Sequence,
  staticFile,
  Img,
} from "remotion";
import { z } from "zod";
import { processWheelSchema } from "./Root";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

// ---------- ENERGETIC & ROBUST BACKGROUND COMPONENTS ----------

// Technical coordinate grid background (CAD style)
const BlueprintGrid: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.05,
        backgroundImage: `
          linear-gradient(to right, #1B3A5C 1px, transparent 1px),
          linear-gradient(to bottom, #1B3A5C 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
        pointerEvents: "none",
      }}
    />
  );
};

// Rotating industrial gear symbol in the background
const BackgroundGear: React.FC<{
  size: number;
  x: number;
  y: number;
  speed: number;
  color: string;
  opacity?: number;
}> = ({ size, x, y, speed, color, opacity = 0.04 }) => {
  const frame = useCurrentFrame();
  const rotation = frame * speed;

  return (
    <svg
      width={size}
      height={size}
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `rotate(${rotation}deg)`,
        opacity,
        pointerEvents: "none",
        overflow: "visible",
      }}
      viewBox="0 0 100 100"
    >
      <circle cx="50" cy="50" r="30" fill="none" stroke={color} strokeWidth="2.5" />
      <circle cx="50" cy="50" r="12" fill="none" stroke={color} strokeWidth="2" />
      {/* Gear teeth */}
      {[...Array(12)].map((_, i) => (
        <rect
          key={i}
          x="46"
          y="12"
          width="8"
          height="12"
          rx="1.5"
          fill={color}
          transform={`rotate(${i * 30} 50 50)`}
        />
      ))}
      {/* Engineering technical lines / crosshairs */}
      <line x1="50" y1="2" x2="50" y2="98" stroke={color} strokeWidth="0.5" strokeDasharray="3 3" />
      <line x1="2" y1="50" x2="98" y2="50" stroke={color} strokeWidth="0.5" strokeDasharray="3 3" />
    </svg>
  );
};

// ---------- WELDING SPARKS / RISING PARTICLES ----------
const SparkParticle: React.FC<{
  seed: number;
  color: string;
  delay: number;
  duration: number;
  startX: number;
}> = ({ seed, color, delay, duration, startX }) => {
  const frame = useCurrentFrame();
  
  // Make particles loop or spawn repeatedly (slower cycle)
  const loopFrame = (frame - delay) % 300;
  if (loopFrame < 0 || loopFrame > duration) return null;

  const progress = loopFrame / duration;

  // Rise from bottom (1920) to top (150)
  const y = interpolate(progress, [0, 1], [1920, 150]);
  
  // Drift sideways based on seed
  const drift = Math.sin(loopFrame * 0.05 + seed) * 40;
  const x = startX + drift;

  // Particle size (randomized via seed)
  const size = interpolate(seed % 3, [0, 2], [4, 8]);

  // Opacity transitions (fade in at start, fade out at end)
  const opacity = interpolate(progress, [0, 0.15, 0.8, 1], [0, 1, 1, 0]);

  // Glow color (mostly orange/yellow/amber for welding sparks)
  const sparkColor = seed % 2 === 0 ? "#FF9500" : color;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: sparkColor,
        opacity,
        pointerEvents: "none",
        boxShadow: `0 0 ${size * 2}px ${sparkColor}`,
      }}
    />
  );
};

const WeldingSparks: React.FC<{ color: string }> = ({ color }) => {
  // Create 35 particles with deterministic pseudorandom seeds, start positions, and delays
  const particles = React.useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => {
      // Deterministic pseudorandom values based on index
      const seed = Math.sin(i + 1) * 10000;
      const startX = Math.abs(seed) % 1080; // horizontal layout
      const delay = Math.floor(Math.abs(seed * 1.3) % 300); // staggered birth frames
      const duration = 180 + Math.floor(Math.abs(seed * 2.7) % 100); // lifespan of particle (slower speed)
      return { id: i, seed, startX, delay, duration };
    });
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 3 }}>
      {particles.map((p) => (
        <SparkParticle
          key={p.id}
          seed={p.seed}
          color={color}
          delay={p.delay}
          duration={p.duration}
          startX={p.startX}
        />
      ))}
    </div>
  );
};

type Props = z.infer<typeof processWheelSchema>;

// ---------- HIGH-END MECHANICAL SVG MICRO-ANIMATIONS ----------

// Step 1: Phone viewfinder scanning excavator gear & part number
const WhatsAppPhotoScan: React.FC<{ progress: number; color: string }> = ({
  progress,
  color,
}) => {
  const laserY = interpolate(progress, [0.2, 0.8], [25, 95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const laserOpacity = interpolate(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const photoScale = interpolate(progress, [0, 0.3], [0.8, 1]);

  return (
    <svg
      width="110"
      height="110"
      viewBox="0 0 120 120"
      style={{ overflow: "visible" }}
    >
      {/* Outer viewfinder frame */}
      <rect
        x="10"
        y="10"
        width="100"
        height="100"
        rx="18"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeDasharray="12 6"
        opacity="0.4"
      />

      {/* Inner gear silhouette being scanned */}
      <g transform={`translate(60, 60) scale(${photoScale})`}>
        <circle r="22" fill="none" stroke={color} strokeWidth="4" />
        <circle r="10" fill="none" stroke={color} strokeWidth="3" />
        {/* Gear teeth */}
        {[...Array(8)].map((_, i) => (
          <rect
            key={i}
            x="-6"
            y="-32"
            width="12"
            height="12"
            rx="2"
            fill={color}
            transform={`rotate(${i * 45})`}
          />
        ))}
      </g>

      {/* Laser line */}
      <line
        x1="15"
        y1={laserY}
        x2="105"
        y2={laserY}
        stroke="#FF3B30"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity={laserOpacity}
        style={{ filter: "drop-shadow(0px 0px 4px #FF3B30)" }}
      />
    </svg>
  );
};

// Step 2: Caliper tool measuring gear dimensions (HUD match overlay)
const CaliperIdentifyScan: React.FC<{
  progress: number;
  color: string;
}> = ({ progress, color }) => {
  const jawMove = interpolate(progress, [0, 0.6], [22, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textOpacity = interpolate(progress, [0.6, 0.9], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg
      width="110"
      height="110"
      viewBox="0 0 120 120"
      style={{ overflow: "visible" }}
    >
      {/* Gear being measured */}
      <g transform="translate(60, 50) scale(0.95)">
        <circle r="18" fill="none" stroke={color} strokeWidth="4" />
        {[...Array(6)].map((_, i) => (
          <line
            key={i}
            x1="0"
            y1="-18"
            x2="0"
            y2="18"
            stroke={color}
            strokeWidth="3"
            transform={`rotate(${i * 30})`}
          />
        ))}
      </g>

      {/* Caliper slide bar */}
      <rect
        x="15"
        y="15"
        width="90"
        height="8"
        rx="2"
        fill="#D2D2D2"
        stroke="#A5A5A5"
        strokeWidth="1"
      />

      {/* Left Caliper Jaw */}
      <path
        d={`M ${30 - jawMove} 15 L ${30 - jawMove} 75 L ${36 - jawMove} 75 L ${36 - jawMove} 23 L ${42 - jawMove} 23 L ${42 - jawMove} 15 Z`}
        fill="#8E8E8E"
      />

      {/* Right Caliper Jaw */}
      <path
        d={`M ${90 + jawMove} 15 L ${90 + jawMove} 75 L ${84 + jawMove} 75 L ${84 + jawMove} 23 L ${78 + jawMove} 23 L ${78 + jawMove} 15 Z`}
        fill="#8E8E8E"
      />

      {/* Target scanning circle */}
      <circle
        cx="60"
        cy="50"
        r="26"
        fill="none"
        stroke="#4CAF50"
        strokeWidth="2"
        strokeDasharray="4 4"
        opacity={textOpacity}
      />

      {/* Readout label */}
      <text
        x="60"
        y="106"
        textAnchor="middle"
        fill="#4CAF50"
        fontSize="12"
        fontWeight="bold"
        opacity={textOpacity}
      >
        100% MATCH
      </text>
    </svg>
  );
};

// Step 3: Oman delivery map with pin drop & shipping route
const OmanDeliveryMap: React.FC<{ progress: number; color: string }> = ({
  progress,
  color,
}) => {
  const omanPath =
    "M 55,22 C 65,17 75,27 80,32 C 85,37 90,47 88,54 C 85,62 70,77 60,87 C 50,97 40,102 35,97 C 30,92 32,82 40,72 C 45,62 50,47 48,37 C 46,27 50,24 55,22 Z";

  const routeDash = interpolate(progress, [0.3, 0.9], [120, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pinScale = interpolate(progress, [0.6, 0.9], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg
      width="110"
      height="110"
      viewBox="0 0 120 120"
      style={{ overflow: "visible" }}
    >
      {/* Map of Oman silhouette */}
      <path
        d={omanPath}
        fill={`${color}12`}
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Delivery route line from Muscat to Salalah */}
      <path
        d="M 78,38 C 72,55 58,72 40,82"
        fill="none"
        stroke="#F2A93B"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="120"
        strokeDashoffset={routeDash}
      />

      {/* Muscat Pin */}
      <g transform={`translate(78, 38) scale(${pinScale})`}>
        <circle r="7" fill="none" stroke="#FF5722" strokeWidth="2" />
        <circle r="3.5" fill="#FF5722" />
      </g>

      {/* Salalah Pin */}
      <g transform={`translate(40, 82) scale(${pinScale})`}>
        <circle r="7" fill="none" stroke="#FF5722" strokeWidth="2" />
        <circle r="3.5" fill="#FF5722" />
      </g>
    </svg>
  );
};

// Step 4: Two interlocking gears rotating (speedometer arc dial)
const GearsBackToWork: React.FC<{
  progress: number;
  color: string;
  frame: number;
}> = ({ progress, color, frame }) => {
  const speedCoeff = interpolate(progress, [0, 1], [0, 5]);
  const rotation = frame * speedCoeff;

  const ringDash = interpolate(progress, [0, 0.8], [220, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg
      width="110"
      height="110"
      viewBox="0 0 120 120"
      style={{ overflow: "visible" }}
    >
      {/* Speedometer ring */}
      <circle
        cx="60"
        cy="60"
        r="36"
        fill="none"
        stroke="rgba(0,0,0,0.06)"
        strokeWidth="6"
      />
      <circle
        cx="60"
        cy="60"
        r="36"
        fill="none"
        stroke="#4CAF50"
        strokeWidth="6"
        strokeDasharray="220"
        strokeDashoffset={ringDash}
        transform="rotate(-90 60 60)"
        strokeLinecap="round"
      />

      {/* Center Gear 1 */}
      <g transform={`translate(60, 60) rotate(${rotation})`}>
        <circle r="18" fill="none" stroke={color} strokeWidth="4" />
        <circle r="5" fill={color} />
        {/* Teeth */}
        {[...Array(6)].map((_, i) => (
          <rect
            key={i}
            x="-4"
            y="-26"
            width="8"
            height="10"
            rx="1.5"
            fill={color}
            transform={`rotate(${i * 60})`}
          />
        ))}
      </g>

      {/* Interlocking Gear 2 */}
      <g transform={`translate(92, 60) rotate(${-rotation * 1.5 + 15})`}>
        <circle r="10" fill="none" stroke={color} strokeWidth="3" />
        {/* Teeth */}
        {[...Array(6)].map((_, i) => (
          <rect
            key={i}
            x="-3"
            y="-15"
            width="6"
            height="6"
            rx="1"
            fill={color}
            transform={`rotate(${i * 60})`}
          />
        ))}
      </g>
    </svg>
  );
};

// ---------- CARD SUBTEXTS ----------
const CARD_SUBTEXTS = [
  "Send a photo or part number — that's it.",
  "Exact part, price, and stock in minutes.",
  "Muscat & Salalah shops, or Oman-wide shipping.",
  "Fit your part and resume operations.",
];

// ---------- MAIN RENDER COMPONENT ----------

export const ProcessWheel: React.FC<Props> = (props) => {
  const {
    steps,
    centerLabel,
    bgColor,
    textPrimary,
    textSecondary,
    ctaText,
    whatsappNumber,
    accentColor,
    language = "en",
  } = props;
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const isUrdu = language === "ur";
  const isMalayalam = language === "ml";
  const isArabic = language === "ar";
  const isRtl = false; // Always LTR layout since text labels are English

  // Dynamic timings based on mutagen-measured audio files:
  let CARD_TIMINGS = [130, 290, 500, 660];
  let CAPTION_START = 760;

  let hookDuration = 123;
  let step1Duration = 167;
  let step2Duration = 215;
  let step3Duration = 169;
  let step4Duration = 105;
  let ctaDuration = 208;

  if (isUrdu) {
    CARD_TIMINGS = [150, 360, 610, 820];
    CAPTION_START = 940;
    hookDuration = 143;
    step1Duration = 210;
    step2Duration = 258;
    step3Duration = 212;
    step4Duration = 120;
    ctaDuration = 248;
  } else if (isMalayalam) {
    CARD_TIMINGS = [145, 370, 630, 850];
    CAPTION_START = 1000;
    hookDuration = 138;
    step1Duration = 229;
    step2Duration = 265;
    step3Duration = 225;
    step4Duration = 158;
    ctaDuration = 255;
  } else if (isArabic) {
    CARD_TIMINGS = [155, 380, 660, 870];
    CAPTION_START = 980;
    hookDuration = 150;
    step1Duration = 233;
    step2Duration = 287;
    step3Duration = 215;
    step4Duration = 112;
    ctaDuration = 233;
  }

  // 1. Logo reveal intro animation (frame 0 to 45)
  const logoProgress = spring({
    frame,
    fps: 30,
    config: { damping: 15 },
  });
  const logoScale = interpolate(logoProgress, [0, 1], [0.7, 1]);
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);

  // 2. Header elements fade in (delays by 45 frames)
  const headerProgress = spring({
    frame: frame - 45,
    fps: 30,
    config: { damping: 15 },
  });
  const headerOpacity = interpolate(headerProgress, [0, 1], [0, 1]);
  const headerY = interpolate(headerProgress, [0, 1], [25, 0]);

  // Timeline connector line opacity (fades in as the first card arrives)
  const lineOpacity = interpolate(
    frame,
    [CARD_TIMINGS[0], CARD_TIMINGS[0] + 20],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
        fontFamily,
        overflow: "hidden",
      }}
    >
      {/* Background CAD grid */}
      <BlueprintGrid />

      {/* Rotating Background Gears (Robustic industrial feel) */}
      <BackgroundGear size={500} x={700} y={-100} speed={0.25} color={steps[0].color} opacity={0.05} />
      <BackgroundGear size={300} x={-100} y={1500} speed={-0.35} color={accentColor} opacity={0.04} />

      {/* Welding Sparks / Rising Dust Particles (Slowed speed) */}
      <WeldingSparks color={accentColor} />

      {/* Sleek, thin global progress indicator at the very top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 10,
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          zIndex: 100,
        }}
      >
        <div
          style={{
            height: "100%",
            backgroundColor: steps[0].color, // brand blue
            width: `${(frame / durationInFrames) * 100}%`,
          }}
        />
      </div>

      {/* Background Audio (Royalty-free music loops continuously) */}
      <Audio src={staticFile("audio/music.mp3")} volume={0.12} loop />

      {/* Spoken Voiceover Sequences */}
      <Sequence from={10} durationInFrames={hookDuration}>
        <Audio src={staticFile(`audio/${language}/hook.mp3`)} volume={1.0} />
      </Sequence>
      <Sequence from={CARD_TIMINGS[0]} durationInFrames={step1Duration}>
        <Audio src={staticFile(`audio/${language}/step1.mp3`)} volume={1.0} />
      </Sequence>
      <Sequence from={CARD_TIMINGS[1]} durationInFrames={step2Duration}>
        <Audio src={staticFile(`audio/${language}/step2.mp3`)} volume={1.0} />
      </Sequence>
      <Sequence from={CARD_TIMINGS[2]} durationInFrames={step3Duration}>
        <Audio src={staticFile(`audio/${language}/step3.mp3`)} volume={1.0} />
      </Sequence>
      <Sequence from={CARD_TIMINGS[3]} durationInFrames={step4Duration}>
        <Audio src={staticFile(`audio/${language}/step4.mp3`)} volume={1.0} />
      </Sequence>
      <Sequence from={CAPTION_START} durationInFrames={ctaDuration}>
        <Audio src={staticFile(`audio/${language}/cta.mp3`)} volume={1.0} />
      </Sequence>

      {/* UI Sound Effects (SFX) sequences */}
      {/* Step 1 Pop */}
      <Sequence from={CARD_TIMINGS[0]} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx/pop.mp3")} volume={0.6} />
      </Sequence>
      <Sequence from={CARD_TIMINGS[0] + 12} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx/pop.mp3")} volume={0.45} />
      </Sequence>

      {/* Step 2 Pop */}
      <Sequence from={CARD_TIMINGS[1]} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx/pop.mp3")} volume={0.6} />
      </Sequence>
      <Sequence from={CARD_TIMINGS[1] + 12} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx/pop.mp3")} volume={0.45} />
      </Sequence>

      {/* Step 3 Pop */}
      <Sequence from={CARD_TIMINGS[2]} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx/pop.mp3")} volume={0.6} />
      </Sequence>
      <Sequence from={CARD_TIMINGS[2] + 12} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx/pop.mp3")} volume={0.45} />
      </Sequence>

      {/* Step 4 Pop */}
      <Sequence from={CARD_TIMINGS[3]} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx/pop.mp3")} volume={0.6} />
      </Sequence>
      <Sequence from={CARD_TIMINGS[3] + 12} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx/pop.mp3")} volume={0.45} />
      </Sequence>

      {/* CTA Outro Pop */}
      <Sequence from={CAPTION_START} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx/pop.mp3")} volume={0.6} />
      </Sequence>
      <Sequence from={CAPTION_START + 12} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx/pop.mp3")} volume={0.45} />
      </Sequence>

      {/* Premium ambient glow background elements */}
      <div
        style={{
          position: "absolute",
          top: -300,
          right: -300,
          width: 800,
          height: 800,
          borderRadius: 400,
          background: `radial-gradient(circle, ${accentColor}12 0%, rgba(255,255,255,0) 70%)`,
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -200,
          left: -200,
          width: 700,
          height: 700,
          borderRadius: 350,
          background: `radial-gradient(circle, ${steps[0].color}08 0%, rgba(255,255,255,0) 70%)`,
          filter: "blur(50px)",
        }}
      />

      {/* Top Logo Header */}
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <Img
          src={staticFile("photos/hmi-logo.png")}
          style={{
            height: 130,
            width: "auto",
            objectFit: "contain",
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
          }}
        />
      </div>

      {/* Main Container */}
      <div
        style={{
          padding: "0 60px",
          paddingTop: 340, // sit beautifully below the logo
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Header Section */}
        <div
          style={{
            opacity: headerOpacity,
            transform: `translateY(${headerY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 60,
          }}
        >
          <div
            style={{
              fontSize: 42,
              fontWeight: 900,
              color: textSecondary,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: 16,
              marginTop: 20,
              textAlign: "center",
              lineHeight: 1.2,
              fontFamily,
            }}
          >
            {centerLabel}
          </div>
          <div
            style={{
              width: 120,
              height: 6,
              backgroundColor: accentColor,
              borderRadius: 99,
            }}
          />
        </div>

        {/* Timeline / Vertical Steps Container */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 56,
          }}
        >
          {/* Vertical timeline connector line in the background (centered with the wider icons) */}
          <div
            style={{
              position: "absolute",
              left: isRtl ? "auto" : 109,
              right: isRtl ? 109 : "auto",
              top: 50,
              bottom: 100,
              width: 6,
              backgroundColor: "rgba(0, 0, 0, 0.06)",
              borderRadius: 3,
              zIndex: 1,
              opacity: lineOpacity,
            }}
          />

          {steps.map((step, i) => {
            const cardStartFrame = CARD_TIMINGS[i];

            // Spring progress for slide and scale animations
            const progress = spring({
              frame: frame - cardStartFrame,
              fps,
              config: { damping: 15, mass: 0.8 },
            });

            const cardOpacity = interpolate(
              frame,
              [cardStartFrame, cardStartFrame + 15],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            );

            const slideY = interpolate(progress, [0, 1], [50, 0]);
            const badgeScale = interpolate(progress, [0, 1], [0.6, 1]);

            // Render specific mechanical animation widget based on step index
            let AnimWidget = null;
            if (i === 0) {
              AnimWidget = (
                <WhatsAppPhotoScan progress={progress} color={step.color} />
              );
            } else if (i === 1) {
              AnimWidget = (
                <CaliperIdentifyScan progress={progress} color={step.color} />
              );
            } else if (i === 2) {
              AnimWidget = (
                <OmanDeliveryMap progress={progress} color={step.color} />
              );
            } else if (i === 3) {
              AnimWidget = (
                <GearsBackToWork
                  progress={progress}
                  color={step.color}
                  frame={frame - cardStartFrame}
                />
              );
            }

            return (
              <div
                key={i}
                style={{
                  opacity: cardOpacity,
                  transform: `translateY(${slideY}px)`,
                  display: "flex",
                  alignItems: "center",
                  flexDirection: isRtl ? "row-reverse" : "row", // RTL layout swapping (if ever toggled)
                  backgroundColor: "white",
                  borderRadius: 24,
                  padding: "36px 44px",
                  boxShadow: "0 15px 45px rgba(0, 0, 0, 0.05)",
                  border: "1.5px solid rgba(0, 0, 0, 0.02)",
                  borderLeft: isRtl ? "none" : `12px solid ${step.color}`,
                  borderRight: isRtl ? `12px solid ${step.color}` : "none", // Swap border to right side
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {/* Custom Mechanical Animation Container */}
                <div
                  style={{
                    width: 130,
                    height: 130,
                    borderRadius: 26,
                    backgroundColor: `${step.color}0E`, // Soft matching container background tint
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: isRtl ? 0 : 40,
                    marginLeft: isRtl ? 40 : 0, // Swap margins for spacing
                    flexShrink: 0,
                    transform: `scale(${badgeScale})`,
                  }}
                >
                  {AnimWidget}
                </div>

                {/* Content Area with Label and Soft Contrast Subtext */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    textAlign: isRtl ? "right" : "left",
                    fontFamily,
                  }}
                  dir={isRtl ? "rtl" : "ltr"}
                >
                  {/* Step Title */}
                  <div
                    style={{
                      fontSize: 45,
                      fontWeight: 900, // Extra Bold
                      color: textPrimary,
                      lineHeight: 1.25,
                      marginBottom: 8,
                    }}
                  >
                    {step.label}
                  </div>
                  {/* Step Subtext */}
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 500, // Medium weight
                      color: "#555555", // Dark gray soft contrast
                      lineHeight: 1.3,
                    }}
                  >
                    {CARD_SUBTEXTS[i]}
                  </div>
                </div>

                {/* Floating Step Number Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: -14,
                    left: isRtl ? 32 : "auto",
                    right: isRtl ? "auto" : 32, // Swap badge alignment
                    backgroundColor: step.color,
                    color: "white",
                    fontSize: 32,
                    fontWeight: 900,
                    padding: "6px 16px",
                    borderRadius: 999,
                    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.12)",
                    fontFamily: "monospace",
                  }}
                >
                  0{i + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Caption at the bottom */}
      <CtaCaption
        text={ctaText}
        whatsappNumber={whatsappNumber}
        accentColor={accentColor}
        textPrimary={textPrimary}
        captionStart={CAPTION_START}
        fontFamily={fontFamily}
      />
    </AbsoluteFill>
  );
};

const CtaCaption: React.FC<{
  text: string;
  whatsappNumber: string;
  accentColor: string;
  textPrimary: string;
  captionStart: number;
  fontFamily: string;
}> = ({
  text,
  whatsappNumber,
  accentColor,
  textPrimary,
  captionStart,
  fontFamily,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [captionStart, captionStart + 20],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const y = interpolate(frame, [captionStart, captionStart + 20], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 180,
        left: 60,
        right: 60,
        textAlign: "center",
        opacity,
        transform: `translateY(${y}px)`,
        fontFamily,
      }}
    >
      <div
        style={{
          fontSize: 40,
          fontWeight: 600,
          color: textPrimary,
          marginBottom: 24,
        }}
      >
        {text}
      </div>
      <div
        style={{
          display: "inline-block",
          backgroundColor: accentColor,
          color: "#1A1A1A",
          fontSize: 45,
          fontWeight: 700,
          padding: "18px 44px",
          borderRadius: 999,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        WhatsApp: {whatsappNumber}
      </div>
    </div>
  );
};
