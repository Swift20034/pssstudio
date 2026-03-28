import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpenCheck, CalendarCheck2, Sparkles } from "lucide-react";
import pssLogo from "@/assets/pss-logo.png";
import mainLogo from "@/assets/logo.png";
import studioFallback from "@/assets/about-studio.jpeg";
import heroEyesImage from "@/assets/eyes/WhatsApp Image 2026-03-26 at 12.08.24 PM (3).jpeg";
import heroBridalImage from "@/assets/bridal makeup/WhatsApp Image 2026-03-26 at 11.28.31 AM.jpeg";
import heroHairImage from "@/assets/hair/WhatsApp Image 2026-03-26 at 11.31.55 AM (1).jpeg";
import GoldParticles from "./GoldParticles";
import { orderBridalMakeupPaths } from "@/lib/bridalMakeupOrder";
import { orderHairPaths } from "@/lib/hairAssetOrder";
import { orderMythologyPaths } from "@/lib/mythologyAssetOrder";

const bridalMakeupModules = import.meta.glob<string>("../assets/bridal makeup/*.{jpeg,jpg,png,webp}", {
  eager: true,
  import: "default",
});
const bridalMakeupPaths = orderBridalMakeupPaths(Object.keys(bridalMakeupModules));
const bridalHeroImage =
  bridalMakeupPaths.length > 0 ? bridalMakeupModules[bridalMakeupPaths[0]]! : studioFallback;

const hydraFacialModules = import.meta.glob<string>("../assets/hydra facial treatemnt/*.{jpeg,jpg,png,webp}", {
  eager: true,
  import: "default",
});
const hydraFacialPaths = Object.keys(hydraFacialModules).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
const hydraFacialHeroImage =
  hydraFacialPaths.length > 0 ? hydraFacialModules[hydraFacialPaths[0]]! : studioFallback;

const hairPortfolioModules = import.meta.glob<string>("../assets/hair/**/*.{jpeg,jpg,png,webp}", {
  eager: true,
  import: "default",
});
const hairPortfolioPaths = Object.keys(hairPortfolioModules);
const hairHeroCandidatePaths = hairPortfolioPaths.filter(
  (p) => !p.replace(/\\/g, "/").toLowerCase().includes("/party/"),
);
const hairHeroOrdered = orderHairPaths(
  hairHeroCandidatePaths.length > 0 ? hairHeroCandidatePaths : hairPortfolioPaths,
);
const hairHeroImage =
  hairHeroOrdered.length > 0 ? hairPortfolioModules[hairHeroOrdered[0]]! : studioFallback;

const mythologyModules = import.meta.glob<string>("../assets/mythology/*.{jpeg,jpg,png,webp}", {
  eager: true,
  import: "default",
});
const mythologyPaths = orderMythologyPaths(Object.keys(mythologyModules));
const mythologyHeroImage =
  mythologyPaths.length > 0 ? mythologyModules[mythologyPaths[0]]! : studioFallback;

const cards = [
  { title: "Bridal Makeup", subtitle: "Sculpted, luminous looks for your celebration", image: bridalHeroImage },
  { title: "Permanent Beauty", subtitle: "Precision microblading, permanent lipstick & kajal", image: heroEyesImage },
  { title: "Keratin & Botox", subtitle: "Smooth, repaired hair with pro-grade care", image: hairHeroImage },
  { title: "Hydra Facial", subtitle: "Deep hydration and clinic-level glow", image: hydraFacialHeroImage },
  { title: "Mythology Makeup", subtitle: "Iconic character looks for stage, film, and celebrations", image: mythologyHeroImage },
];

const heroBackgroundImages = [heroEyesImage, heroBridalImage, heroHairImage];

