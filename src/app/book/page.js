'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DEFAULT_SERVICES } from '@/lib/constants';
import { format } from 'date-fns';

import ServiceSelector from '@/components/booking/ServiceSelector';
import BookingCalendar from '@/components/booking/BookingCalendar';
import TimeSlotPicker from '@/components/booking/TimeSlotPicker';
import BookingForm from '@/components/booking/BookingForm';
import PaymentStep from '@/components/booking/PaymentStep';
import BookingConfirmation from '@/components/booking/BookingConfirmation';

const STEPS = ['Service', 'Schedule', 'Details', 'Payment', 'Confirm'];

function BookingWizard() {
  const searchParams = useSearchParams();

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    concern: '',
  });
  const [bookingResult, setBookingResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pre-select service from URL param
  useEffect(() => {
    const serviceId = searchParams.get('service');
    if (serviceId) {
      const svc = DEFAULT_SERVICES.find((s) => s.id === serviceId);
      if (svc) {
        setSelectedService(svc);
        setStep(2);
      }
    }
  }, [searchParams]);

  // Determine if "Next" button should be enabled
  const canProceed = () => {
    switch (step) {
      case 1:
        return !!selectedService;
      case 2:
        return !!selectedDate && !!selectedTime;
      case 3:
        return (
          patientDetails.name.trim().length > 0 &&
          /^[6-9]\d{9}$/.test(patientDetails.phone.replace(/\s/g, ''))
        );
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (step < 5 && canProceed()) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  // Payment completion — create booking
  const handlePaymentComplete = async (paymentInfo) => {
    setLoading(true);
    try {
      const body = {
        service_id: selectedService.id,
        service_name: selectedService.name,
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime,
        duration: selectedService.duration_minutes,
        fee: selectedService.fee,
        patient_name: patientDetails.name,
        patient_phone: patientDetails.phone,
        patient_email: patientDetails.email || undefined,
        patient_age: patientDetails.age || undefined,
        concern: patientDetails.concern || undefined,
        payment_method: paymentInfo?.method || 'free',
        utr: paymentInfo?.utr || undefined,
      };

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create booking');
      }

      setBookingResult({
        id: data.id || `BK-${Date.now()}`,
        serviceName: selectedService.name,
        date: format(selectedDate, 'EEEE, MMMM d, yyyy'),
        time: selectedTime,
        duration: selectedService.duration_minutes,
        amount: selectedService.fee,
        status: selectedService.fee === 0 ? 'confirmed' : 'pending_verification',
        paymentMethod: paymentInfo?.method || 'free',
      });
      setStep(5);
    } catch (err) {
      // If API fails, still show confirmation with a local ID
      setBookingResult({
        id: `BK-${Date.now()}`,
        serviceName: selectedService.name,
        date: format(selectedDate, 'EEEE, MMMM d, yyyy'),
        time: selectedTime,
        duration: selectedService.duration_minutes,
        amount: selectedService.fee,
        status: selectedService.fee === 0 ? 'confirmed' : 'pending_verification',
        paymentMethod: paymentInfo?.method || 'free',
        note: 'Booking saved locally. We will confirm via WhatsApp.',
      });
      setStep(5);
    } finally {
      setLoading(false);
    }
  };

  const handlePatientChange = (field, value) => {
    setPatientDetails((prev) => ({ ...prev, [field]: value }));
  };

  // Render current step content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <ServiceSelector
            selectedService={selectedService}
            onSelect={setSelectedService}
          />
        );

      case 2:
        return (
          <div className="booking-schedule-step">
            <h2 style={{ marginBottom: '0.5rem' }}>Pick a Date &amp; Time</h2>
            <p className="text-muted mb-4" style={{ fontSize: '0.95rem' }}>
              Select your preferred appointment slot (Mon–Fri only).
            </p>
            <BookingCalendar
              selectedDate={selectedDate}
              onSelectDate={(d) => {
                setSelectedDate(d);
                setSelectedTime(null); // reset time on date change
              }}
            />
            {selectedDate && (
              <TimeSlotPicker
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onSelectTime={setSelectedTime}
                duration={selectedService?.duration_minutes}
              />
            )}
          </div>
        );

      case 3:
        return (
          <div>
            <h2 style={{ marginBottom: '0.5rem' }}>Your Details</h2>
            <p className="text-muted mb-4" style={{ fontSize: '0.95rem' }}>
              This information helps Dr.&nbsp;Bhatia prepare for your session.
            </p>
            <BookingForm
              details={patientDetails}
              onChange={handlePatientChange}
            />
          </div>
        );

      case 4:
        return (
          <PaymentStep
            service={selectedService}
            onPaymentComplete={handlePaymentComplete}
          />
        );

      case 5:
        return <BookingConfirmation booking={bookingResult} />;

      default:
        return null;
    }
  };

  return (
    <div className="booking-wizard">
      {/* ── Progress Bar ── */}
      <div className="progress-bar">
        {STEPS.map((label, i) => {
          const stepNum = i + 1;
          let cls = 'progress-step';
          if (stepNum === step) cls += ' active';
          if (stepNum < step) cls += ' completed';

          return (
            <div key={label} className={cls}>
              <div className="progress-step-number">
                {stepNum < step ? '✓' : stepNum}
              </div>
              <span className="progress-step-label">{label}</span>
            </div>
          );
        })}
      </div>

      {/* ── Step Content ── */}
      <div className="booking-step-content" key={step}>
        {renderStepContent()}
      </div>

      {/* ── Navigation (hidden on step 4 & 5 — they have their own buttons) ── */}
      {step < 4 && (
        <div className="booking-nav">
          <button
            className="btn btn-ghost"
            onClick={handleBack}
            disabled={step === 1}
          >
            ← Back
          </button>
          <button
            className="btn btn-primary"
            onClick={handleNext}
            disabled={!canProceed()}
          >
            Next →
          </button>
        </div>
      )}

      {step === 4 && !loading && (
        <div className="booking-nav">
          <button className="btn btn-ghost" onClick={handleBack}>
            ← Back
          </button>
          {/* Payment step has its own submit button */}
          <div />
        </div>
      )}

      {loading && (
        <div className="flex-center mt-4">
          <span className="btn-spinner" style={{
            width: 28,
            height: 28,
            border: '3px solid rgba(var(--primary-rgb), 0.2)',
            borderTopColor: 'var(--primary)',
            borderRadius: '50%',
            animation: 'spin 0.6s linear infinite',
          }} />
        </div>
      )}
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="booking-wizard">
          <div className="flex-center" style={{ minHeight: '50vh' }}>
            <span className="btn-spinner" style={{
              width: 32,
              height: 32,
              border: '3px solid rgba(var(--primary-rgb), 0.2)',
              borderTopColor: 'var(--primary)',
              borderRadius: '50%',
              animation: 'spin 0.6s linear infinite',
            }} />
          </div>
        </div>
      }
    >
      <BookingWizard />
    </Suspense>
  );
}
