import Link from "next/link";
import type { Cta } from "@/types/sanity";

type CtaLinkProps = {
  cta: Cta;
  className?: string;
};

const variantClasses: Record<NonNullable<Cta["variant"]>, string> = {
  primary: "bg-white text-[#0b6f8c] hover:bg-[#eef8f8]",
  secondary: "bg-[#23b6bc] text-white hover:bg-[#159aa1]",
  ghost: "border border-white/70 text-white hover:bg-white/10",
};

export function CtaLink({ cta, className = "" }: CtaLinkProps) {
  const variant = cta.variant || "primary";

  return (
    <Link
      href={cta.href || "#"}
      target={cta.openInNewTab ? "_blank" : undefined}
      rel={cta.openInNewTab ? "noreferrer" : undefined}
      className={`inline-flex min-h-8 items-center justify-center rounded-full px-5 text-xs font-bold uppercase tracking-[0.08em] transition ${variantClasses[variant]} ${className}`}
    >
      {cta.label}
    </Link>
  );
}
