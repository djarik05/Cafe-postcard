import { motion, useReducedMotion } from 'framer-motion';
import { restaurantData } from '../data/restaurant';

export const Intro = () => {
  const prefersReduced = useReducedMotion();
  const reveal = (delay = 0) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 40 } as const,
          whileInView: { opacity: 1, y: 0 } as const,
          viewport: { once: true, margin: '-80px' } as const,
          transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section id="about" className="py-28 md:py-36 relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">
        {/* Text */}
        <div className="md:col-span-5 flex flex-col gap-7">
          <motion.div {...reveal(0)} className="flex items-center gap-3">
            <span className="block w-8 h-px bg-primary/25" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted font-sans">
              Our Story
            </span>
          </motion.div>

          <motion.h2
            {...reveal(0.1)}
            className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1]"
          >
            A place worth
            <br />
            staying for.
          </motion.h2>

          <motion.p
            {...reveal(0.2)}
            className="text-base md:text-lg text-secondary font-sans leading-relaxed"
          >
            {restaurantData.story}
          </motion.p>

          <motion.div {...reveal(0.3)} className="flex items-center gap-2 pt-2">
            <span className="block w-1.5 h-1.5 rounded-full bg-accent/50" />
            <span className="block w-1.5 h-1.5 rounded-full bg-accent/30" />
            <span className="block w-1.5 h-1.5 rounded-full bg-accent/15" />
          </motion.div>
        </div>

        {/* Image */}
        <div className="md:col-span-7 relative">
          <motion.div
            {...reveal(0.15)}
            className="relative h-[450px] md:h-[600px] w-full rounded-3xl overflow-hidden border border-white/[0.06]"
          >
            <motion.img
              initial={prefersReduced ? {} : { scale: 1.12 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: 'easeOut' }}
              src={restaurantData.gallery[1].src}
              alt="Cafe Postcard – coffee and conversation"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Overlapping glass quote */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block absolute -bottom-8 -left-6 glass-card rounded-2xl p-7 max-w-xs"
          >
            <div className="absolute top-3 left-4 text-4xl font-serif text-accent/20 leading-none select-none">"</div>
            <p className="text-sm font-sans text-primary/90 leading-relaxed pl-4 relative z-10">
              We believe the best memories are made over great food and unhurried
              conversations.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
