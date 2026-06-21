'use client';

// ============================================================
// Testimonials Page — Reviews with star ratings and quotes
// ============================================================

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
  platform: 'Google' | 'Zomato' | 'Direct';
  tag: 'Family' | 'Foodie' | 'Wedding' | 'Tourist';
  initials: string;
  color: string;
}

const REVIEWS: Review[] = [
  {
    id: 'r01',
    name: 'Priya Ramamurthy',
    role: 'Family of 6, Chennai',
    rating: 5,
    quote: 'We drove three hours from Chennai just to eat here, and it was worth every kilometre. The Mutton Chukka made my father-in-law — a Karaikudi native — weep with nostalgia. Srimathi aunty\'s cooking is the real thing. There is nothing else like it.',
    platform: 'Google',
    tag: 'Family',
    initials: 'PR',
    color: '#C0492B',
  },
  {
    id: 'r02',
    name: 'Karthik Sundaram',
    role: 'Food Blogger, @spiceroutes_india',
    rating: 5,
    quote: 'I have reviewed over 200 Chettinad restaurants across Tamil Nadu. Srimathi Karaikudi is in its own category. The kalpasi is ground fresh — you can smell it from the street. The Nattu Kozhi Rasam is the single best soup I have ever eaten. Full stop.',
    platform: 'Zomato',
    tag: 'Foodie',
    initials: 'KS',
    color: '#E8A020',
  },
  {
    id: 'r03',
    name: 'Meera & Anand Krishnan',
    role: 'Newlyweds, Madurai',
    rating: 5,
    quote: 'We hosted our wedding reception dinner here for 200 guests. Meena Aunty personally coordinated the menu — the ghee rice with dalcha, the crab masala, and the kavuni arisi payasam had every guest asking for seconds. An absolute dream team.',
    platform: 'Direct',
    tag: 'Wedding',
    initials: 'MA',
    color: '#8B5E3C',
  },
  {
    id: 'r04',
    name: 'Siddharth Venkat',
    role: 'Tech professional, Bangalore',
    rating: 5,
    quote: 'I order the Chettinad Chicken Biryani every Sunday via Zomato. This is not restaurant food — this is home food. The biryani comes sealed and still steaming. My entire apartment floor now places orders here every week.',
    platform: 'Zomato',
    tag: 'Foodie',
    initials: 'SV',
    color: '#3B1F0E',
  },
  {
    id: 'r05',
    name: 'Linda & James Morrison',
    role: 'Tourists from Melbourne, Australia',
    rating: 5,
    quote: 'We found this restaurant by accident and it became the highlight of our two-week India trip. The owner sat with us and explained every dish and spice. The Kavuni Arisi Payasam (black rice pudding) was unlike anything we have ever tasted. We will be back.',
    platform: 'Google',
    tag: 'Tourist',
    initials: 'LJ',
    color: '#C0492B',
  },
  {
    id: 'r06',
    name: 'Gowri Narayanan',
    role: 'Retired teacher, Karaikudi',
    rating: 5,
    quote: 'I have been coming here since Srimathi Aunty first opened in 1982. My children and grandchildren eat here now. This place has not changed — the taste is exactly the same. That is the most beautiful thing I can say about any restaurant.',
    platform: 'Direct',
    tag: 'Family',
    initials: 'GN',
    color: '#6B7C3A',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          style={{ fontSize: '1rem', color: i <= rating ? 'var(--mustard)' : '#ddd' }}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review, delay = 0 }: { review: Review; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const platformColors: Record<string, string> = {
    Google: '#4285F4',
    Zomato: '#E23744',
    Direct: '#8B5E3C',
  };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(59,31,14,0.15)' }}
      style={{
        background: 'white',
        borderRadius: '10px',
        padding: '28px 24px',
        boxShadow: '0 2px 16px rgba(59,31,14,0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        position: 'relative',
        borderTop: `4px solid ${review.color}`,
        transition: 'box-shadow 0.3s ease',
      }}
      aria-label={`Review by ${review.name}`}
    >
      {/* Platform Badge */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          background: platformColors[review.platform] + '20',
          color: platformColors[review.platform],
          fontSize: '0.65rem',
          fontWeight: 700,
          padding: '3px 8px',
          borderRadius: '4px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        via {review.platform}
      </div>

      {/* Quote Mark */}
      <div
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '4rem',
          color: review.color,
          opacity: 0.15,
          lineHeight: 0.8,
          position: 'absolute',
          top: '20px',
          left: '20px',
        }}
        aria-hidden="true"
      >
        "
      </div>

      {/* Stars */}
      <StarRating rating={review.rating} />

      {/* Quote */}
      <blockquote
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '0.95rem',
          color: '#5C3420',
          lineHeight: 1.8,
          fontStyle: 'italic',
          flex: 1,
          paddingTop: '8px',
        }}
      >
        "{review.quote}"
      </blockquote>

      {/* Tag */}
      <span
        style={{
          display: 'inline-block',
          background: 'var(--cream-dark)',
          color: 'var(--terracotta)',
          fontSize: '0.7rem',
          fontWeight: 600,
          padding: '3px 10px',
          borderRadius: '12px',
          letterSpacing: '0.06em',
          alignSelf: 'flex-start',
        }}
      >
        {review.tag}
      </span>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '8px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: review.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: '0.85rem',
            fontFamily: 'Inter, sans-serif',
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          {review.initials}
        </div>
        <div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.88rem', color: 'var(--darkbrown)' }}>
            {review.name}
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--warmwood)' }}>{review.role}</p>
        </div>
      </div>
    </motion.article>
  );
}

