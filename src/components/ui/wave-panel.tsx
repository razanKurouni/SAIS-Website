import type { ReactNode } from "react";

type WavePanelProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "blue" | "teal" | "light";
};

const toneClasses = {
  blue: "bg-[#167ca8] text-white",
  teal: "bg-[#28b9ba] text-white",
  light: "bg-white text-[#10324b]",
};

export function WavePanel({ children, className = "", id, tone = "blue" }: WavePanelProps) {
  return (
    <section id={id} className={`relative overflow-hidden rounded-[10px] ${toneClasses[tone]} ${className}`}>
      <div className="pointer-events-none absolute -right-12 top-0 h-full w-32 rounded-l-[70%] bg-white/90" />
      <div className="pointer-events-none absolute -right-4 top-10 h-[70%] w-12 rounded-l-[70%] bg-[#25b9bd]" />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
