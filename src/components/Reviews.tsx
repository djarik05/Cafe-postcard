import { motion, useReducedMotion } from 'framer-motion';
import { restaurantData } from '../data/restaurant';
import { Star } from 'lucide-react';

export const Reviews = () => {
  const prefersReduced = useReducedMotion();
  const reveal = (delay = 0) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 30 } as const,
          whileInView: { opacity: 1, y: 0 } as const,
          viewport: { once: true, margin: '-60px' } as const,
          transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section id="reviews" className="py-28 md:py-36 relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute -left-40 top-1/3 w-[500px] h-[500px] bg-brand/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <motion.h2
            {...reveal(0)}
            className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight"
          >
            What people
            <br />
            are saying
          </motion.h2>

          <motion.div
            {...reveal(0.15)}
            className="glass-card flex items-center gap-4 px-6 py-4 rounded-2xl"
          >
            <span className="text-3xl font-serif text-accent leading-none">
              {restaurantData.rating.toFixed(1)}
            </span>
            <div className="flex flex-col gap-1">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                ))}
                <Star size={12} className="text-yellow-400/40" />
              </div>
              <span className="text-[11px] font-sans text-secondary">
                Based on {restaurantData.reviewsCount} reviews
              </span>
            </div>
          </motion.div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {restaurantData.reviews.map((review, idx) => (
            <motion.div
              key={idx}
              {...reveal(0.1 + idx * 0.12)}
              className="glass-card p-9 md:p-10 rounded-3xl flex flex-col justify-between min-h-[220px] relative"
            >
              {/* Decorative quote */}
              <span className="absolute top-5 left-6 text-6xl font-serif text-accent/[0.08] leading-none select-none pointer-events-none">
                "
              </span>

              <p className="text-lg md:text-xl font-serif italic leading-relaxed text-primary/90 mb-8 relative z-10">
                "{review.text}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-[11px] text-secondary/70 font-sans">
                  C
                </div>
                <span className="text-sm font-sans text-muted">{review.author}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
