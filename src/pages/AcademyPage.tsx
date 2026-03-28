import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import pearlBrightBanner from "@/assets/pearl-bright-academy-banner.png";
import academyPromoImage from "@/assets/ACADEMY AWARDS/WhatsApp Image 2026-03-26 at 12.49.41 PM (2).jpeg";
import pssLogo from "@/assets/pss-logo.png";
import academyTeachingVideo1 from "@/assets/ACADEMY AWARDS/WhatsApp Video 2026-03-26 at 12.49.59 PM.mp4";
import academyTeachingVideo2 from "@/assets/ACADEMY AWARDS/WhatsApp Video 2026-03-26 at 12.49.59 PM (1).mp4";
import academyTeachingVideo3 from "@/assets/ACADEMY AWARDS/WhatsApp Video 2026-03-26 at 12.49.59 PM (2).mp4";
import academyTeachingVideo4 from "@/assets/ACADEMY AWARDS/WhatsApp Video 2026-03-28 at 9.19.54 AM.mp4";
import {
  professionalMakeupHairArtistCourse,
  academyBestFor,
  academyCareerOutcomes,
  academyFaqs,
  academyLearningTracks,
  pearlBrightSpecialistRates,
} from "@/data/academyCourse";
import { summerOffersVenue } from "@/data/summerOffersData";

