import Link from 'next/link';
import Hero from '@/components/landing/Hero';
import ServicesPreview from '@/components/landing/ServicesPreview';
import HowItWorks from '@/components/landing/HowItWorks';
import DoctorProfile from '@/components/landing/DoctorProfile';
import TestimonialCard from '@/components/landing/TestimonialCard';
import FAQ from '@/components/landing/FAQ';

/**
 * Landing page — assembles all sections into the main marketing page.
 * This is a server component; interactive parts (Hero, Testimonials, FAQ)
 * are isolated client components.
 */
export default function Home() {
  return (
    <>
      {/* Hero banner */}
      <Hero />

      {/* Services overview */}
      <section id="services">
        <ServicesPreview />
      </section>

      {/* Step-by-step booking guide */}
      <HowItWorks />

      {/* Doctor credentials & bio */}
      <section id="doctor">
        <DoctorProfile />
      </section>

      {/* Patient testimonials */}
      <section id="testimonials" className="section">
        <div className="container">
          <h2 className="section-title">What Our Patients Say</h2>
          <p className="section-subtitle">
            Real experiences from patients who found their peace of mind with
            Sukoon Psychiatry.
          </p>
          <TestimonialCard />
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section id="faq" className="section">
        <div className="container">
          <FAQ />
        </div>
      </section>

      {/* Bottom CTA strip */}
      <div className="cta-strip">
        <div className="container">
          <h2>Ready to take the first step?</h2>
          <p>
            Book a consultation with Dr. Aditi Bhatia and start your journey
            towards better mental health today.
          </p>
          <Link href="/book" className="btn btn-lg">
            Book Your Session →
          </Link>
        </div>
      </div>
    </>
  );
}
