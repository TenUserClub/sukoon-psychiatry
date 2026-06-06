import { Plus_Jakarta_Sans, Inter, Lora } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['italic'],
  variable: '--font-accent',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Sukoon Psychiatry — Online Psychiatry Consultation with Dr. Aditi Bhatia',
    template: '%s | Sukoon Psychiatry',
  },
  description:
    'Book online psychiatry consultations with Dr. Aditi Bhatia (MBBS, MD - Psychiatry). Expert psychiatric care, medication management, and telepsychiatry from Lucknow, India. Compassionate, evidence-based treatment.',
  keywords: [
    'psychiatrist', 'online psychiatry', 'telepsychiatry', 'Dr. Aditi Bhatia',
    'Lucknow psychiatrist', 'mental health', 'psychiatric consultation',
    'medication management', 'anxiety', 'depression', 'MBBS MD Psychiatry',
  ],
  authors: [{ name: 'Sukoon Psychiatry' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Sukoon Psychiatry — Online Psychiatry Consultation',
    description: 'Expert psychiatric care with Dr. Aditi Bhatia. Book your session today.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Sukoon Psychiatry',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Sukoon Psychiatry',
    description:
      'Online psychiatry consultations with Dr. Aditi Bhatia, MBBS, MD - Psychiatry.',
    medicalSpecialty: ['Psychiatry'],
    priceRange: '₹₹',
    availableService: [
      { '@type': 'MedicalTherapy', name: 'Psychiatric Consultation' },
      { '@type': 'MedicalTherapy', name: 'Online Therapy' },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lucknow',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    areaServed: { '@type': 'Country', name: 'India' },
    founder: {
      '@type': 'Person',
      name: 'Dr. Aditi Bhatia',
      jobTitle: 'Psychiatrist',
      description: 'MBBS, MD - Psychiatry, 8+ years experience',
    },
  };

  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} ${lora.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Lucknow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ThemeSwitcher />
        </ThemeProvider>
      </body>
    </html>
  );
}
