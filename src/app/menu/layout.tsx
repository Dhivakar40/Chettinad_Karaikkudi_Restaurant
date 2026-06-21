import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Menu | Srimathi Karaikudi Chettinad Restaurant',
  description:
    'Explore our full menu of authentic Chettinad dishes — Soups, Starters, Main Course, Breads, Biryani, Desserts, and more. Filter by category and find your next favourite.',
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
