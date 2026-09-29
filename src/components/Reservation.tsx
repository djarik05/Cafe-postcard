import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from './ui/Button';
import { restaurantData } from '../data/restaurant';
import { Check } from 'lucide-react';

export const Reservation = () => {
  const [submitted, setSubmitted] = useState(false);
  const prefersReduced = useReducedMotion();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  const reveal = (delay = 0) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 } as const,
          whileInView: { opacity: 1, y: 0 } as const,
          viewport: { once: true } as const,
          transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  const inputBase =
    'w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4 text-primary font-sans text-sm placeholder:text-white/20 focus:outline-none focus:border-accent/40 transition-colors duration-300';

  return (
    <section id="reservation" className="py-28 md:py-36 relative">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <motion.div
          {...reveal(0)}
          className="rounded-[2rem] overflow-hidden border border-white/[0.08] glass-card grid grid-cols-1 lg:grid-cols-2"
        >
          {/* Left — image (hidden on mobile) */}
          <div className="relative min-h-[400px] lg:min-h-[650px] hidden lg:block">
            <img
              src={restaurantData.reservationImage}
              alt="Cafe ambience"
              className="absolute inset-0 w-full h-full object-cover opacity-75"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-background/90" />
            <div className="absolute bottom-12 left-12 right-12">
              <h3 className="text-4xl md:text-5xl font-serif text-primary mb-3 text-shadow-md leading-tight">
                Save your table.
              </h3>
              <p className="text-primary/70 font-sans text-shadow-sm">
                Join us for an unhurried experience.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div className="p-8 md:p-12 lg:p-16 bg-surfaceLight/20 flex flex-col justify-center">
            {/* Mobile heading */}
            <div className="lg:hidden mb-10">
              <h3 className="text-3xl md:text-4xl font-serif text-primary mb-2">
                Save your table.
              </h3>
              <p className="text-secondary font-sans text-sm">
                Join us for an unhurried experience.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={prefersReduced ? {} : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center gap-6 py-16"
              >
                <div className="w-16 h-16 rounded-full glass border-accent/20 flex items-center justify-center">
                  <Check size={28} className="text-accent" />
                </div>
                <div>
                  <h4 className="text-2xl font-serif mb-2">Reservation request prepared</h4>
                  <p className="text-secondary font-sans text-sm leading-relaxed max-w-sm">
                    Online booking will be connected soon.
                    <br />
                    Please call us directly for immediate bookings.
                  </p>
                </div>
                <Button
                  variant="glass"
                  onClick={() => setSubmitted(false)}
                  className="mt-4"
                >
                  Make another request
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-sans text-muted uppercase tracking-[0.2em]">
                      Date
                    </label>
                    <input type="date" required className={inputBase} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-sans text-muted uppercase tracking-[0.2em]">
                      Preferred Time
                    </label>
                    <select required className={`${inputBase} appearance-none`}>
                      <option value="">Select time</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">01:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="18:00">06:00 PM</option>
                      <option value="19:00">07:00 PM</option>
                      <option value="20:00">08:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-sans text-muted uppercase tracking-[0.2em]">
                    Number of Guests
                  </label>
                  <select required className={`${inputBase} appearance-none`}>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="5">5 People</option>
                    <option value="6">6+ People</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-sans text-muted uppercase tracking-[0.2em]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      className={inputBase}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-sans text-muted uppercase tracking-[0.2em]">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91"
                      className={inputBase}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-sans text-muted uppercase tracking-[0.2em]">
                    Special Requests
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Any dietary requirements or occasions?"
                    className={`${inputBase} resize-none`}
                  />
                </div>

                <Button type="submit" className="w-full mt-2">
                  REQUEST RESERVATION
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
