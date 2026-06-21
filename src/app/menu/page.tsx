'use client';

// ============================================================
// Menu Page — Dynamic, Filterable
// Features:
//  - Category filter tabs with animated indicator
//  - Search bar
//  - Veg/Non-Veg toggle filter
//  - Dish cards with spice level, price, badges
//  - Animated entrance for cards
// ============================================================

import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { MENU_ITEMS, MENU_CATEGORIES, type Category, type Dish } from '@/data/menuData';

// ── Spice Indicator ─────────────────────────────────────────
function SpiceLevel({ level }: { level: number }) {
  return (
    <div className="spice-indicator" aria-label={`Spice level: ${level} out of 4`}>
      {[1, 2, 3, 4].map((i) => (
        <span key={i} style={{ opacity: i <= level ? 1 : 0.2, fontSize: '0.8rem' }}>
          🌶️
        </span>
      ))}
    </div>
  );
}

// ── Individual Dish Card ────────────────────────────────────
function MenuCard({ dish }: { dish: Dish }) {
  const [flipped, setFlipped] = useState(false);
  const imageStyle = dish.imageUrl
    ? {
        backgroundImage: `linear-gradient(135deg, rgba(59,31,14,0.15), rgba(0,0,0,0.25)), url(${dish.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {
        background: dish.isVeg
          ? `linear-gradient(135deg, #3B6B35, #6B9E40)`
          : `linear-gradient(135deg, var(--terracotta-dark), var(--warmwood))`,
      };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="dish-card"
      style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
      onClick={() => setFlipped(!flipped)}
      aria-label={`${dish.name} - Click to see more details`}
    >
      {/* Image Area */}
      <div
        style={{
          height: '180px',
          ...imageStyle,
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <div className="athangudi-bg" style={{ position: 'absolute', inset: 0, opacity: dish.imageUrl ? 0.12 : 0.2 }} />

        {/* Flip to see image alt text */}
        <AnimatePresence mode="wait">
          {flipped ? (
            <motion.div
              key="desc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                background: 'rgba(0,0,0,0.55)',
              }}
            >
              <p
                style={{
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '0.7rem',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  lineHeight: 1.6,
                }}
              >
                {dish.imageAlt}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
              }}
            >
              {dish.isVeg ? '🥗' : dish.category === 'Desserts' ? '🍮' : dish.category === 'Beverages' ? '☕' : '🍗'}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Left Badges */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          {dish.isBestseller && (
            <span
              style={{
                background: 'var(--mustard)',
                color: 'var(--darkbrown)',
                fontSize: '0.6rem',
                fontWeight: 700,
                padding: '2px 7px',
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
                fontSize: '0.6rem',
                fontWeight: 700,
                padding: '2px 7px',
                borderRadius: '3px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Chef's Pick
            </span>
          )}
        </div>

        {/* Click hint */}
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            fontSize: '0.6rem',
            color: 'rgba(255,255,255,0.5)',
            fontStyle: 'italic',
          }}
        >
          {flipped ? 'Click to close' : 'Tap for photo guide'}
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Name + Price row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '8px',
            marginBottom: '6px',
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1rem',
                color: 'var(--darkbrown)',
                lineHeight: 1.3,
              }}
            >
              {dish.name}
            </h3>
            {dish.nameInTamil && (
              <p
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--warmwood)',
                  fontStyle: 'italic',
                  marginTop: '2px',
                }}
              >
                {dish.nameInTamil}
              </p>
            )}
          </div>
          <span
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'var(--terracotta)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            ₹{dish.price}
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: '0.8rem',
            color: '#6B5040',
            lineHeight: 1.65,
            flex: 1,
            marginBottom: '14px',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {dish.description}
        </p>

        {/* Footer row: veg tag + spice level */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '12px',
            borderTop: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <div className={dish.isVeg ? 'tag-veg' : 'tag-nonveg'}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: dish.isVeg ? '#4CAF50' : '#EF5350',
                flexShrink: 0,
                display: 'inline-block',
              }}
            />
            {dish.isVeg ? 'Veg' : 'Non-Veg'}
          </div>
          <SpiceLevel level={dish.spiceLevel} />
        </div>
      </div>
    </motion.article>
  );
}

