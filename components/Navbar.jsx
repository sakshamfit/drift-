"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Search, ShoppingBag, Menu, X } from "lucide-react";

const heroLinks = [
  { label: "Home", href: "#home", active: true },
  { label: "Shop", href: "#shop" },
  { label: "Collections", href: "#collections" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const shopLinks = [
  { label: "HOME", href: "#home" },
  { label: "SHOP", href: "#shop", active: true },
  { label: "COLLECTIONS", href: "#collections" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

function LogoMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2 L13.8 9.2 21 11 13.8 12.8 12 20 10.2 12.8 3 11 10.2 9.2 Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MobileMenu({ open, onClose, links, titleCase }) {
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  // Rendered in a portal so the fixed overlay isn't affected by transformed
  // GSAP ancestors (hero content parallax, etc.).
  return createPortal(
    <div className="fixed inset-0 z-[90] lg:hidden" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-ink/25 backdrop-blur-sm"
        style={{ animation: "menu-fade-in .25s ease both" }}
        onClick={onClose}
      />
      <div
        className="absolute inset-x-0 top-0 rounded-b-[2rem] bg-offwhite px-6 pb-8 pt-4 shadow-neu-lg"
        style={{ animation: "menu-panel-in .3s ease both" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-ink">
            <LogoMark />
            <span className="text-sm font-semibold tracking-[0.25em]">DRIFT</span>
          </div>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow-neu transition-transform hover:scale-105"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        <ul className="mt-6 flex flex-col">
          {links.map((link, i) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={onClose}
                className={`flex items-center justify-between border-b border-black/5 py-4 font-semibold text-ink/80 transition-colors hover:text-ink ${
                  titleCase ? "text-2xl tracking-tight" : "text-lg tracking-[0.2em]"
                } ${link.active ? "text-ink" : ""}`}
                style={{ animation: `menu-item-in .35s ease both`, animationDelay: `${0.05 + i * 0.05}s` }}
              >
                {link.label}
                {link.active && <span className="h-1.5 w-1.5 rounded-full bg-ink" />}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body
  );
}

export default function Navbar({ variant = "hero", cartCount = 2 }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Hero shows its inline links from lg up; the shop navbar from md up.
  const menuToggleVisibleClass = variant === "shop" ? "md:hidden" : "lg:hidden";

  if (variant === "shop") {
    return (
      <>
        <nav className="flex items-center justify-between px-5 py-5 md:px-10 md:py-6">
          <span className="font-serif text-2xl font-semibold tracking-tight text-ink lowercase">
            drift.
          </span>

          <ul className="hidden items-center gap-9 text-sm font-medium tracking-wide text-ink/70 md:flex">
            {shopLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={
                    link.active
                      ? "text-ink underline decoration-2 underline-offset-8"
                      : "transition-colors hover:text-ink"
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full bg-black/[0.04] px-4 py-2.5 text-sm text-ink/50 shadow-neu-inset sm:flex">
              <span>Search products...</span>
              <Search size={15} className="text-ink/40" />
            </div>
            <button
              aria-label="Cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition-transform hover:scale-105"
            >
              <ShoppingBag size={20} strokeWidth={1.75} />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            </button>
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setMenuOpen(true)}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-ink transition-transform hover:scale-105 ${menuToggleVisibleClass}`}
            >
              <Menu size={20} strokeWidth={1.75} />
            </button>
          </div>
        </nav>

        <MobileMenu
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          links={shopLinks}
          titleCase={false}
        />
      </>
    );
  }

  return (
    <>
      <nav className="flex items-center justify-between px-5 py-5 md:px-10 md:py-6">
        <div className="flex items-center gap-2 text-ink">
          <LogoMark />
          <span className="text-sm font-semibold tracking-[0.25em]">DRIFT</span>
        </div>

        <ul className="hidden items-center gap-8 text-sm font-medium text-ink/80 lg:flex">
          {heroLinks.map((link) => (
            <li key={link.label} className="relative flex flex-col items-center gap-1.5">
              <a
                href={link.href}
                className={link.active ? "text-ink" : "transition-colors hover:text-ink"}
              >
                {link.label}
              </a>
              {link.active && <span className="h-1 w-1 rounded-full bg-ink" />}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 rounded-full bg-white/70 p-1.5 shadow-neu backdrop-blur-md">
          <button
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink/80 transition-colors hover:bg-black/[0.04]"
          >
            <Search size={17} strokeWidth={1.75} />
          </button>
          <button
            aria-label="Cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-ink/80 transition-colors hover:bg-black/[0.04]"
          >
            <ShoppingBag size={17} strokeWidth={1.75} />
            <span className="absolute right-0.5 top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-ink text-[9px] font-semibold text-white">
              {cartCount}
            </span>
          </button>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setMenuOpen(true)}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-ink/80 transition-colors hover:bg-black/[0.04] ${menuToggleVisibleClass}`}
          >
            <Menu size={17} strokeWidth={1.75} />
          </button>
        </div>
      </nav>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={heroLinks}
        titleCase={true}
      />
    </>
  );
}
