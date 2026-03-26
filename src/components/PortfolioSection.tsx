import { motion, useInView, AnimatePresence, LayoutGroup } from "framer-motion";
import { useRef, useState, useMemo, useEffect, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { orderBridalMakeupPaths } from "@/lib/bridalMakeupOrder";
import { filterHairPathsForPortfolio, orderHairPaths } from "@/lib/hairAssetOrder";
import { orderMythologyPaths } from "@/lib/mythologyAssetOrder";
import studioPhoto from "@/assets/about-studio.jpeg";
import testimonialShowcaseVideo from "@/assets/testimonials/WhatsApp Video 2026-03-26 at 12.49.50 PM.mp4";

/** Replace with your studio WhatsApp (country code + number, no + or spaces). */
const WHATSAPP_NUMBER = "919686373707";

type PortfolioCategoryId =
  | "bridal"
  | "party"
  | "mythology"
  | "nail-art"
  | "hd-airbrush"
  | "hair"
  | "heel-treatment"
  | "hydra-facial";

type PortfolioItem = {
  id: string;
  src: string;
  title: string;
  categoryId: PortfolioCategoryId;
  mediaType?: "image" | "video";
};

const CATEGORIES: { id: PortfolioCategoryId; label: string }[] = [
  { id: "bridal", label: "Bridal Makeup" },
  { id: "party", label: "Party Makeup" },
  { id: "mythology", label: "Mythology Makeup" },
  { id: "nail-art", label: "Nail Art" },
  { id: "hd-airbrush", label: "HD & Airbrush makeup" },
  { id: "hair", label: "Hair Styling" },
  { id: "heel-treatment", label: "Heel Treatment" },
  { id: "hydra-facial", label: "Hydra Facial" },
];

const bridalModules = import.meta.glob<string>("../assets/bridal makeup/*.{jpeg,jpg,png,webp}", {
  eager: true,
  import: "default",
});

const hairModules = import.meta.glob<string>("../assets/hair/**/*.{jpeg,jpg,png,webp}", {
  eager: true,
  import: "default",
});

const heelModules = import.meta.glob<string>("../assets/heel treatemnt/*.{jpeg,jpg,png,webp}", {
  eager: true,
  import: "default",
});

const hydraFacialModules = import.meta.glob<string>("../assets/hydra facial treatemnt/*.{jpeg,jpg,png,webp}", {
  eager: true,
  import: "default",
});

const eyesModules = import.meta.glob<string>("../assets/eyes/*.{jpeg,jpg,png,webp}", {
  eager: true,
  import: "default",
});

const partyModules = import.meta.glob<string>("../assets/party/*.{jpeg,jpg,png,webp}", {
  eager: true,
  import: "default",
});

const mythologyModules = import.meta.glob<string>("../assets/mythology/*.{jpeg,jpg,png,webp}", {
  eager: true,
  import: "default",
});

const nailArtModules = import.meta.glob<string>("../assets/nail art/*.{jpeg,jpg,png,webp}", {
  eager: true,
  import: "default",
});

function categoryBadge(categoryId: PortfolioCategoryId): string {
  const c = CATEGORIES.find((x) => x.id === categoryId);
  return (c?.label ?? "").toUpperCase();
}

/** Party makeup shots stored under `assets/hair/party/` (same glob as hair; split by path). */
function isHairPartyAssetPath(path: string): boolean {
  return path.replace(/\\/g, "/").toLowerCase().includes("/hair/party/");
}

function buildAllPortfolioItems(): PortfolioItem[] {
  const paths = orderBridalMakeupPaths(Object.keys(bridalModules));
  const fromGlob: PortfolioItem[] = paths.map((path, index) => ({
    id: `bridal-glob-${index}-${path}`,
    src: bridalModules[path],
    title: `Bridal makeup ${index + 1}`,
    categoryId: "bridal" as const,
  }));

  const mythologyPaths = orderMythologyPaths(Object.keys(mythologyModules));
  const fromMythologyGlob: PortfolioItem[] = mythologyPaths.map((path, index) => ({
    id: `mythology-glob-${index}-${path}`,
    src: mythologyModules[path],
    title: `Mythology makeup ${index + 1}`,
    categoryId: "mythology" as const,
  }));

  const nailArtPaths = Object.keys(nailArtModules).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const fromNailArtGlob: PortfolioItem[] = nailArtPaths.map((path, index) => ({
    id: `nail-art-glob-${index}-${path}`,
    src: nailArtModules[path],
    title: `Nail art ${index + 1}`,
    categoryId: "nail-art" as const,
  }));

  const hairPaths = Object.keys(hairModules);
  const hairOnlyPaths = filterHairPathsForPortfolio(
    orderHairPaths(hairPaths.filter((p) => !isHairPartyAssetPath(p))),
  );
  const fromHairGlob: PortfolioItem[] = hairOnlyPaths.map((path, index) => ({
    id: `hair-glob-${index}-${path}`,
    src: hairModules[path],
    title: `Hairstyling ${index + 1}`,
    categoryId: "hair" as const,
  }));

  const heelPaths = Object.keys(heelModules).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const fromHeelGlob: PortfolioItem[] = heelPaths.map((path, index) => ({
    id: `heel-glob-${index}-${path}`,
    src: heelModules[path],
    title: `Heel treatment ${index + 1}`,
    categoryId: "heel-treatment" as const,
  }));

  const hydraPaths = Object.keys(hydraFacialModules).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const fromHydraGlob: PortfolioItem[] = hydraPaths.map((path, index) => ({
    id: `hydra-glob-${index}-${path}`,
    src: hydraFacialModules[path],
    title: `Hydra facial ${index + 1}`,
    categoryId: "hydra-facial" as const,
  }));

  const eyesPaths = Object.keys(eyesModules).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const fromEyesGlob: PortfolioItem[] = eyesPaths.map((path, index) => ({
    id: `eyes-hd-${index}-${path}`,
    src: eyesModules[path],
    title: `Eye makeup ${index + 1}`,
    categoryId: "hd-airbrush" as const,
  }));

  const partyPaths = Object.keys(partyModules).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const fromPartyRoot: PortfolioItem[] = partyPaths.map((path, index) => ({
    id: `party-glob-${index}-${path}`,
    src: partyModules[path],
    title: `Party makeup ${index + 1}`,
    categoryId: "party" as const,
  }));
  const hairPartyPaths = hairPaths.filter((p) => isHairPartyAssetPath(p));
  const fromPartyHairFolder: PortfolioItem[] = hairPartyPaths.map((path, index) => ({
    id: `party-hair-party-${index}-${path}`,
    src: hairModules[path],
    title: `Party makeup ${partyPaths.length + index + 1}`,
    categoryId: "party" as const,
  }));
  const fromPartyGlob: PortfolioItem[] = [...fromPartyRoot, ...fromPartyHairFolder];

  const extra: PortfolioItem[] = [
    { id: "extra-p1", src: studioPhoto, title: "Bridal Collection", categoryId: "bridal" },
    {
      id: "extra-founder-testimonial-video",
      src: testimonialShowcaseVideo,
      title: "Client testimonial video",
      categoryId: "bridal",
      mediaType: "video",
    },
  ];

  return [
    ...fromGlob,
    ...fromMythologyGlob,
    ...fromNailArtGlob,
    ...fromHairGlob,
    ...fromHeelGlob,
    ...fromHydraGlob,
    ...fromEyesGlob,
    ...fromPartyGlob,
    ...extra,
  ];
}

/** Tailwind `md` (tablet/desktop): show 8 tiles before expand; below = mobile, show 4. */
const MOBILE_MAX_WIDTH_QUERY = "(max-width: 767px)";

function subscribeMobileViewport(callback: () => void) {
  const mq = window.matchMedia(MOBILE_MAX_WIDTH_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getMobileViewportSnapshot() {
  return window.matchMedia(MOBILE_MAX_WIDTH_QUERY).matches;
}

function getMobileViewportServerSnapshot() {
  return false;
}

const PortfolioSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const allItems = useMemo(() => buildAllPortfolioItems(), []);

  const counts = useMemo(() => {
    const m = new Map<PortfolioCategoryId, number>();
    for (const c of CATEGORIES) m.set(c.id, 0);
    for (const item of allItems) m.set(item.categoryId, (m.get(item.categoryId) ?? 0) + 1);
    return m;
  }, [allItems]);

  const defaultCategory = useMemo((): PortfolioCategoryId => {
    if ((counts.get("bridal") ?? 0) > 0) return "bridal";
    const first = CATEGORIES.find((c) => (counts.get(c.id) ?? 0) > 0);
    return first?.id ?? "bridal";
  }, [counts]);

  const [activeCategory, setActiveCategory] = useState<PortfolioCategoryId>(defaultCategory);
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);
  const [portfolioExpanded, setPortfolioExpanded] = useState(false);

  const isMobileViewport = useSyncExternalStore(
    subscribeMobileViewport,
    getMobileViewportSnapshot,
    getMobileViewportServerSnapshot,
  );
  const portfolioCollapsedLimit = isMobileViewport ? 4 : 8;

  useEffect(() => {
    setPortfolioExpanded(false);
  }, [activeCategory]);

  const visibleItems = useMemo(
    () => allItems.filter((item) => item.categoryId === activeCategory),
    [allItems, activeCategory],
  );

  const displayedPortfolioItems = useMemo(() => {
    if (portfolioExpanded || visibleItems.length <= portfolioCollapsedLimit) return visibleItems;
    return visibleItems.slice(0, portfolioCollapsedLimit);
  }, [visibleItems, portfolioExpanded, portfolioCollapsedLimit]);

  const portfolioHiddenCount = Math.max(0, visibleItems.length - portfolioCollapsedLimit);
  const showPortfolioToggle = visibleItems.length > portfolioCollapsedLimit;

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi PSS Makeup Studio — I'd like to know more about your services.")}`;

  return (
    <section id="portfolio" className="relative py-16 md:py-20">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-8 max-w-3xl text-center md:mb-10"
        >
          <h2 className="font-display text-4xl text-foreground md:text-5xl lg:text-6xl">
            <span className="text-gradient-gold">Portfolio</span>
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
            Explore our stunning transformations and creative makeup artistry
          </p>
        </motion.div>

        {/* Category pills — layout like reference; colors from your theme */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3 md:mb-12"
          role="tablist"
          aria-label="Portfolio categories"
        >
          {CATEGORIES.map((cat) => {
            const count = counts.get(cat.id) ?? 0;
            const active = activeCategory === cat.id;
            const empty = count === 0;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "rounded-full border px-4 py-2.5 font-sans-serif text-[11px] uppercase tracking-[0.12em] transition-all duration-300 sm:px-5 sm:text-xs",
                  active && !empty && "border-primary/50 bg-primary/15 text-primary gold-glow shadow-md shadow-primary/10",
                  active && empty && "border-primary/35 bg-primary/10 text-primary/90",
                  !active && !empty && "border-border/50 bg-background/40 text-foreground/70 hover:border-primary/30 hover:text-foreground",
                  !active && empty && "border-border/25 text-muted-foreground/50 hover:border-primary/20 hover:text-muted-foreground",
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        <LayoutGroup>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4"
            >
              {visibleItems.length === 0 ? (
                <p className="col-span-full py-16 text-center font-body text-muted-foreground">
                  New looks for this category are coming soon.
                </p>
              ) : (
                displayedPortfolioItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: Math.min(i * 0.035, 0.8), duration: 0.4 }}
                    className="group relative aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-2xl border border-border/30 text-left luxury-shadow outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    onClick={() => setLightboxItem(item)}
                  >
                    <span className="absolute left-3 top-3 z-20 rounded-md border border-primary/35 bg-background/90 px-2 py-1 font-sans-serif text-[9px] font-medium uppercase tracking-[0.14em] text-primary backdrop-blur-sm sm:left-3.5 sm:top-3.5 sm:text-[10px]">
                      {categoryBadge(item.categoryId)}
                    </span>
                    {item.mediaType === "video" ? (
                      <video
                        src={item.src}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        muted
                        loop
                        autoPlay
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <img
                        src={item.src}
                        alt={item.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                      <span className="font-display text-sm text-gradient-gold sm:text-base drop-shadow-[0_1px_3px_hsl(224_41%_54%_/_0.45)]">
                        {item.title}
                      </span>
                    </div>
                  </motion.button>
                ))
              )}
            </motion.div>
          </AnimatePresence>
          {showPortfolioToggle && visibleItems.length > 0 && (
            <div className="mt-8 flex justify-center sm:mt-10">
              <button
                type="button"
                onClick={() => setPortfolioExpanded((prev) => !prev)}
                className={cn(
                  "rounded-full border px-6 py-3 font-sans-serif text-[11px] uppercase tracking-[0.14em] transition-all duration-300 sm:px-8 sm:text-xs",
                  "border-primary/45 bg-primary/10 text-primary hover:border-primary/60 hover:bg-primary/15 hover:gold-glow",
                )}
              >
                {portfolioExpanded
                  ? "Show less"
                  : `View more${portfolioHiddenCount > 0 ? ` (${portfolioHiddenCount})` : ""}`}
              </button>
            </div>
          )}
        </LayoutGroup>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-6"
            onClick={() => setLightboxItem(null)}
          >
            {lightboxItem.mediaType === "video" ? (
              <motion.video
                initial={{ scale: 0.88, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.88, opacity: 0 }}
                src={lightboxItem.src}
                className="max-h-[85vh] max-w-full rounded-2xl object-contain luxury-shadow"
                controls
                autoPlay
                playsInline
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <motion.img
                initial={{ scale: 0.88, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.88, opacity: 0 }}
                src={lightboxItem.src}
                alt={lightboxItem.title}
                className="max-h-[85vh] max-w-full rounded-2xl object-contain luxury-shadow"
              />
            )}
            <button
              type="button"
              className="absolute right-6 top-6 font-sans-serif text-sm tracking-widest text-primary sm:right-10 sm:top-10"
            >
              CLOSE
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp FAB — icon uses brand green for recognition */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-primary/25 transition-transform duration-300 hover:scale-105 hover:shadow-xl md:bottom-8 md:right-8"
        aria-label="Chat on WhatsApp"
      >
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </section>
  );
};

export default PortfolioSection;
