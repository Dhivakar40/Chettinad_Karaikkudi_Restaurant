'use client';

// ============================================================
// Navbar Component — v2 (Mobile-First Rewrite)
//
// ROOT CAUSE FIX: The old <ul> had `display:'flex'` in its
// inline style which overrides Tailwind's `hidden` class
// (inline styles beat class-based styles in CSS specificity).
// Solution: ALL show/hide is handled ONLY by conditional
// rendering or CSS classes — never mixed with inline display.
//
// Mobile  (<768px): Hamburger button → full-screen drawer
// Desktop (≥768px): Horizontal link bar + CTA button
// ============================================================

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { href: '/',             label: 'Home'},
  { href: '/about',        label: 'Our Story'},
  { href: '/menu',         label: 'Menu'},
  { href: '/gallery',      label: 'Gallery'},
  { href: '/testimonials', label: 'Reviews'},
  { href: '/contact',      label: 'Contact'},
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Dark navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Navbar bar ─────────────────────────────────────── */}
      <nav
        className={`navbar ${scrolled ? 'scrolled' : 'transparent'}`}
        role="navigation"
        aria-label="Main navigation"
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 20px',
            height: '68px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            style={{ textDecoration: 'none', flexShrink: 0 }}
            aria-label="Srimathi Karaikudi Chettinad — Home"
          >
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                  fontWeight: 700,
                  color: 'var(--mustard)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                Srimathi
              </span>
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(0.55rem, 1.5vw, 0.65rem)',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.65)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                Karaikudi · Chettinad
              </span>
            </div>
          </Link>

          {/* ── Desktop Links (hidden on mobile) ── */}
          {/* NOTE: No inline display style — Tailwind hidden/flex controls visibility */}
          <ul
            role="list"
            className="hidden md:flex"
            style={{
              gap: '28px',
              listStyle: 'none',
              alignItems: 'center',
              margin: 0,
              padding: 0,
            }}
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.88rem',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'var(--mustard)' : 'rgba(255,255,255,0.88)',
                      textDecoration: 'none',
                      letterSpacing: '0.04em',
                      transition: 'color 0.2s ease',
                      position: 'relative',
                      paddingBottom: '4px',
                    }}
                    className="nav-link"
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '2px',
                          background: 'var(--mustard)',
                          borderRadius: '1px',
                        }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Desktop CTA (hidden on mobile) ── */}
          {/* NOTE: No inline display style */}
          <Link
            href="/contact"
            className="btn-primary hidden md:inline-flex"
            style={{ padding: '10px 20px', fontSize: '0.82rem', flexShrink: 0 }}
          >
            Reserve a Table
          </Link>

          {/* ── Mobile Hamburger (hidden on desktop) ── */}
          <button
            id="mobile-menu-toggle"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden"
            style={{
              display:         'flex',
              flexDirection:   'column',
              alignItems:      'center',
              justifyContent:  'center',
              gap:             '5px',
              background:      mobileOpen ? 'rgba(232,160,32,0.12)' : 'rgba(255,255,255,0.06)',
              border:          '1px solid rgba(255,255,255,0.12)',
              borderRadius:    '8px',
              cursor:          'pointer',
              width:           '44px',
              height:          '44px',
              flexShrink:      0,
              transition:      'background 0.2s ease',
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display:         'block',
                  width:           '20px',
                  height:          '2px',
                  background:      mobileOpen ? 'var(--mustard)' : 'white',
                  borderRadius:    '2px',
                  transition:      'transform 0.3s ease, opacity 0.3s ease, background 0.2s ease',
                  transformOrigin: 'center',
                  transform: mobileOpen
                    ? i === 0 ? 'translateY(7px) rotate(45deg)'
                    : i === 2 ? 'translateY(-7px) rotate(-45deg)'
                    : 'scaleX(0)'
                    : 'none',
                  opacity: mobileOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* ── Mobile Drawer ───────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position:   'fixed',
                inset:      0,
                zIndex:     98,
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(2px)',
              }}
            />

            {/* Drawer panel */}
            <motion.div
              id="mobile-nav-drawer"
              key="drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              style={{
                position:     'fixed',
                top:          '68px',
                left:         0,
                right:        0,
                zIndex:       99,
                background:   'linear-gradient(170deg, #3B1F0E 0%, #2A1508 100%)',
                borderBottom: '1px solid rgba(232,160,32,0.25)',
                boxShadow:    '0 16px 40px rgba(0,0,0,0.5)',
                padding:      '12px 0 24px',
              }}
            >
              {/* Decorative top accent line */}
              <div
                style={{
                  height:     '2px',
                  background: 'linear-gradient(90deg, transparent, var(--mustard), transparent)',
                  marginBottom: '8px',
                }}
              />

              {/* Nav links */}
              <ul
                role="list"
                style={{ listStyle: 'none', margin: 0, padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '2px' }}
              >
                {NAV_LINKS.map((link, idx) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.22 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          display:        'flex',
                          alignItems:     'center',
                          gap:            '14px',
                          minHeight:      '52px',
                          padding:        '0 16px',
                          fontFamily:     'Inter, sans-serif',
                          fontSize:       '1rem',
                          fontWeight:     isActive ? 600 : 400,
                          letterSpacing:  '0.03em',
                          color:          isActive ? 'var(--mustard)' : 'rgba(255,255,255,0.9)',
                          textDecoration: 'none',
                          borderRadius:   '10px',
                          background:     isActive ? 'rgba(232,160,32,0.1)' : 'transparent',
                          borderLeft:     isActive ? '3px solid var(--mustard)' : '3px solid transparent',
                          transition:     'all 0.18s ease',
                        }}
                      >
                        {/* Icon */}
                        <span
                          style={{
                            fontSize:   '1.1rem',
                            width:      '24px',
                            textAlign:  'center',
                            flexShrink: 0,
                            opacity:    isActive ? 1 : 0.6,
                          }}
                        >
                          {link.icon}
                        </span>

                        {/* Label */}
                        <span style={{ flex: 1 }}>{link.label}</span>

                        {/* Active chevron */}
                        {isActive && (
                          <span style={{ color: 'var(--mustard)', fontSize: '0.8rem', opacity: 0.7 }}>
                            ›
                          </span>
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Divider */}
              <div
                style={{
                  height:  '1px',
                  background: 'rgba(255,255,255,0.07)',
                  margin: '14px 24px',
                }}
              />

              {/* Reserve CTA */}
              <div style={{ padding: '0 24px' }}>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    gap:            '8px',
                    width:          '100%',
                    minHeight:      '52px',
                    background:     'var(--terracotta)',
                    color:          'white',
                    fontFamily:     'Inter, sans-serif',
                    fontWeight:     700,
                    fontSize:       '0.9rem',
                    letterSpacing:  '0.06em',
                    textTransform:  'uppercase',
                    textDecoration: 'none',
                    borderRadius:   '10px',
                    boxShadow:      '0 4px 16px rgba(192,73,43,0.4)',
                    transition:     'opacity 0.2s ease',
                  }}
                >
                  🍽️ Reserve a Table
                </Link>
              </div>

              {/* Location footnote */}
              <p
                style={{
                  textAlign:   'center',
                  marginTop:   '16px',
                  fontSize:    '0.72rem',
                  color:       'rgba(255,255,255,0.3)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding:     '0 24px',
                }}
              >
                Karaikudi · Chettinad · Tamil Nadu
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
