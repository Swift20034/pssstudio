import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import { Award, Clapperboard, Medal, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const awardImageModules = import.meta.glob<string>("../assets/awards/*.{jpeg,jpg,png,webp}", {
  eager: true,
  import: "default",
});

const awardVideoModules = import.meta.glob<string>("../assets/awards/*.{mp4,webm}", {
  eager: true,
  import: "default",
});

type AwardMedia = { path: string; src: string; kind: "image" | "video" };

/** Spotlight clip shown first with hero treatment in the Awards grid */
const FEATURED_AWARD_VIDEO_FILE = "WhatsApp Video 2026-03-26 at 2.38.00 PM.mp4";
/** Additional reel-style award clips to keep in vertical aspect. */
const REEL_AWARD_VIDEO_FILE_1 = "WhatsApp Video 2026-03-26 at 1.41.22 P.mp4";
const REEL_AWARD_VIDEO_FILE_2 = "WhatsApp Video 2026-03-26 at 1.41.22 PM.mp4";
/** Keep this image closer to its native resolution/aspect. */
const ORIGINAL_RESOLUTION_AWARD_IMAGE_FILE = "WhatsApp Image 2026-03-26 at 2.39.39 PM.jpeg";

function fileNameFromGlobPath(path: string): string {
  const normalized = path.replace(/\\/g, "/");
  return normalized.slice(normalized.lastIndexOf("/") + 1);
}

function isFeaturedAwardVideo(path: string): boolean {
  return fileNameFromGlobPath(path) === FEATURED_AWARD_VIDEO_FILE;
}

function isReelAspectAwardVideo(path: string): boolean {
  const filename = fileNameFromGlobPath(path);
  return (
    filename === FEATURED_AWARD_VIDEO_FILE ||
    filename === REEL_AWARD_VIDEO_FILE_1 ||
    filename === REEL_AWARD_VIDEO_FILE_2
  );
}

function isOriginalResolutionAwardImage(path: string): boolean {
  return fileNameFromGlobPath(path) === ORIGINAL_RESOLUTION_AWARD_IMAGE_FILE;
}

function awardMediaEntries(): AwardMedia[] {
  const images: AwardMedia[] = Object.keys(awardImageModules).map((path) => ({
    path,
    src: awardImageModules[path]!,
    kind: "image",
  }));
  const videos: AwardMedia[] = Object.keys(awardVideoModules).map((path) => ({
    path,
    src: awardVideoModules[path]!,
    kind: "video",
  }));
  return [...images, ...videos].sort((a, b) =>
    a.path.localeCompare(b.path, undefined, { numeric: true, sensitivity: "base" }),
  );
}

const AwardsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const awards = useMemo(() => {
    const all = awardMediaEntries();
    const featured = all.filter((a) => isFeaturedAwardVideo(a.path));
    const rest = all.filter((a) => !isFeaturedAwardVideo(a.path));
    return [...featured, ...rest];
  }, []);

  if (awards.length === 0) return null;

  return (
    <section id="awards" className="relative overflow-hidden py-16 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(329_92%_54%/_0.06),transparent_55%)]" />
      <div className="container relative mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-2xl text-center md:mb-12"
        >
          <span className="mb-3 block font-sans-serif text-xs uppercase tracking-[0.28em] text-primary">
            <span className="inline-flex items-center gap-2">
              <Award className="h-3.5 w-3.5" aria-hidden />
              Recognition
            </span>
          </span>
          <h2 className="font-display text-3xl leading-tight text-balance md:text-4xl lg:text-5xl">
            <span className="text-gradient-gold">Awards</span>{" "}
            <span className="text-foreground">&amp; honours</span>
          </h2>
          <p className="mt-4 font-body text-sm text-muted-foreground md:text-base">
            Celebrating milestones and recognition earned by <span className="text-foreground/90">Srimathi N</span>,
            our founder, through dedication to the craft of beauty and artistry.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {awards.map(({ path, src, kind }, i) => {
            const featured = isFeaturedAwardVideo(path) && kind === "video";
            const keepOriginalResolution = isOriginalResolutionAwardImage(path) && kind === "image";
            const reelAspect = !featured && kind === "video" && isReelAspectAwardVideo(path);
            return (
              <motion.div
                key={path}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.48) }}
                className={cn(
                  "group relative overflow-hidden rounded-xl border bg-muted/10 luxury-shadow",
                  featured
                    ? "col-span-full mx-auto max-w-[260px] sm:max-w-[300px] border-primary/45 ring-2 ring-primary/20 gold-glow-strong"
                    : "border-border/35",
                )}
              >
                <div className="absolute left-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary/35 bg-background/80 text-primary">
                  {kind === "video" ? (
                    <Clapperboard className="h-4 w-4" aria-hidden />
                  ) : (
                    <Medal className="h-4 w-4" aria-hidden />
                  )}
                </div>
                {featured ? (
                  <div className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-background/90 px-3 py-1 font-sans-serif text-[10px] uppercase tracking-[0.16em] text-primary backdrop-blur-sm">
                    <Sparkles className="h-3 w-3" aria-hidden />
                    Featured highlight
                  </div>
                ) : null}
                <div
                  className={cn(
                    "overflow-hidden bg-background/40",
                    featured
                      ? "mx-auto w-full max-w-[220px] sm:max-w-[260px] aspect-[9/16]"
                      : keepOriginalResolution
                        ? "w-full"
                        : reelAspect
                          ? "aspect-[9/16]"
                          : "aspect-[4/5] sm:aspect-square",
                  )}
                >
                  {kind === "video" ? (
                    <video
                      src={src}
                      className={cn(
                        "w-full h-full transition-transform duration-500",
                        featured
                          ? "object-contain group-hover:scale-[1.01]"
                          : reelAspect
                            ? "object-contain group-hover:scale-[1.01]"
                            : "h-full object-cover group-hover:scale-[1.02]",
                      )}
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={featured ? "Featured awards highlights video" : `Awards highlight video ${i + 1}`}
                    />
                  ) : (
                    <img
                      src={src}
                      alt={`Award and recognition ${i + 1}`}
                      className={cn(
                        "transition-transform duration-500 group-hover:scale-[1.03]",
                        keepOriginalResolution ? "max-w-full h-auto mx-auto object-contain" : "h-full w-full object-cover",
                      )}
                      loading="lazy"
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
