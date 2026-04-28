import Link from "next/link";
import { Menu } from "lucide-react";
import type { LinkField } from "@/types/sanity";

type SiteHeaderProps = {
  links?: LinkField[];
};

export function SiteHeader({ links = [] }: SiteHeaderProps) {
  const navLinks =
    links.length > 0
      ? links
      : [
          { label: "Home", href: "#home" },
          { label: "Menu", href: "#quick-links" },
          { label: "Parent Portal", href: "#" },
        ];

  return (
    <header className="absolute inset-x-0 top-0 z-30 px-4 py-3 md:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/35 bg-[#084269]/35 px-4 py-2 text-white backdrop-blur-md">
        <Link href="#home" className="text-xs font-bold uppercase tracking-[0.12em]">
          {navLinks[0]?.label || "Home"}
        </Link>
        <Link href="#home" className="text-xl font-semibold tracking-[0.22em] md:text-2xl">
          SAIS
        </Link>
        <nav className="hidden items-center gap-5 text-xs font-semibold uppercase tracking-[0.12em] md:flex">
          {navLinks.slice(1).map((link) => (
            <Link key={`${link.label}-${link.href}`} href={link.href || "#"} className="hover:text-white/75">
              {link.label}
            </Link>
          ))}
        </nav>
        <details className="relative md:hidden">
          <summary className="flex h-8 w-8 cursor-pointer list-none items-center justify-center rounded-full border border-white/50">
            <Menu size={16} />
          </summary>
          <div className="absolute right-0 mt-3 grid min-w-44 gap-2 rounded-xl bg-[#0e5579] p-3 shadow-xl">
            {navLinks.slice(1).map((link) => (
              <Link key={`${link.label}-${link.href}`} href={link.href || "#"} className="py-1 text-sm">
                {link.label}
              </Link>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}
