export const CLINIC_NAME = 'Sukoon Psychiatry';
export const CLINIC_TAGLINE = 'Peace of mind, one session at a time';
export const CLINIC_PHONE = process.env.NEXT_PUBLIC_CLINIC_PHONE || 'PLACEHOLDER_NUMBER';
export const CLINIC_EMAIL = process.env.NEXT_PUBLIC_CLINIC_EMAIL || 'contact@sukoonpsychiatry.in';
export const CLINIC_WHATSAPP = process.env.NEXT_PUBLIC_CLINIC_WHATSAPP || 'PLACEHOLDER_NUMBER';
export const CLINIC_UPI_ID = process.env.NEXT_PUBLIC_CLINIC_UPI_ID || 'aditibhatia926@oksbi';
export const CLINIC_ADDRESS = 'Lucknow, Uttar Pradesh, India';

export const DOCTOR_NAME = 'Dr. Aditi Bhatia';
export const DOCTOR_QUALIFICATIONS = 'MBBS, MD - Psychiatry';
export const DOCTOR_EXPERIENCE = '8+ years';
export const DOCTOR_BIO = 'Dr. Aditi Bhatia is an expert and experienced psychiatrist with over 8 years of clinical practice. Specializing in Psychiatry, Dr. Bhatia is fluent in English and Hindi, and provides compassionate, evidence-based care in a comfortable and holistic environment, ensuring complete recovery for every patient.';

export const BOOKING_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no_show',
};

export const PAYMENT_STATUSES = {
  UNPAID: 'unpaid',
  PENDING_VERIFICATION: 'pending_verification',
  PAID: 'paid',
  REFUNDED: 'refunded',
};

export const WORKING_HOURS = {
  morning: { start: '10:00', end: '13:00' },
  afternoon: { start: '16:00', end: '19:00' },
};

export const SLOT_DURATION = 30;

export const EMERGENCY_HELPLINES = [
  { name: 'NIMHANS', phone: '080-46110007' },
  { name: 'iCall', phone: '9152987821' },
  { name: 'Vandrevala Foundation', phone: '1860-2662-345' },
];

export const DEFAULT_SERVICES = [
  {
    id: 'srv-free-intro',
    name: 'Free Intro Call',
    description: 'A brief introductory call to understand your needs and see if we are a good fit.',
    duration_minutes: 15,
    fee: 0,
    sort_order: 0,
    is_active: true,
    icon: 'users',
  },
  {
    id: 'srv-initial',
    name: 'Initial Consultation',
    description: 'Comprehensive psychiatric assessment for new patients including detailed history, evaluation, and treatment planning.',
    duration_minutes: 45,
    fee: 1000,
    sort_order: 1,
    is_active: true,
    icon: 'stethoscope',
  },
  {
    id: 'srv-followup',
    name: 'Follow-up Session',
    description: 'Regular follow-up for ongoing patients to track progress and adjust treatment.',
    duration_minutes: 20,
    fee: 500,
    sort_order: 2,
    is_active: true,
    icon: 'clipboard',
  },
  {
    id: 'srv-medication',
    name: 'Medication Review',
    description: 'Quick session focused on medication adjustment and side-effect management.',
    duration_minutes: 15,
    fee: 400,
    sort_order: 3,
    is_active: true,
    icon: 'pill',
  },
  {
    id: 'srv-extended',
    name: 'Extended Session',
    description: 'In-depth session for complex cases requiring detailed discussion.',
    duration_minutes: 60,
    fee: 1500,
    sort_order: 4,
    is_active: true,
    icon: 'brain',
  },
];
