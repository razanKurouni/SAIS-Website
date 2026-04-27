"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Instagram, Youtube, Facebook, Twitter } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { sectionByOrder, splitMetric, textBlocksToParagraphs } from "@/lib/content";
import type { HomeSection } from "@/types/sanity";
import { useMemo, useState } from "react";

type HomePageProps = {
  sections: HomeSection[];
};

type MediaSlotProps = {
  section?: HomeSection;
  index?: number;
  ratio?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

const defaultNavItems = ["HOME", "MENU", "PARENT PORTAL"];
const defaultValueItems = ["TOLERANCE", "EQUITY", "INTEGRITY", "INNOVATION", "GLOBAL CITIZENSHIP"];

function MediaSlot({
  section,
  index = 0,
  ratio = "aspect-[16/10]",
  className,
  imageClassName,
  priority = false,
}: MediaSlotProps) {
  const image = section?.images?.[index];
  const placeholder = section?.imagePlaceholders?.[index];

  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-[28px] border border-white/30 bg-gradient-to-br from-[#1d5e87] to-[#39c2c6] shadow-[0_25px_80px_rgba(0,0,0,0.2)]",
        ratio,
        className
      )}
    >
      {image?.url ? (
        <Image
          src={image.url}
          alt={image.alt || image.label || "SAIS media"}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={clsx("object-cover", imageClassName)}
          priority={priority}
        />
      ) : (
        <div className="flex h-full w-full flex-col justify-end bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.3),transparent_45%),linear-gradient(130deg,#1f6b96,#2f9fae_45%,#4bc8c9)] p-6">
          <p className="text-xs tracking-[0.22em] text-white/70">IMAGE SLOT</p>
          <p className="mt-2 text-lg font-semibold text-white">{placeholder?.label || "Upload image from Sanity"}</p>
          {placeholder?.fileName && (
            <p className="mt-2 text-sm text-white/85">{placeholder.fileName}</p>
          )}
        </div>
      )}
    </div>
  );
}

function parseHeadline(item: string) {
  const [title, cta] = item.split(" - ");
  return { title: title?.trim() || item, cta: cta?.trim() || "See More" };
}

