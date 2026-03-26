import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MessageCircleHeart, Star } from "lucide-react";
import testimonialVideo from "@/assets/testimonials/WhatsApp Video 2026-03-26 at 11.06.19 AM.mp4";

const testimonials = [
  { name: "Priya Sharma", role: "Bride", text: "PSS made my wedding day absolutely magical. The attention to detail was beyond anything I imagined. Every guest complimented my look!" },
  { name: "Ananya Reddy", role: "Makeup Artist", text: "PSS turned my passion into a profession. The hands-on training and mentorship were world-class. I now run my own studio!" },
  { name: "Meera Kapoor", role: "Celebrity Client", text: "I trust PSS for every red carpet event. Their artistry is unmatched — always elegant, always flawless, always making me feel like a queen." },
  { name: "Kavya Nair", role: "Bride", text: "From the trial to the big day, the experience was luxury from start to finish. My bridal look was absolutely breathtaking." },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(329_92%_54%/0.03)_0%,transparent_60%)]" />
      <div className="container mx-auto max-w-6xl px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <span className="mb-3 inline-flex items-center gap-2 font-sans-serif text-xs tracking-[0.3em] uppercase text-primary">
            <MessageCircleHeart className="h-3.5 w-3.5" aria-hidden />
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-display text-gradient-gold text-balance">Words of Love</h2>
        </motion.div>

        <div className="mb-12 grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mx-auto w-full max-w-[220px] overflow-hidden rounded-2xl border border-border/30 luxury-shadow sm:max-w-xs"
          >
            <video
              className="block h-auto w-full bg-background"
              controls
              playsInline
              preload="metadata"
              aria-label="Client testimonial video"
            >
              <source src={testimonialVideo} type="video/mp4" />
            </video>
          </motion.div>

          <div className="relative min-h-[280px] md:min-h-[320px]">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  opacity: active === i ? 1 : 0,
                  scale: active === i ? 1 : 0.95,
                  y: active === i ? 0 : 20,
                }}
                transition={{ duration: 0.6 }}
                className={`glass-strong rounded-2xl p-8 md:p-10 text-center gold-glow ${
                  active === i ? "relative" : "pointer-events-none absolute inset-0"
                }`}
              >
                <div className="mb-6 font-display text-4xl text-gradient-gold">"</div>
                <p className="mx-auto mb-8 max-w-2xl hyphens-auto text-justify font-body text-xl leading-relaxed text-foreground/80 md:text-2xl">
                  {t.text}
                </p>
                <div className="font-display text-lg text-gradient-gold">{t.name}</div>
                <div className="mt-1 inline-flex items-center gap-1.5 font-sans-serif text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <Star className="h-3.5 w-3.5 text-primary/80" aria-hidden />
                  {t.role}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                active === i ? "w-8 bg-primary" : "bg-primary/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
