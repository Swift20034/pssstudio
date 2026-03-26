import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { BadgePercent, Gift, Mail, PhoneCall, Sparkles, Tags } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  alaCarteMakeupRates,
  summerOffersVenue,
  summerPackages,
  summerSpecialAddons,
} from "@/data/summerOffersData";

function formatRupee(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

const SummerOffersSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const telHref = `tel:+91${summerOffersVenue.phone.replace(/\D/g, "")}`;
  const mailHref = `mailto:${summerOffersVenue.email}`;

  return (
    <section
      id="summer-offers"
      className="relative overflow-hidden py-16 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(329_92%_54%/_0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_50%,hsl(330_70%_70%/_0.06),transparent_50%)]" />

      <div className="container relative mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-10 max-w-3xl text-center md:mb-12"
        >
          <span className="mb-3 block font-sans-serif text-xs uppercase tracking-[0.28em] text-primary">
            Limited season
          </span>
          <h2 className="font-display text-4xl text-balance text-foreground md:text-5xl lg:text-6xl">
            <span className="text-gradient-gold">Summer Offers</span>
          </h2>
          <p className="mt-3 font-body text-sm text-muted-foreground md:text-base">
            <span className="font-medium text-foreground/90">{summerOffersVenue.name}</span>
            <span className="text-muted-foreground"> · {summerOffersVenue.location}</span>
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm">
            <a
              href={telHref}
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 font-sans-serif text-xs uppercase tracking-wider text-primary transition-colors hover:border-primary/60 hover:bg-primary/15"
            >
              <PhoneCall className="h-3.5 w-3.5" aria-hidden />
              {summerOffersVenue.phone}
            </a>
            <a
              href={mailHref}
              className="inline-flex items-center gap-2 rounded-full border border-border/50 px-4 py-2 font-body text-xs text-muted-foreground transition-colors hover:border-primary/35 hover:text-foreground"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden />
              {summerOffersVenue.email}
            </a>
            <Link
              to="/academy"
              className="inline-flex items-center gap-2 rounded-full border border-primary/45 bg-gradient-gold px-4 py-2 font-sans-serif text-xs uppercase tracking-wider text-primary-foreground transition-transform duration-300 hover:scale-[1.02]"
            >
              <BadgePercent className="h-3.5 w-3.5" aria-hidden />
              Join academy
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          <Tabs defaultValue="packages" className="w-full summer-offer-container">
            <TabsList
              className={cn(
                "mb-8 flex h-auto w-full flex-col gap-2 rounded-xl border border-border/40 bg-muted/25 p-2 sm:flex-row sm:flex-wrap sm:justify-center md:p-3 summer-offer-container",
              )}
            >
              <TabsTrigger
                value="packages"
                className="font-sans-serif text-[11px] uppercase tracking-wider data-[state=active]:border data-[state=active]:border-primary/40 data-[state=active]:bg-primary/12 data-[state=active]:text-primary sm:text-xs"
              >
                <Gift className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                Summer packages
              </TabsTrigger>
              <TabsTrigger
                value="rates"
                className="font-sans-serif text-[11px] uppercase tracking-wider data-[state=active]:border data-[state=active]:border-primary/40 data-[state=active]:bg-primary/12 data-[state=active]:text-primary sm:text-xs"
              >
                <Tags className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                Makeup &amp; styling rates
              </TabsTrigger>
            </TabsList>

            <TabsContent value="packages" className="focus-visible:outline-none">
              <p className="mb-6 text-center font-sans-serif text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Summer special bundles
              </p>
              <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {summerPackages.map((pkg, i) => (
                  <motion.li
                    key={pkg.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.04 * i, duration: 0.35 }}
                    className="h-full min-h-0 list-none"
                  >
                    {/* Inner card handles hover — Framer sets inline transform on motion.li, which would override CSS :hover on the same node */}
                    <div className="summer-offer-container flex h-full flex-col rounded-2xl border border-primary/25 bg-card/40 p-5 luxury-shadow backdrop-blur-sm">
                      <div className="mb-3 flex items-start justify-between gap-2 border-b border-border/30 pb-3">
                        <span className="inline-flex items-center gap-2 font-display text-lg text-gradient-gold">
                          <Sparkles className="h-4 w-4 text-primary" aria-hidden />
                          {pkg.title}
                        </span>
                        <span className="shrink-0 font-display text-xl text-foreground">
                          {formatRupee(pkg.price)}
                        </span>
                      </div>
                      <ul className="flex flex-1 flex-col gap-2">
                        {pkg.items.map((line) => (
                          <li
                            key={line}
                            className="flex gap-2 font-body text-sm text-foreground/85 before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rotate-45 before:bg-primary before:content-['']"
                          >
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.li>
                ))}
              </ul>

              <div className="summer-offer-container mt-8 rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8">
                <h3 className="mb-4 text-center font-display text-lg text-gradient-gold md:text-xl">
                  <Gift className="mr-2 inline-block h-5 w-5 align-text-bottom text-primary" aria-hidden />
                  Special add-ons
                </h3>
                <ul className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row sm:justify-center sm:gap-8">
                  {summerSpecialAddons.map((s) => (
                    <li
                      key={s.name}
                      className="summer-offer-container flex items-center justify-between gap-4 rounded-xl border border-border/40 bg-background/50 px-4 py-3 sm:flex-1 sm:flex-col sm:text-center"
                    >
                      <span className="font-body text-sm text-foreground">{s.name}</span>
                      <span className="font-display text-primary">{formatRupee(s.price)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="rates" className="focus-visible:outline-none">
              <div className="summer-offer-container mx-auto max-w-3xl rounded-2xl border border-primary/25 bg-gradient-to-b from-background/80 to-muted/30 p-6 md:p-10 luxury-shadow">
                <p className="mb-6 text-center font-sans-serif text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  À la carte makeup &amp; styling
                </p>
                <ul className="divide-y divide-border/40">
                  {alaCarteMakeupRates.map((row, i) => (
                    <motion.li
                      key={row.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.03 * i, duration: 0.3 }}
                      className="list-none"
                    >
                      <div
                        className={cn(
                          "summer-offer-container flex flex-wrap items-center justify-between gap-3 rounded-xl py-4",
                          i === 0 && "pt-0",
                        )}
                      >
                        <span className="flex max-w-[75%] items-start gap-3 font-body text-sm text-foreground/90 md:text-base">
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-primary shadow-[0_0_8px_hsl(329_92%_54%/_0.45)]"
                            aria-hidden
                          />
                          {row.label}
                        </span>
                        <span className="font-display text-lg text-gradient-gold tabular-nums md:text-xl">
                          {formatRupee(row.price)}
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default SummerOffersSection;
