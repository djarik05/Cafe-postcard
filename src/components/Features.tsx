import { motion, useReducedMotion } from 'framer-motion';
import { restaurantData } from '../data/restaurant';
import { Utensils, Heart, Coffee } from 'lucide-react';

const icons = [Utensils, Heart, Coffee] as const;

export const Features = () => {
  const prefersReduced = useReducedMotion();

  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      {/* Subtle surface tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-surfaceLight/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
        {/* Heading */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4 leading-tight">
            Little things.
            <br />
            Great memories.
          </h2>
          <p className="text-secondary font-sans text-base max-w-md mx-auto">
            The details that make every visit memorable.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {restaurantData.features.map((feature, idx) => {
            const Icon = icons[idx];
            return (
              <motion.div
                key={feature.title}
                initial={prefersReduced ? {} : { opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                whileHover={prefersReduced ? {} : { y: -10 }}
                className="glass-card p-9 md:p-10 rounded-3xl group flex flex-col gap-7 transition-all duration-500 hover:border-white/[0.22]"
              >
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-accent transition-transform duration-500 group-hover:scale-110">
                  <Icon size={22} strokeWidth={1.5} />
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="text-base font-sans font-semibold tracking-wider uppercase">
                    {feature.title}
                  </h3>
                  <p className="text-secondary text-sm font-sans leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-auto pt-6 h-px w-full bg-gradient-to-r from-white/15 to-transparent transition-all duration-500 group-hover:from-white/30" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
