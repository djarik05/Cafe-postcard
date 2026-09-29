import { useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Intro } from '../components/Intro';
import { Features } from '../components/Features';
import { MenuSection } from '../components/MenuSection';
import { FeaturedItems } from '../components/FeaturedItems';
import { Reviews } from '../components/Reviews';
import { Gallery } from '../components/Gallery';
import { Location } from '../components/Location';
import { Reservation } from '../components/Reservation';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export const Home = () => {
  useEffect(() => {
    // Check reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return; // skip smooth scroll for reduced motion

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => { lenis.destroy(); };
  }, []);

  return (
    <div className="min-h-screen bg-background text-primary">
      <Navbar />
      <Hero />
      <Intro />
      <Features />
      <MenuSection />
      <FeaturedItems />
      <Reviews />
      <Gallery />
      <Location />
      <Reservation />
      <Contact />
      <Footer />
    </div>
  );
};
