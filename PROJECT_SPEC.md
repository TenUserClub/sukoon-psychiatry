# Sukoon Psychiatry — Complete Project Specification

> **This document is the single source of truth for the entire project.**
> It contains every decision, feature, schema, design spec, and implementation detail needed to build the website from scratch. No prior conversation context is required.

---

## 1. Project Overview

**What:** A professional, soothing telepsychiatry website for **Dr. Aditi Bhatia** — enabling online patient booking, payments, scheduling, virtual consultations, WhatsApp notifications, and an AI scheduling chatbot.

**Who:** Dr. Aditi Bhatia, a solo psychiatrist (MBBS, MD - Psychiatry) based in Lucknow, India.

**Why:** The doctor wants her own exclusive online presence (separate from any marketplace platform) to accept patients online, collect payments, schedule video consultations, and practice telepsychiatry independently.

**Brand Name:** **Sukoon Psychiatry** (सुकून — Hindi/Urdu for "peace/comfort")

---

## 2. Doctor Profile

| Field | Value |
|:---|:---|
| **Name** | Dr. Aditi Bhatia |
| **Qualifications** | MBBS, MD - Psychiatry |
| **Experience** | 8 years |
| **Current Practice** | RML, Lucknow |
| **Languages** | English, Hindi |
| **Specialization** | Psychiatry |
| **WhatsApp Number** | `PLACEHOLDER_NUMBER` *(owner will replace before production)* |
| **UPI ID** | `PLACEHOLDER_UPI_ID` *(owner will replace before production)* |

### Bio (for the website)
> Dr. Aditi Bhatia is an expert and experienced psychiatrist with over 8 years of clinical practice. Specializing in Psychiatry, she is currently based at RML, Lucknow. Dr. Bhatia is fluent in English and Hindi, and provides compassionate, evidence-based care in a comfortable and holistic environment, ensuring complete recovery for every patient.

---

## 3. All Decisions (Locked)

| Area | Decision | Details |
|:---|:---|:---|
| **Framework** | Next.js 15 (App Router) | SSR, API routes, Vercel-native |
| **Styling** | Vanilla CSS + CSS Custom Properties | No Tailwind. Full control, theme switching via CSS variables |
| **Database** | Supabase (Free Tier) | Auth + DB + Storage, 500MB, 50K MAUs |
| **Auth** | Supabase Auth | Email/password for admin dashboard only |
| **Payment (Primary)** | UPI QR + manual UTR verification | ₹0 cost — patient scans QR, enters UTR, admin verifies |
| **Payment (Fallback)** | Razorpay | ~2% + GST per card/net-banking transaction, auto-confirmed |
| **Video Calls** | Google Meet links | Free, familiar, calendar-synced |
| **Email** | Resend (Free: 3K emails/month) | Booking confirmations, reminders |
| **WhatsApp (Layer 1)** | Pre-filled `wa.me` share links | ₹0 — buttons on confirmation page & contact page |
| **WhatsApp (Layer 2)** | Twilio WhatsApp API | Automated clinic→patient notifications (~₹0.50/msg) |
| **AI Chatbot** | Gemini API (free tier) + Vercel AI SDK | Floating scheduling assistant with tool calling |
| **Deployment** | Vercel (Free Tier) | Auto-deploy from Git, SSL, CDN |
| **Themes** | 3 soothing palettes + switcher | For client to preview and pick one, then remove switcher |
| **Scope** | Psychiatry only (Phase 1) | Architecture supports multi-doctor, multi-specialty later |
| **Doctors** | Solo (Dr. Bhatia) | DB schema supports multi-doctor expansion |

---

## 4. Tech Stack & Dependencies

```
Core:
- next@15 (App Router)
- react@19
- react-dom@19

Database:
- @supabase/supabase-js
- @supabase/ssr (for server-side auth)

Payments:
- razorpay (server-side SDK)

AI Chatbot:
- ai (Vercel AI SDK)
- @ai-sdk/google (Gemini provider)

WhatsApp:
- twilio (Node.js SDK)

Email:
- resend

Utilities:
- qrcode (for generating UPI QR codes)
- date-fns (date formatting/manipulation)
```

---

## 5. Design System — 3 Soothing Theme Palettes

The website must use CSS Custom Properties (`--variable`) for theming. A floating `ThemeSwitcher` component (bottom-left) lets the client toggle between themes during the selection phase. Once a theme is finalized, the switcher is removed and the palette is hardcoded.

### Design Principles
- Generous whitespace and breathing room
- Soft rounded corners (12–16px border-radius)
- Subtle, warm shadows (no harsh drop shadows)
- Gentle gradient backgrounds
- Micro-animations: fade-in on scroll, smooth hover transitions, subtle floating elements
- Glass-morphism for navigation bar and floating cards
- Nature-inspired organic decorative SVG shapes
- Mobile-first responsive design
- Typography: "Plus Jakarta Sans" (headings, 600-700), "Inter" (body, 400-500), "Lora" (italic quotes/testimonials)

