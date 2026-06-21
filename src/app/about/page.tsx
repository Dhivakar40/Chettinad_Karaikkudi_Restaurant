'use client';

// ============================================================
// About Us Page — Heritage, Brand Story, Spices
// ============================================================

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const aboutStoryImageUrl =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80';

function Section({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  const milestones = [
    { year: '1982', title: 'The Beginning', desc: 'Srimathi opens her modest eatery in Rajaji Street, Karaikudi, with just four tables and a stone mortar.' },
    { year: '1995', title: 'Recognition', desc: 'Featured in a national food journal as one of the most authentic Chettinad restaurants in Tamil Nadu.' },
    { year: '2008', title: 'Family Heritage', desc: 'Srimathi\'s daughter Meena joins, bringing her own recipes and expanding the menu to over 60 dishes.' },
    { year: '2015', title: 'Cultural Award', desc: 'Honoured by the Tamil Nadu Tourism Board for preserving traditional Chettinad culinary heritage.' },
    { year: '2024', title: 'Four Decades Strong', desc: 'Serving thousands of families monthly, still using the same stone mortar and hand-ground spices.' },
  ];

  const values = [
    { icon: '🌿', title: 'Only Fresh Spices', desc: 'We grind our spice blends fresh every single morning. No bottled masalas, ever.' },
    { icon: '🏡', title: 'Family Recipes Only', desc: 'Every dish is a genuine recipe from the Chettinad household tradition, never invented for trends.' },
    { icon: '🔥', title: 'Traditional Methods', desc: 'Slow-cooking in clay pots, wood-fire tempering, and traditional brass utensils preserve authentic flavour.' },
    { icon: '🤝', title: 'Community First', desc: 'We source ingredients directly from local Karaikudi farmers and spice traders, supporting the local economy.' },
  ];

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(160deg, var(--darkbrown) 0%, #5C3420 100%)',
          /* Mobile: pt-28 pb-14 / Desktop: pt-[140px] pb-20 */
          padding: 'clamp(96px, 15vw, 140px) clamp(16px, 4vw, 24px) clamp(48px, 8vw, 80px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="athangudi-bg" style={{ position: 'absolute', inset: 0, opacity: 0.07 }} />
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.p className="section-label" style={{ color: 'var(--mustard)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Our Heritage
          </motion.p>
          <motion.h1
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', marginBottom: '20px' }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            The Story of Srimathi Karaikudi
          </motion.h1>
          <motion.p
            style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
            Rooted in the land of the Nattukotai Chettiars — a community of traders who brought the world's finest spices back to their kitchens in Karaikudi — our food is a living piece of South Indian history.
          </motion.p>
        </div>
      </section>

      {/* ── Brand Story ───────────────────────────────────── */}
      <section style={{ background: 'var(--cream)', padding: 'clamp(56px, 10vw, 100px) clamp(16px, 4vw, 24px)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>
          <Section>
            <div
              style={{
                height: 'clamp(260px, 45vw, 480px)',
                backgroundImage: `linear-gradient(135deg, rgba(59,31,14,0.18), rgba(26,10,4,0.35)), url(${aboutStoryImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div className="athangudi-bg" style={{ position: 'absolute', inset: 0, opacity: 0.18 }} />
            </div>
          </Section>
          <Section>
            <p className="section-label">Our Founding Story</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--darkbrown)', marginBottom: '16px', lineHeight: 1.25 }}>
              A Mother's Kitchen,<br />
              <em style={{ color: 'var(--terracotta)' }}>Open to the World</em>
            </h2>
            <div className="divider-ornament"><span>✦</span></div>
            {[
              'In 1982, Srimathi Meenakshi Ammal returned to Karaikudi after years of cooking for her extended family of 60 people in a Chettinad naattukotai (mansion). She had one dream: to share her food with strangers, and let them feel what it means to eat in a Chettinad home.',
              'She started with nothing but her grandmother\'s handwritten recipe book, a stone grinding table, a wood-fire stove, and an unshakeable commitment to authenticity. No shortcuts. No compromises. The spices she used then — kalpasi, stone flower, dried kewra, marathi mokku — are the same ones we use today.',
              'Today, her daughter Meena and granddaughter Divya continue the tradition, ensuring that every plate that leaves our kitchen carries the weight of that same four-decade promise: this is the real thing.',
            ].map((para, i) => (
              <p key={i} style={{ fontSize: '0.95rem', lineHeight: 1.9, color: '#5C3420', marginBottom: '16px' }}>
                {para}
              </p>
            ))}
          </Section>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────── */}
      <section style={{ background: 'var(--darkbrown)', padding: 'clamp(48px, 8vw, 80px) clamp(16px, 4vw, 24px)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <Section style={{ textAlign: 'center', marginBottom: '52px' }}>
            <p className="section-label" style={{ color: 'var(--mustard)' }}>What We Stand For</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'white' }}>
              Our Four Pillars
            </h2>
          </Section>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {values.map((v, i) => (
              <Section key={v.title}>
                <motion.div
                  whileHover={{ y: -6 }}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(232,160,32,0.18)',
                    borderRadius: '8px',
                    padding: '32px 24px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{v.icon}</div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--mustard)', marginBottom: '10px', fontSize: '1.05rem' }}>{v.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.87rem', lineHeight: 1.7 }}>{v.desc}</p>
                </motion.div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────── */}
      <section style={{ background: 'var(--cream-dark)', padding: 'clamp(56px, 10vw, 100px) clamp(16px, 4vw, 24px)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Section style={{ textAlign: 'center', marginBottom: '52px' }}>
            <p className="section-label">Our Journey</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--darkbrown)' }}>
              Four Decades of History
            </h2>
          </Section>
          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: '20px', top: '8px', bottom: '8px', width: '2px', background: 'linear-gradient(180deg, var(--terracotta), var(--mustard), transparent)' }} />
            {milestones.map((m, i) => (
              <Section key={m.year}>
                <div style={{ display: 'flex', gap: '32px', marginBottom: '40px', position: 'relative' }}>
                  {/* Dot */}
                  <div style={{ flexShrink: 0, width: '42px', height: '42px', borderRadius: '50%', background: 'var(--terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.65rem', flexDirection: 'column', boxShadow: '0 0 0 4px var(--cream-dark), 0 0 0 6px var(--terracotta)', zIndex: 1 }}>
                    {m.year.slice(-2)}
                  </div>
                  <div style={{ paddingTop: '8px' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--terracotta)', fontWeight: 700, letterSpacing: '0.1em' }}>{m.year}</span>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', color: 'var(--darkbrown)', margin: '4px 0 8px' }}>{m.title}</h3>
                    <p style={{ fontSize: '0.9rem', color: '#5C3420', lineHeight: 1.7 }}>{m.desc}</p>
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section style={{ background: 'var(--terracotta)', padding: 'clamp(40px, 8vw, 64px) clamp(16px, 4vw, 24px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="athangudi-bg" style={{ position: 'absolute', inset: 0, opacity: 0.08, pointerEvents: 'none' }} />
        <Section>
          <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', marginBottom: '24px' }}>
            Come Taste the Heritage
          </h2>
          {/* .cta-group: stacks to column on mobile */}
          <div className="cta-group">
            <Link href="/menu" className="btn-secondary">View Our Menu</Link>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'white', color: 'var(--terracotta)', padding: '14px 28px', borderRadius: '4px', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', textDecoration: 'none', minHeight: '44px', transition: 'all 0.3s ease' }}>
              Reserve a Table
            </Link>
          </div>
        </Section>
      </section>
    </>
  );
}
