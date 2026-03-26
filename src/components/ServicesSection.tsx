import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Brush, Droplets, Gem, Hand, Scissors, Sparkles } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { serviceCategories, type ServiceCategory } from "@/data/servicesCatalog";

function getCategoryItems(category: ServiceCategory): string[] {
  if (category.groups?.length) {
    return category.groups.flatMap((group) => group.items);
  }
  return category.items ?? [];
}

function categoryIcon(categoryId: string) {
  if (categoryId.includes("facial") || categoryId.includes("detan") || categoryId.includes("skin")) return Droplets;
  if (categoryId.includes("hair")) return Scissors;
  if (categoryId.includes("nail")) return Hand;
  if (categoryId.includes("makeup")) return Brush;
  if (categoryId.includes("jewellery") || categoryId.includes("permanent")) return Gem;
  return Sparkles;
}

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const defaultOpen = serviceCategories[0]?.id ?? "facials-premium";

  return (
    <section id="services" className="py-16 md:py-20 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <span className="font-sans-serif text-xs tracking-[0.3em] uppercase text-primary mb-3 block">What We Offer</span>
            <h2 className="text-4xl md:text-5xl font-display mb-4 text-balance">
              <span className="text-gradient-gold">Our Services</span>
            </h2>
          </div>
          <p className="font-body text-sm text-muted-foreground leading-relaxed text-justify hyphens-auto">
            Browse by category and expand groups where listed. Signature treatments are featured in the hero at the top of the site.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              to="/academy"
              className="inline-flex rounded-full border border-primary/45 bg-primary/10 px-5 py-2.5 font-sans-serif text-[11px] uppercase tracking-[0.16em] text-primary transition-all duration-300 hover:border-primary/60 hover:bg-primary/16 hover:gold-glow"
            >
              Academy enrollment open
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <Accordion type="single" collapsible defaultValue={defaultOpen} className="space-y-4">
            {serviceCategories.map((cat) => {
              const allItems = getCategoryItems(cat);
              return (
                <AccordionItem
                  key={cat.id}
                  value={cat.id}
                  className="overflow-hidden rounded-2xl border border-border/45 bg-card/70 luxury-shadow"
                >
                  <AccordionTrigger className="px-5 py-5 text-left hover:no-underline md:px-7 md:py-6">
                    <div className="flex items-start gap-3 md:gap-4">
                      <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary md:h-11 md:w-11">
                        {(() => {
                          const Icon = categoryIcon(cat.id);
                          return <Icon className="h-5 w-5" aria-hidden />;
                        })()}
                      </span>
                      <div>
                        <h3 className="font-display text-2xl text-foreground md:text-3xl">{cat.title}</h3>
                        <p className="mt-1 font-body text-sm text-muted-foreground">
                        {allItems.length} services available
                        </p>
                        {cat.tagline ? (
                          <p className="mt-2 max-w-2xl font-body text-sm italic text-muted-foreground">{cat.tagline}</p>
                        ) : null}
                        {cat.startingFrom != null ? (
                          <span className="mt-3 inline-flex items-center rounded-full border border-primary/35 bg-primary/10 px-3 py-1 font-sans-serif text-[11px] uppercase tracking-[0.12em] text-primary">
                            Starting from ₹{cat.startingFrom.toLocaleString("en-IN")}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5 md:px-7 md:pb-7">
                    {cat.groups?.length ? (
                      <div className="space-y-4">
                        {cat.groups.map((group) => (
                          <div key={group.title}>
                            <p className="mb-2 font-sans-serif text-[11px] uppercase tracking-[0.16em] text-primary">
                              {group.title}
                            </p>
                            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                              {group.items.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-center gap-2 rounded-xl border border-border/45 bg-background/75 px-4 py-3 font-body text-sm text-foreground/90"
                                >
                                  <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary/80" aria-hidden />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {allItems.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 rounded-xl border border-border/45 bg-background/75 px-4 py-3 font-body text-sm text-foreground/90"
                          >
                            <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary/80" aria-hidden />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
