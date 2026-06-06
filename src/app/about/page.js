import Link from 'next/link';
import {
  DOCTOR_NAME,
  DOCTOR_QUALIFICATIONS,
  DOCTOR_EXPERIENCE,
  DOCTOR_BIO,
  CLINIC_ADDRESS,
} from '@/lib/constants';

export const metadata = {
  title: 'About Dr. Aditi Bhatia',
  description:
    'Learn about Dr. Aditi Bhatia — MBBS, MD Psychiatry with 8+ years of experience. Compassionate, evidence-based psychiatric care at Sukoon Psychiatry, Lucknow.',
};

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="about-hero">
        <div className="container">
          <h1 className="animate-fade-in-up">About Dr.&nbsp;Bhatia</h1>
          <p className="hero-subtitle animate-fade-in-up delay-1">
            Compassionate, evidence-based psychiatric care — because your mental
            health deserves the best.
          </p>
        </div>
      </section>

      {/* ── PROFILE SECTION ── */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            {/* Doctor visual */}
            <div className="about-photo-col animate-fade-in-up">
              <div className="about-photo-wrapper">
                <div className="doctor-avatar-placeholder">
                  <span role="img" aria-label="Doctor">👩‍⚕️</span>
                </div>
              </div>
              <div className="about-name-card card text-center mt-3">
                <h3>{DOCTOR_NAME}</h3>
                <p className="text-sm text-muted">{DOCTOR_QUALIFICATIONS}</p>
                <div className="flex-center gap-2 mt-2">
                  <span className="badge badge-info">{DOCTOR_EXPERIENCE}</span>
                  <span className="badge badge-success">Accepting Patients</span>
                </div>
              </div>
            </div>

            {/* Qualifications + bio */}
            <div className="about-info-col animate-fade-in-up delay-2">
              <h2 className="mb-3">Qualifications &amp; Background</h2>
              <p className="mb-3" style={{ lineHeight: 1.8 }}>
                {DOCTOR_BIO}
              </p>

              <div className="about-stats-row">
                <div className="about-stat card card-hover text-center">
                  <span className="about-stat-icon">🎓</span>
                  <h4>MBBS, MD</h4>
                  <p className="text-sm text-muted">Psychiatry</p>
                </div>
                <div className="about-stat card card-hover text-center">
                  <span className="about-stat-icon">⏱️</span>
                  <h4>{DOCTOR_EXPERIENCE}</h4>
                  <p className="text-sm text-muted">Clinical Practice</p>
                </div>
                <div className="about-stat card card-hover text-center">
                  <span className="about-stat-icon">🌐</span>
                  <h4>English &amp; Hindi</h4>
                  <p className="text-sm text-muted">Languages</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <h2 className="section-title">Professional Journey</h2>
          <p className="section-subtitle">
            A path built on rigorous training and deep empathy
          </p>

          <div className="timeline" style={{ maxWidth: 600, margin: '0 auto' }}>
            <div className="timeline-item animate-fade-in-up">
              <h4>MBBS</h4>
              <p className="text-muted text-sm">
                Medical foundation — Built a strong clinical knowledge base
                through comprehensive undergraduate medical training, developing
                the diagnostic skills essential for understanding the body-mind
                connection.
              </p>
            </div>

            <div className="timeline-item animate-fade-in-up delay-1">
              <h4>MD — Psychiatry</h4>
              <p className="text-muted text-sm">
                Specialized training — Deep-dived into the science of mental
                health through rigorous postgraduate education, mastering
                psychopharmacology, psychotherapy, and modern psychiatric
                assessment techniques.
              </p>
            </div>

            <div className="timeline-item animate-fade-in-up delay-2">
              <h4>8+ Years of Practice</h4>
              <p className="text-muted text-sm">
                Clinical expertise — Over eight years of hands-on patient care
                across diverse clinical settings, treating conditions from
                anxiety and depression to complex psychiatric disorders with a
                holistic, patient-centred approach.
              </p>
            </div>

            <div className="timeline-item animate-fade-in-up delay-3">
              <h4>RML Hospital, Lucknow</h4>
              <p className="text-muted text-sm">
                Current practice — Presently based at one of Lucknow&apos;s most
                respected medical institutions, providing both in-person and
                online consultations to ensure accessible care for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TREATMENT PHILOSOPHY ── */}
      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <h2 className="section-title">Treatment Philosophy</h2>
          <p className="section-subtitle">
            Healing is a partnership, not a prescription
          </p>

          <div className="card" style={{ padding: '2.5rem' }}>
            <p style={{ lineHeight: 1.9, marginBottom: '1.25rem' }}>
              At Sukoon Psychiatry, we believe that every patient is unique and
              deserves a treatment plan tailored to their individual needs.
              Dr.&nbsp;Bhatia combines evidence-based pharmacotherapy with
              empathetic counselling to address the root causes — not just the
              symptoms — of mental health conditions.
            </p>
            <p style={{ lineHeight: 1.9, marginBottom: '1.25rem' }}>
              Our consultations are built on <strong>trust</strong>,{' '}
              <strong>confidentiality</strong>, and{' '}
              <strong>zero judgement</strong>. Whether you are dealing with
              anxiety, depression, insomnia, OCD, or any other psychiatric
              concern, you will find a safe space to share and heal.
            </p>
            <p
              className="font-accent"
              style={{
                fontSize: '1.15rem',
                color: 'var(--primary)',
                borderLeft: '3px solid var(--primary)',
                paddingLeft: '1rem',
                marginTop: '1.5rem',
              }}
            >
              &ldquo;I don&apos;t just treat illness — I help people rediscover
              their peace of mind.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY PSYCHIATRY ── */}
      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <h2 className="section-title">Why a Psychiatrist?</h2>
          <p className="section-subtitle">
            Understanding the difference matters for your care
          </p>

          <div className="about-comparison-grid">
            <div className="card card-hover">
              <h4 style={{ marginBottom: '0.75rem' }}>
                🩺 Psychiatrist <span className="badge badge-info" style={{ marginLeft: '0.5rem' }}>Dr.&nbsp;Bhatia</span>
              </h4>
              <ul className="about-list">
                <li>Medical doctor (MBBS + MD)</li>
                <li>Can prescribe &amp; manage medication</li>
                <li>Trained in both therapy &amp; pharmacology</li>
                <li>Diagnoses complex psychiatric conditions</li>
                <li>Manages medication side-effects</li>
              </ul>
            </div>
            <div className="card card-hover">
              <h4 style={{ marginBottom: '0.75rem' }}>🧠 Psychologist</h4>
              <ul className="about-list">
                <li>Non-medical (MA / PhD in Psychology)</li>
                <li>Cannot prescribe medication</li>
                <li>Focuses on talk therapy &amp; counselling</li>
                <li>Psychological testing &amp; assessment</li>
                <li>Great for therapy-only needs</li>
              </ul>
            </div>
          </div>

          <p
            className="text-center text-muted mt-4"
            style={{ fontSize: '0.95rem' }}
          >
            Both professionals play vital roles. If you need medication
            management alongside therapy, a psychiatrist is the right choice.
          </p>
        </div>
      </section>

      {/* ── LANGUAGES ── */}
      <section className="section">
        <div className="container text-center">
          <h2 className="section-title">Languages We Speak</h2>
          <p className="section-subtitle">
            Communicate in the language you&apos;re most comfortable with
          </p>
          <div className="flex-center gap-3" style={{ flexWrap: 'wrap' }}>
            <div className="card card-hover" style={{ padding: '1.5rem 2.5rem', textAlign: 'center' }}>
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>🇬🇧</span>
              <h4>English</h4>
            </div>
            <div className="card card-hover" style={{ padding: '1.5rem 2.5rem', textAlign: 'center' }}>
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>🇮🇳</span>
              <h4>Hindi</h4>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-strip">
        <h2>Ready to Begin Your Healing Journey?</h2>
        <p>
          Book a session with Dr.&nbsp;Bhatia — your first step towards peace of
          mind.
        </p>
        <Link href="/book" className="btn btn-lg">
          Book a Session with Dr.&nbsp;Bhatia
        </Link>
      </section>
    </>
  );
}