### Theme 1: "Sage Garden" 🌿
```css
[data-theme="sage"] {
  --primary: #4A7C6F;
  --primary-light: #6BA898;
  --primary-dark: #2D5A4E;
  --secondary: #7B8EC8;
  --accent: #E8C87A;
  --bg: #F7F5F0;
  --surface: #FFFFFF;
  --text: #2C3E3A;
  --text-muted: #6B7B76;
  --error: #C75B5B;
  --success: #5BAE8C;
}
```

### Theme 2: "Ocean Breeze" 🌊
```css
[data-theme="ocean"] {
  --primary: #4E8098;
  --primary-light: #6FA8BC;
  --primary-dark: #2E5A6A;
  --secondary: #90B8C0;
  --accent: #D4A574;
  --bg: #F5F7FA;
  --surface: #FFFFFF;
  --text: #2A3544;
  --text-muted: #6B7A8A;
  --error: #C75B5B;
  --success: #5BAE8C;
}
```

### Theme 3: "Lavender Dusk" 🌸
```css
[data-theme="lavender"] {
  --primary: #7C6FAA;
  --primary-light: #9B8DC4;
  --primary-dark: #5A4E82;
  --secondary: #B8A9D4;
  --accent: #D4956A;
  --bg: #F8F5F9;
  --surface: #FFFFFF;
  --text: #3A2E4A;
  --text-muted: #7A6E8A;
  --error: #C75B5B;
  --success: #5BAE8C;
}
```

---

## 6. Database Schema (Supabase / PostgreSQL)

```sql
-- ============================================================
-- DOCTOR PROFILE
-- ============================================================
CREATE TABLE doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  qualifications TEXT,
  specializations TEXT[],
  bio TEXT,
  photo_url TEXT,
  email TEXT,
  phone TEXT,
  whatsapp_number TEXT DEFAULT 'PLACEHOLDER_NUMBER',
  upi_id TEXT DEFAULT 'PLACEHOLDER_UPI_ID',
  consultation_fees JSONB,       -- {"initial": 1000, "followup": 500, ...}
  google_calendar_id TEXT,       -- For Google Calendar sync
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- WEEKLY AVAILABILITY (recurring template)
-- ============================================================
CREATE TABLE availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
  day_of_week INT NOT NULL,      -- 0=Sunday, 1=Monday ... 6=Saturday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  slot_duration_minutes INT DEFAULT 30,
  is_active BOOLEAN DEFAULT true
);

-- ============================================================
-- BLOCKED DATES (holidays, leave, one-off blocks)
-- ============================================================
CREATE TABLE blocked_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
  blocked_date DATE NOT NULL,
  reason TEXT
);

-- ============================================================
-- SERVICES (consultation types & fees)
-- ============================================================
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,              -- "Initial Consultation", "Follow-up", etc.
  description TEXT,
  duration_minutes INT DEFAULT 30,
  fee DECIMAL(10,2) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0
);

-- ============================================================
-- BOOKINGS (the core table)
-- ============================================================
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID REFERENCES doctors(id),
  service_id UUID REFERENCES services(id),
  -- Patient info
  patient_name TEXT NOT NULL,
  patient_email TEXT,
  patient_phone TEXT NOT NULL,
  patient_age INT,
  concern TEXT,                     -- Brief description of issue
  -- Appointment
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  duration_minutes INT DEFAULT 30,
  status TEXT DEFAULT 'pending',    -- pending | confirmed | completed | cancelled | no_show
  -- Payment
  payment_status TEXT DEFAULT 'unpaid',  -- unpaid | pending_verification | paid | refunded
  payment_method TEXT,              -- 'upi_manual' | 'razorpay'
  payment_utr TEXT,                 -- 12-digit UTR for manual UPI verification
  payment_amount DECIMAL(10,2),
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  -- Consultation
  meeting_link TEXT,                -- Google Meet link
  doctor_notes TEXT,                -- Private clinical notes (admin only)
  -- Notification tracking
  whatsapp_sent BOOLEAN DEFAULT false,
  email_sent BOOLEAN DEFAULT false,
  reminder_sent BOOLEAN DEFAULT false,
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CONTACT FORM MESSAGES
-- ============================================================
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- AI CHATBOT SESSIONS
-- ============================================================
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id TEXT,                  -- Browser session ID
  messages JSONB DEFAULT '[]',      -- [{role, content, timestamp}, ...]
  booking_id UUID REFERENCES bookings(id),  -- If chat led to a booking
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Default Seed Data

```sql
-- Insert Dr. Bhatia's profile
INSERT INTO doctors (name, qualifications, specializations, bio, whatsapp_number, upi_id)
VALUES (
  'Dr. Aditi Bhatia',
  'MBBS, MD - Psychiatry',
  ARRAY['Psychiatry'],
  'Dr. Aditi Bhatia is an expert and experienced psychiatrist with over 8 years of clinical practice. Specializing in Psychiatry, she is currently based at RML, Lucknow. Dr. Bhatia is fluent in English and Hindi, and provides compassionate, evidence-based care in a comfortable and holistic environment.',
  'PLACEHOLDER_NUMBER',
  'PLACEHOLDER_UPI_ID'
);

