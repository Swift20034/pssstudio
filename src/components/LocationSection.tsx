import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Navigation, Clock, Phone } from "lucide-react";

const LocationSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const address = "1st Floor, Gowri Books Store, Devasandra Main Rd, opp. Jyothi Fashion, Rajarajeshwari Nagar, Devasandra Extension, Krishnarajapuram, Bengaluru, Karnataka 560036";

  return (
    <section id="location" className="py-16 md:py-24 relative overflow-hidden bg-background/50">
      <div className="container mx-auto px-4 md:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="mb-3 inline-flex items-center gap-2 font-sans-serif text-[10px] md:text-xs tracking-[0.3em] uppercase text-primary">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            Visit Our Studio
          </span>
          <h2 className="text-3xl md:text-5xl font-display text-gradient-gold text-balance">Our Location</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 md:space-y-8"
          >
            <div className="glass-strong rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-display text-base md:text-lg text-primary mb-1">Pearl Bright Beauty Zone & Makeup Studio</h4>
                  <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed">
                    {address}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-display text-base md:text-lg text-primary mb-1">Studio Hours</h4>
                  <p className="text-muted-foreground font-body text-sm md:text-base">
                    Tuesday – Sunday: 10:00 AM – 8:00 PM<br />
                    Monday: Closed
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-display text-base md:text-lg text-primary mb-1">Contact</h4>
                  <p className="text-muted-foreground font-body text-sm md:text-base">
                    +91 96863 73707
                  </p>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/dir//Pearl+Bright+Beauty+Zone+%26+Makeup+Studio/@13.0072327,77.6981208,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bae1100b3c4a401:0x41477a20701b6f6!2m2!1d77.6981208!2d13.0072327?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 py-3 px-6 md:py-4 md:px-8 bg-gradient-gold text-primary-foreground font-sans-serif text-[10px] md:text-xs tracking-[0.2em] uppercase rounded-lg hover:scale-[1.02] transition-transform duration-300 gold-glow w-full justify-center"
              >
                <Navigation className="h-3.5 w-3.5" aria-hidden />
                Get Directions
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-[320px] md:h-[450px] rounded-2xl overflow-hidden glass-strong border border-border/30 relative"
          >
            <iframe
              title="PSS Makeup Studio Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.696113945532!2d77.69554595!3d13.0072327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1100b3c4a401%3A0x41477a20701b6f6!2sPearl%20Bright%20Beauty%20Zone%20%26%20Makeup%20Studio!5e0!3m2!1sen!2sin!4v1711614759000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(90%) brightness(95%)" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
