import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MessageCircleHeart, Star } from "lucide-react";
import testimonialVideo from "@/assets/testimonials/WhatsApp Video 2026-03-26 at 11.06.19 AM.mp4";

const testimonials = [
  { name: "Kavya Kavyagowda", role: "Facial Service", rating: 5, text: "I am happy with the facial service 🥰 and the overall experience was great. Good manners and excellent results, thank you so much!" },
  { name: "Kokila KV", role: "Professional Makeup", rating: 5, text: "Really very nice makeup 💄 and definitely worth it 💅. The artistry was exceptional!" },
  { name: "Tanu", role: "Pedicure Experience", rating: 5, text: "I had an amazing experience with my pedicure! The service was truly top-notch — professional, relaxing, and detail-oriented. My feet feel so refreshed!" },
  { name: "Ruksar Rahi", role: "Salon Experience", rating: 5, text: "The service was very good and the salon is very clean. Easy to find and they use branded products, the results are amazing. Worth coming here!" },
  { name: "Chinne Aana", role: "Hydro Facial", rating: 5, text: "I am very happy with the hydro facial results. They use high-quality products and handle customers in a very professional manner. 100% recommended! 🙏🥰" },
  { name: "Vanaja Lakshmi", role: "Legacy Client", rating: 5, text: "Customer from 6 years almost. She has good knowledge in this field and is well experienced. Always gives honest suggestions and very friendly." },
  { name: "Manasa Manu", role: "Beauty Services", rating: 5, text: "One stop for all beauty services. They are very friendly to new customers and I personally recommend visiting PSS. You will definitely get good results ✨" },
  { name: "Pooja HS", role: "Studio Visit", rating: 5, text: "I visited the parlour and had a great service by the staff. I really liked the experience and highly recommend their professional touch 😍" },
  { name: "Chanduanu", role: "Academy Student", rating: 5, text: "I completed my training at this academy. Great teacher and very helpful teaching style. Thank you so much madam! 🥰" },
  { name: "Sudha Amul Raj", role: "Hair Layer Cut", rating: 5, text: "I'm so happy with my hair layer cut! Thank you so much for the amazing transformation. 🥰😍" },
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(43_100%_50%/0.03)_0%,transparent_60%)]" />
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
                <div className="mb-4 flex justify-center gap-1">
                  {[...Array(t.rating)].map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
                <div className="mb-4 font-display text-4xl text-gradient-gold leading-none">"</div>
                <p className="mx-auto mb-6 max-w-2xl hyphens-auto text-justify font-body text-lg md:text-2xl leading-relaxed text-foreground/80">
                  {t.text}
                </p>
                <div className="font-display text-lg text-gradient-gold">{t.name}</div>
                <div className="mt-1 font-sans-serif text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                  {t.role}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-4 md:gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                active === i ? "w-10 bg-primary" : "bg-primary/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
