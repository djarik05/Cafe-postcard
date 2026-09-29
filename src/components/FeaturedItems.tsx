import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { restaurantData } from '../data/restaurant';

export const FeaturedItems = () => {
  const prefersReduced = useReducedMotion();
  const tiramisuRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: tiramisuRef,
    offset: ['start end', 'end start'],
  });
  const tiramisuImgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  const tiramisu = restaurantData.menu.find((m) => m.name === 'Tiramisu Latte');
  const ravioli = restaurantData.menu.find((m) => m.name === 'Ravioli');

  const reveal = (delay = 0) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 30 } as const,
          whileInView: { opacity: 1, y: 0 } as const,
          viewport: { once: true, margin: '-80px' } as const,
          transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section className="py-16 flex flex-col gap-28 md:gap-36 overflow-hidden">
      {/* ══════════ TIRAMISU LATTE ══════════ */}
      <div ref={tiramisuRef} className="max-w-7xl mx-auto px-5 md:px-10 w-full">
        <div className="relative rounded-[2rem] overflow-hidden border border-white/[0.05] h-[65vh] md:h-[80vh] flex items-center">
          {/* Background image with parallax */}
          <motion.div
            className="absolute inset-0 w-full h-[120%]"
            style={prefersReduced ? {} : { y: tiramisuImgY }}
          >
            <img
              src={tiramisu?.image}
              alt="Tiramisu Latte"
              className="w-full h-full object-cover opacity-60"
              loading="lazy"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-transparent" />

          {/* Content */}
          <div className="relative z-10 p-8 md:p-16 lg:p-20 max-w-lg">
            <motion.span
              {...reveal(0)}
              className="text-[11px] font-sans tracking-[0.25em] text-accent uppercase mb-5 block"
            >
              Signature Drink
            </motion.span>
            <motion.h2
              {...reveal(0.1)}
              className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6 leading-[1.05]"
            >
              Tiramisu
              <br />
              Latte.
            </motion.h2>
            <motion.p
              {...reveal(0.2)}
              className="text-base md:text-lg text-secondary font-sans leading-relaxed mb-8"
            >
              {tiramisu?.description}
            </motion.p>
            <motion.div {...reveal(0.3)} className="glass inline-flex px-5 py-2.5 rounded-full">
              <span className="text-sm font-sans text-primary/90 tracking-wide">
                A Postcard Favorite
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══════════ RAVIOLI ══════════ */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Text */}
        <motion.div
          {...reveal(0)}
          className="order-2 md:order-1 flex flex-col gap-6"
        >
          <span className="text-[11px] font-sans tracking-[0.25em] text-accent uppercase">
            Customer Insight
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight">
            One of the dishes frequently praised by visitors.
          </h2>
          <p className="text-secondary font-sans text-base leading-relaxed">
            {ravioli?.description}
          </p>

          <motion.div
            {...reveal(0.2)}
            className="glass-card mt-2 p-7 rounded-2xl relative max-w-sm"
          >
            <span className="absolute top-3 left-4 text-5xl font-serif text-accent/15 leading-none select-none">
              "
            </span>
            <p className="text-primary italic font-serif text-lg pl-5 relative z-10">
              Packed with flavour.
            </p>
            <p className="text-[11px] font-sans text-muted pl-5 mt-3 tracking-wide">
              — Customer Review
            </p>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          {...reveal(0.1)}
          className="order-1 md:order-2 relative aspect-[4/5] md:aspect-[3/4] rounded-3xl overflow-hidden border border-white/[0.06]"
        >
          <motion.img
            initial={prefersReduced ? {} : { scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            src={ravioli?.image}
            alt="Ravioli – one of the most praised dishes"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};
