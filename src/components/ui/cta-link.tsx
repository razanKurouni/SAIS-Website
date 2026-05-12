import Link from "next/link";
import type { Cta } from "@/types/sanity";

type CtaLinkProps = {
  cta: Cta;
  className?: string;
};

const variantClasses: Record<NonNullable<Cta["variant"]>, string> = {
  primary: "bg-white text-[#1e6f9b] hover:bg-[#eef8f8]",
  secondary: "bg-[#31b2b6] text-white hover:bg-[#31b2b6]",
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
