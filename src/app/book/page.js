'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DEFAULT_SERVICES } from '@/lib/constants';
import { format } from 'date-fns';

import SVGIcon from '@/components/ui/SVGIcon';
import ServiceSelector from '@/components/booking/ServiceSelector';
import BookingCalendar from '@/components/booking/BookingCalendar';
import TimeSlotPicker from '@/components/booking/TimeSlotPicker';
import BookingForm from '@/components/booking/BookingForm';
import PaymentStep from '@/components/booking/PaymentStep';
import BookingConfirmation from '@/components/booking/BookingConfirmation';

const STEPS = ['Choose & Schedule', 'Details & Pay', 'Done'];

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
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pre-select service from URL param
  useEffect(() => {
    const serviceId = searchParams.get('service');
    if (serviceId) {
      const svc = DEFAULT_SERVICES.find((s) => s.id === serviceId);
      if (svc) {
        setSelectedService(svc);
      }
    }
  }, [searchParams]);

  // Step 1 is valid when service + date + time are all selected
  const canProceedStep1 = () => {
    return !!selectedService && !!selectedDate && !!selectedTime;
  };

  // Step 2 validation - name and phone required
  const canProceedStep2 = () => {
    return (
      patientDetails.name.trim().length > 0 &&
      /^[6-9]\d{9}$/.test(patientDetails.phone.replace(/\s/g, ''))
    );
  };

  const handleNext = () => {
    if (step === 1 && canProceedStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  // Payment completion - create booking
  const handlePaymentComplete = async (paymentInfo) => {
    if (!canProceedStep2()) return;
    setLoading(true);
    try {
      const body = {
        service_id: selectedService.id,
        service: selectedService.name,
        appointment_date: format(selectedDate, 'yyyy-MM-dd'),
        appointment_time: selectedTime,
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
        id: data.booking?.id || `BK-${Date.now()}`,
        serviceName: selectedService.name,
        date: format(selectedDate, 'EEEE, MMMM d, yyyy'),
        isoDate: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime,
        duration: selectedService.duration_minutes,
        amount: selectedService.fee,
        status: selectedService.fee === 0 ? 'confirmed' : 'pending_verification',
        paymentMethod: paymentInfo?.method || 'free',
      });
      setStep(3);
    } catch (err) {
      alert(`Booking Failed: ${err.message}. Please try again or contact us via WhatsApp.`);
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
          <div>
            <ServiceSelector
              selectedService={selectedService}
              onSelect={(svc) => {
                setSelectedService(svc);
                setSelectedDate(null);
                setSelectedTime(null);
              }}
            />

            {selectedService && (
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>Pick a Date & Time</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Select your preferred appointment slot.
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(280px, 1fr) minmax(200px, 1fr)',
                  gap: '2rem',
                }}>
                  <BookingCalendar
                    selectedDate={selectedDate}
                    onSelectDate={(d) => {
                      setSelectedDate(d);
                      setSelectedTime(null);
                    }}
                  />
                  {selectedDate ? (
                    <TimeSlotPicker
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                      onSelectTime={setSelectedTime}
                      duration={selectedService?.duration_minutes}
                    />
                  ) : (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-muted)',
                      fontSize: '0.9rem',
                      padding: '2rem',
                    }}>
                      <SVGIcon name="calendar" size={18} style={{ marginRight: '0.5rem', opacity: 0.5 }} />
                      Select a date to see available times
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div>
            {/* Booking summary chip */}
            <div
              className="card"
              style={{
                marginBottom: '1.5rem',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                background: 'rgba(var(--primary-rgb), 0.04)',
                borderColor: 'var(--primary)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <SVGIcon name={selectedService.icon} size={18} />
                <span className="font-semibold">{selectedService.name}</span>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <SVGIcon name="calendar" size={14} style={{ marginRight: '0.25rem' }} />
                {format(selectedDate, 'EEE, MMM d')}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <SVGIcon name="clock" size={14} style={{ marginRight: '0.25rem' }} />
                {selectedTime}
              </span>
              {selectedService.fee > 0 && (
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  <SVGIcon name="rupee" size={14} style={{ marginRight: '0.25rem' }} />
                  {selectedService.fee.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Patient form */}
            <BookingForm
              details={patientDetails}
              onChange={handlePatientChange}
              showMore={showMoreDetails}
              onToggleMore={() => setShowMoreDetails((v) => !v)}
            />

            {/* Payment inline */}
            <div style={{ marginTop: '2rem' }}>
              <PaymentStep
                service={selectedService}
                onPaymentComplete={handlePaymentComplete}
              />
            </div>
          </div>
        );

      case 3:
        return <BookingConfirmation booking={bookingResult} />;

      default:
        return null;
    }
  };

  return (
    <div className="booking-wizard" style={{ maxWidth: '900px' }}>
      {/* Progress Bar */}
      <div className="progress-bar">
        {STEPS.map((label, i) => {
          const stepNum = i + 1;
          let cls = 'progress-step';
          if (stepNum === step) cls += ' active';
          if (stepNum < step) cls += ' completed';

          return (
            <div key={label} className={cls}>
              <div className="progress-step-number">
                {stepNum < step ? (
                  <SVGIcon name="check" size={14} />
                ) : (
                  stepNum
                )}
              </div>
              <span className="progress-step-label">{label}</span>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="booking-step-content" key={step}>
        {renderStepContent()}
      </div>

      {/* Navigation */}
      {step === 1 && (
        <div className="booking-nav">
          <div />
          <button
            className="btn btn-primary"
            onClick={handleNext}
            disabled={!canProceedStep1()}
          >
            Next
            <SVGIcon name="arrow-right" size={16} style={{ marginLeft: '0.5rem' }} />
          </button>
        </div>
      )}

      {step === 2 && !loading && (
        <div className="booking-nav">
          <button className="btn btn-ghost" onClick={handleBack}>
            Back
          </button>
          {/* Payment step handles submit */}
          <div />
        </div>
      )}

      {loading && (
        <div className="flex-center mt-4">
          <span
            className="btn-spinner"
            style={{
              width: 28,
              height: 28,
              border: '3px solid rgba(var(--primary-rgb), 0.2)',
              borderTopColor: 'var(--primary)',
              borderRadius: '50%',
              animation: 'spin 0.6s linear infinite',
            }}
          />
        </div>
      )}
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="booking-wizard" style={{ maxWidth: '900px' }}>
          <div className="flex-center" style={{ minHeight: '50vh' }}>
            <span
              className="btn-spinner"
              style={{
                width: 32,
                height: 32,
                border: '3px solid rgba(var(--primary-rgb), 0.2)',
                borderTopColor: 'var(--primary)',
                borderRadius: '50%',
                animation: 'spin 0.6s linear infinite',
              }}
            />
          </div>
        </div>
      }
    >
      <BookingWizard />
    </Suspense>
  );
}