const HeroSection = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [activeBackground, setActiveBackground] = useState(0);
  const [cardsRevealed, setCardsRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCardsRevealed(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!cardsRevealed) return;
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [cardsRevealed]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBackground((prev) => (prev + 1) % heroBackgroundImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[calc(5.5rem+env(safe-area-inset-top,0px))] md:pt-[calc(6.5rem+env(safe-area-inset-top,0px))] pb-6 md:pb-8">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0">
        {heroBackgroundImages.map((image, index) => (
          <img
            key={image}
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out"
            style={{ opacity: activeBackground === index ? 0.45 : 0 }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-background/55" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(43_100%_50%/0.05)_0%,transparent_70%)]" />
      <GoldParticles />

      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center max-w-5xl">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-5 md:mb-6"
        >
          <div className="relative mx-auto flex items-center justify-center gap-6 md:gap-8">
            <div className="relative w-[110px] sm:w-[130px] md:w-[150px]">
              <img
                src={mainLogo}
                alt="PSS Makeup Studio"
                className="relative z-10 h-auto w-full object-contain rounded-full border border-primary/20 gold-glow-strong"
              />
            </div>
            
            <div className="h-12 w-[1px] bg-primary/20" />

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="w-[105px] md:w-[125px] opacity-75 hover:opacity-100 transition-opacity"
            >
              <img
                src={pssLogo}
                alt="Pearl Bright Branding"
                className="h-auto w-full object-contain"
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="hero-title text-4xl md:text-6xl lg:text-7xl font-display font-light tracking-wider mb-4"
        >
          <span className="text-gradient-gold">Where Beauty</span>
          <br />
          <span className="text-foreground">Becomes Art</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="font-sans-serif text-sm tracking-[0.3em] uppercase text-muted-foreground mb-8 md:mb-10"
        >
          Pearl Bright · KR Puram, Bangalore
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: cardsRevealed ? 1 : 0, y: cardsRevealed ? 0 : 40 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 mb-8 md:mb-10 w-full max-w-7xl"
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: cardsRevealed ? 0 : 90, opacity: cardsRevealed ? 1 : 0 }}
              transition={{ delay: i * 0.2, duration: 0.8, ease: "easeOut" }}
              whileHover={{ y: -5 }}
              onMouseEnter={() => setActiveCard(i)}
              className={`hero-card group cursor-pointer perspective-1000 ${
                activeCard === i ? "scale-[1.015] sm:scale-[1.025]" : "scale-100"
              } transition-transform duration-500`}
            >
              <div className={`relative overflow-hidden rounded-lg luxury-shadow ${
                activeCard === i ? "gold-glow-strong" : ""
              } transition-all duration-500`}>
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                  <div className="hero-card-shine" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-xl text-gradient-gold mb-1 transition-transform duration-500 group-hover:translate-y-[-1px]">{card.title}</h3>
                    <p className="font-body text-sm text-foreground/70 transition-colors duration-500 group-hover:text-foreground/85">{card.subtitle}</p>
                  </div>
                </div>
                <div className={`absolute inset-0 rounded-lg border transition-all duration-500 ${
                  activeCard === i ? "border-primary/50" : "border-primary/10"
                }`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={() => scrollTo("book-now")}
            className="hero-cta hero-cta-primary inline-flex items-center gap-2 px-10 py-4 bg-gradient-gold text-primary-foreground font-sans-serif text-xs tracking-[0.2em] uppercase rounded-sm gold-glow"
          >
            <CalendarCheck2 className="h-3.5 w-3.5" aria-hidden />
            Book Appointment
          </button>
          <button
            type="button"
            onClick={() => scrollTo("summer-offers")}
            className="hero-cta hero-cta-outline inline-flex items-center gap-2 px-10 py-4 border border-primary/40 text-primary font-sans-serif text-xs tracking-[0.2em] uppercase rounded-sm"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Summer offers
          </button>
          <div className="relative flex">
            <div className="pointer-events-none absolute -top-16 left-1/2 z-20 w-max -translate-x-1/2 sm:hidden">
              <div className="rounded-md border border-primary/35 bg-background/95 px-3 py-1.5 font-sans-serif text-[10px] tracking-[0.08em] text-primary shadow-lg shadow-primary/20">
                Tap here to explore our academy programs
              </div>
              <div className="mx-auto -mt-1 h-3 w-3 rotate-45 border-b border-r border-primary/35 bg-background/95" />
            </div>
            <Link
              to="/academy"
              className="hero-cta hero-cta-outline inline-flex items-center justify-center gap-2 px-10 py-4 border border-primary/50 bg-primary/10 text-primary font-sans-serif text-xs tracking-[0.2em] uppercase rounded-sm text-center gold-glow animate-pulse"
            >
              <BookOpenCheck className="h-3.5 w-3.5" aria-hidden />
              Join academy
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