function formatRupee(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

const academyTeachingVideos = [
  { src: academyTeachingVideo1, title: "Founder teaching session 1" },
  { src: academyTeachingVideo2, title: "Founder teaching session 2" },
  { src: academyTeachingVideo3, title: "Founder teaching session 3" },
  { src: academyTeachingVideo4, title: "Srimathi N teaching live in academy class" },
] as const;

const academyProofMetrics = [
  { label: "Course completion model looks", value: "4+", detail: "Portfolio-quality output" },
  { label: "Hands-on training format", value: "100%", detail: "Practical studio sessions" },
  { label: "Mentor style", value: "Founder-led", detail: "Direct pro guidance" },
  { label: "Career focus", value: "Client-ready", detail: "Pricing and booking basics" },
] as const;

const academyJourneyWeeks = [
  {
    week: "Week 1",
    title: "Pro Foundations",
    summary: "Skin science, shade matching, hygiene protocols, and base perfection drills.",
  },
  {
    week: "Week 2",
    title: "Signature Makeup Methods",
    summary: "HD, bridal, glossy, matte, and long-wear methods with camera-finish control.",
  },
  {
    week: "Week 3",
    title: "Hair + Draping Mastery",
    summary: "Bridal buns, volume styling, accessories, and occasion-ready draping formats.",
  },
  {
    week: "Week 4",
    title: "Portfolio + Business Launch",
    summary: "Model execution, social-ready portfolio output, pricing, and client conversion flow.",
  },
] as const;

const academyCertifiedStudentImageModules = import.meta.glob<string>(
  "../assets/ACADEMY AWARDS/*.{jpeg,jpg,png,webp}",
  { eager: true, import: "default" },
);
const academyCertifiedStudentVideoModules = import.meta.glob<string>(
  "../assets/ACADEMY AWARDS/*.{mp4,webm}",
  { eager: true, import: "default" },
);

function sortAssetPaths(paths: string[]): string[] {
  return paths.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
}

const academyCertifiedStudentImages = sortAssetPaths(Object.keys(academyCertifiedStudentImageModules)).map((path) => ({
  path,
  src: academyCertifiedStudentImageModules[path]!,
}));

const excludedCertificationImageNames = new Set([
  "WhatsApp Image 2026-03-26 at 12.51.24 PM (3).jpeg",
]);

const academyCertifiedStudentImagesFiltered = academyCertifiedStudentImages.filter(({ path }) => {
  const normalized = path.replace(/\\/g, "/");
  const fileName = normalized.slice(normalized.lastIndexOf("/") + 1);
  return !excludedCertificationImageNames.has(fileName);
});

const academyCertificationVideos = sortAssetPaths(Object.keys(academyCertifiedStudentVideoModules)).map((path) => ({
  path,
  src: academyCertifiedStudentVideoModules[path]!,
}));

const excludedCertificationVideoNames = new Set([
  "WhatsApp Video 2026-03-26 at 12.49.59 PM (1).mp4",
  "WhatsApp Video 2026-03-26 at 12.49.59 PM (2).mp4",
  "WhatsApp Video 2026-03-26 at 12.49.59 PM.mp4",
  "WhatsApp Video 2026-03-28 at 9.19.54 AM.mp4",
]);

const academyCertificationVideosFiltered = academyCertificationVideos.filter(({ path }) => {
  const normalized = path.replace(/\\/g, "/");
  const fileName = normalized.slice(normalized.lastIndexOf("/") + 1);
  return !excludedCertificationVideoNames.has(fileName);
});

const AcademyPage = () => {
  const telHref = `tel:+91${summerOffersVenue.phone.replace(/\D/g, "")}`;
  const mailHref = `mailto:${summerOffersVenue.email}`;
  const course = professionalMakeupHairArtistCourse;
  const [selectedCertificationImage, setSelectedCertificationImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [showAllCertificationImages, setShowAllCertificationImages] = useState(false);
  const [showAllCertificationVideos, setShowAllCertificationVideos] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobileViewport(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const academyFastFacts = useMemo(
    () => [
      { label: "Course fee", value: formatRupee(course.fee) },
      { label: "Duration", value: course.durationLabel },
      { label: "Schedule", value: course.schedule.regular },
      { label: "Flexible", value: course.schedule.flexible },
    ],
    [course.fee, course.durationLabel, course.schedule.regular, course.schedule.flexible],
  );
  const certificationCollapsedLimit = isMobileViewport ? 2 : 4;
  const displayedCertificationImages = showAllCertificationImages
    ? academyCertifiedStudentImagesFiltered
    : academyCertifiedStudentImagesFiltered.slice(0, certificationCollapsedLimit);
  const certificationHiddenCount = Math.max(0, academyCertifiedStudentImagesFiltered.length - certificationCollapsedLimit);
  const showCertificationToggle = academyCertifiedStudentImagesFiltered.length > certificationCollapsedLimit;
  const displayedCertificationVideos = showAllCertificationVideos
    ? academyCertificationVideosFiltered
    : academyCertificationVideosFiltered.slice(0, certificationCollapsedLimit);
  const certificationVideoHiddenCount = Math.max(0, academyCertificationVideosFiltered.length - certificationCollapsedLimit);
  const showCertificationVideoToggle = academyCertificationVideosFiltered.length > certificationCollapsedLimit;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <main className="flex flex-col pt-[calc(5.5rem+env(safe-area-inset-top,0px))] md:pt-[calc(6.5rem+env(safe-area-inset-top,0px))]">
        <section className="relative border-b border-border/20 py-10 md:py-14">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(329_92%_54%/0.09)_0%,transparent_60%)]" />
          <div className="container relative mx-auto px-6">
            <div className="mt-2 rounded-2xl border border-border/35 bg-card/40 p-5 md:p-6 transition-transform transition-shadow duration-200 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(0,0,0,0.45)]">
              <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="mb-3 inline-block rounded-full border border-primary/35 bg-primary/10 px-4 py-1.5 font-sans-serif text-[10px] uppercase tracking-[0.22em] text-primary">
                  {summerOffersVenue.name}
                </span>
                <h1 className="font-display text-3xl leading-tight text-balance md:text-5xl">
                  <span className="text-gradient-gold">Professional Makeup</span>
                  <br />
                  <span className="text-foreground">&amp; Hair Artist Academy</span>
                </h1>
                <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-muted-foreground md:text-base">
                  Learn directly from working professionals at our Bangalore studio. This program is designed for
                  beginners and beauty artists who want premium bridal, HD, and portfolio-ready skills.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to={{ pathname: "/", hash: "#book-now" }}
                    className="academy-cta academy-cta-primary rounded-sm bg-gradient-gold px-7 py-3 font-sans-serif text-[11px] uppercase tracking-[0.2em] text-primary-foreground"
                  >
                    Enquire now
                  </Link>
                  <a
                    href={telHref}
                  className="academy-cta academy-cta-outline rounded-sm border border-primary/45 px-7 py-3 font-sans-serif text-[11px] uppercase tracking-[0.2em] text-primary gold-glow transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.03]"
                  >
                    Call {summerOffersVenue.phone}
                  </a>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.06 }}
                className="overflow-hidden rounded-2xl border border-primary/20 bg-card/35 luxury-shadow gold-glow-strong"
              >
                <img
                  src={pssLogo}
                  alt="PSS Makeup Studio logo"
                  className="h-full w-full object-contain p-6 animate-pulse"
                  loading="eager"
                  width={400}
                  height={400}
                />
              </motion.div>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {academyFastFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-xl border border-border/35 bg-muted/10 p-4 transition-transform transition-shadow duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
                >
                  <p className="font-sans-serif text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{fact.label}</p>
                  <p className="mt-1 font-display text-lg text-primary">{fact.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-primary/20 bg-card/40 p-4 md:p-5">
              <p className="mb-3 font-sans-serif text-[10px] uppercase tracking-[0.22em] text-primary">Academy confidence indicators</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {academyProofMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-xl border border-border/35 bg-background/60 p-4 transition-transform transition-shadow duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
                  >
                    <p className="font-display text-xl text-gradient-gold md:text-2xl">{metric.value}</p>
                    <p className="mt-1 font-sans-serif text-[10px] uppercase tracking-[0.14em] text-foreground/80">{metric.label}</p>
                    <p className="mt-1 font-body text-xs text-muted-foreground">{metric.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative border-b border-border/20 py-14 md:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(217_73%_47%/0.08)_0%,transparent_60%)]" />
          <div className="container relative mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-10 max-w-3xl text-center"
            >
              <span className="mb-3 block font-sans-serif text-xs uppercase tracking-[0.28em] text-primary">4-week transformation</span>
              <h2 className="font-display text-3xl text-balance md:text-4xl">
                <span className="text-gradient-gold">Your academy journey,</span> mapped week by week
              </h2>
              <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground md:text-base">
                This is not random classes. Every week has a clear output so students move from learner mode to
                confident client execution with structure.
              </p>
            </motion.div>

            <div className="grid gap-4 lg:grid-cols-4">
              {academyJourneyWeeks.map((item, i) => (
                <motion.div
                  key={item.week}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ duration: 0.45, delay: Math.min(i * 0.06, 0.2) }}
                  className="relative rounded-2xl border border-primary/25 bg-card/35 p-5 luxury-shadow transition-transform transition-shadow duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_55px_rgba(0,0,0,0.4)]"
                >
                  <div className="mb-4 inline-flex rounded-full border border-primary/35 bg-primary/10 px-3 py-1 font-sans-serif text-[10px] uppercase tracking-[0.2em] text-primary">
                    {item.week}
                  </div>
                  <h3 className="font-display text-xl text-foreground">{item.title}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-b border-border/20 py-14 md:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_100%_0%,hsl(329_92%_54%/_0.07),transparent_55%)]" />
          <div className="container relative mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
              className="mx-auto mb-10 max-w-3xl text-center"
            >
              <span className="mb-3 block font-sans-serif text-xs uppercase tracking-[0.28em] text-primary">Academy value</span>
              <h2 className="font-display text-3xl text-balance text-foreground md:text-4xl">
                <span className="text-gradient-gold">Why students choose</span>
                <span className="text-foreground"> Pearl Bright Academy</span>
              </h2>
              <p className="mt-4 font-body text-base leading-relaxed text-muted-foreground md:text-lg">
                We combine practical classroom training, live model practice, portfolio-focused outputs, and mentor
                guidance from founder Srimathi N for real-world confidence.
              </p>
            </motion.div>

            <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden rounded-2xl border border-primary/25 bg-card/30 luxury-shadow"
              >
                <img
                  src={academyPromoImage}
                  alt="Pearl Bright Academy student work and training environment"
                  className="w-full object-cover object-center"
                  loading="lazy"
                  width={1200}
                  height={800}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.06 }}
                className="flex flex-col gap-8"
              >
                <div className="rounded-2xl border border-border/40 bg-muted/15 p-6 md:p-8 transition-transform transition-shadow duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_55px_rgba(0,0,0,0.4)]">
                  <h3 className="font-display text-lg text-gradient-gold md:text-xl">Service and academy pricing</h3>
                  <p className="mt-2 font-body text-sm text-muted-foreground">
                    Transparent pricing helps students understand real salon economics while building service packages.
                  </p>
                  <ul className="mt-6 divide-y divide-border/35">
                    {pearlBrightSpecialistRates.map((row) => (
                      <li
                        key={row.label}
                        className="flex items-center justify-between gap-4 py-3 font-body text-sm text-foreground/90 first:pt-0 transition-colors hover:text-primary"
                      >
                        <span>{row.label}</span>
                        <span className="shrink-0 font-display text-primary">{formatRupee(row.price)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-7 transition-transform transition-shadow duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_20px_55px_rgba(0,0,0,0.4)]">
                  <p className="font-sans-serif text-[10px] uppercase tracking-[0.2em] text-primary">Contact academy desk</p>
                  <p className="mt-2 font-body text-foreground/90">{summerOffersVenue.location}</p>
                  <a
                    href={telHref}
                    className="mt-4 inline-flex items-center gap-2 font-display text-lg text-gradient-gold transition-opacity hover:opacity-90"
                  >
                    {summerOffersVenue.phone}
                  </a>
                  <a
                    href={mailHref}
                    className="mt-2 block font-body text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {summerOffersVenue.email}
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="relative border-b border-border/20 py-14 md:py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-10 max-w-3xl text-center"
            >
              <span className="mb-3 block font-sans-serif text-xs uppercase tracking-[0.28em] text-primary">Curriculum</span>
              <h2 className="font-display text-3xl text-balance md:text-4xl">
                <span className="text-gradient-gold">What you</span> will master
              </h2>
              <p className="mt-4 font-body text-sm text-muted-foreground md:text-base">
                A complete learning path from foundation to advanced bridal execution, including salon-ready
                professionalism and portfolio building.
              </p>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2">
              {academyLearningTracks.map((track, i) => (
                <motion.div
                  key={track.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ duration: 0.45, delay: Math.min(i * 0.06, 0.24) }}
                  className="rounded-xl border border-border/35 bg-muted/10 p-5 md:p-6 transition-transform transition-shadow duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_55px_rgba(0,0,0,0.4)]"
                >
                  <h3 className="font-display text-xl text-gradient-gold">{track.title}</h3>
                  <ul className="mt-4 grid gap-2">
                    {track.points.map((point) => (
                      <li key={point} className="font-body text-sm text-foreground/85">
                        • {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative border-b border-border/20 py-14 md:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(329_92%_54%/0.05)_0%,transparent_60%)]" />
          <div className="container relative mx-auto px-6">
            <div className="grid items-start gap-8 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-primary/25 bg-primary/5 p-6 md:p-8 transition-transform transition-shadow duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_55px_rgba(0,0,0,0.4)]"
              >
                <p className="font-sans-serif text-[10px] uppercase tracking-[0.24em] text-primary">Who can join</p>
                <h3 className="mt-2 font-display text-2xl text-foreground">Perfect for aspiring and working artists</h3>
                <ul className="mt-5 grid gap-2">
                  {academyBestFor.map((item) => (
                    <li key={item} className="font-body text-sm text-foreground/85">
                      • {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.5, delay: 0.04 }}
                className="rounded-2xl border border-border/35 bg-card/30 p-6 md:p-8 transition-transform transition-shadow duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_55px_rgba(0,0,0,0.4)]"
              >
                <p className="font-sans-serif text-[10px] uppercase tracking-[0.24em] text-primary">Career outcomes</p>
                <h3 className="mt-2 font-display text-2xl text-foreground">Where this course can take you</h3>
                <ul className="mt-5 grid gap-2">
                  {academyCareerOutcomes.map((item) => (
                    <li key={item} className="font-body text-sm text-foreground/85">
                      • {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to={{ pathname: "/", hash: "#book-now" }}
                  className="academy-cta academy-cta-primary mt-6 inline-flex rounded-sm bg-gradient-gold px-6 py-3 font-sans-serif text-[11px] uppercase tracking-[0.2em] text-primary-foreground"
                >
                  Reserve your seat
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="relative border-b border-border/20 py-14 md:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(329_92%_54%/0.05)_0%,transparent_60%)]" />
          <div className="container relative mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-8 max-w-3xl text-center md:mb-10"
            >
              <span className="mb-3 block font-sans-serif text-xs uppercase tracking-[0.28em] text-primary">
                Founder Sessions
              </span>
              <h2 className="font-display text-3xl text-balance md:text-4xl">
                <span className="text-gradient-gold">Srimathi N</span> teaching live in academy class
              </h2>
              <p className="mt-4 font-body text-sm text-muted-foreground md:text-base">
                Real classroom moments from founder-led sessions, where students learn practical artistry,
                product handling, and professional execution techniques.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-4">
              {academyTeachingVideos.map((video, i) => (
                <motion.div
                  key={video.src}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ duration: 0.45, delay: Math.min(i * 0.06, 0.2) }}
                  className="mx-auto w-full max-w-[280px] overflow-hidden rounded-xl border border-border/35 bg-muted/10 luxury-shadow"
                >
                  <video
                    src={video.src}
                    className="aspect-[3/4] w-full bg-background object-cover"
                    controls
                    preload="metadata"
                    playsInline
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {academyCertifiedStudentImagesFiltered.length > 0 && (
          <section className="relative border-b border-border/20 py-14 md:py-20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(329_92%_54%/0.05)_0%,transparent_60%)]" />
            <div className="container relative mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="mx-auto mb-8 max-w-3xl text-center md:mb-10"
              >
                <span className="mb-3 block font-sans-serif text-xs uppercase tracking-[0.28em] text-primary">
                  Student Certifications
                </span>
                <h2 className="font-display text-3xl text-balance md:text-4xl">
                  <span className="text-gradient-gold">Certified students</span> of Pearl Bright Academy
                </h2>
                <p className="mt-4 font-body text-sm text-muted-foreground md:text-base">
                  Graduation and certification moments of students trained under founder-led mentorship at our academy.
                </p>
              </motion.div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {displayedCertificationImages.map((item, i) => (
                  <motion.button
                    key={item.path}
                    type="button"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-70px" }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.02, 0.4) }}
                    className="group overflow-hidden rounded-xl border border-border/35 bg-muted/10 text-left luxury-shadow outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    onClick={() =>
                      setSelectedCertificationImage({
                        src: item.src,
                        alt: `Certified academy student ${i + 1}`,
                      })
                    }
                  >
                    <img
                      src={item.src}
                      alt={`Certified academy student ${i + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </motion.button>
                ))}
              </div>

              {showCertificationToggle && (
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowAllCertificationImages((prev) => !prev)}
                    className="rounded-full border border-primary/45 bg-primary/10 px-6 py-3 font-sans-serif text-[11px] uppercase tracking-[0.14em] text-primary transition-all duration-300 hover:border-primary/60 hover:bg-primary/15"
                  >
                    {showAllCertificationImages
                      ? "Show less"
                      : `View more${certificationHiddenCount > 0 ? ` (${certificationHiddenCount})` : ""}`}
                  </button>
                </div>
              )}

              {academyCertificationVideosFiltered.length > 0 && (
                <div className="mt-10 md:mt-12">
                  <p className="mb-4 text-center font-sans-serif text-[10px] uppercase tracking-[0.24em] text-primary">
                    Certification day highlights
                  </p>
                  <div className="grid gap-4 md:grid-cols-3">
                    {displayedCertificationVideos.map((video, i) => (
                      <motion.div
                        key={video.path}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-70px" }}
                        transition={{ duration: 0.45, delay: Math.min(i * 0.04, 0.28) }}
                        className="overflow-hidden rounded-xl border border-border/35 bg-muted/10 luxury-shadow"
                      >
                        <video
                          src={video.src}
                          className="h-full w-full bg-background object-cover"
                          controls
                          preload="metadata"
                          playsInline
                        />
                      </motion.div>
                    ))}
                  </div>
                  {showCertificationVideoToggle && (
                    <div className="mt-8 flex justify-center">
                      <button
                        type="button"
                        onClick={() => setShowAllCertificationVideos((prev) => !prev)}
                        className="rounded-full border border-primary/45 bg-primary/10 px-6 py-3 font-sans-serif text-[11px] uppercase tracking-[0.14em] text-primary transition-all duration-300 hover:border-primary/60 hover:bg-primary/15"
                      >
                        {showAllCertificationVideos
                          ? "Show less"
                          : `View more${certificationVideoHiddenCount > 0 ? ` (${certificationVideoHiddenCount})` : ""}`}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        <section className="relative border-b border-border/20 py-12 md:py-14">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,hsl(217_73%_47%/0.11)_0%,hsl(329_92%_54%/0.11)_55%,hsl(293_73%_52%/0.11)_100%)]" />
          <div className="container relative mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-primary/25 bg-background/80 p-6 text-center backdrop-blur md:p-8"
            >
              <p className="font-sans-serif text-[10px] uppercase tracking-[0.24em] text-primary">Limited batch advantage</p>
              <h2 className="mt-2 font-display text-2xl text-balance md:text-4xl">
                Train in smaller batches, <span className="text-gradient-gold">get deeper founder attention</span>
              </h2>
              <p className="mx-auto mt-3 max-w-3xl font-body text-sm text-muted-foreground md:text-base">
                Pearl Bright Academy focuses on quality over crowd. Smaller class groups mean better correction,
                stronger practical confidence, and faster real-world readiness.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to={{ pathname: "/", hash: "#book-now" }}
                  className="academy-cta academy-cta-primary rounded-sm bg-gradient-gold px-7 py-3 font-sans-serif text-[11px] uppercase tracking-[0.2em] text-primary-foreground"
                >
                  Apply for next batch
                </Link>
                <a
                  href={mailHref}
                  className="academy-cta academy-cta-outline academy-cta-email rounded-sm border border-primary/45 px-7 py-3 font-sans-serif text-[11px] uppercase tracking-[0.2em]"
                >
                  Email academy desk
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative py-14 md:py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-8 max-w-2xl text-center"
            >
              <span className="mb-3 block font-sans-serif text-xs uppercase tracking-[0.28em] text-primary">FAQs</span>
              <h2 className="font-display text-3xl text-balance md:text-4xl">
                <span className="text-gradient-gold">Frequently</span> asked questions
              </h2>
            </motion.div>

            <div className="mx-auto grid max-w-4xl gap-4">
              {academyFaqs.map((faq, i) => (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.2) }}
                  className="rounded-xl border border-border/35 bg-muted/10 p-5"
                >
                  <h3 className="font-display text-lg text-foreground">{faq.q}</h3>
                  <p className="mt-2 font-body text-sm text-muted-foreground md:text-base">{faq.a}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to={{ pathname: "/", hash: "#book-now" }}
                className="academy-cta academy-cta-primary rounded-sm bg-gradient-gold px-8 py-3 font-sans-serif text-[11px] uppercase tracking-[0.2em] text-primary-foreground"
              >
                Start your journey
              </Link>
              <Link
                to="/"
                className="academy-cta academy-cta-outline rounded-sm border border-border/40 px-8 py-3 font-sans-serif text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:border-primary/40 hover:text-primary"
              >
                Back to home
              </Link>
            </div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedCertificationImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 sm:p-6"
            onClick={() => setSelectedCertificationImage(null)}
          >
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              src={selectedCertificationImage.src}
              alt={selectedCertificationImage.alt}
              className="max-h-[90vh] max-w-full rounded-2xl object-contain luxury-shadow"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              className="absolute right-6 top-6 font-sans-serif text-xs tracking-[0.2em] uppercase text-primary sm:right-10 sm:top-10"
              onClick={() => setSelectedCertificationImage(null)}
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default AcademyPage;
