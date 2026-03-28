import { useLocation, useNavigate } from "react-router-dom";
import pssLogo from "@/assets/pss-logo.png";
import { goToNavLabel } from "@/lib/siteNav";

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/artistry_by_srimathi?igsh=Znlqb3FwaTNqZ2xu",
    icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/919686373707",
    icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.445L.057 24l6.305-1.653a11.884 11.884 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z",
  },
  {
    name: "Mail",
    href: "mailto:Srimathin321@gmail.com",
    icon: "M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.415 5.26a2 2 0 01-2.17 0L1.5 8.67zm15-4.5H7.5a3 3 0 00-3 3v.67l10.5 6.562 10.5-6.562V7.17a3 3 0 00-3-3z",
  },
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
          <p className="font-sans-serif text-[10px] tracking-[0.15em] uppercase text-muted-foreground/80 mb-6 max-w-sm mx-auto leading-relaxed">
            1st Floor, Gowri Books Store, Devasandra Main Rd, <br />
            KR Puram, Bangalore - 560036
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
