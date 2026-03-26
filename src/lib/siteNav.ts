import type { NavigateFunction } from "react-router-dom";

type GoOpts = {
  pathname: string;
  navigate: NavigateFunction;
  onDone?: () => void;
};

const SECTION_BY_LABEL: Record<string, string> = {
  About: "about",
  Services: "services",
  "Summer Offers": "summer-offers",
  Portfolio: "portfolio",
  Testimonials: "testimonials",
  "Book Now": "book-now",
  Contact: "book-now",
};

/** Navbar / footer: scroll on home, or navigate to `/#section` from other routes. Academy opens `/academy`. */
export function goToNavLabel(label: string, opts: GoOpts): void {
  opts.onDone?.();
  if (label === "Academy") {
    opts.navigate("/academy");
    return;
  }
  const id = SECTION_BY_LABEL[label];
  if (!id) return;
  if (opts.pathname === "/") {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  } else {
    opts.navigate({ pathname: "/", hash: `#${id}` });
  }
}
