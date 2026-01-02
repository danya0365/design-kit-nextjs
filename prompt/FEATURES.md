# Component Marketplace / Design-to-Code Platform

> README นี้ถูกออกแบบมาเพื่อใช้เป็น **Master Prompt** สำหรับสั่งงาน AI (เช่น ChatGPT, Claude, Copilot) ให้ช่วยออกแบบ วิเคราะห์ และเขียนโค้ดโปรเจคนี้อย่างเป็นระบบ

---

## 1. Project Overview

**Component Marketplace** คือแพลตฟอร์มสำหรับ:
- ขาย / แจก **Design Components**
- Preview UI ได้ทันที
- Export เป็นโค้ดจริงไปยังหลาย platform

### Supported Export Targets (Phase แรก)
- HTML + CSS
- React
- Next.js

(รองรับการขยายไป Vue / Svelte / Flutter ในอนาคต)

---

## 2. Vision & Goals

### Vision
Design once → Export anywhere

### Goals
- ลดเวลาออกแบบและพัฒนา UI
- ทำให้ Designer สามารถขายงานได้
- ทำให้ Developer นำไปใช้ได้ทันทีโดยไม่ lock-in

---

## 3. Target Users

### Developer
- ต้องการ UI ที่พร้อมใช้งาน
- Copy / Export / Customize ต่อได้

### Designer / Creator
- สร้าง component
- ตั้งราคาหรือแจกฟรี
- ไม่จำเป็นต้องเขียนโค้ดลึก

### Indie / Startup
- ต้องการสร้าง MVP เร็ว
- ลดต้นทุนการออกแบบ

---

## 4. Core Concepts

### 4.1 Component-Centric System
ทุกอย่างในระบบคือ **Component** ซึ่งประกอบด้วย:
- Metadata (name, description, tags)
- Preview (image / live preview)
- Props / Variants
- Export Templates

### 4.2 Design to Code
Component หนึ่งสามารถ Export เป็น:
- HTML
- React Component
- Next.js Component

โดยเลือก style system ได้ เช่น:
- CSS
- Tailwind
- CSS Module

---

## 5. Core Features

### 5.1 Component Management
- Create / Edit / Delete Component
- Upload preview image
- Live preview
- Props / Variants editor

### 5.2 Export Engine (Key Feature)
- เลือก platform (HTML / React / Next.js)
- เลือก style system
- Generate code จาก template

### 5.3 Category & Tag
- Button
- Form
- Card
- Layout
- Dashboard
- Landing Page

### 5.4 Pricing & License
- Free
- One-time purchase
- Bundle

License:
- Personal
- Commercial

### 5.5 Marketplace
- Cart
- Checkout
- Purchase history
- Download / Export access

### 5.6 Creator Profile
- หน้าโปรไฟล์ผู้ขาย
- รายการ component
- รายได้ / download stats

### 5.7 Search & Filter
- Platform
- Framework
- Category
- Price
- Rating

---

## 6. Suggested Tech Stack

### Frontend
- Next.js (App Router)
- Tailwind CSS
- Component Preview via iframe / sandbox

### Backend
- Supabase (Auth, DB, Storage)
- Role-based access (User / Creator / Admin)

### Payment
- Stripe

### Export Engine
- Template-based generator
- Mapping props → JSX / HTML

---

## 7. Data Model (Conceptual)

### User
- id
- email
- role (user | creator | admin)

### Component
- id
- creator_id
- name
- description
- category
- price
- is_free
- preview_url

### ComponentExport
- component_id
- platform (html | react | next)
- code_template

### Order
- user_id
- total_price
- created_at

---

## 8. User Flow

### Developer Flow
1. Browse component
2. Preview
3. Select platform
4. Export / Copy code

### Creator Flow
1. Create component
2. Upload preview
3. Set price / free
4. Publish

---

## 9. Roadmap

### Phase 1 (MVP)
- HTML / React export
- Free + Paid component
- Manual upload

### Phase 2
- Next.js export
- Tailwind support
- Creator dashboard

### Phase 3
- AI Assist
  - Generate variants
  - Convert design → code
- Plugin (Figma / VSCode)

---

## 10. AI Prompt Instructions

When using AI with this README:

> คุณคือ Senior Fullstack Engineer / Product Designer
> ช่วยออกแบบและพัฒนา Component Marketplace ตาม README นี้
> ให้คิดเชิง production-ready, scalable และ best practice

AI ควรสามารถ:
- ออกแบบ Database Schema
- เขียน API / Server Actions
- ออกแบบ UI / UX
- เขียน Export Engine logic

---

## 11. Success Metrics

- จำนวน component
- Conversion rate (free → paid)
- Export usage
- Creator retention

---

## 12. One-liner

> แพลตฟอร์มขาย Design Component ที่สามารถ Export เป็นโค้ดจริงได้หลาย Framework