// ── Category Pills ─────────────────────────────────────────
function CategoryFilter({
  active,
  onChange,
  counts,
}: {
  active: Category | 'All';
  onChange: (cat: Category | 'All') => void;
  counts: Record<string, number>;
}) {
  const all = ['All', ...MENU_CATEGORIES] as (Category | 'All')[];

  return (
    <div
      role="tablist"
      aria-label="Menu categories"
      style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '8px',
        scrollbarWidth: 'none',
      }}
    >
      {all.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isActive}
            id={`tab-${cat.replace(/\s+/g, '-').toLowerCase()}`}
            onClick={() => onChange(cat)}
            style={{
              padding: '10px 20px',
              borderRadius: '50px',
              border: '2px solid',
              borderColor: isActive ? 'var(--terracotta)' : '#E0C8B0',
              background: isActive ? 'var(--terracotta)' : 'white',
              color: isActive ? 'white' : 'var(--warmwood)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.25s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              flexShrink: 0,
            }}
          >
            {cat}
            <span
              style={{
                background: isActive ? 'rgba(255,255,255,0.2)' : 'var(--cream-dark)',
                color: isActive ? 'white' : 'var(--terracotta)',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '1px 6px',
                borderRadius: '10px',
                minWidth: '20px',
                textAlign: 'center',
              }}
            >
              {cat === 'All' ? counts['All'] : (counts[cat] ?? 0)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ── Main Menu Page ─────────────────────────────────────────
export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showVegOnly, setShowVegOnly] = useState(false);
  const [showNonVegOnly, setShowNonVegOnly] = useState(false);
  const [spiceFilter, setSpiceFilter] = useState<number | null>(null);

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  // Compute counts for filter badges
  const counts = useMemo(() => {
    const result: Record<string, number> = {};
    result['All'] = MENU_ITEMS.length;
    MENU_CATEGORIES.forEach((cat) => {
      result[cat] = MENU_ITEMS.filter((d) => d.category === cat).length;
    });
    return result;
  }, []);

  // Filtered dishes
  const filtered = useMemo(() => {
    return MENU_ITEMS.filter((dish) => {
      if (activeCategory !== 'All' && dish.category !== activeCategory) return false;
      if (showVegOnly && !dish.isVeg) return false;
      if (showNonVegOnly && dish.isVeg) return false;
      if (spiceFilter !== null && dish.spiceLevel !== spiceFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          dish.name.toLowerCase().includes(q) ||
          dish.description.toLowerCase().includes(q) ||
          (dish.nameInTamil && dish.nameInTamil.includes(q))
        );
      }
      return true;
    });
  }, [activeCategory, searchQuery, showVegOnly, showNonVegOnly, spiceFilter]);

  // Group filtered by category for display
  const grouped = useMemo(() => {
    if (activeCategory !== 'All') {
      return { [activeCategory]: filtered };
    }
    const groups: Record<string, Dish[]> = {};
    filtered.forEach((dish) => {
      if (!groups[dish.category]) groups[dish.category] = [];
      groups[dish.category].push(dish);
    });
    return groups;
  }, [activeCategory, filtered]);

  return (
    <>
      {/* ── Page Hero ─────────────────────────────────────── */}
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
        <div style={{ position: 'relative', zIndex: 1 }} ref={headerRef}>
          <motion.p
            className="section-label"
            style={{ color: 'var(--mustard)', textAlign: 'center' }}
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
          >
            Authentic Chettinad Cuisine
          </motion.p>
          <motion.h1
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: 'white',
              marginBottom: '16px',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            Our Menu
          </motion.h1>
          <motion.p
            style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.8 }}
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.28 }}
          >
            Every dish crafted fresh daily. Spices ground by hand. Heritage served on a leaf.
            <br />
            <em style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>
              Prices are per serving. Click a card to see photo description.
            </em>
          </motion.p>
        </div>
      </section>

      {/* ── Filters Bar ───────────────────────────────────── */}
      <div
        style={{
          background: 'white',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          position: 'sticky',
          top: '72px',
          zIndex: 50,
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {/* Category Tabs */}
          <CategoryFilter
            active={activeCategory}
            onChange={setActiveCategory}
            counts={counts}
          />

          {/* Second row: search + veg toggles + spice filter */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {/* Search */}
            <div style={{ position: 'relative', flex: '1 1 220px', minWidth: '180px' }}>
              <span
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '0.9rem',
                  color: 'var(--warmwood)',
                }}
              >
                🔍
              </span>
              <input
                id="menu-search"
                type="text"
                className="form-input"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '38px', height: '42px', fontSize: '0.88rem' }}
                aria-label="Search menu items"
              />
            </div>

            {/* Veg Toggle */}
            <button
              id="veg-filter-btn"
              onClick={() => { setShowVegOnly(!showVegOnly); setShowNonVegOnly(false); }}
              aria-pressed={showVegOnly}
              style={{
                padding: '9px 16px',
                borderRadius: '50px',
                border: '2px solid',
                borderColor: showVegOnly ? '#4CAF50' : '#ddd',
                background: showVegOnly ? '#E8F5E0' : 'white',
                color: showVegOnly ? '#2E7D32' : '#888',
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4CAF50', display: 'inline-block' }} />
              Veg Only
            </button>

            {/* Non-Veg Toggle */}
            <button
              id="nonveg-filter-btn"
              onClick={() => { setShowNonVegOnly(!showNonVegOnly); setShowVegOnly(false); }}
              aria-pressed={showNonVegOnly}
              style={{
                padding: '9px 16px',
                borderRadius: '50px',
                border: '2px solid',
                borderColor: showNonVegOnly ? '#EF5350' : '#ddd',
                background: showNonVegOnly ? '#FDECEA' : 'white',
                color: showNonVegOnly ? '#C62828' : '#888',
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF5350', display: 'inline-block' }} />
              Non-Veg Only
            </button>

            {/* Spice Filter */}
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', color: '#888', whiteSpace: 'nowrap' }}>Spice:</span>
              {[1, 2, 3, 4].map((level) => (
                <button
                  key={level}
                  id={`spice-filter-${level}`}
                  onClick={() => setSpiceFilter(spiceFilter === level ? null : level)}
                  aria-pressed={spiceFilter === level}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '50px',
                    border: '1px solid',
                    borderColor: spiceFilter === level ? 'var(--terracotta)' : '#ddd',
                    background: spiceFilter === level ? 'var(--terracotta)' : 'white',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    gap: '2px',
                  }}
                  aria-label={`Filter by spice level ${level}`}
                >
                  {Array.from({ length: level }, (_, i) => (
                    <span key={i} style={{ fontSize: '0.75rem' }}>🌶️</span>
                  ))}
                </button>
              ))}
            </div>

            {/* Clear filters */}
            {(searchQuery || showVegOnly || showNonVegOnly || spiceFilter !== null || activeCategory !== 'All') && (
              <button
                id="clear-filters-btn"
                onClick={() => {
                  setSearchQuery('');
                  setShowVegOnly(false);
                  setShowNonVegOnly(false);
                  setSpiceFilter(null);
                  setActiveCategory('All');
                }}
                style={{
                  padding: '9px 16px',
                  borderRadius: '50px',
                  border: '1px solid var(--terracotta)',
                  background: 'transparent',
                  color: 'var(--terracotta)',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                ✕ Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Menu Content ──────────────────────────────────── */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '48px 24px 80px',
          background: 'var(--cream)',
          minHeight: '60vh',
        }}
      >
        {/* Results count */}
        <p
          style={{
            fontSize: '0.85rem',
            color: 'var(--warmwood)',
            marginBottom: '32px',
            fontStyle: 'italic',
          }}
        >
          Showing <strong>{filtered.length}</strong> of {MENU_ITEMS.length} dishes
          {activeCategory !== 'All' && ` in ${activeCategory}`}
        </p>

        {/* No results */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', padding: '80px 24px' }}
          >
            <p style={{ fontSize: '3rem', marginBottom: '16px' }}>🍽️</p>
            <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--darkbrown)', marginBottom: '8px' }}>
              No dishes found
            </h3>
            <p style={{ color: 'var(--warmwood)' }}>
              Try adjusting your search or filters.
            </p>
          </motion.div>
        )}

        {/* Grouped Dish Grid */}
        {Object.entries(grouped).map(([category, dishes]) => (
          <section key={category} style={{ marginBottom: '64px' }}>
            {/* Category Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '28px',
              }}
            >
              <h2
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
                  color: 'var(--darkbrown)',
                  whiteSpace: 'nowrap',
                }}
              >
                {category}
              </h2>
              <div
                style={{
                  flex: 1,
                  height: '1px',
                  background: 'linear-gradient(90deg, var(--mustard), transparent)',
                  opacity: 0.4,
                }}
              />
              <span
                style={{
                  background: 'var(--cream-dark)',
                  color: 'var(--terracotta)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '12px',
                  whiteSpace: 'nowrap',
                }}
              >
                {dishes.length} items
              </span>
            </div>

            {/* Cards Grid */}
            <motion.div
              layout
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
                gap: '24px',
              }}
            >
              <AnimatePresence mode="popLayout">
                {dishes.map((dish) => (
                  <MenuCard key={dish.id} dish={dish} />
                ))}
              </AnimatePresence>
            </motion.div>
          </section>
        ))}
      </div>

      {/* ── Legend ────────────────────────────────────────── */}
      <div
        style={{
          background: 'var(--darkbrown)',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>Legend:</span>
          <div className="tag-veg">
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4CAF50', display: 'inline-block' }} />
            Vegetarian
          </div>
          <div className="tag-nonveg">
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF5350', display: 'inline-block' }} />
            Non-Vegetarian
          </div>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>
            <span>🌶️ Mild</span>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>→</span>
            <span>🌶️🌶️🌶️🌶️ Fiery Hot</span>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontStyle: 'italic' }}>
            * Prices include GST. All dishes prepared fresh daily.
          </div>
        </div>
      </div>
    </>
  );
}
