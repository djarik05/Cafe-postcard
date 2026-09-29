import { motion, useReducedMotion } from 'framer-motion';
import { restaurantData } from '../data/restaurant';

export const Contact = () => {
  const prefersReduced = useReducedMotion();
  const reveal = (delay = 0) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 } as const,
          whileInView: { opacity: 1, y: 0 } as const,
          viewport: { once: true } as const,
          transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  const socials = ['Instagram', 'Facebook'];

  return (
    <section id="contact" className="py-28 md:py-36 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-brand/[0.06] pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-brand/[0.03] pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-brand/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-2xl mx-auto px-5 md:px-10 text-center relative z-10">
        <motion.h2
          {...reveal(0)}
          className="text-4xl md:text-5xl lg:text-6xl font-serif mb-5 leading-tight"
        >
          Stay a little longer.
        </motion.h2>

        <motion.p
          {...reveal(0.1)}
          className="text-secondary font-sans text-base mb-3"
        >
          {restaurantData.name} · Bhubaneswar, Odisha
        </motion.p>

        <motion.p
          {...reveal(0.15)}
          className="text-muted font-sans text-sm leading-relaxed mb-10 max-w-md mx-auto"
        >
          ATM Square, Niladri Vihar, Chandrasekharpur,
          <br />
          Bhubaneswar, Odisha 751021
        </motion.p>

        <motion.div
          {...reveal(0.25)}
          className="flex items-center justify-center gap-3 flex-wrap"
        >
          {socials.map((name) => (
            <a
              key={name}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="glass px-6 py-3 rounded-full text-sm font-sans text-primary/80 hover:text-primary hover:bg-white/[0.1] hover:border-white/[0.2] transition-all duration-300"
            >
              {name}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
