import { motion, useReducedMotion } from 'framer-motion';
import { restaurantData } from '../data/restaurant';

export const Footer = () => {
  const prefersReduced = useReducedMotion();

  return (
    <footer className="relative bg-[#040F06] pt-28 pb-10 overflow-hidden border-t border-white/[0.04]">
      {/* Animated top line */}
      <motion.div
        initial={prefersReduced ? {} : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brandLight/50 to-transparent origin-center"
      />

      <div className="max-w-7xl mx-auto px-5 md:px-10 flex flex-col items-center text-center">
        {/* Large name */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-14"
        >
          <h2 className="text-5xl md:text-7xl lg:text-[9rem] font-serif tracking-tight leading-none text-primary/80 mb-5">
            Cafe Postcard
          </h2>
          <p className="text-lg md:text-xl font-serif text-secondary italic">
            Food. Coffee. Good company.
          </p>
        </motion.div>

        {/* Info grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20 w-full mb-14 border-t border-white/[0.04] pt-14">
          <div className="flex flex-col gap-3 items-center md:items-start text-sm font-sans text-secondary">
            <strong className="text-primary/80 text-[10px] tracking-[0.2em] uppercase mb-1">
              Visit Us
            </strong>
            <p className="leading-relaxed text-center md:text-left">
              ATM Square, Niladri Vihar,
              <br />
              Chandrasekharpur, Bhubaneswar,
              <br />
              Odisha 751021
            </p>
          </div>

          <div className="flex flex-col gap-3 items-center text-sm font-sans text-secondary">
            <strong className="text-primary/80 text-[10px] tracking-[0.2em] uppercase mb-1">
              Hours
            </strong>
            <p>Everyday</p>
            <p>{restaurantData.opening} onwards</p>
          </div>

          <div className="flex flex-col gap-3 items-center md:items-end text-sm font-sans text-secondary">
            <strong className="text-primary/80 text-[10px] tracking-[0.2em] uppercase mb-1">
              Connect
            </strong>
            {['Instagram', 'Facebook', 'Contact Us'].map((label) => (
              <a
                key={label}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="hover:text-primary transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/[0.04] text-[11px] font-sans text-muted/50 gap-2">
          <p>© {new Date().getFullYear()} Cafe Postcard. All rights reserved.</p>
          <p>Bhubaneswar, Odisha</p>
        </div>
      </div>
    </footer>
  );
};
