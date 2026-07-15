import { CalculateMetadataFunction, Composition } from "remotion";
import { z } from "zod";
import { ProcessWheel } from "./ProcessWheel";

// ---- ProcessWheel Schema: Exactly 4 steps for the process explainer video ----
export const processWheelSchema = z.object({
  centerLabel: z.string(),
  steps: z
    .array(
      z.object({
        icon: z.enum(["envelope", "magnifier", "box", "gear"]),
        label: z.string(),
        color: z.string(),
      }),
    )
    .length(4),
  ctaText: z.string(),
  whatsappNumber: z.string(),
  bgColor: z.string().default("#FAFAF8"),
  textPrimary: z.string().default("#1A1A1A"),
  textSecondary: z.string().default("#555555"),
  accentColor: z.string().default("#F2A93B"),
  language: z.enum(["en", "ur", "ml", "ar"]).default("en"),
});

export const calculateProcessWheelMetadata: CalculateMetadataFunction<z.infer<typeof processWheelSchema>> = ({ props }) => {
  const { language } = props;
  if (language === "ur") return { durationInFrames: 1200 };
  if (language === "ml") return { durationInFrames: 1280 };
  if (language === "ar") return { durationInFrames: 1240 };
  return { durationInFrames: 1000 }; // English default
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 1. English Process Wheel */}
      <Composition
        id="ProcessWheel"
        component={ProcessWheel}
        durationInFrames={1000} // fallback
        fps={30}
        width={1080}
        height={1920}
        schema={processWheelSchema}
        calculateMetadata={calculateProcessWheelMetadata}
        defaultProps={{
          centerLabel: "How it works",
          steps: [
            {
              icon: "envelope",
              label: "Message us on WhatsApp",
              color: "#1B3A5C",
            },
            {
              icon: "magnifier",
              label: "We identify & confirm",
              color: "#3E7C7C",
            },
            {
              icon: "box",
              label: "Pickup or delivery",
              color: "#D9722C",
            },
            {
              icon: "gear",
              label: "Back to work, same day",
              color: "#2E5F8A",
            },
          ],
          ctaText: "Part number or photo — that's all we need. WhatsApp us!",
          whatsappNumber: "+968 7844 7493",
          bgColor: "#FAFAF8",
          textPrimary: "#1A1A1A",
          textSecondary: "#555555",
          accentColor: "#F2A93B",
          language: "en",
        }}
      />

      {/* 2. Urdu Audio Process Wheel (English Text) */}
      <Composition
        id="ProcessWheelUrdu"
        component={ProcessWheel}
        durationInFrames={1200} // fallback
        fps={30}
        width={1080}
        height={1920}
        schema={processWheelSchema}
        calculateMetadata={calculateProcessWheelMetadata}
        defaultProps={{
          centerLabel: "How it works",
          steps: [
            {
              icon: "envelope",
              label: "Message us on WhatsApp",
              color: "#1B3A5C",
            },
            {
              icon: "magnifier",
              label: "We identify & confirm",
              color: "#3E7C7C",
            },
            {
              icon: "box",
              label: "Pickup or delivery",
              color: "#D9722C",
            },
            {
              icon: "gear",
              label: "Back to work, same day",
              color: "#2E5F8A",
            },
          ],
          ctaText: "Part number or photo — that's all we need. WhatsApp us!",
          whatsappNumber: "+968 7844 7493",
          bgColor: "#FAFAF8",
          textPrimary: "#1A1A1A",
          textSecondary: "#555555",
          accentColor: "#F2A93B",
          language: "ur",
        }}
      />

      {/* 3. Malayalam Audio Process Wheel (English Text) */}
      <Composition
        id="ProcessWheelMalayalam"
        component={ProcessWheel}
        durationInFrames={1280} // fallback
        fps={30}
        width={1080}
        height={1920}
        schema={processWheelSchema}
        calculateMetadata={calculateProcessWheelMetadata}
        defaultProps={{
          centerLabel: "How it works",
          steps: [
            {
              icon: "envelope",
              label: "Message us on WhatsApp",
              color: "#1B3A5C",
            },
            {
              icon: "magnifier",
              label: "We identify & confirm",
              color: "#3E7C7C",
            },
            {
              icon: "box",
              label: "Pickup or delivery",
              color: "#D9722C",
            },
            {
              icon: "gear",
              label: "Back to work, same day",
              color: "#2E5F8A",
            },
          ],
          ctaText: "Part number or photo — that's all we need. WhatsApp us!",
          whatsappNumber: "+968 7844 7493",
          bgColor: "#FAFAF8",
          textPrimary: "#1A1A1A",
          textSecondary: "#555555",
          accentColor: "#F2A93B",
          language: "ml",
        }}
      />

      {/* 4. Arabic Audio Process Wheel (English Text) */}
      <Composition
        id="ProcessWheelArabic"
        component={ProcessWheel}
        durationInFrames={1240} // fallback
        fps={30}
        width={1080}
        height={1920}
        schema={processWheelSchema}
        calculateMetadata={calculateProcessWheelMetadata}
        defaultProps={{
          centerLabel: "How it works",
          steps: [
            {
              icon: "envelope",
              label: "Message us on WhatsApp",
              color: "#1B3A5C",
            },
            {
              icon: "magnifier",
              label: "We identify & confirm",
              color: "#3E7C7C",
            },
            {
              icon: "box",
              label: "Pickup or delivery",
              color: "#D9722C",
            },
            {
              icon: "gear",
              label: "Back to work, same day",
              color: "#2E5F8A",
            },
          ],
          ctaText: "Part number or photo — that's all we need. WhatsApp us!",
          whatsappNumber: "+968 7844 7493",
          bgColor: "#FAFAF8",
          textPrimary: "#1A1A1A",
          textSecondary: "#555555",
          accentColor: "#F2A93B",
          language: "ar",
        }}
      />
    </>
  );
};
