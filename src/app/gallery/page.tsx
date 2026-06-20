'use client';

// ============================================================
// Gallery Page — Masonry Grid with lightbox-style hover
// Placeholders for: interior shots, family dining, dish close-ups
// ============================================================

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

interface GalleryItem {
  id: string;
  caption: string;
  tag: 'Interiors' | 'Family Dining' | 'Signature Dishes' | 'Behind the Scenes';
  aspectRatio: 'tall' | 'wide' | 'square';
  bgColor: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'g01', caption: '[Image: Sweeping overhead shot of the main dining hall — terracotta-tiled floors, carved teak pillars, lanterns with warm amber light, and a table set with banana leaves and brass tumblers]', tag: 'Interiors', aspectRatio: 'wide', bgColor: 'linear-gradient(135deg, #8B5E3C, #3B1F0E)' },
  { id: 'g02', caption: '[Image: A three-generation family — grandparents, parents, and children — laughing around a banana-leaf meal, passing dishes and talking, natural light from a lattice window]', tag: 'Family Dining', aspectRatio: 'tall', bgColor: 'linear-gradient(135deg, #C0492B, #8B5E3C)' },
  { id: 'g03', caption: '[Image: Extreme close-up of steaming Mutton Chukka on a banana leaf, oil glistening on the dark-roasted pieces, with curry leaves and a slice of lemon in the foreground]', tag: 'Signature Dishes', aspectRatio: 'square', bgColor: 'linear-gradient(135deg, #5C3420, #C0492B)' },
  { id: 'g04', caption: '[Image: The master chef\'s hands pressing fresh spice paste on a traditional stone mortar, golden and red powders arranged in small clay bowls surrounding him]', tag: 'Behind the Scenes', aspectRatio: 'tall', bgColor: 'linear-gradient(135deg, #3B1F0E, #6B7C3A)' },
  { id: 'g05', caption: '[Image: A row of traditional brass urli vessels filled with aromatic biryanis, curries, and chutneys, arranged on a banana-leaf buffet spread for a wedding banquet]', tag: 'Signature Dishes', aspectRatio: 'wide', bgColor: 'linear-gradient(135deg, #E8A020, #C0492B)' },
  { id: 'g06', caption: '[Image: The entrance of Srimathi Karaikudi — a traditional Chettinad naattukotai-style facade with hand-painted kolam, oil lamps, and marigold garlands framing the doorway]', tag: 'Interiors', aspectRatio: 'square', bgColor: 'linear-gradient(135deg, #8B5E3C, #C0492B)' },
  { id: 'g07', caption: '[Image: A couple sharing a romantic dinner by candlelight, the table dressed with a banana leaf, brass tumbler with filter coffee, and a single jasmine garland]', tag: 'Family Dining', aspectRatio: 'wide', bgColor: 'linear-gradient(135deg, #3B1F0E, #8B5E3C)' },
  { id: 'g08', caption: '[Image: Overhead bird\'s-eye shot of a full Chettinad saapadu (meal) set on a banana leaf — rasam, kuzhambu, rice, appalam, pickles, poriyal, and two curries in perfect arrangement]', tag: 'Signature Dishes', aspectRatio: 'tall', bgColor: 'linear-gradient(135deg, #C0492B, #3B1F0E)' },
  { id: 'g09', caption: '[Image: The kitchen at 5 AM — clay pots on a wood fire, steam rising, with the head chef tasting a spice blend from a small ladle in warm, orange firelight]', tag: 'Behind the Scenes', aspectRatio: 'square', bgColor: 'linear-gradient(135deg, #5C3420, #E8A020)' },
  { id: 'g10', caption: '[Image: A child delightedly eating Kuzhi Paniyaram with both hands, sauce on her cheeks, grandmother smiling fondly beside her at a wooden table]', tag: 'Family Dining', aspectRatio: 'tall', bgColor: 'linear-gradient(135deg, #8B5E3C, #E8A020)' },
  { id: 'g11', caption: '[Image: Kavuni Arisi Payasam (black rice pudding) being poured from a traditional brass ladle into a clay cup, the dark purple liquid with a coconut-cream swirl, backlit golden]', tag: 'Signature Dishes', aspectRatio: 'square', bgColor: 'linear-gradient(135deg, #1A0A04, #8B5E3C)' },
  { id: 'g12', caption: '[Image: The private dining room — low wooden tables, floor cushions, diyas lit along the walls, and a traditional Tanjore painting of Goddess Lakshmi above the arched doorway]', tag: 'Interiors', aspectRatio: 'wide', bgColor: 'linear-gradient(135deg, #3B1F0E, #C0492B)' },
];

const TAGS = ['All', 'Interiors', 'Family Dining', 'Signature Dishes', 'Behind the Scenes'] as const;

function GalleryCard({ item }: { item: GalleryItem }) {
  const [hovered, setHovered] = useState(false);
  const heights = { tall: '340px', wide: '220px', square: '280px' };

  return (
    <motion.div
      className="masonry-item"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      style={{ height: heights[item.aspectRatio] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          height: '100%',
          background: item.bgColor,
          position: 'relative',
          overflow: 'hidden',
          cursor: 'zoom-in',
        }}
      >
        <div className="athangudi-bg" style={{ position: 'absolute', inset: 0, opacity: 0.15 }} />

        {/* Hover Overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.65)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                gap: '12px',
              }}
            >
              <span
                style={{
                  background: 'var(--mustard)',
                  color: 'var(--darkbrown)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '12px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {item.tag}
              </span>
              <p
                style={{
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '0.72rem',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  lineHeight: 1.6,
                }}
              >
                {item.caption}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Default content */}
        {!hovered && (
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              background: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(4px)',
              borderRadius: '4px',
              padding: '4px 10px',
            }}
          >
            <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {item.tag}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function GalleryPage() {
  const [activeTag, setActiveTag] = useState<string>('All');
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  const filtered = GALLERY_ITEMS.filter(
    (item) => activeTag === 'All' || item.tag === activeTag
  );

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
            Visual Stories
          </motion.p>
          <motion.h1
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', marginBottom: '16px' }}
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }}>
            Our Gallery
          </motion.h1>
          <motion.p
            style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.8 }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.28 }}>
            A glimpse into our restaurant, our kitchen, and the families we serve.
            <br />
            <em style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)' }}>Hover over images to preview the photo description.</em>
          </motion.p>
        </div>
      </section>

      {/* Filter Tags */}
      <div style={{ background: 'white', borderBottom: '1px solid rgba(0,0,0,0.07)', padding: '16px 24px', position: 'sticky', top: '72px', zIndex: 50 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {TAGS.map((tag) => (
            <button
              key={tag}
              id={`gallery-filter-${tag.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setActiveTag(tag)}
              aria-pressed={activeTag === tag}
              style={{
                padding: '9px 18px',
                borderRadius: '50px',
                border: '2px solid',
                borderColor: activeTag === tag ? 'var(--terracotta)' : '#E0C8B0',
                background: activeTag === tag ? 'var(--terracotta)' : 'white',
                color: activeTag === tag ? 'white' : 'var(--warmwood)',
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

      {/* Masonry Grid */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px 80px', background: 'var(--cream)' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag}
            className="masonry-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
