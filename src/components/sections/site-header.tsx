"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CircleUserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SaisWaveMark } from "@/components/ui/sais-wave-mark";
import type { Cta, HeaderSettings, LinkField } from "@/types/sanity";

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
  const [isScrolled, setIsScrolled] = useState(false);
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

  useEffect(() => {
    const updateHeaderState = () => {
      setIsScrolled(window.scrollY > 18);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateHeaderState);
    };
  }, []);

  return (
    <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
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
          <HeaderAction cta={bookTourButton} fallbackLabel="Book a Tour" fallbackHref="#tour" />
          <HeaderAction cta={applyNowButton} fallbackLabel="Apply Now" fallbackHref="#apply" />
          <IconLink href="#portal" label="Parent portal" />
          <MenuButton icon={menuIcon} isOpen={isMenuOpen} onClick={() => setIsMenuOpen((value) => !value)} />
        </nav>

        <div className="site-header__mobile-actions">
          <MenuButton icon={menuIcon} isOpen={isMenuOpen} onClick={() => setIsMenuOpen((value) => !value)} />
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            className="sais-menu-panel is-open"
            aria-hidden={false}
            initial={{ opacity: 0, y: -18, scale: 0.985, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -18, scale: 0.985, filter: "blur(10px)" }}
            transition={{ duration: 0.46, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="sais-menu-panel__inner">
              <div className="sais-menu-panel__links">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={`${link.label}-${link.href}`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -18 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.08 + index * 0.055,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={link.href || "#"}
                      onClick={() => setIsMenuOpen(false)}
                      className="sais-menu-link"
                    >
                      <span>{link.label}</span>
                      <ArrowRight size={20} strokeWidth={2.4} />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="sais-menu-panel__actions"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.42, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <HeaderAction cta={bookTourButton} fallbackLabel="Book a Tour" fallbackHref="#tour" fill />
                <HeaderAction cta={applyNowButton} fallbackLabel="Apply Now" fallbackHref="#apply" fill />
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function HeaderAction({
  cta,
  fallbackLabel,
  fallbackHref,
  fill = false,
}: {
  cta?: Cta;
  fallbackLabel: string;
  fallbackHref: string;
  fill?: boolean;
}) {
  const href = cta?.href || fallbackHref;
  const label = cta?.label || fallbackLabel;
  const tone = getActionTone(cta?.variant);
  const newTabProps = cta?.openInNewTab
    ? { target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <Link
      href={href}
      {...newTabProps}
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

function getActionTone(variant?: Cta["variant"]) {
  if (variant === "secondary") {
    return "teal";
  }

  if (variant === "ghost") {
    return "orange";
  }

  return "blue";
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