-- Insert default services
INSERT INTO services (name, description, duration_minutes, fee, sort_order) VALUES
  ('Free Intro Call', 'A brief introductory call to understand your needs and see if we are a good fit.', 15, 0, 0),
  ('Initial Consultation', 'Comprehensive psychiatric assessment for new patients including detailed history, evaluation, and treatment planning.', 45, 1000, 1),
  ('Follow-up Session', 'Regular follow-up for ongoing patients to track progress and adjust treatment.', 20, 500, 2),
  ('Medication Review', 'Quick session focused on medication adjustment and side-effect management.', 15, 400, 3),
  ('Extended Session', 'In-depth session for complex cases requiring detailed discussion.', 60, 1500, 4);

-- Insert default availability (Mon-Fri, 10AM-1PM and 4PM-7PM, 30-min slots)
-- (Generate for day_of_week 1-5)
INSERT INTO availability (doctor_id, day_of_week, start_time, end_time, slot_duration_minutes)
SELECT d.id, dow, start_t::TIME, end_t::TIME, 30
FROM doctors d,
     (VALUES (1, '10:00', '13:00'), (1, '16:00', '19:00'),
             (2, '10:00', '13:00'), (2, '16:00', '19:00'),
             (3, '10:00', '13:00'), (3, '16:00', '19:00'),
             (4, '10:00', '13:00'), (4, '16:00', '19:00'),
             (5, '10:00', '13:00'), (5, '16:00', '19:00'))
     AS slots(dow, start_t, end_t)
