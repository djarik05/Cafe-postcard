import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Button } from './ui/Button';
import { restaurantData } from '../data/restaurant';
import { Star } from 'lucide-react';

const anim = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export const Hero = () => {
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 800], [0, 160]);
  const imgScale = useTransform(scrollY, [0, 400], [1, 1.06]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden"
    >
      {/* ── Decorative elements ── */}
      <motion.div
        {...(prefersReduced ? {} : anim(0.1))}
        className="absolute top-20 -left-40 w-[550px] h-[550px] bg-brand/15 rounded-full blur-[160px] pointer-events-none"
      />
      <motion.div
        {...(prefersReduced ? {} : anim(0.2))}
        className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-surfaceLighter/20 rounded-full blur-[120px] pointer-events-none"
      />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full border border-brand/[0.07] pointer-events-none hidden lg:block" />

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        {/* Left column */}
        <div className="flex flex-col gap-7">
          {/* Eyebrow */}
          <motion.div
            {...(prefersReduced ? {} : anim(0.5))}
            className="flex items-center gap-3"
          >
            <span className="block w-8 h-px bg-primary/30" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-muted font-sans">
              Café · Bhubaneswar
            </span>
          </motion.div>

          {/* Headline – line-by-line stagger */}
          <h1 className="font-serif leading-[1.05]">
            {['Good Food.', 'Good Vibes.'].map((line, i) => (
              <motion.span
                key={line}
                {...(prefersReduced ? {} : anim(0.65 + i * 0.1))}
                className="block text-[clamp(2.6rem,8vw,5.5rem)]"
              >
                {line}
              </motion.span>
            ))}
            <motion.span
              {...(prefersReduced ? {} : anim(0.85))}
              className="block text-[clamp(2.6rem,8vw,5.5rem)] italic text-secondary"
            >
              A Little
            </motion.span>
            <motion.span
              {...(prefersReduced ? {} : anim(0.95))}
              className="block text-[clamp(2.6rem,8vw,5.5rem)]"
            >
              Postcard.
            </motion.span>
          </h1>

          {/* Description */}
          <motion.p
            {...(prefersReduced ? {} : anim(1.1))}
            className="text-base md:text-lg text-secondary font-sans leading-relaxed max-w-md"
          >
            {restaurantData.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...(prefersReduced ? {} : anim(1.3))}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Button withArrow onClick={() => scrollTo('#menu')}>
              Explore Menu
            </Button>
            <Button variant="secondary" onClick={() => scrollTo('#reservation')}>
              Reserve a Table
            </Button>
          </motion.div>
        </div>

        {/* Right column – hero image */}
        <motion.div
          initial={prefersReduced ? {} : { scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[55vh] lg:h-[78vh] rounded-3xl overflow-hidden border border-white/[0.08]"
        >
          <motion.img
            style={prefersReduced ? {} : { y: imgY, scale: imgScale }}
            src={restaurantData.heroImage}
            alt="Cafe Postcard – warm interior with ambient lighting"
            className="absolute inset-0 w-full h-[120%] object-cover -top-[10%]"
            loading="eager"
          />
          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />

          {/* Floating info card */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-6 right-6 glass-card rounded-2xl px-5 py-4 flex flex-col gap-1.5"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif text-accent leading-none">
                {restaurantData.rating.toFixed(1)}
              </span>
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
            </div>
            <span className="text-[11px] font-sans text-secondary">
              {restaurantData.reviewsCount} Reviews
            </span>
            <div className="h-px w-full bg-white/[0.08] my-0.5" />
            <span className="text-[11px] font-sans text-muted">
              {restaurantData.price}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