export default function TestimonialsPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  const tags = ['All', 'Family', 'Foodie', 'Wedding', 'Tourist'];
  const filtered = REVIEWS.filter((r) => activeFilter === 'All' || r.tag === activeFilter);

  const avgRating = (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length).toFixed(1);

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(160deg, var(--darkbrown) 0%, #5C3420 100%)',
          padding: '140px 24px 80px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="athangudi-bg" style={{ position: 'absolute', inset: 0, opacity: 0.06 }} />
        <div ref={headerRef} style={{ position: 'relative', zIndex: 1 }}>
          <motion.p className="section-label" style={{ color: 'var(--mustard)' }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            What Our Guests Say
          </motion.p>
          <motion.h1
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', marginBottom: '16px' }}
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }}>
            Stories from Our Table
          </motion.h1>

          {/* Rating Summary */}
          <motion.div
            style={{ display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '40px' }}
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}>
            {[
              { stat: `${avgRating}★`, label: 'Average Rating' },
              { stat: '1,200+', label: 'Happy Families' },
              { stat: '4.8★', label: 'Zomato Rating' },
              { stat: '4.7★', label: 'Google Rating' },
            ].map(({ stat, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--mustard)', lineHeight: 1 }}>{stat}</p>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginTop: '4px', letterSpacing: '0.06em' }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <div style={{ background: 'white', borderBottom: '1px solid rgba(0,0,0,0.07)', padding: '16px 24px', position: 'sticky', top: '72px', zIndex: 50 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {tags.map((tag) => (
            <button
              key={tag}
              id={`review-filter-${tag.toLowerCase()}`}
              onClick={() => setActiveFilter(tag)}
              aria-pressed={activeFilter === tag}
              style={{
                padding: '9px 18px',
                borderRadius: '50px',
                border: '2px solid',
                borderColor: activeFilter === tag ? 'var(--terracotta)' : '#E0C8B0',
                background: activeFilter === tag ? 'var(--terracotta)' : 'white',
                color: activeFilter === tag ? 'white' : 'var(--warmwood)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.25s ease',
                flexShrink: 0,
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Grid */}
      <section style={{ background: 'var(--cream)', padding: '60px 24px 80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {filtered.map((review, idx) => (
              <ReviewCard key={review.id} review={review} delay={idx * 0.08} />
            ))}
          </div>

          {/* Leave a Review CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              marginTop: '64px',
              background: 'var(--darkbrown)',
              borderRadius: '12px',
              padding: '48px 32px',
              textAlign: 'center',
            }}
          >
            <div className="athangudi-bg" style={{ position: 'absolute', inset: 0, opacity: 0.05, borderRadius: '12px', overflow: 'hidden' }} />
            <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: '1.8rem', marginBottom: '12px' }}>
              Dined with us recently?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', marginBottom: '28px', lineHeight: 1.7 }}>
              We'd love to hear about your experience. Your feedback means the world to us.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                ★ Review on Google
              </a>
              <a
                href="https://www.zomato.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                🍽️ Review on Zomato
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
