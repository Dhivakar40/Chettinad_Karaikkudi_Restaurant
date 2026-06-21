'use client';

// ============================================================
// Home Page — Srimathi Karaikudi Chettinad Restaurant
// Sections:
//  1. Hero — Full-screen with headline + CTAs
//  2. Trust Bar — Quick stats
//  3. Our Story Snippet — Heritage callout
//  4. Featured Dishes — Animated carousel of bestsellers
//  5. Signature Spices — Visual highlight
//  6. CTA Banner — "Book a Table" + "View Menu"
// ============================================================

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { getBestsellers } from '@/data/menuData';

// ── Animation Variants ────────────────────────────────────────────
// Reduced y from 40 to 20 for snappier mobile feel
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// Updated image path
const heroImageUrl = '/homeimg.png';

const storyImageUrl =
  'https://i.pinimg.com/736x/fc/63/13/fc6313a650a27486963b9e8128fab1a2.jpg';

// ── Spice Level Display ────────────────────────────────────
function SpiceLevel({ level }: { level: number }) {
  return (
    <span className="spice-indicator" aria-label={`Spice level ${level} of 4`}>
      {[1, 2, 3, 4].map((i) => (
        <span key={i} style={{ opacity: i <= level ? 1 : 0.25, fontSize: '0.85rem' }}>
          🌶️
        </span>
      ))}
    </span>
  );
}

