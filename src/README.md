# 🎓 AMU StudySphere

> A unified digital platform for Aligarh Muslim University that consolidates the fragmented university ecosystem into a centralized, database-driven system managing the entire student lifecycle.

![Status](https://img.shields.io/badge/Status-Demo-brightgreen)
![Version](https://img.shields.io/badge/Version-2.0.0-blue)
![Platform](https://img.shields.io/badge/Platform-Web-orange)
![Year](https://img.shields.io/badge/Year-2026-gold)

---

## Overview

AMU StudySphere is a comprehensive demonstration platform showcasing a unified university management system for Aligarh Muslim University. The platform demonstrates role-based dashboards for administrators, faculty, and students, featuring deterministic demo behavior with program-specific academic content and institutional-scale metrics.

---

## ✨ Key Features

### 🎓 Role-Based Dashboards
- **Admin Dashboard** - System-wide analytics with 36,247+ students and 178+ faculty metrics
- **Faculty Dashboard** - Department-specific tools and course management featuring Dr. Arman Rasool Faridi (Chairman, Computer Science)
- **Student Dashboard** - Program-aware content with completely isolated notes, assignments, and courses for each academic program

### 🔒 Deterministic Demo Behavior
- **Year Lock**: All dates and content reflect 2026
- **Single Source of Truth**: Each demo student has pre-built narratives with hardcoded data
- **Program Isolation**: BCA, Biochemistry, BA Urdu, Chemistry, and Electronics programs maintain separate datasets with zero subject leakage
- **No Shared Logic**: Each program dashboard is completely independent with its own component

### 📢 Academic Events & Announcements
- **AMU Hacks 5.0** - National-level hackathon (9 February 2026)
- **TEDx AMU** - University flagship event with 12 speakers (28-29 January 2026)
- **ROVAC** - Robotics challenge with IEEE RAS, AUV & ZHCET
- **Code O' Fiesta** - IEEE Computer Society collaboration
- **IEEE Women in Engineering** - Leadership and technical talks

### 🌐 Trilingual Support
- English, Hindi (हिंदी), and Urdu (اردو) language options
- Consistent UI across all languages

---

## 🎯 Tech Stack

### Frontend
- React 18 + TypeScript (TSX)
- Tailwind CSS v4
- Motion (Framer Motion) for animations
- Lucide React for icons

### Backend
- Supabase (PostgreSQL)
- Authentication & role-based access control

### Styling
- Global CSS with AMU institutional colors
- Indo-Islamic design patterns
- Responsive design for all devices

---

## 👥 Demo Accounts

### Admin
- Generic admin account with full system access
- View-only demonstration mode

### Faculty
- **Dr. Arman Rasool Faridi**
  - Chairman, Computer Science
  - Specializations: Deep Learning, AI, E-Systems, Information Security, Soft Computing
  - Experience: 9+ years

### Students
Multiple program-specific demo accounts with isolated academic data (personal details not disclosed for privacy)

---

## 📊 System Metrics

The platform demonstrates institutional-scale operations:

- **36,247+** Active Students
- **178+** Faculty Members
- **52** Academic Departments
- **76.8%** Hostel Occupancy
- **Year**: 2026 (deterministic lock)
- **CGPA Format**: X.XX / 10
- **Semester Fees**: ₹6,500 (fixed)

---

## 🎨 Design Philosophy

### AMU Official Colors
- 🟢 **Primary Green**: `#006838`
- 🔴 **Maroon**: `#8B1538`
- 🟡 **Gold Accent**: `#D4AF37`

### Key Principles
- Clean, institutional interface
- Program-specific content isolation
- No placeholder or empty states
- Realistic academic workflows
- Consistent year (2026) across all features

---

## 🏗️ Architecture

### Complete Program Isolation
Each academic program maintains:
- **Separate Dashboard Component** (no shared logic)
- **Program-Specific Courses** (zero cross-program leakage)
- **Independent Notes Sections** (hardcoded per program)
- **Unique Timetables** (program and semester aware)
- **Isolated Assignments** (due dates in February 2026)

### Demo Students by Program
- BCA: Sadia Peerzada
- Biochemistry: Maariyah Anjum Faizan
- BA Urdu: Maria Ali
- Chemistry: Areeb Khan
- Electronics: Ayaan Siddiqui
- Rejected: Zain Ahmad

---

## ⚠️ Important Notes

This is a **demonstration platform** with the following characteristics:

- **Deterministic Behavior**: All data is pre-configured and static
- **Year 2026 Lock**: All dates, events, and content reflect 2026
- **No Real Data**: Demo accounts with fictional but realistic academic profiles
- **Not for Production**: This is a showcase of features and workflows
- **No PII Collection**: Platform is not designed for handling sensitive personal information

---

## 📅 Feature Specifications

### Removed Features (Per Requirements)
- ❌ Admin access from login dropdown (Admin card restored for role selection)
- ❌ Clubs feature
- ❌ Doubt Solving feature

### Enhanced Features
- ✅ Academic gradient-based login UI
- ✅ Realistic institutional metrics (35,000+ students, 1,200+ faculty)
- ✅ Trilingual interface (English/Hindi/Urdu)
- ✅ Complete program dataset isolation
- ✅ Pre-built student narratives with hardcoded data
- ✅ Consistent CGPA formatting (X.XX / 10)
- ✅ Fixed semester fees (₹6,500)

---

## 📂 Static Assets

All static assets are located in `/public/images/` for Vite + Vercel compatibility.

---

## 🔐 Behavioral Rules

### Deterministic Demo Behavior
- Single source of truth for user profiles
- Fixed CGPA format: X.XX / 10
- Fixed fees: ₹6,500 per semester
- Year lock: 2026
- No random data generation
- Consistent metrics across sessions

### Dashboard Isolation
- NO shared dashboard logic
- Completely separate components per program
- Zero shared logic between programs
- Each student gets pre-built narrative
- Hardcoded data per program
- Isolated notes sections

---

## 📖 Documentation

For detailed behavioral specifications, architectural decisions, and implementation details, refer to `/guidelines/Guidelines.md` in the codebase.

---

## 🙏 Disclaimer

AMU StudySphere is a demonstration platform showcasing university management features. It is not intended for collecting personally identifiable information (PII) or securing sensitive data. All demo accounts use fictional data for illustration purposes only.

---

<div align="center">

### 🎉 AMU StudySphere - Demo Platform

**Year Lock: 2026** | **Deterministic Behavior** | **Program Isolation**

*Built to demonstrate unified university ecosystem management*

</div>

---

**Last Updated:** January 31, 2026  
**Status:** ✅ Demo Platform  
**Purpose:** Feature Demonstration & Workflow Showcase