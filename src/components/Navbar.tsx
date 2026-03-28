import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import pssLogo from "@/assets/pss-logo.png";
import mainLogo from "@/assets/logo.png";
import { goToNavLabel } from "@/lib/siteNav";

const navItems = ["About", "Services", "Summer Offers", "Academy", "Portfolio", "Testimonials", "Location", "Book Now"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onNavItem = (item: string) => {
    goToNavLabel(item, {
      pathname: location.pathname,
      navigate,
      onDone: () => setMobileOpen(false),
    });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 py-2 border-b border-primary/15 shadow-md shadow-primary/15 backdrop-blur-md"
            : "bg-transparent py-3 md:py-4"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="shrink-0 focus-visible:outline-none flex items-center gap-2 group" aria-label="PSS Makeup Studio home">
            <div className="relative flex items-center gap-2.5">
              <img src={mainLogo} alt="" className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-contain border border-primary/20 gold-glow transition-transform group-hover:scale-105" />
              <div className="h-6 w-[1px] bg-primary/20" />
              <div className="w-16 sm:w-20 opacity-70 group-hover:opacity-100 transition-opacity">
                <img src={pssLogo} alt="Pearl Bright Branding" className="h-auto w-full object-contain" />
              </div>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => onNavItem("Academy")}
            className="lg:hidden inline-flex items-center gap-1.5 rounded-full border border-primary/45 bg-primary/10 px-4 py-1.5 font-sans-serif text-[10px] uppercase tracking-[0.14em] text-primary transition-all active:scale-95 gold-glow"
          >
            Academy
          </button>
          
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onNavItem(item)}
                className={`font-sans-serif text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                  item === "Academy"
                    ? "rounded-full border border-primary/50 bg-primary/12 px-4 py-2 text-primary gold-glow"
                    : scrolled
                      ? "text-foreground/80 hover:text-primary"
                      : "text-foreground/70 hover:text-primary"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 shrink-0"
          >
            <span className={`w-6 h-px bg-primary transition-all ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
            <span className={`w-6 h-px bg-primary transition-all ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-px bg-primary transition-all ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 glass-strong flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => onNavItem(item)}
                className={`font-display text-2xl ${
                  item === "Academy"
                    ? "rounded-full border border-primary/50 bg-primary/15 px-6 py-2 text-primary gold-glow"
                    : "text-gradient-gold"
                }`}
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
