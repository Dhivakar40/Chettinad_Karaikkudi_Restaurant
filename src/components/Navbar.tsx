'use client';

// ============================================================
// Navbar Component
// Responsive navigation with transparent→dark scroll effect.
// Mobile: hamburger menu with slide-down overlay.
// ============================================================

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { href: '/',              label: 'Home'         },
  { href: '/about',         label: 'Our Story'    },
  { href: '/menu',          label: 'Menu'         },
  { href: '/gallery',       label: 'Gallery'      },
  { href: '/testimonials',  label: 'Reviews'      },
  { href: '/contact',       label: 'Contact'      },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Detect scroll to apply dark navbar background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`navbar ${scrolled ? 'scrolled' : 'transparent'}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo / Brand */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: 'var(--mustard)',
                  letterSpacing: '0.02em',
                }}
              >
                Srimathi
              </span>
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.65rem',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.75)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                Karaikudi Chettinad
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul
            role="list"
            style={{
              display: 'flex',
              gap: '32px',
              listStyle: 'none',
              alignItems: 'center',
            }}
            className="hidden md:flex"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.9rem',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'var(--mustard)' : 'rgba(255,255,255,0.88)',
                      textDecoration: 'none',
                      letterSpacing: '0.04em',
                      transition: 'color 0.25s ease',
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

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="btn-primary hidden md:inline-flex"
            style={{ padding: '10px 22px', fontSize: '0.82rem' }}
          >
            Reserve a Table
          </Link>

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-toggle"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
            }}
            className="md:hidden"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '24px',
                  height: '2px',
                  background: 'white',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease',
                  transformOrigin: 'center',
                  transform:
                    mobileOpen
                      ? i === 0
                        ? 'translateY(7px) rotate(45deg)'
                        : i === 2
                        ? 'translateY(-7px) rotate(-45deg)'
                        : 'scaleX(0)'
                      : 'none',
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              top: '72px',
              left: 0,
              right: 0,
              zIndex: 99,
              background: 'rgba(59, 31, 14, 0.98)',
              backdropFilter: 'blur(16px)',
              padding: '24px',
              borderBottom: '1px solid rgba(232, 160, 32, 0.2)',
            }}
          >
            <ul role="list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {NAV_LINKS.map((link, idx) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 }}
                >
                  <Link
                    href={link.href}
                    style={{
                      display: 'block',
                      padding: '14px 16px',
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '1.25rem',
                      color: pathname === link.href ? 'var(--mustard)' : 'white',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      background: pathname === link.href ? 'rgba(232,160,32,0.12)' : 'transparent',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="btn-primary"
              style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}
            >
              Reserve a Table
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
