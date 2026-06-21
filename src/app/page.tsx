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

// ── Animation Variants ─────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const heroImageUrl =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80';

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
      style={{ minWidth: '280px', flex: '0 0 auto' }}
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
      }}
    >
      {/* Background: warm gradient representing the deep, dark kitchen atmosphere */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 30% 50%, rgba(139,94,60,0.6) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 20%, rgba(192,73,43,0.4) 0%, transparent 50%),
            linear-gradient(160deg, #1A0A04 0%, #3B1F0E 40%, #5C3420 70%, #3B1F0E 100%)
          `,
        }}
      />

      {/* Athangudi tile pattern overlay */}
      <div className="athangudi-bg" style={{ position: 'absolute', inset: 0, opacity: 0.08 }} />

      {/* Decorative large circle */}
      <div
        style={{
          position: 'absolute',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          border: '1px solid rgba(232,160,32,0.08)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          border: '1px solid rgba(232,160,32,0.06)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Hero Image Placeholder */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '50%',
          backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.35), rgba(0,0,0,0.15)), url(${heroImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderLeft: '1px solid rgba(255,255,255,0.05)',
        }}
        className="hidden lg:flex"
      >
      </div>

      {/* Hero Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1280px',
          width: '100%',
          margin: '0 auto',
          padding: '120px 24px 80px',
        }}
      >
        <div style={{ maxWidth: '620px' }}>
          {/* Eyebrow */}
          <motion.p
            className="section-label"
            style={{ color: 'var(--mustard)' }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Established in Karaikudi · Since 1982
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.4rem, 6vw, 4rem)',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.15,
              marginBottom: '24px',
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
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.8,
              marginBottom: '40px',
              maxWidth: '480px',
            }}
          >
            Generations of culinary heritage, bold aromatic spices freshly ground each morning,
            and recipes passed down through the kitchens of Karaikudi — now served to your family.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.72 }}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
          >
            <Link href="/menu" className="btn-primary">
              View Our Menu
            </Link>
            <a
              href="https://www.zomato.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              🍽️ Order on Zomato
            </a>
          </motion.div>

          {/* Trust micro-info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            style={{
              display: 'flex',
              gap: '32px',
              marginTop: '56px',
              flexWrap: 'wrap',
            }}
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
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    color: 'var(--mustard)',
                    lineHeight: 1,
                  }}
                >
                  {stat}
                </p>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px', letterSpacing: '0.05em' }}>
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: 'rgba(255,255,255,0.4)',
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span>Scroll</span>
        <span>↓</span>
      </motion.div>
    </section>
  );
}

// ── Section: Our Story Snippet ────────────────────────────
function OurStorySnippet() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="our-story"
      ref={ref}
      style={{
        background: 'var(--cream)',
        padding: '100px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative side image placeholder */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '40%',
          backgroundImage: `linear-gradient(135deg, rgba(92,52,32,0.35), rgba(26,10,4,0.45)), url(${storyImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="hidden lg:flex"
      >
        <div className="athangudi-bg" style={{ position: 'absolute', inset: 0, opacity: 0.15 }} />
      </div>

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <div style={{ maxWidth: '560px', width: '100%' }}>
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
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              color: 'var(--darkbrown)',
              marginBottom: '20px',
              lineHeight: 1.25,
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            A Kitchen Built on
            <br />
            <em style={{ color: 'var(--terracotta)' }}>40 Years of Love</em>
          </motion.h2>

          <div className="divider-ornament">
            <span>✦</span>
          </div>

          <motion.p
            style={{ fontSize: '1rem', lineHeight: 1.9, color: '#5C3420', marginBottom: '20px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            In 1982, Srimathi opened her doors in the heart of Karaikudi with a single mission: to cook
            the food of her ancestors exactly as it was meant to be — with time, patience, and spices
            ground fresh each morning on a stone mortar.
          </motion.p>

          <motion.p
            style={{ fontSize: '1rem', lineHeight: 1.9, color: '#5C3420', marginBottom: '36px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.38 }}
          >
            Chettinad cuisine is unlike any other in India — a sophisticated, complex culinary tradition
            developed by the Nattukotai Chettiars, who traded across Southeast Asia and brought back
            exotic spices and techniques. Our spice blends include over 25 distinct ingredients, many
            of which are unique to Karaikudi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link href="/about" className="btn-outline">
              Read Our Full Story →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Section: Featured Dishes Carousel ────────────────────
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

  // Sync scroll position with activeIdx — scroll only WITHIN the carousel
  // container, not the whole page (scrollIntoView would scroll the page too).
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
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="athangudi-bg" style={{ position: 'absolute', inset: 0, opacity: 0.05 }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>
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
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
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
          style={{ color: 'rgba(255,255,255,0.55)', marginBottom: '48px', fontSize: '0.95rem' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25 }}
        >
          The dishes that keep families coming back, generation after generation.
        </motion.p>

        {/* Scrollable Carousel */}
        <motion.div
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: '24px',
            overflowX: 'auto',
            paddingBottom: '20px',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
          }}
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
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '32px' }}>
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
              }}
            />
          ))}
        </div>

        {/* View Full Menu CTA */}
        <motion.div
          style={{ textAlign: 'center', marginTop: '48px' }}
          initial={{ opacity: 0, y: 20 }}
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

// ── Section: Spice Heritage ────────────────────────────────
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
        padding: '100px 24px',
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
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            color: 'var(--darkbrown)',
            marginBottom: '16px',
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
            margin: '0 auto 60px',
            lineHeight: 1.8,
            fontSize: '0.95rem',
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
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
                padding: '32px 24px',
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

// ── Section: CTA Banner ────────────────────────────────────
function CTABanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="cta-banner"
      ref={ref}
      style={{
        background: 'linear-gradient(135deg, var(--terracotta-dark) 0%, var(--terracotta) 50%, var(--mustard) 100%)',
        padding: '80px 24px',
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
            fontSize: 'clamp(1.8rem, 5vw, 3rem)',
            color: 'white',
            marginBottom: '16px',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          Come, Eat With Us.
        </motion.h2>
        <motion.p
          style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '1rem',
            marginBottom: '40px',
            maxWidth: '480px',
            margin: '0 auto 40px',
            lineHeight: 1.7,
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          Whether it's a family feast, a birthday celebration, or a quiet dinner for two —
          Srimathi Karaikudi is always your home.
        </motion.p>
        <motion.div
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
        >
          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'white',
              color: 'var(--terracotta)',
              padding: '14px 32px',
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
