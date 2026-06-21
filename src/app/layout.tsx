// ============================================================
// Root Layout — Srimathi Karaikudi Chettinad Restaurant
// Wraps all pages with Navbar, Footer, and WhatsApp button.
// ============================================================

import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Srimathi Karaikudi Chettinad Restaurant | Authentic Chettinad Cuisine',
  description:
    'Experience the bold, aromatic flavours of authentic Chettinad cuisine at Srimathi Karaikudi. Traditional recipes, freshly ground spices, and warm South Indian hospitality.',
  keywords: 'Chettinad restaurant, Karaikudi food, South Indian cuisine, Nattu Kozhi, authentic spices',
  openGraph: {
    title: 'Srimathi Karaikudi Chettinad Restaurant',
    description: 'Bold, aromatic flavours straight from the kitchens of Karaikudi.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Global Navigation */}
        <Navbar />

        {/* Page Content */}
        <main>{children}</main>

        {/* Global Footer */}
        <Footer />

        {/* Floating WhatsApp Button — visible on all pages */}
        <WhatsAppButton phoneNumber="919876543210" />
      </body>
    </html>
  );
}