// ── Dish Card ─────────────────────────────────────────────
function DishCard({ dish, index }: { dish: ReturnType<typeof getBestsellers>[0]; index: number }) {
  const imageStyle = dish.imageUrl
    ? {
        backgroundImage: `linear-gradient(135deg, rgba(59,31,14,0.2), rgba(0,0,0,0.25)), url(${dish.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {
        background: `linear-gradient(135deg, var(--terracotta-dark), var(--warmwood))`,
      };

  return (
    <motion.div
      className="dish-card"
      variants={fadeUp}
      custom={index * 0.1}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      // min(85vw, 280px): peek at next card on mobile, full-width on desktop
      style={{ minWidth: 'min(85vw, 280px)', width: 'min(85vw, 280px)', flex: '0 0 auto', overflow: 'hidden' }}
    >
      {/* Image Placeholder */}
      <div
        style={{
          height: '200px',
          ...imageStyle,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Decorative pattern overlay */}
        <div
          className="athangudi-bg"
          style={{ position: 'absolute', inset: 0, opacity: dish.imageUrl ? 0.18 : 0.3 }}
        />
        <p
          style={{
            position: 'relative',
            zIndex: 1,
            color: 'rgba(255,255,255,0.7)',
            fontSize: '0.72rem',
            textAlign: 'center',
            padding: '16px',
            fontStyle: 'italic',
            lineHeight: 1.5,
          }}
        >
          {dish.imageAlt}
        </p>
        {dish.imageUrl && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.35))',
            }}
          />
        )}
        {/* Badges */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          {dish.isBestseller && (
            <span
              style={{
                background: 'var(--mustard)',
                color: 'var(--darkbrown)',
                fontSize: '0.65rem',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '3px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              ★ Bestseller
            </span>
          )}
          {dish.isChefSpecial && (
            <span
              style={{
                background: 'var(--terracotta)',
                color: 'white',
                fontSize: '0.65rem',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '3px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Chef's Special
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '20px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '8px',
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.05rem',
                color: 'var(--darkbrown)',
                marginBottom: '2px',
              }}
            >
              {dish.name}
            </h3>
            {dish.nameInTamil && (
              <p style={{ fontSize: '0.75rem', color: 'var(--warmwood)', fontStyle: 'italic' }}>
                {dish.nameInTamil}
              </p>
            )}
          </div>
          <span
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'var(--terracotta)',
              whiteSpace: 'nowrap',
            }}
          >
            ₹{dish.price}
          </span>
        </div>

        <p
          style={{
            fontSize: '0.82rem',
            color: '#6B5040',
            lineHeight: 1.65,
            marginBottom: '14px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {dish.description}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className={dish.isVeg ? 'tag-veg' : 'tag-nonveg'}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: dish.isVeg ? '#4CAF50' : '#EF5350',
                flexShrink: 0,
              }}
            />
            {dish.isVeg ? 'Veg' : 'Non-Veg'}
          </div>
          <SpiceLevel level={dish.spiceLevel} />
        </div>
      </div>
    </motion.div>
  );
}

// ── Section: Hero ─────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#5A4031',
      }}
    >
      {/* Subtle background gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at top right, rgba(255,255,255,0.05) 0%, transparent 60%)',
        }}
      />

      {/* Athangudi tile pattern overlay */}
      <div className="athangudi-bg" style={{ position: 'absolute', inset: 0, opacity: 0.04 }} />

      {/* Hero Content — Mobile-first stack, desktop side-by-side */}
      <div
        className="flex flex-col lg:flex-row items-center justify-between gap-10 xl:gap-20"
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1280px',
          width: '100%',
          margin: '0 auto',
          /* Mobile: reduce massive top padding (navbar is 72px) */
          padding: 'clamp(96px, 15vw, 120px) 20px clamp(48px, 8vw, 80px)',
        }}
      >
        {/* Left Column — Text and buttons */}
        <div
          className="w-full lg:w-1/2 text-center lg:text-left"
          style={{ maxWidth: '640px', margin: '0 auto' }}
        >
          {/* Eyebrow */}
          <motion.p
            className="section-label"
            style={{ color: 'var(--mustard)', fontWeight: 600 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Established in Karaikudi · Since 1982
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2rem, 7vw, 4rem)',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            The Soul of
            <br />
            <span style={{ color: 'var(--mustard)', fontStyle: 'italic' }}>
              Chettinad
            </span>{' '}
            on Every Plate
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            style={{
              fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)',
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.8,
              marginBottom: '32px',
              maxWidth: '500px',
              margin: '0 auto 32px',
            }}
            className="lg:mx-0"
          >
            Generations of culinary heritage, bold aromatic spices freshly ground each morning,
            and recipes passed down through the kitchens of Karaikudi — now served to your family.
          </motion.p>

          {/* CTAs — uses .hero-ctas for mobile stacking */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.72 }}
            className="hero-ctas"
            style={{ justifyContent: 'center' }}
          >
            <Link
              href="/menu"
              style={{
                background: 'var(--terracotta)',
                color: 'white',
                padding: '14px 28px',
                borderRadius: '4px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                transition: 'opacity 0.3s',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '44px',
              }}
            >
              View Our Menu
            </Link>
            <a
              href="https://www.zomato.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'transparent',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '12px 28px',
                borderRadius: '4px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                minHeight: '44px',
                transition: 'border-color 0.3s',
                textDecoration: 'none',
              }}
            >
              Order on Zomato
            </a>
          </motion.div>

          {/* Trust micro-stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            style={{
              display: 'flex',
              gap: 'clamp(20px, 5vw, 40px)',
              marginTop: '40px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
            className="lg:justify-start"
          >
            {[
              { stat: '40+', label: 'Years of Heritage' },
              { stat: '60+', label: 'Authentic Dishes' },
              { stat: '4.7★', label: 'Zomato Rating' },
            ].map(({ stat, label }) => (
              <div key={label}>
                <p
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 'clamp(1.4rem, 4vw, 1.8rem)',
                    fontWeight: 700,
                    color: 'var(--mustard)',
                    lineHeight: 1,
                  }}
                >
                  {stat}
                </p>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: '6px', letterSpacing: '0.05em' }}>
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column — Desktop only: professional framed image */}
        <div className="hidden lg:flex w-full lg:w-1/2 flex-shrink-0 justify-end">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              width: '100%',
              maxWidth: '550px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '8px',
              background: 'rgba(0,0,0,0.15)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            }}
          >
            <img
              src={heroImageUrl}
              alt="Srimathi Karaikudi Restaurant Front"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: '4px',
              }}
            />
          </motion.div>
        </div>

        {/* Mobile Hero Image — shown below text on small screens */}
        <motion.div
          className="block lg:hidden w-full"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          style={{
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '6px',
            background: 'rgba(0,0,0,0.15)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
            maxWidth: '440px',
            margin: '0 auto',
          }}
        >
          <img
            src={heroImageUrl}
            alt="Srimathi Karaikudi Restaurant Front"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: '4px',
            }}
          />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          color: 'rgba(255,255,255,0.4)',
          fontSize: '0.72rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span>Scroll</span>
        <span>↓</span>
      </motion.div>
    </section>
  );
}

// -- Section: Our Story Snippet ------------------------------------------
function OurStorySnippet() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="our-story"
      ref={ref}
      style={{
        background: 'var(--cream)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/*
        LAYOUT FIX: The old version used position:absolute for the image with
        display:'flex' in the inline style — this overrides Tailwind's hidden class
        (inline styles have higher CSS specificity than utility classes), causing
        the image to bleed through on mobile.

        New approach: proper two-column flex layout.
        Mobile  -> flex-col (image on top, full width, fixed height)
        Desktop -> flex-row (image left 40%, text right 60%, fills section height)
      */}
      <div
        className="flex flex-col lg:flex-row"
        style={{ width: '100%', minHeight: 'clamp(380px, 80vw, 580px)' }}
      >
        {/* Image Column */}
        <div
          className="w-full lg:w-2/5 flex-shrink-0"
          style={{
            height: 'clamp(220px, 60vw, 580px)',
            backgroundImage: `linear-gradient(135deg, rgba(92,52,32,0.4), rgba(26,10,4,0.55)), url(${storyImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div className="athangudi-bg" style={{ position: 'absolute', inset: 0, opacity: 0.15 }} />
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              right: '20px',
            }}
          >
            <p
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(0.82rem, 2vw, 0.95rem)',
                color: 'rgba(255,255,255,0.75)',
                fontStyle: 'italic',
                lineHeight: 1.6,
              }}
            >
              "Every spice has a story. Every dish is a memory."
            </p>
          </div>
        </div>

        {/* Text Column */}
        <div
          className="w-full lg:w-3/5"
          style={{
            padding: 'clamp(32px, 6vw, 72px) clamp(20px, 5vw, 56px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <motion.p
            className="section-label"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            Our Heritage
          </motion.p>

          <motion.h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
              color: 'var(--darkbrown)',
              marginBottom: '16px',
              lineHeight: 1.25,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            A Kitchen Built on
            <br />
            <em style={{ color: 'var(--terracotta)' }}>40 Years of Love</em>
          </motion.h2>

          <div className="divider-ornament">
            <span>&#10022;</span>
          </div>

          <motion.p
            style={{
              fontSize: 'clamp(0.88rem, 2.2vw, 1rem)',
              lineHeight: 1.9,
              color: '#5C3420',
              marginBottom: '16px',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            In 1982, Srimathi opened her doors in the heart of Karaikudi with a
            single mission: to cook the food of her ancestors exactly as it was
            meant to be — with time, patience, and spices ground fresh each
            morning on a stone mortar.
          </motion.p>

          <motion.p
            style={{
              fontSize: 'clamp(0.88rem, 2.2vw, 1rem)',
              lineHeight: 1.9,
              color: '#5C3420',
              marginBottom: '32px',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Chettinad cuisine is unlike any other in India — a sophisticated,
            complex culinary tradition developed by the Nattukotai Chettiars,
            who traded across Southeast Asia and brought back exotic spices and
            techniques. Our spice blends include over 25 distinct ingredients,
            many of which are unique to Karaikudi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.42 }}
          >
            <Link href="/about" className="btn-outline">
              Read Our Full Story &rarr;
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
// ── Section: Featured Dishes Carousel ────────────────────────
function FeaturedDishes() {
  const bestsellers = getBestsellers();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % bestsellers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [bestsellers.length]);

  // Sync scroll position with activeIdx
  useEffect(() => {
    if (scrollRef.current) {
      const card = scrollRef.current.children[activeIdx] as HTMLElement;
      if (card) {
        const container = scrollRef.current;
        const targetScrollLeft =
          card.offsetLeft -
          (container.offsetWidth - card.offsetWidth) / 2;
        container.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
      }
    }
  }, [activeIdx]);

  return (
    <section
      id="featured-dishes"
      ref={ref}
      style={{
        background: 'var(--darkbrown)',
        padding: 'clamp(56px, 10vw, 100px) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="athangudi-bg" style={{ position: 'absolute', inset: 0, opacity: 0.05 }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 24px)', position: 'relative' }}>
        <motion.p
          className="section-label"
          style={{ color: 'var(--mustard)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          Crowd Favourites
        </motion.p>

        <motion.h2
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
            color: 'white',
            marginBottom: '8px',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
        >
          Our Signature Dishes
        </motion.h2>
        <motion.p
          style={{ color: 'rgba(255,255,255,0.55)', marginBottom: '32px', fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25 }}
        >
          The dishes that keep families coming back, generation after generation.
        </motion.p>

        {/* Scrollable Carousel — touch-friendly with peek effect */}
        <motion.div
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: '20px',
            overflowX: 'auto',
            paddingBottom: '20px',
            /* Snap cards into position */
            scrollSnapType: 'x mandatory',
            /* Hide scrollbar but keep scrollability */
            scrollbarWidth: 'none',
            /* Smooth momentum scrolling on iOS */
            WebkitOverflowScrolling: 'touch',
          } as React.CSSProperties}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {bestsellers.map((dish, idx) => (
            <div
              key={dish.id}
              style={{ scrollSnapAlign: 'start', flexShrink: 0 }}
              onClick={() => setActiveIdx(idx)}
            >
              <DishCard dish={dish} index={idx} />
            </div>
          ))}
        </motion.div>

        {/* Carousel Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '28px' }}>
          {bestsellers.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to dish ${idx + 1}`}
              onClick={() => setActiveIdx(idx)}
              style={{
                width: idx === activeIdx ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: idx === activeIdx ? 'var(--mustard)' : 'rgba(255,255,255,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.35s ease',
                padding: 0,
                /* Min touch target width */
                minWidth: idx === activeIdx ? '28px' : '20px',
              }}
            />
          ))}
        </div>

        {/* View Full Menu CTA */}
        <motion.div
          style={{ textAlign: 'center', marginTop: '40px' }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <Link href="/menu" className="btn-primary">
            Explore the Full Menu
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ── Section: Spice Heritage ─────────────────────────────────
function SpiceHeritage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const spices = [
    { name: 'Kalpasi', desc: 'Stone Flower — the cornerstone of Chettinad spice blends, earthy and complex.' },
    { name: 'Marathi Mokku', desc: 'Dried flower pods that add a subtle bitterness and depth to gravies.' },
    { name: 'Kalpasi Flowers', desc: 'Dried lichen from the Nilgiri hills — smoky, woody, irreplaceable.' },
    { name: 'Star Anise', desc: 'Whole star anise for its liquorice-like warmth in biryanis and soups.' },
  ];

  return (
    <section
      id="spice-heritage"
      ref={ref}
      style={{
        background: 'var(--cream-dark)',
        /* Mobile: py-14 / Desktop: py-[100px] */
        padding: 'clamp(56px, 10vw, 100px) clamp(16px, 4vw, 24px)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
        <motion.p
          className="section-label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          The Secret
        </motion.p>
        <motion.h2
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
            color: 'var(--darkbrown)',
            marginBottom: '12px',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          The Spices that Define Us
        </motion.h2>
        <motion.p
          style={{
            color: 'var(--warmwood)',
            maxWidth: '580px',
            margin: '0 auto 48px',
            lineHeight: 1.8,
            fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          Every morning, our master chef hand-grinds a unique blend of over 25 spices on a traditional
          stone mill. No shortcuts. No pre-made mixes. That is the Srimathi promise.
        </motion.p>

        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 220px), 1fr))',
            gap: '20px',
          }}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {spices.map((spice, idx) => (
            <motion.div
              key={spice.name}
              variants={fadeUp}
              custom={idx * 0.1}
              style={{
                background: 'white',
                borderRadius: '8px',
                padding: '28px 20px',
                borderTop: '4px solid var(--terracotta)',
                boxShadow: '0 2px 16px rgba(59,31,14,0.07)',
                textAlign: 'left',
              }}
              whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(59,31,14,0.12)' }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--terracotta), var(--mustard))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  fontSize: '1.4rem',
                }}
              >
                🌿
              </div>
              <h3
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.1rem',
                  color: 'var(--darkbrown)',
                  marginBottom: '10px',
                }}
              >
                {spice.name}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--warmwood)', lineHeight: 1.7 }}>
                {spice.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Section: CTA Banner ───────────────────────────────────────
function CTABanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="cta-banner"
      ref={ref}
      style={{
        background: 'linear-gradient(135deg, var(--terracotta-dark) 0%, var(--terracotta) 50%, var(--mustard) 100%)',
        /* Mobile: py-14 / Desktop: py-20 */
        padding: 'clamp(48px, 10vw, 80px) clamp(16px, 4vw, 24px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="athangudi-bg" style={{ position: 'absolute', inset: 0, opacity: 0.1 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.h2
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(1.6rem, 5vw, 3rem)',
            color: 'white',
            marginBottom: '14px',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          Come, Eat With Us.
        </motion.h2>
        <motion.p
          style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: 'clamp(0.88rem, 2.5vw, 1rem)',
            marginBottom: '36px',
            maxWidth: '480px',
            margin: '0 auto 36px',
            lineHeight: 1.7,
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          Whether it’s a family feast, a birthday celebration, or a quiet dinner for two —
          Srimathi Karaikudi is always your home.
        </motion.p>
        {/* .cta-group: flex-col on mobile, flex-row on sm+ */}
        <motion.div
          className="cta-group"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
        >
          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: 'white',
              color: 'var(--terracotta)',
              padding: '14px 28px',
              borderRadius: '4px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: '0.9rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
          >
            Reserve a Table
          </Link>
          <Link href="/menu" className="btn-secondary">
            Browse Menu
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ── Main Page Export ───────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <OurStorySnippet />
      <FeaturedDishes />
      <SpiceHeritage />
      <CTABanner />
    </>
  );
}