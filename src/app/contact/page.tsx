'use client';

// ============================================================
// Contact Us Page
// Sections: Contact Form, Address + Hours, Google Maps embed,
//           WhatsApp integration note.
// ============================================================

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';

// ── Hours Data ─────────────────────────────────────────────
const HOURS = [
  { day: 'Monday',          open: true,  time: '11:00 AM – 10:30 PM' },
  { day: 'Tuesday',         open: true,  time: '11:00 AM – 10:30 PM' },
  { day: 'Wednesday',       open: true,  time: '11:00 AM – 10:30 PM' },
  { day: 'Thursday',        open: true,  time: '11:00 AM – 10:30 PM' },
  { day: 'Friday',          open: true,  time: '11:00 AM – 11:00 PM' },
  { day: 'Saturday',        open: true,  time: '10:00 AM – 11:00 PM' },
  { day: 'Sunday',          open: true,  time: '10:00 AM – 10:00 PM' },
];

// ── Contact Form Component ──────────────────────────────────
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    guests: '2',
    message: '',
    occasion: 'Regular Dining',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate async submission — replace with real API call (e.g. Formspree, Resend)
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: '#E8F5E0',
          border: '1px solid #4CAF50',
          borderRadius: '10px',
          padding: '48px 32px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
        <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#2E7D32', fontSize: '1.5rem', marginBottom: '12px' }}>
          Reservation Request Received!
        </h3>
        <p style={{ color: '#388E3C', lineHeight: 1.7, marginBottom: '20px' }}>
          Thank you, <strong>{formData.name}</strong>! We will confirm your reservation by phone or WhatsApp within 2 hours.
          <br />
          If it is urgent, please call us directly at +91 98765 43210.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="btn-outline"
          style={{ borderColor: '#4CAF50', color: '#2E7D32' }}
        >
          Make Another Reservation
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Reservation and contact form"
      style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
    >
      {/* Name + Phone */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px' }}>
        <div>
          <label htmlFor="name" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--darkbrown)', marginBottom: '6px', letterSpacing: '0.04em' }}>
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-input"
            placeholder="Your full name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--darkbrown)', marginBottom: '6px', letterSpacing: '0.04em' }}>
            Phone Number *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="form-input"
            placeholder="+91 98765 43210"
            required
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--darkbrown)', marginBottom: '6px', letterSpacing: '0.04em' }}>
          Email Address
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          className="form-input"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      {/* Date + Guests */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px' }}>
        <div>
          <label htmlFor="date" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--darkbrown)', marginBottom: '6px', letterSpacing: '0.04em' }}>
            Preferred Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            className="form-input"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div>
          <label htmlFor="guests" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--darkbrown)', marginBottom: '6px', letterSpacing: '0.04em' }}>
            Number of Guests
          </label>
          <select
            id="guests"
            name="guests"
            className="form-input"
            value={formData.guests}
            onChange={handleChange}
          >
            {['1', '2', '3', '4', '5', '6–10', '10–20', '20+'].map((n) => (
              <option key={n} value={n}>{n} guest{n === '1' ? '' : 's'}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Occasion */}
      <div>
        <label htmlFor="occasion" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--darkbrown)', marginBottom: '6px', letterSpacing: '0.04em' }}>
          Occasion
        </label>
        <select
          id="occasion"
          name="occasion"
          className="form-input"
          value={formData.occasion}
          onChange={handleChange}
        >
          {['Regular Dining', 'Birthday Celebration', 'Anniversary', 'Business Lunch', 'Wedding Event', 'Family Reunion', 'Other'].map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--darkbrown)', marginBottom: '6px', letterSpacing: '0.04em' }}>
          Special Requests or Message
        </label>
        <textarea
          id="message"
          name="message"
          className="form-input"
          placeholder="Any dietary restrictions, seating preferences, or special requests..."
          rows={4}
          value={formData.message}
          onChange={handleChange}
          style={{ resize: 'vertical', minHeight: '100px' }}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        id="contact-submit-btn"
        disabled={loading}
        className="btn-primary"
        style={{
          justifyContent: 'center',
          opacity: loading ? 0.75 : 1,
          cursor: loading ? 'wait' : 'pointer',
        }}
      >
        {loading ? (
          <>
            <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
            Sending...
          </>
        ) : (
          'Send Reservation Request'
        )}
      </button>

      <p style={{ fontSize: '0.75rem', color: 'var(--warmwood)', fontStyle: 'italic' }}>
        * We will confirm via phone or WhatsApp within 2 hours. For same-day reservations, please call us directly.
      </p>
    </form>
  );
}

