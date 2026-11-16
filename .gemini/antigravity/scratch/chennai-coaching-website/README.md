# Vetri Apex Academy - Chennai's Premier Coaching Institute Website

A modern, responsive, high-converting website built for **Vetri Apex Academy**, a premier coaching centre in Chennai specializing in **NEET-UG, IIT-JEE (Main & Advanced), Foundation (Class 8-10), and TNPSC Group examinations**.

---

## 🌟 Key Features

1. **Pages & Key Sections**:
   - **Hero Section**: High-impact headlines, trust metrics (14,500+ mentored, 98.4% pass rate), quick instant callback request form, and topper ticker.
   - **Live Batch Ticker**: Notice strip for upcoming batches across Chennai campuses.
   - **Courses Showcase**: Categorized academic programs (Medical, Engineering, Foundation, TNPSC) with filter tabs, curriculum highlights, syllabus download simulator, and direct enrollment buttons.
   - **Why Choose Vetri (Pedagogy)**: IIT Madras & AIIMS alumni faculty, bilingual instruction (Tamil & English), 1:20 mentor-to-student ratio, and the 4-stage learning formula.
   - **Interactive V-SAT Scholarship Estimator**: Live range slider calculating tuition fee waivers up to 100% based on student scores.
   - **Results & Toppers**: Realistically formatted Chennai toppers (MMC admits, IIT Madras admits, Stanley admits, TNPSC Deputy Collector rankers) and 4.9-star Google Review verification strip.
   - **About Us**: Academy history since 2012, Director Dr. K. Ramanathan's message, and campus infrastructure cards.
   - **Chennai Campus Locator**: Interactive tab switcher for **Anna Nagar (HQ)**, **T. Nagar**, **Tambaram**, and **Adyar** with metro proximity tags, full contact numbers, and direct Google Maps links.
   - **Comprehensive Student Enquiry Form**: Multi-field form with client-side validation (phone, email, course, campus), WhatsApp syllabus consent checkbox, reference code generation (`#VA-2026-XXXX`), and submission success modal.
   - **FAQs Accordion**: Expandable answers to Chennai parent queries regarding hostel facilities, fee installments, bilingual lectures, and demo classes.
   - **Contact & Location**: Admission hotline, email, office timings, and styled metro location graphic.

2. **WhatsApp Integration**:
   - **Floating WhatsApp Button**: Sticky at bottom-right with pulsating online badge and smart speech bubble tooltip.
   - **Header & Mobile Quick Actions**: Direct WhatsApp chat links pre-filled with inquiry messages.
   - **Form Success Flow**: One-click "Continue to WhatsApp" button with pre-filled reference number, student name, and selected course.

3. **Mobile-Friendly & Responsive**:
   - Slide-in mobile drawer navigation with hamburger toggle and backdrop blur.
   - Fixed mobile bottom quick-action bar (`Call Centre` | `WhatsApp` | `Enquire Now`) for high conversion on smartphones.
   - Touch-friendly tap targets and fluid typography.

4. **Modern Design Aesthetics**:
   - Deep Royal Navy (`#0A1E3F`), Amber Gold (`#F59E0B`), Vibrant Teal/Emerald, clean whites, and slate typography.
   - Google Fonts: **Plus Jakarta Sans** and **Outfit**.
   - FontAwesome 6 icons.

---

## 📁 File Structure

```text
chennai-coaching-website/
├── index.html           # Main semantic single-page website
├── css/
│   └── styles.css       # Full responsive stylesheet, CSS variables, animations
├── js/
│   └── main.js          # Interactive filters, calculator, validation & modals
├── assets/              # Directory for custom images and branding assets
└── README.md            # Documentation & setup guide
```

---

## 🚀 How to Run and Preview

### Option 1: Direct in Browser
Simply double-click `index.html` or open it with any web browser (Chrome, Edge, Firefox, Safari). No installation or build step is required!

### Option 2: Using a Local HTTP Server (Optional)
From PowerShell or Terminal:
```powershell
cd C:\Users\Muralidharan\.gemini\antigravity\scratch\chennai-coaching-website
# Python 3
python -m http.server 3000
```
Then open `http://localhost:3000` in your browser.

---

## ⚙️ Customization Guide

- **Change WhatsApp & Phone Numbers**:
  Search for `9840123456` in `index.html` and `js/main.js` to update to your official business phone number.
- **Update Campuses**:
  Edit the campuses in the `#campuses` section in `index.html` to add or modify branches (e.g., Velachery, Porur, Chromepet, etc.).
- **Courses & Fees**:
  Modify cards under `#courses` to tailor specific batch fees, curriculum, or eligibility.
