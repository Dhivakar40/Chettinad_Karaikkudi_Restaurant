'use client';

// ============================================================
// Footer Component
// Three-column layout: Brand, Quick Links, Opening Hours.
// Includes "Designed by Alloyed" credit.
// ============================================================

import Link from 'next/link';
import { motion } from 'framer-motion';

const QUICK_LINKS = [
  { href: '/',              label: 'Home'         },
  { href: '/about',         label: 'Our Story'    },
  { href: '/menu',          label: 'Full Menu'    },
  { href: '/gallery',       label: 'Gallery'      },
  { href: '/testimonials',  label: 'Reviews'      },
  { href: '/contact',       label: 'Contact Us'   },
];

const HOURS = [
  { day: 'Monday – Friday',  time: '11:00 AM – 10:30 PM' },
  { day: 'Saturday',         time: '10:00 AM – 11:00 PM' },
  { day: 'Sunday',           time: '10:00 AM – 10:00 PM' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--darkbrown)',
        color: 'rgba(255,255,255,0.8)',
        paddingTop: '64px',
      }}
    >
      {/* Tile-pattern divider at top */}
      <div
        style={{
          height: '4px',
          background: 'linear-gradient(90deg, var(--terracotta), var(--mustard), var(--terracotta))',
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '64px 24px 40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '48px',
        }}
      >
        {/* Column 1: Brand */}
        <div>
          <div style={{ marginBottom: '16px' }}>
            <h3
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.5rem',
                color: 'var(--mustard)',
                marginBottom: '4px',
              }}
            >
              Srimathi
            </h3>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              Karaikudi Chettinad Restaurant
            </p>
          </div>
          <p
            style={{
              fontSize: '0.875rem',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.6)',
              maxWidth: '280px',
            }}
          >
            Bringing the bold, aromatic flavours of Chettinad to your table. Every dish is a celebration of our heritage, crafted with love and freshly ground spices.
          </p>
          {/* Social icons row (placeholders) */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            {['Facebook', 'Instagram', 'Zomato'].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(232,160,32,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--mustard)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'var(--mustard)';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--darkbrown)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--mustard)';
                }}
              >
                {s[0]}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--mustard)',
              marginBottom: '20px',
            }}
          >
            Quick Links
          </h4>
          <ul role="list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    color: 'rgba(255,255,255,0.65)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.2s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--mustard)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.65)')}
                >
                  <span style={{ color: 'var(--terracotta)', fontSize: '0.6rem' }}>▶</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Hours & Contact */}
        <div>
          <h4
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--mustard)',
              marginBottom: '20px',
            }}
          >
            Opening Hours
          </h4>
          <ul role="list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {HOURS.map((h) => (
              <li
                key={h.day}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                }}
              >
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                  {h.day}
                </span>
                <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)' }}>
                  {h.time}
                </span>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a
              href="tel:+919876543210"
              style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem' }}
            >
              📞 +91 98765 43210
            </a>
            <a
              href="mailto:hello@srimathikaraikudi.com"
              style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.85rem' }}
            >
              ✉️ hello@srimathikaraikudi.com
            </a>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
              📍 42, Rajaji Street, Karaikudi,<br />
              Tamil Nadu – 630 001
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '20px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
          © {currentYear} Srimathi Karaikudi Chettinad Restaurant. All rights reserved.
        </p>
        {/* ↓ Required credit to Alloyed */}
        <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>
          Designed with ♥ by{' '}
          <span style={{ color: 'var(--mustard)', fontWeight: 600 }}>Alloyed</span>
        </p>
      </div>
    </footer>
  );
}