WHERE d.name = 'Dr. Aditi Bhatia';
```

---

## 7. Project Structure

```
sukoon-psychiatry/
├── public/
│   ├── images/                     # Doctor photo, decorative SVGs, OG image
│   │   └── placeholder-doctor.jpg  # Placeholder until real photo provided
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.js                  # Root layout: fonts, metadata, theme provider, chatbot
│   │   ├── page.js                    # Landing page
│   │   ├── globals.css                # Complete design system + 3 theme palettes
│   │   │
│   │   ├── about/
│   │   │   └── page.js               # Dr. Bhatia's profile, qualifications, approach
│   │   │
│   │   ├── services/
│   │   │   └── page.js               # Service cards with fees + "Book This" buttons
│   │   │
│   │   ├── book/
│   │   │   └── page.js               # Multi-step booking flow (5 steps)
│   │   │
│   │   ├── contact/
│   │   │   └── page.js               # Contact form, WhatsApp link, map, emergency numbers
│   │   │
│   │   ├── admin/
│   │   │   ├── layout.js             # Admin layout with sidebar nav + auth guard
│   │   │   ├── page.js               # Dashboard overview (today's appointments, stats)
│   │   │   ├── bookings/
│   │   │   │   └── page.js           # All bookings list + UTR verification buttons
│   │   │   ├── availability/
│   │   │   │   └── page.js           # Set weekly schedule + block dates
│   │   │   ├── services/
│   │   │   │   └── page.js           # Add/edit/disable service types & fees
│   │   │   ├── messages/
│   │   │   │   └── page.js           # Contact form submissions
│   │   │   └── login/
│   │   │       └── page.js           # Admin login (Supabase Auth)
│   │   │
│   │   └── api/
│   │       ├── bookings/
│   │       │   └── route.js          # GET (list/filter), POST (create), PATCH (update status)
│   │       ├── availability/
│   │       │   └── route.js          # GET (fetch slots for date), POST/PUT (set schedule)
│   │       ├── services/
│   │       │   └── route.js          # CRUD for services
│   │       ├── payment/
│   │       │   ├── create-order/
│   │       │   │   └── route.js      # POST: create Razorpay order
│   │       │   └── verify/
│   │       │       └── route.js      # POST: verify Razorpay signature / UTR submission
│   │       ├── chat/
│   │       │   └── route.js          # POST: AI chatbot streaming endpoint (Vercel AI SDK)
│   │       ├── contact/
│   │       │   └── route.js          # POST: save contact form message
│   │       └── whatsapp/
│   │           ├── send/
│   │           │   └── route.js      # POST: send Twilio WhatsApp notification
│   │           └── webhook/
│   │               └── route.js      # POST: receive Twilio incoming message webhook
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.js             # Glass-morphism nav with smooth scroll
│   │   │   ├── Footer.js             # Links, socials, emergency helplines
│   │   │   └── AdminSidebar.js       # Admin dashboard sidebar nav
│   │   │
│   │   ├── landing/
│   │   │   ├── Hero.js               # Hero section with CTA, gradient bg, floating shapes
│   │   │   ├── ServicesPreview.js     # Service cards grid on landing page
│   │   │   ├── HowItWorks.js         # 3-step visual: Book → Pay → Consult
│   │   │   ├── DoctorProfile.js      # Brief doctor intro with credentials
│   │   │   ├── TestimonialCard.js    # Anonymous testimonial carousel
│   │   │   └── FAQ.js                # Accordion FAQ section
│   │   │
│   │   ├── booking/
│   │   │   ├── BookingCalendar.js    # Date picker showing available dates
│   │   │   ├── TimeSlotPicker.js     # Available time slots for selected date
│   │   │   ├── BookingForm.js        # Patient details form
│   │   │   ├── PaymentStep.js        # UPI QR + UTR input + Razorpay fallback toggle
│   │   │   ├── UpiQrCode.js          # Dynamic UPI QR code generator
│   │   │   └── BookingConfirmation.js # Success screen + WhatsApp share + calendar add
│   │   │
│   │   ├── chat/
│   │   │   └── ChatBot.js            # Floating AI chatbot bubble + chat window
│   │   │
│   │   ├── ui/
│   │   │   ├── ThemeSwitcher.js      # Floating theme preview panel (temporary)
│   │   │   ├── WhatsAppButton.js     # Pre-filled WhatsApp link button component
│   │   │   ├── Button.js             # Reusable button component
│   │   │   ├── Card.js               # Reusable card component
│   │   │   ├── Input.js              # Reusable input component
│   │   │   ├── Modal.js              # Reusable modal component
│   │   │   └── Badge.js              # Status badge component
│   │   │
│   │   └── admin/
│   │       ├── BookingTable.js       # Sortable/filterable booking list
│   │       ├── BookingVerify.js      # UTR verification UI (✅ Verify / ❌ Reject)
│   │       ├── AvailabilityEditor.js # Weekly schedule editor
│   │       ├── BlockDatePicker.js    # Block specific dates
│   │       ├── ServiceEditor.js      # Add/edit service cards
│   │       └── StatsCards.js         # Dashboard stat widgets
│   │
│   └── lib/
│       ├── supabase/
│       │   ├── client.js             # Browser Supabase client
│       │   └── server.js             # Server-side Supabase client (for API routes)
│       ├── razorpay.js               # Razorpay order creation & signature verification
│       ├── email.js                  # Resend: send booking confirmation, reminder emails
│       ├── twilio.js                 # Twilio: send WhatsApp messages (utility templates)
│       ├── whatsapp-links.js         # Generate pre-filled wa.me links for share buttons
│       ├── chatbot-tools.js          # AI SDK tool definitions (checkAvailability, getServices, createBooking, getClinicInfo)
│       ├── upi.js                    # Generate UPI deep links & QR code data
│       ├── themes.js                 # Theme names, labels, and CSS variable maps
│       ├── slots.js                  # Compute available slots for a given date (availability - existing bookings - blocked dates)
│       └── constants.js              # Shared constants (site name, contact info, defaults)
│
├── .env.local                         # All API keys (NEVER committed to git)
├── .env.example                       # Template showing required env vars
├── package.json
├── next.config.js
├── jsconfig.json                      # Path aliases (@/components, @/lib, etc.)
├── PROJECT_SPEC.md                    # THIS FILE
└── README.md                          # Setup instructions for developers
```

---

## 8. Page-by-Page Feature Specification

### 8.1 Landing Page (`/`)

| Section | Details |
|:---|:---|
| **Navbar** | Glass-morphism, logo + "Sukoon", links: Home, About, Services, Book, Contact. Sticky. Mobile hamburger. |
| **Hero** | Full-width gradient (primary → secondary), Dr. Bhatia's name + tagline ("Find your Sukoon — peace of mind, one session at a time"), floating organic SVG shapes, CTA button "Book Your Session". Gentle fade-in animation. |
| **Services Preview** | 3-4 cards showing top services (Initial, Follow-up, Extended) with icons, duration, fee, "Book Now" link. Hover lift animation. |
| **How It Works** | 3 numbered steps with icons: 1) Choose Your Session → 2) Pay Securely → 3) Meet on Google Meet. Connected by a dotted line animation. |
| **Doctor Intro** | Photo (or placeholder), qualifications badge (MBBS, MD), brief 2-line bio, "Learn More" link to /about. Emphasize "Psychiatrist (not psychologist)" — they can prescribe medication. |
| **Testimonials** | 3 anonymized testimonials in a carousel. Soft card design with quote marks. Lora italic font for quotes. |
| **FAQ** | 5-6 expandable accordion items. Topics: "What is the difference between a psychiatrist and psychologist?", "How does online consultation work?", "Is my information confidential?", "What payment methods do you accept?", "Can you prescribe medication online?", "What if I need to cancel?" |
| **CTA Strip** | Full-width colored band: "Ready to take the first step?" + "Book Now" button. |
| **Footer** | Clinic name, contact info, WhatsApp link, quick links, "In case of emergency" helpline numbers (NIMHANS, iCall, Vandrevala Foundation). |
| **Floating Elements** | AI Chatbot bubble (bottom-right), Theme Switcher (bottom-left, temporary). |

### 8.2 About Page (`/about`)

- Large doctor photo (or professional illustration placeholder)
- Qualifications timeline (MBBS → MD Psychiatry → 8 years practice → RML Lucknow)
- Treatment philosophy paragraph
- "Why Psychiatry?" section — explains the difference between psychiatry and psychology (doctor's own concern from the original conversation: psychiatrists do MBBS + MD, can prescribe medication, whereas psychologists/therapists may not be licensed)
- Languages spoken: English, Hindi
- CTA: "Book a Session with Dr. Bhatia"

### 8.3 Services Page (`/services`)

- Grid of service cards, each showing:
  - Service icon (stethoscope, chat, pill, clock, etc.)
  - Service name
  - Description (2-3 sentences)
  - Duration
  - Fee in ₹
  - "Book This" button → links to `/book?service=<service_id>`
- Special highlight card for "Free Intro Call" (₹0, 15 min) if enabled
- Note at bottom: "All fees are configurable and may change. Prices shown are in Indian Rupees (₹)."

### 8.4 Booking Page (`/book`) — Multi-Step Flow

A **5-step wizard** with a progress bar at the top:

**Step 1: Select Service**
- If arrived via `/book?service=X`, pre-select that service
- Otherwise show service cards/dropdown to pick from
- Show duration + fee for selected service

**Step 2: Pick Date & Time**
- Calendar component showing the current month
- Dates with no available slots are greyed out
- Clicking a date shows available time slots below
- Slots are computed from: `availability` table − `existing bookings` − `blocked_dates`
- Timezone: IST (Asia/Kolkata) — hardcoded since the doctor is India-based

**Step 3: Your Details**
- Patient name (required)
- Phone number (required, Indian format validation)
- Email (optional but recommended)
- Age (optional)
- "What brings you here?" / Brief concern (textarea, optional, max 500 chars)
- Privacy note: "Your information is kept strictly confidential."

**Step 4: Payment**
```
┌────────────────────────────────────────────────┐
│  Pay ₹1,000 for Initial Consultation           │
│                                                │
│  ┌────────────────────┐                        │
│  │   [UPI QR CODE]    │  Scan with any UPI app │
│  │                    │  GPay, PhonePe, Paytm   │
│  └────────────────────┘                        │
│  UPI ID: PLACEHOLDER_UPI_ID  [📋 Copy]         │
│                                                │
│  After paying, enter your transaction reference:│
│  ┌────────────────────────────────┐            │
│  │ UTR / Transaction ID: _______ │            │
│  └────────────────────────────────┘            │
│  [✅ I've Paid — Submit Booking]               │
│                                                │
│  ─────────── or ───────────                    │
│                                                │
│  [💳 Pay with Card / Net Banking]              │
│  (powered by Razorpay — auto-confirmed)        │
│                                                │
│  For Free Intro Call: skip payment entirely     │
└────────────────────────────────────────────────┘
```

**Step 5: Confirmation**
- Booking reference ID
- Summary: service, date, time, payment status
- If UPI: "Your booking is confirmed once payment is verified (usually within 1 hour)"
- If Razorpay: "Payment confirmed! You're all set."
- If Free Intro: "Booking confirmed!"
- Google Meet link (if payment already confirmed) or "Meet link will be sent upon verification"
- Buttons:
  - "📲 Share on WhatsApp" → pre-filled wa.me link with booking details
  - "📅 Add to Calendar" → downloads .ics file
  - "🏠 Back to Home"
- Twilio sends automated WhatsApp confirmation to patient's phone

### 8.5 Contact Page (`/contact`)

- Contact form: name, email, phone, message → saves to `contact_messages` table
- Clinic info card: address (RML, Lucknow), phone, email
- Google Maps embed (RML Hospital, Lucknow)
- "💬 Chat on WhatsApp" button → opens wa.me link
- Working hours display (from availability data)
- Emergency helplines section:
  - NIMHANS: 080-46110007
  - iCall: 9152987821
  - Vandrevala Foundation: 1860-2662-345

### 8.6 Admin Dashboard (`/admin`) — Auth Protected

All admin pages require Supabase Auth login. Single admin user (Dr. Bhatia).

**Dashboard Home (`/admin`)**
- Today's appointments (list with status badges)
- Pending UTR verifications count (highlighted)
- This week's bookings count
- This month's revenue (sum of verified payments)
- Unread contact messages count

**Bookings (`/admin/bookings`)**
- Table: Patient Name | Service | Date | Time | Status | Payment | Actions
- Filter by: status, payment_status, date range
- Actions per booking:
  - ✅ Verify Payment (for pending UTR)
  - ❌ Reject Payment
  - ✔️ Mark Completed
  - 🚫 Mark Cancelled / No-Show
  - 📝 Add Doctor Notes
  - 📲 Resend WhatsApp notification
  - 🔗 Generate/View Meet Link

**Availability (`/admin/availability`)**
- Weekly grid: Mon-Sun, each day has time slot rows
- Toggle slots on/off
- Set slot duration (15/20/30/45/60 min)
- "Block Date" section: calendar to pick dates + reason field

**Services (`/admin/services`)**
- List of all services
- Edit name, description, duration, fee
- Toggle active/inactive
- Reorder (drag or sort_order)
- Add new service

**Messages (`/admin/messages`)**
- List of contact form submissions
- Mark as read/unread
- Quick reply via WhatsApp link

### 8.7 AI Chatbot (Floating Component)

- **Trigger:** Floating circular bubble (bottom-right) with subtle pulse animation + "Need help?" tooltip
- **Open state:** Chat window (350px wide, 500px tall) with:
  - Header: "Sukoon Assistant" + close button
  - Message area with chat bubbles (bot = left, user = right)
  - Text input + send button
- **Initial greeting:** "Hi! 👋 I'm the Sukoon Assistant. I can help you book an appointment, check availability, or answer questions about Dr. Bhatia's practice. How can I help?"
- **LLM:** Gemini API (free tier) via Vercel AI SDK
- **System prompt:** Friendly, warm, professional. Knows about Dr. Bhatia, services, fees. Uses tool-calling for live data.

**Tool Functions (Vercel AI SDK `tools`):**
```javascript
tools: {
  checkAvailability: {
    description: "Check available appointment slots for a given date",
    parameters: { date: "YYYY-MM-DD" },
    // Calls GET /api/availability?date=YYYY-MM-DD
  },
  getServices: {
    description: "Get all available services with fees and durations",
    parameters: {},
    // Calls GET /api/services
  },
  getClinicInfo: {
    description: "Get clinic information like address, hours, contact details",
    parameters: {},
    // Returns hardcoded clinic info from constants
  },
  initiateBooking: {
    description: "Start the booking process — redirect user to booking page",
    parameters: { serviceId: "UUID", date: "YYYY-MM-DD", time: "HH:MM" },
    // Returns a link to /book?service=X&date=Y&time=Z
  }
}
```

- The chatbot does NOT collect payment or complete bookings — it redirects to the booking page for that.

---

## 9. Payment Flows (Detailed)

### 9a. UPI QR (Primary — Free)

```
Patient                          Website                        Admin
  │                                │                              │
  ├─ Selects service + slot ──────►│                              │
  │                                ├─ Displays UPI QR + UPI ID    │
  │                                │                              │
  ├─ Pays via UPI app ────────────►│ (external, not through us)   │
  │                                │                              │
  ├─ Enters 12-digit UTR ────────►│                              │
  │                                ├─ Creates booking:            │
  │                                │   status=pending             │
  │                                │   payment_status=            │
  │                                │     pending_verification     │
  │                                │   payment_utr=XXXXXXXXXXXX   │
  │                                │                              │
  │                                ├─ Sends email + WhatsApp ────►│ (notification to admin)
  │                                │   "New booking, verify UTR"  │
  │                                │                              │
  │                                │                              ├─ Opens admin dashboard
  │                                │                              ├─ Checks UPI app for UTR match
  │                                │                              ├─ Clicks ✅ Verify
  │                                │                              │
  │                                ├─ Updates:                    │
  │                                │   payment_status=paid        │
  │                                │   status=confirmed           │
  │                                │   meeting_link=<generated>   │
  │                                │                              │
  │◄─ WhatsApp: "Confirmed!" ─────┤                              │
  │   + Google Meet link           │                              │
```

### 9b. Razorpay (Fallback — ~2% fee)

```
Patient                          Website                     Razorpay
  │                                │                            │
  ├─ Clicks "Pay with Card" ──────►│                            │
  │                                ├─ POST /api/payment/create ─►│
  │                                │◄─ order_id ────────────────┤
  │                                │                            │
  │◄─ Razorpay checkout modal ─────┤                            │
  ├─ Completes payment ───────────►│                            │
  │                                │◄─ payment_id + signature ──┤
  │                                │                            │
  │                                ├─ POST /api/payment/verify  │
  │                                │   (verify signature)       │
  │                                │                            │
  │                                ├─ Creates booking:          │
  │                                │   status=confirmed         │
  │                                │   payment_status=paid      │
  │                                │   payment_method=razorpay  │
  │                                │   meeting_link=<generated> │
  │                                │                            │
  │◄─ Confirmation + Meet link ────┤                            │
  │◄─ WhatsApp: "Confirmed!" ─────┤                            │
```

---

## 10. WhatsApp Flows

### 10a. Pre-filled Share Links (Layer 1 — Free)

Generate `wa.me` links with URL-encoded text:

```
Booking Confirmation share:
https://wa.me/?text=✅%20Booking%20Confirmed!%0A%0A🏥%20Sukoon%20Psychiatry%0A👩‍⚕️%20Dr.%20Aditi%20Bhatia%0A📋%20Initial%20Consultation%0A📅%20June%205,%202026%0A🕐%2010:30%20AM%20IST%0A💰%20₹1,000%20(Pending%20Verification)%0A%0ABooking%20ID:%20ABC123

Contact page "Chat with us":
https://wa.me/PLACEHOLDER_NUMBER?text=Hi%20Dr.%20Bhatia,%20I'd%20like%20to%20inquire%20about%20a%20consultation.
```

### 10b. Twilio Automated Messages (Layer 2)

**Message templates to create in Twilio:**

1. **booking_confirmation**
   ```
   ✅ Booking Confirmed — Sukoon Psychiatry

   Hi {{1}},
   Your appointment with Dr. Aditi Bhatia is booked!

   📋 {{2}}
   📅 {{3}}
   🕐 {{4}}
   💰 ₹{{5}} — {{6}}

   Booking ID: {{7}}

   We'll send you the Google Meet link once payment is verified.

   — Sukoon Psychiatry
   ```

2. **payment_verified**
   ```
   ✅ Payment Verified — Sukoon Psychiatry

   Hi {{1}},
   Your payment of ₹{{2}} has been verified!

   📹 Join your session here:
   {{3}}

   📅 {{4}} at {{5}}

   See you soon!
   — Dr. Aditi Bhatia
   ```

3. **appointment_reminder**
   ```
   ⏰ Reminder — Sukoon Psychiatry

   Hi {{1}},
   Your appointment with Dr. Bhatia is in 1 hour.

   📹 Google Meet: {{2}}
   🕐 {{3}}

   — Sukoon Psychiatry
   ```

4. **cancellation**
   ```
   ❌ Appointment Update — Sukoon Psychiatry

   Hi {{1}},
   Your appointment on {{2}} at {{3}} has been {{4}}.

   {{5}}

   — Sukoon Psychiatry
   ```

---

## 11. Environment Variables

```env
# .env.local (NEVER commit this file)

# ── Supabase ──
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

# ── Razorpay ──
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx

# ── Twilio ──
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886  # Twilio sandbox number (change for production)

# ── Resend (Email) ──
RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=noreply@sukoonpsychiatry.in  # Or Resend's default for free tier

# ── Gemini AI (Chatbot) ──
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSy...

# ── Clinic Config ──
NEXT_PUBLIC_CLINIC_NAME=Sukoon Psychiatry
NEXT_PUBLIC_CLINIC_PHONE=PLACEHOLDER_NUMBER
NEXT_PUBLIC_CLINIC_WHATSAPP=PLACEHOLDER_NUMBER
NEXT_PUBLIC_CLINIC_UPI_ID=PLACEHOLDER_UPI_ID
NEXT_PUBLIC_CLINIC_EMAIL=contact@sukoonpsychiatry.in

# ── Admin ──
ADMIN_EMAIL=admin@sukoonpsychiatry.in
```

---

## 12. SEO & Structured Data

### Meta Tags (per page)
- Unique `<title>` per page: e.g., "Book Online Psychiatry Consultation | Sukoon Psychiatry"
- Meta description with keywords
- OG image (generate a branded OG image for social sharing)
- Canonical URLs
- `robots: index, follow`
- `geo.region: IN`, `geo.placename: Lucknow`
- `lang: en-IN`

### JSON-LD Structured Data (in layout.js)
```json
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Sukoon Psychiatry",
  "description": "Online psychiatry consultations with Dr. Aditi Bhatia...",
  "medicalSpecialty": ["Psychiatry"],
  "priceRange": "₹₹",
  "availableService": [
    { "@type": "MedicalTherapy", "name": "Psychiatric Consultation" },
    { "@type": "MedicalTherapy", "name": "Online Therapy" }
  ],
  "address": { "@type": "PostalAddress", "addressLocality": "Lucknow", "addressCountry": "IN" },
  "areaServed": { "@type": "Country", "name": "India" }
}
```

---

## 13. Phased Delivery Checklist

### Phase 1 — Core Website + Booking (~1-2 weeks)
- [ ] Initialize Next.js 15 project with App Router
- [ ] Install dependencies (supabase, qrcode, date-fns, resend)
- [ ] Create `globals.css` with full design system + 3 theme palettes
- [ ] Create `ThemeSwitcher` component
- [ ] Build `Navbar` (glass-morphism, responsive, sticky)
- [ ] Build `Footer` (contact info, helplines, links)
- [ ] Build Landing Page (Hero, ServicesPreview, HowItWorks, DoctorProfile, Testimonials, FAQ)
- [ ] Build About Page
- [ ] Build Services Page
- [ ] Build Contact Page (form + map + WhatsApp link)
- [ ] Set up Supabase project + create tables + seed data
- [ ] Build booking flow (5 steps: service → date/time → details → payment → confirm)
- [ ] Implement slot computation logic (availability − bookings − blocked dates)
- [ ] Build UPI QR code generator component
- [ ] Build UTR input + submission flow
- [ ] Build Admin login (Supabase Auth)
- [ ] Build Admin Dashboard (overview + bookings + UTR verification)
- [ ] Build Admin Availability editor
- [ ] Build Admin Services editor
- [ ] Implement email notifications (Resend)
- [ ] Implement WhatsApp share links (pre-filled `wa.me`)
- [ ] Add SEO meta tags + structured data
- [ ] Generate OG image
- [ ] Responsive testing (mobile, tablet, desktop)
- [ ] Deploy to Vercel

### Phase 2 — AI Chatbot + Payments + Twilio (~Week 3)
- [ ] Set up Gemini API key
- [ ] Build ChatBot component (floating bubble + chat window)
- [ ] Implement AI chat endpoint with tool calling
- [ ] Define chatbot tools (checkAvailability, getServices, getClinicInfo, initiateBooking)
- [ ] Integrate Razorpay (create order + verify payment)
- [ ] Set up Twilio account + WhatsApp sandbox
- [ ] Create WhatsApp message templates
- [ ] Implement automated WhatsApp notifications (booking confirm, payment verified, reminder)
- [ ] Implement Google Meet link generation
- [ ] Build calendar .ics file download
- [ ] Admin analytics (weekly/monthly stats)

### Phase 3 — Polish + Advanced (Future)
- [ ] Patient portal (login, view/reschedule bookings)
- [ ] Appointment reminders (1 hour before via Twilio)
- [ ] Blog/resources section
- [ ] Multi-doctor support
- [ ] Multi-specialty expansion
- [ ] Production WhatsApp number (Meta Business verification)
- [ ] Custom domain setup

---

## 14. Monthly Running Costs

| Phase | Total Cost |
|:---|:---|
| **Phase 1** | **₹0/month** |
| **Phase 2** | **~₹75-90/month** (Twilio only, after $15 credit) |
| **Scale** | +$25/mo Supabase Pro + ~₹800/yr domain |

---

## 15. Key Placeholders to Replace Before Production

| Placeholder | What to Replace With |
|:---|:---|
| `PLACEHOLDER_NUMBER` | Dr. Bhatia's WhatsApp number (with country code, e.g., +91XXXXXXXXXX) |
| `PLACEHOLDER_UPI_ID` | Dr. Bhatia's UPI ID (e.g., aditibhatia@upi) |
| `placeholder-doctor.jpg` | Dr. Bhatia's professional photo |
| `contact@sukoonpsychiatry.in` | Real email address |
| `admin@sukoonpsychiatry.in` | Admin login email |
| All `.env.local` keys | Real API keys from Supabase, Razorpay, Twilio, Resend, Google AI |

---

## 16. Important Context

- **This is for a psychiatrist (MBBS + MD), NOT a psychologist.** The doctor explicitly distinguishes herself from psychologists/therapists who "just do therapy" and may not be licensed. The website should prominently display medical credentials and the ability to prescribe medication.
- **Target audience:** Indian patients seeking online psychiatric help. UI should be warm, de-stigmatizing, and accessible.
- **Language:** English (primary), but Hindi-friendly terminology is welcome.
- **Timezone:** IST (Asia/Kolkata) — all slot times are in IST.
- **The theme switcher is TEMPORARY** — it's only for the client (us + Dr. Bhatia) to preview and pick a final palette. Once chosen, hardcode it and remove the switcher.
