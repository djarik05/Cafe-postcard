import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/Button';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Menu', href: '#menu' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  return (
    <>
      {/* ───────── Desktop / tablet nav ───────── */}
      <motion.header
        initial={prefersReduced ? {} : { y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
            className="text-xl font-serif tracking-wide text-primary hover:opacity-80 transition-opacity z-10"
          >
            Cafe Postcard
          </a>

          {/* Center pill — hidden on mobile */}
          <nav
            className={`hidden md:flex items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-500 ${
              scrolled
                ? 'bg-white/[0.08] border border-white/[0.1] shadow-lg shadow-black/20 backdrop-blur-2xl'
                : 'bg-white/[0.04] border border-white/[0.06] backdrop-blur-xl'
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="px-4 py-2 text-[13px] font-sans text-primary/70 hover:text-primary transition-colors duration-200 rounded-full hover:bg-white/[0.06]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right CTA — hidden on mobile */}
          <div className="hidden md:block z-10">
            <Button
              onClick={() => scrollTo('#reservation')}
              className="text-xs px-5 py-2.5"
            >
              Reserve Table
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 text-primary hover:opacity-70 transition-opacity"
            aria-label="Open menu"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </motion.header>

      {/* ───────── Mobile full-screen overlay ───────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] bg-background/[0.97] backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-5 p-2 text-primary"
              aria-label="Close menu"
            >
              <X size={28} strokeWidth={1.5} />
            </button>

            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, type: 'spring', stiffness: 300, damping: 24 }}
                  className="text-3xl font-serif text-primary tracking-wide"
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.div
                initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 24 }}
                className="mt-8"
              >
                <Button onClick={() => scrollTo('#reservation')}>
                  Reserve Table
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
