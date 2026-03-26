import { useLocation, useNavigate } from "react-router-dom";
import pssLogo from "@/assets/pss-logo.png";
import { goToNavLabel } from "@/lib/siteNav";

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/artistry_by_srimathi?igsh=Znlqb3FwaTNqZ2xu",
    icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  { name: "Facebook", href: "#", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { name: "YouTube", href: "#", icon: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
];

const footerLinks = ["About", "Services", "Summer Offers", "Academy", "Portfolio", "Contact"] as const;

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <footer className="py-10 md:py-12 border-t border-border/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <img src={pssLogo} alt="PSS" className="mb-6 h-24 w-24 rounded-full md:h-28 md:w-28" />
          <h3 className="font-display text-xl text-gradient-gold mb-2">PSS Makeup Studio</h3>
          <p className="font-sans-serif text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
            Salon · KR Puram, Bangalore
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target={s.href === "#" ? undefined : "_blank"}
                rel={s.href === "#" ? undefined : "noopener noreferrer"}
                aria-label={s.name}
                className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center hover:border-primary hover:gold-glow transition-all duration-300 group"
              >
                <svg className="w-4 h-4 fill-muted-foreground group-hover:fill-primary transition-colors duration-300" viewBox="0 0 24 24">
                  <path d={s.icon} />
                </svg>
              </a>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
            {footerLinks.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => goToNavLabel(item, { pathname: location.pathname, navigate })}
                className={`font-sans-serif text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${
                  item === "Academy"
                    ? "rounded-full border border-primary/45 bg-primary/10 px-4 py-2 text-primary gold-glow"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <p className="font-sans-serif text-xs text-muted-foreground/50">
            © 2024 PSS Makeup Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
