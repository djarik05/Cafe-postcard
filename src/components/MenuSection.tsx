import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { restaurantData } from '../data/restaurant';
import { Button } from './ui/Button';
import { ArrowRight } from 'lucide-react';

const categories = ['All', 'Drinks', 'Food', 'Desserts'] as const;

export const MenuSection = () => {
  const [active, setActive] = useState<string>('All');
  const prefersReduced = useReducedMotion();

  const filtered =
    active === 'All'
      ? restaurantData.menu
      : restaurantData.menu.filter((i) => i.category === active);

  return (
    <section id="menu" className="py-28 md:py-36 relative">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.h2
            initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif"
          >
            The Postcard Menu
          </motion.h2>

          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex gap-2 overflow-x-auto scrollbar-hide pb-1"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-sans whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  active === cat
                    ? 'bg-primary text-background shadow-lg shadow-black/20'
                    : 'glass text-secondary hover:text-primary hover:bg-white/[0.08]'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => (
              <motion.article
                key={item.name}
                layout
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="group cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-5 border border-white/[0.06]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Category badge */}
                  <span className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-[11px] font-sans text-primary/90 tracking-wide">
                    {item.category}
                  </span>
                  {/* Bottom gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Text */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-serif mb-1.5">{item.name}</h3>
                    <p className="text-secondary text-sm font-sans leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="shrink-0 mt-1.5 text-accent opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  />
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <Button variant="secondary" withArrow>
            View Full Menu
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
