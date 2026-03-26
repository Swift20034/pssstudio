import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, HeartHandshake, Scissors, Sparkles, Trophy } from "lucide-react";
import aboutImg from "@/assets/about-studio.jpeg";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,hsl(329_92%_54%/0.03)_0%,transparent_50%)]" />
      <div className="container mx-auto px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -4 }}
            className="about-image-card relative"
          >
            <div className="group relative mx-auto w-full max-w-md overflow-hidden rounded-lg luxury-shadow lg:max-w-lg">
              <img
                src={aboutImg}
                alt="PSS Makeup Studio — team and studio"
                className="h-[380px] w-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-[1.04] sm:h-[420px] lg:h-[460px]"
                loading="lazy"
                width={640}
                height={800}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
              <div className="hero-card-shine" />
            </div>
            {/* Floating decoration */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-primary/20 rounded-lg animate-glow-pulse" />
            <div className="absolute -top-6 -left-6 w-24 h-24 border border-primary/10 rounded-full" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="mb-4 inline-flex items-center gap-2 font-sans-serif text-xs tracking-[0.3em] uppercase text-primary">
              <HeartHandshake className="h-3.5 w-3.5" aria-hidden />
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-display mb-6 leading-tight text-balance">
              <span className="text-gradient-gold">Crafting Beauty</span>
              <br />
              <span className="text-foreground">Since Day One</span>
            </h2>
            <div className="space-y-4 font-body text-lg text-foreground/70 leading-relaxed text-justify hyphens-auto">
              <p>
                PSS Makeup Studio is more than a beauty destination — it's where artistry meets excellence.
                Founded by <span className="text-foreground/90">Srimathi N</span> with a passion for transforming
                beauty into unforgettable experiences, we've become a trusted name in bridal, editorial, and
                high-fashion makeup.
              </p>
              <p>
                We invest in continuous training and premium products so every visit feels elevated—from subtle day looks to full
                bridal transformations.
              </p>
            </div>
            <div className="mt-8 flex w-full max-w-xl justify-between gap-4 sm:gap-8">
              {[
                { num: "500+", label: "Happy Brides", Icon: Sparkles },
                { num: "15+", label: "Services", Icon: Scissors },
                { num: "10+", label: "Years", Icon: Trophy },
              ].map((stat) => (
                <div key={stat.label}>
                  <stat.Icon className="mx-auto mb-2 h-4 w-4 text-primary md:mx-0" aria-hidden />
                  <div className="text-3xl font-display text-gradient-gold">{stat.num}</div>
                  <div className="font-sans-serif text-xs tracking-[0.15em] uppercase text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link
                to="/academy"
                className="inline-flex items-center gap-2 rounded-sm border border-primary/50 bg-primary/12 px-6 py-3 font-sans-serif text-[11px] uppercase tracking-[0.2em] text-primary transition-all duration-300 hover:border-primary hover:bg-primary/18 hover:gold-glow"
              >
                Explore academy
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
