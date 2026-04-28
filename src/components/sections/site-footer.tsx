import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { RichText } from "@/components/ui/rich-text";
import type { SiteFooter as SiteFooterData } from "@/types/sanity";

type SiteFooterProps = {
  footer?: SiteFooterData;
};

const socialIcons = [Youtube, Instagram, Facebook, Twitter];

export function SiteFooter({ footer }: SiteFooterProps) {
  if (!footer) {
    return null;
  }

  return (
    <footer className="bg-[#149ca7] text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.2fr_1.6fr_0.8fr] md:px-8">
        <div>
          <p className="text-3xl font-semibold tracking-[0.2em]">{footer.logoText || "SAIS"}</p>
          <RichText blocks={footer.contactText} className="mt-4 space-y-2 text-sm leading-6 text-white/88" />
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {(footer.columns || []).map((column) => (
            <div key={column.title || column.links?.[0]?.label}>
              {column.title && <h3 className="mb-3 text-sm font-semibold">{column.title}</h3>}
              <div className="grid gap-2 text-sm text-white/82">
                {(column.links || []).map((link) => (
                  <Link key={`${link.label}-${link.href}`} href={link.href || "#"} className="hover:text-white">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-5 md:items-end">
          <div className="flex gap-2">
            {socialIcons.map((Icon, index) => (
              <a
                key={index}
                href={footer.socialLinks?.[index]?.href || "#"}
                aria-label={footer.socialLinks?.[index]?.label || "Social link"}
                className="rounded-full border border-white/60 p-2"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            {(footer.legalLinks || []).map((link) => (
              <Link key={`${link.label}-${link.href}`} href={link.href || "#"} className="text-xs text-white/80">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
