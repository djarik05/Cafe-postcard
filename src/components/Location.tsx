import { motion, useReducedMotion } from 'framer-motion';
import { restaurantData } from '../data/restaurant';
import { Button } from './ui/Button';
import { MapPin, Clock, Navigation } from 'lucide-react';

export const Location = () => {
  const prefersReduced = useReducedMotion();
  const reveal = (delay = 0) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 30 } as const,
          whileInView: { opacity: 1, y: 0 } as const,
          viewport: { once: true, margin: '-60px' } as const,
          transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section id="location" className="py-28 md:py-36 relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-center">
        {/* Text */}
        <motion.div {...reveal(0)} className="flex flex-col gap-8">
          <h2 className="text-4xl md:text-5xl font-serif leading-tight">
            Find your way here.
          </h2>

          <div className="flex flex-col gap-7 font-sans text-secondary text-[15px]">
            <div className="flex items-start gap-4">
              <MapPin className="text-accent shrink-0 mt-0.5" size={18} strokeWidth={1.5} />
              <div>
                <strong className="text-primary block font-medium mb-1">
                  {restaurantData.name}
                </strong>
                <span className="block leading-relaxed">
                  ATM Square, Niladri Vihar,
                  <br />
                  Chandrasekharpur,
                  <br />
                  Bhubaneswar, Odisha 751021
                </span>
                <span className="block mt-2 text-sm text-muted">
                  Plus Code: {restaurantData.plusCode}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="text-accent shrink-0 mt-0.5" size={18} strokeWidth={1.5} />
              <div>
                <strong className="text-primary block font-medium mb-1">
                  Opening Hours
                </strong>
                <span>{restaurantData.opening} onwards</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-[18px] h-[18px] flex items-center justify-center shrink-0 mt-0.5 font-serif text-accent text-base leading-none">
                ₹
              </span>
              <div>
                <strong className="text-primary block font-medium mb-1">Price</strong>
                <span>{restaurantData.price}</span>
              </div>
            </div>
          </div>

          <Button
            variant="secondary"
            className="self-start gap-2"
          >
            <Navigation size={15} />
            Get Directions
          </Button>
        </motion.div>

        {/* Map placeholder */}
        <motion.div
          {...reveal(0.15)}
          className="relative aspect-square md:aspect-[4/3] w-full rounded-3xl overflow-hidden glass border-white/[0.08]"
        >
          <div className="absolute inset-0 bg-[#0A1E0D]">
            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  'linear-gradient(#F4F3E8 1px, transparent 1px), linear-gradient(90deg, #F4F3E8 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />

            {/* Concentric rings */}
            <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-brand/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 w-64 h-64 border border-brand/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 w-96 h-96 border border-brand/[0.05] rounded-full -translate-x-1/2 -translate-y-1/2" />

            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-brand/15 rounded-full blur-[60px]" />

            {/* Location marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
              <div className="w-3.5 h-3.5 bg-accent rounded-full shadow-[0_0_24px_rgba(244,243,232,0.5)] animate-pulse" />
              <span className="text-[10px] font-sans text-accent/90 tracking-[0.25em] whitespace-nowrap bg-background/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/[0.08]">
                CAFE POSTCARD
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
