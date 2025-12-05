# Prodizzy Platform Implementation Plan

## Goal Description
Build the complete Prodizzy Platform, a unified mobile and web application for builders and creators. The goal is to expand the current scaffold into a fully functional UI with 5 core sections (Home, Search, Create, Resources, Profile), adhering to a strict dark-SaaS design aesthetic using Next.js and Vanilla CSS modules.

## User Review Required
> [!IMPORTANT]
> I will be creating new UI components and pages based on the "dark-SaaS" aesthetic found in `globals.css`. I will assume standard layouts for these pages unless specific details are provided.

## Proposed Changes

### Design System & Components
Create reusable UI components to ensure consistency and reduce code duplication.

#### [NEW] [Button.js](file:///c:/Users/DELL%20USER/OneDrive/Documents/Desktop/Stuff/Prodizzy/components/ui/Button.js)
- Encapsulate the `.btn` styles.
- Variants: `primary`, `secondary`, `ghost`.

#### [NEW] [Input.js](file:///c:/Users/DELL%20USER/OneDrive/Documents/Desktop/Stuff/Prodizzy/components/ui/Input.js)
- Standard styled text input with optional icon support (for Search).

#### [NEW] [Badge.js](file:///c:/Users/DELL%20USER/OneDrive/Documents/Desktop/Stuff/Prodizzy/components/ui/Badge.js)
- For tags like "SaaS", "Building", etc.

#### [NEW] [Avatar.js](file:///c:/Users/DELL%20USER/OneDrive/Documents/Desktop/Stuff/Prodizzy/components/ui/Avatar.js)
- Circle image profile with fallback.

### Page Implementation

#### [MODIFY] [app/page.js](file:///c:/Users/DELL%20USER/OneDrive/Documents/Desktop/Stuff/Prodizzy/app/page.js)
- Refactor inline styles to CSS modules.
- Use new `Button` and `Badge` components.

#### [NEW] [app/search/page.js](file:///c:/Users/DELL%20USER/OneDrive/Documents/Desktop/Stuff/Prodizzy/app/search/page.js)
- Search bar at the top.
- Filter tabs (Projects, Creators, Resources).
- Grid of results.

#### [NEW] [app/create/page.js](file:///c:/Users/DELL%20USER/OneDrive/Documents/Desktop/Stuff/Prodizzy/app/create/page.js)
- Form to create a new project.
- Fields: Name, Description, Category, Link.

#### [NEW] [app/resources/page.js](file:///c:/Users/DELL%20USER/OneDrive/Documents/Desktop/Stuff/Prodizzy/app/resources/page.js)
- List of articles/guides.
- Categories: Design, Development, Marketing.

#### [NEW] [app/profile/page.js](file:///c:/Users/DELL%20USER/OneDrive/Documents/Desktop/Stuff/Prodizzy/app/profile/page.js)
- User header (Avatar, Name, Bio).
- Stats (Projects, Followers).
- Tabs: My Projects, Saved.

## Verification Plan

### Automated Tests
- None planned (UI focus).

### Manual Verification
- **Responsive Check**: Verify layout on Desktop (Top Nav) vs Mobile (Bottom Nav).
- **Navigation**: Click through all 5 tabs to ensure routing works.
- **Visuals**: Check that colors and spacing match `globals.css` variables.