export function HomePage({ sections }: HomePageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.25,
  });

  const mapped = useMemo(() => {
    const hero = sectionByOrder(sections, 1);
    const overview = sectionByOrder(sections, 2);
    const approach = sectionByOrder(sections, 3);
    const accreditations = sectionByOrder(sections, 4);
    const whySais = sectionByOrder(sections, 5);
    const facts = sectionByOrder(sections, 6);
    const quickLinks = sectionByOrder(sections, 7);
    const phases = sectionByOrder(sections, 8);
    const admissions = sectionByOrder(sections, 9);
    const bookTour = sectionByOrder(sections, 10);
    const news = sectionByOrder(sections, 11);
    const instagram = sectionByOrder(sections, 12);
    const footer = sectionByOrder(sections, 13);

    return {
      hero,
      overview,
      approach,
      accreditations,
      whySais,
      facts,
      quickLinks,
      phases,
      admissions,
      bookTour,
      news,
      instagram,
      footer,
    };
  }, [sections]);

  const heroItems = mapped.hero?.items || [];
  const navItems = heroItems.slice(0, 3).length === 3 ? heroItems.slice(0, 3) : defaultNavItems;
  const valueItems = heroItems.slice(3).length > 0 ? heroItems.slice(3) : defaultValueItems;

  const overviewParagraphs = textBlocksToParagraphs(mapped.overview?.body || []);
  const approachParagraphs = textBlocksToParagraphs(mapped.approach?.body || []);
  const whyParagraphs = textBlocksToParagraphs(mapped.whySais?.body || []);
  const tourParagraphs = textBlocksToParagraphs(mapped.bookTour?.body || []);
  const footerParagraphs = textBlocksToParagraphs(mapped.footer?.body || []);

  const factItems = (mapped.facts?.items || []).map(splitMetric);
  const quickItems = mapped.quickLinks?.items || [];
  const phaseItems = mapped.phases?.items || [];
  const newsItems = mapped.news?.items || [];
  const footerLinks = mapped.footer?.items || [];
  const footerCtas = mapped.footer?.ctas || [];

  return (
    <div className="bg-[#e9eaec] text-[#10324b]">
      <motion.div className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-[#21b7bf] to-[#2f6ea0]" style={{ scaleX: progress }} />

      <header id="home" className="relative min-h-[92vh] overflow-hidden">
        <MediaSlot
          section={mapped.hero}
          ratio="min-h-[92vh]"
          className="absolute inset-0 h-full w-full rounded-none border-none"
          imageClassName="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#0a2044]/30 via-[#102847]/30 to-[#07223d]/75" />

        <div className="relative z-20 mx-auto flex h-full max-w-[1200px] flex-col px-4 pb-10 pt-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between rounded-full border border-white/35 bg-white/10 px-4 py-3 backdrop-blur-md">
            <span className="text-sm font-semibold tracking-[0.16em] text-white/95">{navItems[0]}</span>
            <div className="flex items-center gap-4">
              <span className="text-[42px] leading-none tracking-[0.2em] text-white">SAIS</span>
            </div>
            <button
              type="button"
              className="rounded-full border border-white/50 p-2 text-white transition hover:bg-white/15 lg:hidden"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <nav className="hidden items-center gap-6 lg:flex">
              <a href="#learning" className="text-sm tracking-[0.14em] text-white/90 hover:text-white">{navItems[1]}</a>
              <a href="#admissions" className="text-sm tracking-[0.14em] text-white/90 hover:text-white">{navItems[2]}</a>
            </nav>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-3 grid gap-2 rounded-2xl border border-white/25 bg-[#0e3d66]/85 p-4 backdrop-blur lg:hidden"
              >
                <a href="#learning" onClick={() => setIsMenuOpen(false)} className="text-white/90">{navItems[1]}</a>
                <a href="#admissions" onClick={() => setIsMenuOpen(false)} className="text-white/90">{navItems[2]}</a>
                <a href="#news" onClick={() => setIsMenuOpen(false)} className="text-white/90">News</a>
              </motion.nav>
            )}
          </AnimatePresence>

          <div className="mt-auto">
            <div className="grid gap-2 rounded-2xl border border-white/35 bg-[#0b2f54]/45 px-4 py-4 backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-5">
              {valueItems.map((value, index) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 + index * 0.06 }}
                  className="text-center text-xs font-semibold tracking-[0.18em] text-white/95"
                >
                  {value}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1240px] px-4 pb-20 sm:px-8 lg:px-10">
        <Reveal className="relative -mt-1 bg-[#1e7aa8] px-6 py-16 text-center text-white sm:px-10 sm:py-20">
          <div className="mx-auto max-w-[930px] space-y-6">
            <h2 className="text-2xl font-semibold tracking-[0.08em] sm:text-3xl">{mapped.overview?.title || "SAIS Dubai Overview"}</h2>
            {overviewParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-8 text-white/90">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="absolute -top-6 left-1/2 h-14 w-4 -translate-x-1/2 rounded-full bg-[#43d1d0]/80" />
          <div className="absolute -bottom-6 left-1/2 h-14 w-4 -translate-x-1/2 rounded-full bg-[#43d1d0]/80" />
        </Reveal>

        <Reveal className="grid gap-8 bg-[#f4f4f5] px-6 py-12 md:grid-cols-[1.05fr_1fr] md:items-center lg:px-10" delay={0.05}>
          <MediaSlot section={mapped.approach} index={0} ratio="aspect-[7/6]" />
          <div className="space-y-5">
            <h3 className="text-2xl font-semibold uppercase tracking-[0.09em] text-[#2f6ea0]">{mapped.approach?.title || "Educational Approach"}</h3>
            {approachParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-[1.02rem] leading-8 text-[#455b71]">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal className="bg-[#f4f4f5] px-6 py-14 lg:px-10" delay={0.1}>
          <h3 className="mb-10 text-center text-3xl font-semibold tracking-[0.22em] text-[#24aeb8]">{mapped.accreditations?.title || "ACCREDITATIONS"}</h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {(mapped.accreditations?.items || []).map((item, index) => (
              <motion.div
                key={item}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-[#d4dce5] bg-white p-4 shadow-sm"
              >
                <MediaSlot
                  section={mapped.accreditations}
                  index={index}
                  ratio="aspect-[5/3]"
                  className="rounded-xl border-none shadow-none"
                />
                <p className="mt-3 text-center text-sm font-semibold text-[#37536c]">{item}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <Reveal className="grid gap-8 bg-[#f4f4f5] px-6 py-14 md:grid-cols-[1fr_1.1fr] md:items-center lg:px-10" delay={0.12}>
          <div className="space-y-4">
            <h3 className="text-3xl font-semibold tracking-[0.13em] text-[#23afb9]">{mapped.whySais?.title || "WHY SAIS?"}</h3>
            {whyParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-[1.02rem] leading-8 text-[#455b71]">
                {paragraph}
              </p>
            ))}
            <button className="mt-3 rounded-full bg-[#23afb9] px-6 py-3 text-sm font-semibold tracking-[0.12em] text-white transition hover:bg-[#1c95a0]">
              {mapped.whySais?.ctas?.[0] || "LEARN MORE"}
            </button>
          </div>
          <MediaSlot section={mapped.whySais} index={1} ratio="aspect-[4/3]" />
        </Reveal>

        <Reveal className="bg-[#1f78a8] px-6 py-14 text-white lg:px-10" delay={0.15}>
          <h3 className="text-center text-3xl font-semibold tracking-[0.2em]">{mapped.facts?.title || "FACTS & FIGURES"}</h3>
          <div className="mt-10 grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            {factItems.map((fact) => (
              <div key={`${fact.number}-${fact.label}`} className="space-y-2">
                <p className="text-5xl font-semibold tracking-tight">{fact.number}</p>
                <p className="text-lg text-white/90">{fact.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="bg-[#f4f4f5] px-6 py-14 lg:px-10" delay={0.18}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickItems.map((item, index) => {
              const card = parseHeadline(item);
              return (
                <motion.article
                  key={item}
                  whileHover={{ scale: 1.02 }}
                  className="group relative overflow-hidden rounded-[20px]"
                >
                  <MediaSlot
                    section={mapped.quickLinks}
                    index={index}
                    ratio="aspect-[4/5]"
                    className="rounded-[20px] border-none"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0d2f51] via-[#0d2f51]/65 to-transparent p-5 text-white">
                    <h4 className="text-2xl font-semibold tracking-[0.14em]">{card.title}</h4>
                    <p className="mt-1 text-sm font-medium text-white/90">{card.cta}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </Reveal>

        <Reveal id="learning" className="bg-[#f4f4f5] px-6 py-14 lg:px-10" delay={0.2}>
          <h3 className="text-center text-3xl font-semibold tracking-[0.2em] text-[#24aeb8]">{mapped.phases?.title || "LEARNING PHASES"}</h3>
          <div className="mt-12 space-y-10">
            {phaseItems.map((phase, index) => {
              const parsed = parseHeadline(phase);
              const isReverse = index % 2 === 1;
              return (
                <motion.div
                  key={phase}
                  whileHover={{ y: -2 }}
                  className={clsx(
                    "grid gap-8 rounded-[24px] border border-[#d8e1ea] bg-white p-6 shadow-sm md:grid-cols-2",
                    isReverse && "md:[&>*:first-child]:order-2"
                  )}
                >
                  <MediaSlot section={mapped.phases} index={index} ratio="aspect-[16/10]" className="rounded-[20px]" />
                  <div className="flex flex-col justify-center">
                    <h4 className="text-3xl font-semibold tracking-[0.14em] text-[#21aeb8]">{parsed.title}</h4>
                    <a href="#" className="mt-4 inline-flex w-fit border-b border-[#1f9ca7] text-lg font-medium text-[#1f9ca7]">
                      {parsed.cta}
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Reveal>

        <Reveal id="admissions" className="bg-[#f4f4f5] px-6 py-14 lg:px-10" delay={0.22}>
          <div className="relative overflow-hidden rounded-[28px] bg-[#1f78a8]">
            <MediaSlot
              section={mapped.admissions}
              index={0}
              ratio="aspect-[16/8]"
              className="rounded-none border-none"
              imageClassName="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d4770]/90 via-[#0f4d78]/55 to-transparent" />
            <div className="absolute left-6 top-6 max-w-[320px] rounded-[24px] bg-[#1f78a8]/95 p-6 text-white shadow-[0_15px_50px_rgba(0,0,0,0.35)] sm:left-10 sm:top-10 sm:p-8">
              <h4 className="text-3xl font-semibold tracking-[0.13em]">{mapped.admissions?.title || "ADMISSIONS & TOURS"}</h4>
              <p className="mt-4 leading-7 text-white/90">
                {textBlocksToParagraphs(mapped.admissions?.body || [])[0] ||
                  "For any inquiries, please feel free to contact us."}
              </p>
              <div className="mt-7 grid gap-3">
                {(mapped.admissions?.ctas || ["APPLY", "WORK", "VISIT"]).map((cta) => (
                  <button
                    key={cta}
                    className="rounded-full border border-white/60 bg-[#42c8c8]/45 px-4 py-2 text-sm font-semibold tracking-[0.15em] text-white transition hover:bg-[#36aeb0]"
                  >
                    {cta}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="bg-[#35b9be] px-6 py-16 text-center text-white lg:px-10" delay={0.24}>
          <h3 className="text-4xl font-semibold tracking-[0.2em]">{mapped.bookTour?.title || "BOOK A TOUR"}</h3>
          <p className="mx-auto mt-6 max-w-[780px] text-xl leading-9 text-white/92">
            {tourParagraphs[0] ||
              "Book your campus tour and discover the full SAIS learning experience."}
          </p>
        </Reveal>

        <Reveal id="news" className="bg-[#f4f4f5] px-6 py-16 lg:px-10" delay={0.26}>
          <h3 className="text-center text-3xl font-semibold tracking-[0.2em] text-[#24aeb8]">{mapped.news?.title || "LATEST NEWS & EVENTS"}</h3>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {newsItems.slice(0, 3).map((story, index) => {
              const parsed = parseHeadline(story);
              return (
                <motion.article
                  key={`${story}-${index}`}
                  whileHover={{ y: -5 }}
                  className="group relative overflow-hidden rounded-[18px]"
                >
                  <MediaSlot
                    section={mapped.news}
                    index={index}
                    ratio={index === 1 ? "aspect-[4/5]" : "aspect-[4/3]"}
                    className="rounded-[18px] border-none"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b2f52] via-[#0b2f52]/72 to-transparent p-5 text-white">
                    <h4 className="text-2xl font-semibold">{parsed.title}</h4>
                    <span className="mt-2 inline-block text-sm font-medium text-white/90">{parsed.cta}</span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </Reveal>

        <Reveal className="bg-[#1f78a8] px-6 py-16 text-white lg:px-10" delay={0.28}>
          <h3 className="text-center text-3xl font-semibold tracking-[0.2em]">{mapped.instagram?.title || "FOLLOW US ON INSTAGRAM"}</h3>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <motion.div key={index} whileHover={{ scale: 1.02 }}>
                <MediaSlot section={mapped.instagram} index={index} ratio="aspect-[4/5]" className="rounded-[14px] border-none" />
              </motion.div>
            ))}
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <span
                key={index}
                className={clsx(
                  "h-2.5 w-2.5 rounded-full border border-white/70",
                  index === 0 ? "bg-white" : "bg-transparent"
                )}
              />
            ))}
          </div>
        </Reveal>
      </main>

      <Reveal className="bg-[#33babf] px-6 py-14 text-white sm:px-8 lg:px-10" delay={0.32}>
        <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[1.25fr_1fr_1fr]">
          <div>
            <p className="text-4xl font-semibold tracking-[0.2em]">SAIS</p>
            <div className="mt-4 space-y-2 text-base text-white/95">
              {footerParagraphs.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-white/95">
            {footerLinks.map((link) => (
              <Link key={link} href="#" className="text-sm transition hover:text-white">
                {link}
              </Link>
            ))}
          </div>

          <div className="flex flex-col items-start gap-5 lg:items-end">
            <div className="flex gap-3">
              {[Youtube, Instagram, Facebook, Twitter].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="rounded-full border border-white/60 p-2 transition hover:bg-white/15"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {footerCtas.map((cta) => (
                <button key={cta} className="rounded-full border border-white/70 px-4 py-2 text-sm font-semibold">
                  {cta}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
