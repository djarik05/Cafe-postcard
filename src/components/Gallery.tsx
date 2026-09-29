import { motion, useReducedMotion } from 'framer-motion';
import { restaurantData } from '../data/restaurant';

export const Gallery = () => {
  const prefersReduced = useReducedMotion();
  const images = restaurantData.gallery;

  const reveal = (delay = 0) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, scale: 0.95 } as const,
          whileInView: { opacity: 1, scale: 1 } as const,
          viewport: { once: true, margin: '-40px' } as const,
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section id="gallery" className="py-28 md:py-36 relative">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <motion.h2
          initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif mb-14"
        >
          See the Postcard
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          {/* Large hero — spans 8 cols, 2 rows */}
          <motion.div
            {...reveal(0)}
            className="md:col-span-8 md:row-span-2 h-[300px] md:h-auto relative rounded-3xl overflow-hidden group cursor-pointer border border-white/[0.05]"
          >
            <img
              src={images[0].src}
              alt={images[0].alt}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0">
              <span className="glass px-5 py-2 rounded-full text-sm font-sans text-primary">
                View →
              </span>
            </div>
          </motion.div>

          {/* Portrait — spans 4 cols, 2 rows */}
          <motion.div
            {...reveal(0.12)}
            className="md:col-span-4 md:row-span-2 h-[350px] md:h-auto relative rounded-3xl overflow-hidden group cursor-pointer border border-white/[0.05]"
          >
            <img
              src={images[1].src}
              alt={images[1].alt}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0">
              <span className="glass px-5 py-2 rounded-full text-sm font-sans text-primary">
                View →
              </span>
            </div>
          </motion.div>

          {/* Landscape left */}
          <motion.div
            {...reveal(0.2)}
            className="md:col-span-5 h-[250px] md:h-[260px] relative rounded-3xl overflow-hidden group cursor-pointer border border-white/[0.05]"
          >
            <img
              src={images[2].src}
              alt={images[2].alt}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0">
              <span className="glass px-5 py-2 rounded-full text-sm font-sans text-primary">
                View →
              </span>
            </div>
          </motion.div>

          {/* Landscape right */}
          <motion.div
            {...reveal(0.28)}
            className="md:col-span-7 h-[250px] md:h-[260px] relative rounded-3xl overflow-hidden group cursor-pointer border border-white/[0.05]"
          >
            <img
              src={images[3].src}
              alt={images[3].alt}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0">
              <span className="glass px-5 py-2 rounded-full text-sm font-sans text-primary">
                View →
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
