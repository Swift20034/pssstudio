import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { BadgeIndianRupee, BookOpenCheck, CalendarClock, GraduationCap, Mail, PhoneCall } from "lucide-react";
import academyImg from "@/assets/about-studio.jpeg";
import { professionalMakeupHairArtistCourse } from "@/data/academyCourse";
import { summerOffersVenue } from "@/data/summerOffersData";

function formatRupee(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

const AcademySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const course = professionalMakeupHairArtistCourse;
  const telHref = `tel:+91${summerOffersVenue.phone.replace(/\D/g, "")}`;
  const mailHref = `mailto:${summerOffersVenue.email}`;

  return (
    <section id="academy" className="relative overflow-hidden py-16 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,hsl(329_92%_54%/_0.05),transparent_60%)]" />
      <div className="container relative mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center md:mb-12"
        >
          <span className="mb-3 block font-sans-serif text-xs uppercase tracking-[0.28em] text-primary">
            Program details
          </span>
          <p className="mx-auto max-w-2xl font-body text-sm text-muted-foreground md:text-base">
            {summerOffersVenue.name} · {summerOffersVenue.location}
          </p>
        </motion.div>

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="space-y-6"
          >
            <div className="flex flex-wrap gap-4">
              <div className="rounded-xl border border-primary/35 bg-primary/10 px-5 py-4">
                <p className="inline-flex items-center gap-1.5 font-sans-serif text-[10px] uppercase tracking-widest text-primary/90">
                  <BadgeIndianRupee className="h-3.5 w-3.5" aria-hidden />
                  Course fee
                </p>
                <p className="font-display text-2xl text-foreground md:text-3xl">{formatRupee(course.fee)}</p>
              </div>
              <div className="rounded-xl border border-border/50 bg-background/60 px-5 py-4">
                <p className="inline-flex items-center gap-1.5 font-sans-serif text-[10px] uppercase tracking-widest text-muted-foreground">
                  <CalendarClock className="h-3.5 w-3.5" aria-hidden />
                  Duration
                </p>
                <p className="font-display text-2xl text-foreground md:text-3xl">{course.durationLabel}</p>
              </div>
            </div>

            <div className="rounded-xl border border-border/40 bg-muted/20 p-5 md:p-6">
              <p className="inline-flex items-center gap-1.5 font-sans-serif text-[10px] uppercase tracking-widest text-primary">
                <BookOpenCheck className="h-3.5 w-3.5" aria-hidden />
                Class schedule
              </p>
              <p className="mt-2 font-body text-sm text-foreground/90 md:text-base">{course.schedule.regular}</p>
              <p className="mt-1 font-body text-sm text-muted-foreground">{course.schedule.flexible}</p>
            </div>

            <p className="text-center font-sans-serif text-xs uppercase tracking-[0.2em] text-primary md:text-left">
              {course.cta}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to={{ pathname: "/", hash: "#book-now" }}
                className="academy-cta academy-cta-primary inline-flex items-center justify-center gap-2 rounded-sm bg-gradient-gold px-8 py-3.5 text-center font-sans-serif text-xs uppercase tracking-[0.2em] text-primary-foreground"
              >
                <GraduationCap className="h-3.5 w-3.5" aria-hidden />
                Enquire &amp; enrol
              </Link>
              <a
                href={telHref}
                className="academy-cta academy-cta-outline inline-flex items-center justify-center gap-2 rounded-sm border border-primary/40 px-8 py-3.5 text-center font-sans-serif text-xs uppercase tracking-[0.2em] text-primary"
              >
                <PhoneCall className="h-3.5 w-3.5" aria-hidden />
                Call {summerOffersVenue.phone}
              </a>
              <a
                href={mailHref}
                className="academy-cta academy-cta-outline academy-cta-email inline-flex items-center justify-center gap-2 rounded-sm border border-border/50 px-8 py-3.5 text-center font-body text-xs text-muted-foreground"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden />
                Email
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="flex flex-col gap-8"
          >
            <div className="overflow-hidden rounded-xl border border-border/30 luxury-shadow lg:hidden">
              <img
                src={academyImg}
                alt=""
                className="h-56 w-full object-cover"
                loading="lazy"
                width={800}
                height={480}
              />
            </div>

            <div>
              <h3 className="mb-4 font-display text-xl text-gradient-gold md:text-2xl">Course includes</h3>
              <ul className="grid gap-2">
                {course.includes.map((line, i) => (
                  <li
                    key={line}
                    className="flex gap-3 rounded-lg border border-border/25 bg-background/40 px-3 py-2.5 font-body text-sm text-foreground/90"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-center text-xs font-semibold text-primary">
                      {i + 1}
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AcademySection;
