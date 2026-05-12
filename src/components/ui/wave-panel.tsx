import type { ReactNode } from "react";
import { SaisCurvedPanel } from "@/components/ui/sais-curved-panel";

type WavePanelProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "blue" | "teal" | "light";
};

const toneColors = {
  blue: {
    fillColor: "#1e6f9b",
    accentColor: "#31b2b6",
    className: "text-white",
  },
  teal: {
    fillColor: "#31b2b6",
    accentColor: "#d97252",
    className: "text-white",
  },
  light: {
    fillColor: "#ffffff",
    accentColor: "#31b2b6",
    className: "text-[#10324b]",
  },
};

export function WavePanel({ children, className = "", id, tone = "blue" }: WavePanelProps) {
  const colors = toneColors[tone];

  return (
    <SaisCurvedPanel
      id={id}
      fillColor={colors.fillColor}
      accentColor={colors.accentColor}
      className={`rounded-[10px] ${colors.className} ${className}`}
    >
      {children}
    </SaisCurvedPanel>
  );
}