// ── Main Contact Page ──────────────────────────────────────
export default function ContactPage() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const currentHour = new Date().getHours();
  const isCurrentlyOpen = currentHour >= 11 && currentHour < 22;

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
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
            We'd love to welcome you
          </motion.p>
          <motion.h1
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', marginBottom: '12px' }}
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }}>
            Contact & Reservations
          </motion.h1>
          {/* Live Open/Closed Indicator */}
          <motion.div
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.35 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}
          >
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: isCurrentlyOpen ? '#4CAF50' : '#EF5350',
                boxShadow: isCurrentlyOpen ? '0 0 0 3px rgba(76,175,80,0.25)' : '0 0 0 3px rgba(239,83,80,0.25)',
                animation: isCurrentlyOpen ? 'pulse-green 2s infinite' : 'none',
                display: 'inline-block',
              }}
            />
            <span style={{ color: isCurrentlyOpen ? '#81C784' : '#EF9A9A', fontSize: '0.9rem', fontWeight: 500 }}>
              {isCurrentlyOpen ? 'Open Now' : 'Currently Closed'} · {today}
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content ──────────────────────────────────── */}
      <section style={{ background: 'var(--cream)', padding: '80px 24px' }}>
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
          }}
        >
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: 'var(--darkbrown)', marginBottom: '8px' }}>
              Reserve Your Table
            </h2>
            <p style={{ color: 'var(--warmwood)', marginBottom: '28px', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Fill in the form below and we'll confirm your reservation within 2 hours.
            </p>
            <ContactForm />
          </motion.div>

          {/* Right: Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
          >
            {/* Address */}
            <div style={{ background: 'white', borderRadius: '10px', padding: '28px', boxShadow: '0 2px 16px rgba(59,31,14,0.08)', borderLeft: '4px solid var(--terracotta)' }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: 'var(--darkbrown)', marginBottom: '14px' }}>
                📍 Find Us
              </h3>
              <p style={{ color: '#5C3420', lineHeight: 1.8, fontSize: '0.9rem' }}>
                42, Rajaji Street,<br />
                Near Town Bus Stand,<br />
                Karaikudi – 630 001,<br />
                Tamil Nadu, India
              </p>
              <a
                href="https://maps.google.com/?q=Karaikudi+Tamil+Nadu"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ marginTop: '16px', display: 'inline-flex', fontSize: '0.8rem', padding: '8px 18px' }}
              >
                Open in Google Maps ↗
              </a>
            </div>

            {/* Phone & Email */}
            <div style={{ background: 'white', borderRadius: '10px', padding: '28px', boxShadow: '0 2px 16px rgba(59,31,14,0.08)', borderLeft: '4px solid var(--mustard)' }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: 'var(--darkbrown)', marginBottom: '14px' }}>
                📞 Call or WhatsApp
              </h3>
              <p style={{ color: '#5C3420', lineHeight: 2, fontSize: '0.9rem' }}>
                <a href="tel:+919876543210" style={{ color: 'var(--terracotta)', fontWeight: 600, textDecoration: 'none', display: 'block' }}>+91 98765 43210</a>
                <a href="tel:+914565123456" style={{ color: 'var(--warmwood)', textDecoration: 'none', display: 'block' }}>+91 4565 123456 (Landline)</a>
                <a href="mailto:hello@srimathikaraikudi.com" style={{ color: 'var(--warmwood)', textDecoration: 'none', display: 'block' }}>hello@srimathikaraikudi.com</a>
              </p>
            </div>

            {/* Hours */}
            <div style={{ background: 'white', borderRadius: '10px', padding: '28px', boxShadow: '0 2px 16px rgba(59,31,14,0.08)', borderLeft: '4px solid var(--warmwood)' }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: 'var(--darkbrown)', marginBottom: '14px' }}>
                🕐 Opening Hours
              </h3>
              <ul role="list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {HOURS.map((h) => {
                  const isToday = h.day === today;
                  return (
                    <li
                      key={h.day}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.85rem',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        background: isToday ? 'rgba(192,73,43,0.07)' : 'transparent',
                        border: isToday ? '1px solid rgba(192,73,43,0.2)' : '1px solid transparent',
                      }}
                    >
                      <span style={{ fontWeight: isToday ? 700 : 400, color: isToday ? 'var(--terracotta)' : 'var(--darkbrown)' }}>
                        {h.day} {isToday && '(Today)'}
                      </span>
                      <span style={{ color: h.open ? '#5C3420' : '#999' }}>
                        {h.open ? h.time : 'Closed'}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* WhatsApp Quick Note */}
            <div
              style={{
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                borderRadius: '10px',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div style={{ fontSize: '2rem' }}>💬</div>
              <div>
                <h4 style={{ fontFamily: 'Inter, sans-serif', color: 'white', fontWeight: 700, marginBottom: '4px', fontSize: '0.95rem' }}>
                  Quick Reservation via WhatsApp
                </h4>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem', lineHeight: 1.6, marginBottom: '12px' }}>
                  Tap the WhatsApp button (bottom-right corner) to send us a message directly. We respond in minutes!
                </p>
                <a
                  href="https://wa.me/919876543210?text=Hello!%20I%20would%20like%20to%20make%20a%20reservation."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'white',
                    color: '#25D366',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    padding: '8px 16px',
                    borderRadius: '50px',
                    textDecoration: 'none',
                  }}
                >
                  Open WhatsApp →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Google Maps Embed ──────────────────────────────── */}
      <section style={{ height: '420px', position: 'relative', background: 'var(--warmwood)' }}>
        {/* 
          REPLACE the div below with a real Google Maps embed:
          <iframe 
            src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE" 
            width="100%" height="420" style="border:0;" 
            allowFullScreen loading="lazy"
          />
        */}
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, var(--warmwood), var(--darkbrown))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div className="athangudi-bg" style={{ position: 'absolute', inset: 0, opacity: 0.1 }} />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🗺️</div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', fontStyle: 'italic' }}>
              [Google Maps Embed Placeholder]
            </p>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', marginTop: '8px' }}>
              42, Rajaji Street, Karaikudi – 630 001, Tamil Nadu
            </p>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', marginTop: '4px' }}>
              Replace this placeholder with a Google Maps iframe embed code
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
