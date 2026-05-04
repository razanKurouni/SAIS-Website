"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CircleUserRound, X } from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { SaisWaveMark } from "@/components/ui/sais-wave-mark";
import type { HeaderSettings, LinkField } from "@/types/sanity";

type SiteHeaderProps = {
  settings?: HeaderSettings;
  links?: LinkField[];
};

const fallbackLinks: LinkField[] = [
  { label: "About", href: "#about" },
  { label: "Academics", href: "#academics" },
  { label: "Admissions", href: "#admissions" },
  { label: "Community", href: "#community" },
  { label: "Contact", href: "#contact" },
];

const fallbackHeader: Required<Pick<HeaderSettings, "bookTourButton" | "applyNowButton">> = {
  bookTourButton: { label: "Book a Tour", href: "#tour" },
  applyNowButton: { label: "Apply Now", href: "#apply" },
};

export function SiteHeader({ settings, links = [] }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = links.length > 0 ? links : fallbackLinks;
  const logo = settings?.logo;
  const menuIcon = settings?.menuIcon;
  const bookTourButton = settings?.bookTourButton || fallbackHeader.bookTourButton;
  const applyNowButton = settings?.applyNowButton || fallbackHeader.applyNowButton;

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link
          href="#home"
          className="site-header__brand"
          aria-label="Sharjah American International School Dubai home"
        >
          <Image
            src={logo?.url || "/sais-logo-lockup.png"}
            alt={logo?.alt || "Sharjah American International School Dubai"}
            width={481}
            height={109}
            priority
            className="site-header__logo"
          />
        </Link>

        <nav className="site-header__nav" aria-label="Primary navigation">
          <HeaderAction href={bookTourButton.href || "#tour"} label={bookTourButton.label || "Book a Tour"} tone="blue" />
          <HeaderAction href={applyNowButton.href || "#apply"} label={applyNowButton.label || "Apply Now"} tone="teal" />
          <IconLink href="#portal" label="Parent portal" />
          <MenuButton icon={menuIcon} isOpen={isMenuOpen} onClick={() => setIsMenuOpen((value) => !value)} />
        </nav>

        <div className="site-header__mobile-actions">
          <MenuButton icon={menuIcon} isOpen={isMenuOpen} onClick={() => setIsMenuOpen((value) => !value)} />
        </div>
      </div>

      <div
        className={`sais-menu-panel ${isMenuOpen ? "is-open" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="sais-menu-panel__inner">
          <div className="sais-menu-panel__links">
            {navLinks.map((link, index) => (
              <Link
                key={`${link.label}-${link.href}`}
                href={link.href || "#"}
                onClick={() => setIsMenuOpen(false)}
                className="sais-menu-link"
                style={{ "--item-index": index } as CSSProperties & Record<string, number>}
              >
                <span>{link.label}</span>
                <ArrowRight size={20} strokeWidth={2.4} />
              </Link>
            ))}
          </div>

          <div className="sais-menu-panel__actions">
            <HeaderAction href={bookTourButton.href || "#tour"} label={bookTourButton.label || "Book a Tour"} tone="blue" fill />
            <HeaderAction href={applyNowButton.href || "#apply"} label={applyNowButton.label || "Apply Now"} tone="teal" fill />
          </div>
        </div>
      </div>
    </header>
  );
}

function HeaderAction({
  href,
  label,
  tone,
  fill = false,
}: {
  href: string;
  label: string;
  tone: "blue" | "teal";
  fill?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`header-action header-action--${tone} ${
        fill ? "is-fill" : ""
      }`}
    >
      <span>{label}</span>
      <span className="header-action__icon">
        <ArrowRight size={17} strokeWidth={3} />
      </span>
    </Link>
  );
}

function IconLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="header-icon-link"
    >
      <CircleUserRound size={24} strokeWidth={2.55} />
    </Link>
  );
}

function MenuButton({
  icon,
  isOpen,
  onClick,
}: {
  icon?: HeaderSettings["menuIcon"];
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      onClick={onClick}
      className={`sais-menu-button ${isOpen ? "is-open" : ""}`}
    >
      <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
      {icon?.url ? (
        <Image
          src={icon.url}
          alt=""
          width={42}
          height={46}
          className="sais-menu-button__image-icon"
        />
      ) : (
        <SaisWaveMark active={isOpen} />
      )}
      <X className="sais-menu-button__close" size={25} strokeWidth={2.4} />
    </button>
  );
}
