# Implementation Plan - Tanishka Khandelwal Portfolio

This plan outlines the development of a high-performance, aesthetically premium personal portfolio website. The design will focus on a "Gen-Z tech" vibe with dark mode, gradients, and smooth animations.

## User Review Required
> [!IMPORTANT]
> **Tech Stack**: I propose using **React (via Vite)** instead of plain HTML/JS. This allows for:
> - Smoother "micro-interactions" and page transitions (requested in prompt).
> - Better management of reusable components (Cards, Buttons, Sections).
> - Easy integration of animation libraries like `framer-motion`.
>
> **Styling**: I will use **Vanilla CSS** with modern features (Variables, Flexbox, Grid) to create the custom "Gen-Z" aesthetic without relying on heavy frameworks like Tailwind (unless you specifically prefer Tailwind).

## Proposed Changes

### Core Setup
#### [NEW] Project Scaffold
- Initialize Vite + React project.
- Setup `eslint` and `prettier`.
- Install dependencies: `framer-motion` (for animations), `react-icons` (for minimal icons).

### Design System (`src/styles`)
#### [NEW] `index.css` & `variables.css`
- **Typography**: Import 'Sora' and 'Inter' from Google Fonts.
- **Colors**: Define CSS variables for the "Blue-Purple-Teal" palette.
- **Utilities**: Create utility classes for:
    - `glass-panel`: Backdrop blur + semi-transparent background.
    - `neumorphic-card`: Soft shadows and rounded corners (24px).
    - `gradient-text`: Text with background-clip for gradient effects.
    - `floating`: Keyframe animations for floating elements.

### Components (`src/components`)
#### [NEW] Layout Components
- `Navbar.jsx`: Floating, glassmorphism effect. Links to sections.
- `Footer.jsx`: Minimal, gradient background, social links.

#### [NEW] Section Components
1.  **HeroSection.jsx**:
    - Full-screen height.
    - Animated gradient background or abstract 3D shapes (CSS/SVG).
    - Text: "Tanishka Khandelwal", "Software Engineer...", Typed text effect for subtext.
    - Stats Bar: "40,000+ Students", etc.
2.  **AboutSection.jsx**:
    - 2-column layout (Text + Visual/Photo).
    - "Skill Radar" representation (visualized with CSS).
3.  **ExperienceSection.jsx**:
    - Vertical timeline layout.
    - Cards for "ElectraWireless", "SBI Cards", etc.
4.  **ProjectsSection.jsx**:
    - Grid of cards for "SynergyX", "FRP Residual Strength", etc.
    - Hover effects: Scale up + Glow.
5.  **SkillsSection.jsx**:
    - Categorized lists (Programming, Frontend, etc.).
    - Neumorphic icon containers.
6.  **AchievementsSection.jsx**:
    - Trophy-styled cards for "SheFi Scholar", "Shark Tank", etc.
7.  **ContactSection.jsx**:
    - Functional-looking form (visual only, or linked to `mailto`).
    - Social links.

### Assets
- Generate or create placeholder assets for:
    - Profile photo (placeholder).
    - Project thumbnails (abstract gradients or generated UI mockups).

## Verification Plan
### Automated Tests
- Run `npm run dev` to verify build success.
- Check console for React errors.

### Manual Verification
- **Responsiveness**: Test on Mobile (375px), Tablet (768px), and Desktop (1440px).
- **Animations**: Verify scroll animations (fade-in/slide-up) trigger correctly.
- **Interactions**: Test hover states on buttons and cards.
