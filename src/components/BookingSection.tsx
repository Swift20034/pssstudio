import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarPlus2, GraduationCap, SendHorizontal } from "lucide-react";
import { bookingServiceGroups } from "@/data/servicesCatalog";

const WHATSAPP_NUMBER = "919686373707";

const BookingSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [focused, setFocused] = useState<string | null>(null);

  const fields = [
    { id: "name", label: "Full Name", type: "text" as const },
    { id: "email", label: "Email Address", type: "email" as const },
    { id: "phone", label: "Phone Number", type: "tel" as const },
    {
      id: "service",
      label: "Service",
      type: "select" as const,
      optionGroups: bookingServiceGroups,
    },
    { id: "date", label: "Preferred Date", type: "date" as const },
    { id: "message", label: "Special Requests", type: "textarea" as const },
  ];
  const [formData, setFormData] = useState<Record<string, string>>({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });

  const buildBookingWhatsappText = () => {
    const lines = [
      "Hi PSS Makeup Studio, I would like to book an appointment.",
      "",
      "Booking Request Details:",
      `Full Name: ${formData.name || "-"}`,
      `Email Address: ${formData.email || "-"}`,
      `Phone Number: ${formData.phone || "-"}`,
      `Service: ${formData.service || "-"}`,
      `Preferred Date: ${formData.date || "-"}`,
      `Special Requests: ${formData.message || "-"}`,
    ];
    return lines.join("\n");
  };

  return (
    <section id="book-now" className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(329_92%_54%/0.04)_0%,transparent_60%)]" />
      <div className="container mx-auto px-6 max-w-2xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6 flex justify-center"
        >
          <Link
            to="/academy"
            className="inline-flex items-center gap-2 rounded-full border border-primary/45 bg-primary/10 px-6 py-2.5 font-sans-serif text-[11px] uppercase tracking-[0.18em] text-primary transition-all duration-300 hover:border-primary/60 hover:bg-primary/15 hover:gold-glow"
          >
            <GraduationCap className="h-3.5 w-3.5" aria-hidden />
            Explore academy programs
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="mb-3 inline-flex items-center gap-2 font-sans-serif text-xs tracking-[0.3em] uppercase text-primary">
            <CalendarPlus2 className="h-3.5 w-3.5" aria-hidden />
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-display text-gradient-gold text-balance">Book Your Session</h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-strong rounded-2xl p-8 md:p-12 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            const bookingWaHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              buildBookingWhatsappText(),
            )}`;
            window.open(bookingWaHref, "_blank", "noopener,noreferrer");
          }}
        >
          {fields.map((field) => (
            <div key={field.id} className="relative">
              <label
                className={`absolute left-4 transition-all duration-300 font-sans-serif text-xs tracking-wider ${
                  focused === field.id
                    ? "-top-2 text-primary text-[10px]"
                    : "top-4 text-muted-foreground"
                }`}
              >
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  value={formData[field.id]}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [field.id]: e.target.value,
                    }))
                  }
                  onFocus={() => setFocused(field.id)}
                  onBlur={() => !formData[field.id] && setFocused(null)}
                  className="w-full bg-input/50 border border-border/50 rounded-lg px-4 pt-6 pb-3 text-foreground font-body focus:border-primary/50 focus:gold-glow outline-none transition-all duration-300 resize-none h-28"
                />
              ) : field.type === "select" ? (
                <select
                  value={formData[field.id]}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [field.id]: e.target.value,
                    }))
                  }
                  onFocus={() => setFocused(field.id)}
                  onBlur={() => !formData[field.id] && setFocused(null)}
                  className="w-full bg-input/50 border border-border/50 rounded-lg px-4 pt-6 pb-3 text-foreground font-body focus:border-primary/50 focus:gold-glow outline-none transition-all duration-300 appearance-none"
                >
                  <option value=""></option>
                  {"optionGroups" in field && field.optionGroups
                    ? field.optionGroups.map((group) => (
                        <optgroup key={group.label} label={group.label}>
                          {group.options.map((o) => (
                            <option key={o} value={o} className="bg-card">
                              {o}
                            </option>
                          ))}
                        </optgroup>
                      ))
                    : null}
                </select>
              ) : (
                <input
                  type={field.type}
                  value={formData[field.id]}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [field.id]: e.target.value,
                    }))
                  }
                  onFocus={() => setFocused(field.id)}
                  onBlur={() => !formData[field.id] && setFocused(null)}
                  className="w-full bg-input/50 border border-border/50 rounded-lg px-4 pt-6 pb-3 text-foreground font-body focus:border-primary/50 focus:gold-glow outline-none transition-all duration-300"
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 py-4 bg-gradient-gold text-primary-foreground font-sans-serif text-xs tracking-[0.2em] uppercase rounded-lg hover:scale-[1.02] transition-transform duration-300 gold-glow"
          >
            <SendHorizontal className="h-3.5 w-3.5" aria-hidden />
            Send Booking Request
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default BookingSection;
