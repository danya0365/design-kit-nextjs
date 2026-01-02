# Design-Kit Component Marketplace - TODO

> แพลตฟอร์มขาย Design Component ที่สามารถ Export เป็นโค้ดจริงได้หลาย Framework

---

## Phase 1: Foundation & Layout ✅ Priority

### 1.1 Layout System
- [ ] MainLayout (Modern design with react-spring animations)
  - [ ] MainHeader with navigation, theme toggle, layout switcher
  - [ ] MainFooter with links
  - [ ] Full-screen, no-scroll design
- [ ] RetroLayout (IE5/Windows 98 style)
  - [ ] RetroHeader with IE5 chrome (title bar, menu bar, toolbar, address bar)
  - [ ] RetroFooter (status bar)
  - [ ] Full-screen, no-scroll design
- [ ] LayoutProvider for switching between layouts
- [ ] ThemeProvider with next-themes for dark mode

### 1.2 Reusable Components (per layout)
- [ ] Main Components
  - [ ] MainModal
  - [ ] MainInput
  - [ ] MainSelect
  - [ ] MainButton
  - [ ] MainPopover
- [ ] Retro Components
  - [ ] RetroModal
  - [ ] RetroInput
  - [ ] RetroSelect
  - [ ] RetroButton
  - [ ] RetroPopover

### 1.3 Theme & Styles
- [x] TailwindCSS v4 setup
- [x] main-layout.css
- [x] retro-layout.css

---

## Phase 2: Data Layer

### 2.1 Master Data Types
- [ ] User types (user, creator, admin)
- [ ] Component types
- [ ] ComponentExport types
- [ ] Category types
- [ ] Order types
- [ ] License types

### 2.2 Mock Data & Repositories
- [ ] Mock data files
  - [ ] users.ts
  - [ ] components.ts
  - [ ] categories.ts
  - [ ] orders.ts
- [ ] Mock repositories (implements Repository interface)
  - [ ] MockUserRepository
  - [ ] MockComponentRepository
  - [ ] MockCategoryRepository
  - [ ] MockOrderRepository

### 2.3 Repository Interfaces
- [ ] IUserRepository
- [ ] IComponentRepository
- [ ] ICategoryRepository
- [ ] IOrderRepository

---

## Phase 3: Core Pages (using CREATE_PAGE_PATTERN)

### 3.1 Home Page
- [ ] app/page.tsx (Server Component)
- [ ] HomeView component (supports both layouts)
- [ ] HomePresenter

### 3.2 Browse/Marketplace
- [ ] app/components/page.tsx
- [ ] ComponentsView
- [ ] ComponentsPresenter
- [ ] Search & Filter functionality

### 3.3 Component Detail
- [ ] app/components/[id]/page.tsx
- [ ] ComponentDetailView
- [ ] ComponentDetailPresenter
- [ ] Live preview iframe
- [ ] Export options

### 3.4 Creator Dashboard
- [ ] app/dashboard/page.tsx
- [ ] DashboardView
- [ ] DashboardPresenter
- [ ] Stats cards
- [ ] Component management

---

## Phase 4: Component Management

### 4.1 Create/Edit Component
- [ ] app/dashboard/components/new/page.tsx
- [ ] app/dashboard/components/[id]/edit/page.tsx
- [ ] ComponentFormView
- [ ] Props/Variants editor
- [ ] Preview upload

### 4.2 Export Engine
- [ ] Export templates (HTML, React, Next.js)
- [ ] Style system options (CSS, Tailwind, CSS Module)
- [ ] Code generator

---

## Phase 5: Marketplace Features

### 5.1 Cart & Checkout
- [ ] app/cart/page.tsx
- [ ] CartView
- [ ] CartPresenter / CartStore

### 5.2 Purchase & Downloads
- [ ] app/purchases/page.tsx
- [ ] PurchasesView
- [ ] PurchasePresenter

### 5.3 Creator Profile
- [ ] app/creators/[id]/page.tsx
- [ ] CreatorProfileView
- [ ] Stats & component listings

---

## Phase 6: Supabase Integration

### 6.1 Database
- [ ] Supabase schema migration
- [ ] RLS policies

### 6.2 Supabase Repositories
- [ ] SupabaseUserRepository
- [ ] SupabaseComponentRepository
- [ ] SupabaseCategoryRepository
- [ ] SupabaseOrderRepository

### 6.3 Authentication
- [ ] Auth store (Zustand)
- [ ] Login/Register pages
- [ ] Protected routes

---

## Architecture Notes

### Clean Architecture Layers
```
src/
├── domain/           # Entities & Interfaces
│   ├── entities/
│   └── interfaces/
├── application/      # Use Cases
│   └── usecases/
├── infrastructure/   # External services
│   ├── repositories/
│   │   ├── interfaces/
│   │   ├── mock/
│   │   └── supabase/
│   └── config/
└── presentation/     # UI Layer
    ├── components/
    ├── presenters/
    └── stores/
```

### Page Pattern (CREATE_PAGE_PATTERN.md)
1. `app/[page]/page.tsx` - Server Component with metadata
2. `src/presentation/presenters/[page]/Presenter.ts` - Business logic
3. `src/presentation/presenters/[page]/usePresenter.ts` - React hook
4. `src/presentation/components/[page]/View.tsx` - UI component

### Layout Components per Style
- Use `useLayoutStore` to get current layout type
- Render appropriate components based on layout
