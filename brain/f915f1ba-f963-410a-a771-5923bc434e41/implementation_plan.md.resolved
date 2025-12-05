# Prodizzy Platform Implementation Plan

## Goal Description
Build the **Prodizzy** platform, a unified mobile and web application for project building. The application will be a responsive **Next.js** web app that adapts its interface to match the specific "Mobile App" and "Website" designs provided. It will feature a premium "Dark-SaaS" aesthetic with a shared design system.

## User Review Required
> [!IMPORTANT]
> **Tech Stack Decision**: I will be using **Next.js** with **Vanilla CSS** (CSS Modules) to ensure strict adherence to the design system without external framework constraints, as per system instructions.
> **Mobile Strategy**: The "Mobile App" will be implemented as the mobile-responsive view of the web application. This ensures a single codebase covers both platforms instantly.

## Proposed Changes

### Core Setup
#### [NEW] [Next.js Project Structure]
- Initialize Next.js project (App Router).
- Configure `layout.js` and `globals.css`.

### Design System (Global CSS)
#### [NEW] [globals.css](file:///c:/Users/DELL USER/OneDrive/Documents/Desktop/Stuff/Prodizzy/app/globals.css)
- Define CSS Variables for the palette:
  - `--bg-dark`: #0F1217
  - `--card-bg`: #1A1F27
  - `--primary-blue`: #4F7BFF
  - `--accent-gradient`: linear-gradient(...)
  - `--text-primary`: #FFFFFF
  - `--text-secondary`: #9AA4B5
- Setup Typography (Inter/Plus Jakarta Sans).

### Components (Shared)
#### [NEW] [components/ui/Button.js](file:///c:/Users/DELL USER/OneDrive/Documents/Desktop/Stuff/Prodizzy/components/ui/Button.js)
- Primary, Secondary, and Floating Action Button variants.
#### [NEW] [components/ui/Card.js](file:///c:/Users/DELL USER/OneDrive/Documents/Desktop/Stuff/Prodizzy/components/ui/Card.js)
- Standard card style with hover effects.
#### [NEW] [components/layout/Navigation.js](file:///c:/Users/DELL USER/OneDrive/Documents/Desktop/Stuff/Prodizzy/components/layout/Navigation.js)
- **DesktopNav**: Top bar with links and auth.
- **MobileNav**: Bottom blurred tab bar.
- Logic to switch based on viewport (CSS media queries).

### Features / Pages
#### [NEW] [app/page.js](file:///c:/Users/DELL USER/OneDrive/Documents/Desktop/Stuff/Prodizzy/app/page.js)
- **Home**: Global Project Feed.
- Hero section (Desktop only).
- Feed of Project Cards.

#### [NEW] [app/search/page.js](file:///c:/Users/DELL USER/OneDrive/Documents/Desktop/Stuff/Prodizzy/app/search/page.js)
- **Search**: Filters, Categories, Results grid.

#### [NEW] [app/create/page.js](file:///c:/Users/DELL USER/OneDrive/Documents/Desktop/Stuff/Prodizzy/app/create/page.js)
- **Create**: Options to Post, Suggest, Submit.

#### [NEW] [app/resources/page.js](file:///c:/Users/DELL USER/OneDrive/Documents/Desktop/Stuff/Prodizzy/app/resources/page.js)
- **Resources**: Templates, Guides, Tools.

#### [NEW] [app/profile/page.js](file:///c:/Users/DELL USER/OneDrive/Documents/Desktop/Stuff/Prodizzy/app/profile/page.js)
- **Profile**: User vs Project toggle.

## Verification Plan
### Automated Tests
- Run `npm run dev` to verify build success.
- Check console for hydration errors.

### Manual Verification
- **Responsiveness**: Verify Desktop view shows Top Nav and Mobile view shows Bottom Nav.
- **Design Accuracy**: Compare colors, spacing, and typography against the prompt specs.
- **Navigation**: Click through all 5 tabs to ensure routing works.
