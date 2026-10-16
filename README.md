# Estately - Real Estate Marketplace

A responsive real estate marketplace with an editorial, image-led interface. Built with React (JavaScript/JSX), Vite, Tailwind CSS, and Framer Motion.

## Features

### Property Search & Discovery
- Advanced property search with filters (type, status, price range, bedrooms, bathrooms, selected features)
- Property sorting (newest, price high-to-low, price low-to-high, largest, most bedrooms)
- Pagination with adjustable items per page (6, 9, 12, 24)
- Property type browsing (Houses, Apartments, Villas, Cabins)
- Featured properties showcase

### Property Details
- Interactive image gallery with lightbox
- Detailed property information (beds, baths, sqft, year built)
- Feature and amenity details
- Location section with Google Maps link
- Agent contact form that opens a prefilled email
- Similar/related properties
- Virtual tour indicator

### User Features
- **Wishlist** - Save favorite properties (persisted to localStorage)
- **Property Comparison** - Compare up to 4 properties side-by-side
- **Authentication UI** - Login and Register pages with form validation
- **Property Submission** - Validated multi-step form with local draft saving and photo previews

### Pages
- **Home** - Photographic hero search, curated properties, home types, and local agents
- **Properties** — Full listing with filters, sort, grid/list views
- **Property Detail** — Full details with gallery, features, agent contact
- **Agents** — Agent directory with search and stats
- **Agent Detail** — Agent profile, bio, stats, listings, contact form
- **Wishlist** — Saved properties
- **Compare** — Side-by-side property comparison
- **Mortgage Calculator** — Interactive payment calculator with sliders
- **Services** — Full service offerings
- **Blog** — Real estate articles with categories and search
- **FAQ** — Expandable Q&A with search
- **About** - Company story, team, and values
- **Contact** — Contact form with multiple office locations
- **Submit Property** — Multi-step property listing form
- **Login / Register** - Browser-based preview authentication UI
- **404 Not Found** — Error page

### Animations & UX
- Framer Motion page fades and short vertical transitions between routes
- Cinematic hero image reveal with staggered brand, heading, copy, and search entrance
- Animated search underline and tactile CTA feedback
- Scroll-triggered, staggered property reveals; listing changes crossfade after filtering, sorting, and pagination
- Restrained image zoom and wishlist/compare press feedback
- Reduced-motion support via `MotionConfig reducedMotion="user"`
- Mobile-responsive navigation with hamburger menu
- Persistent comparison bar
- Sticky agent contact sidebar on detail pages

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI framework |
| **Vite** | Build tool & dev server |
| **Tailwind CSS 4** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **React Router DOM** | Client-side routing |
| **Lucide React** | Icon library |

## Project Structure

```
src/
├── components/
│   ├── layout/              # Layout components
│   │   ├── Navbar.jsx       # Main navigation with mobile menu
│   │   ├── Footer.jsx       # Footer with links & contact info
│   │   ├── PageHeader.jsx   # Shared editorial page heading
│   │   └── AuthLayout.jsx   # Shared authentication layout
│   └── property/            # Property-related components
│       ├── PropertyCard.jsx     # Individual property card
│       ├── PropertyFilter.jsx   # Advanced search filters
│       ├── PropertySort.jsx     # Sort & view toggle
│       ├── Pagination.jsx       # Enhanced pagination controls
│       ├── ImageGallery.jsx     # Gallery with lightbox
│       └── CompareBar.jsx       # Persistent compare bar
├── pages/                   # Route pages
│   ├── Home.jsx             # Landing page
│   ├── Properties.jsx       # Listings page
│   ├── PropertyDetail.jsx   # Single property view
│   ├── Wishlist.jsx         # Saved properties
│   ├── Compare.jsx          # Compare properties
│   ├── Agents.jsx           # Agent directory
│   ├── AgentDetail.jsx      # Single agent profile
│   ├── SubmitProperty.jsx   # List property form
│   ├── MortgageCalculator.jsx  # Mortgage calculator
│   ├── Services.jsx         # Services page
│   ├── Blog.jsx             # Blog / articles
│   ├── FAQ.jsx              # FAQ page
│   ├── About.jsx            # About page
│   ├── Contact.jsx          # Contact page
│   ├── Login.jsx            # Login page
│   ├── Register.jsx         # Registration page
│   └── NotFound.jsx         # 404 page
├── context/
│   └── AppContext.jsx       # Global state (wishlist, compare, auth, filters)
├── data/
│   ├── properties.js        # Property mock data (24 listings)
│   └── agents.js            # Agent mock data
├── utils/
│   └── helpers.js           # Formatting, filtering, sorting utilities
├── App.jsx                  # Main app with routes
├── main.jsx                 # Entry point
└── index.css                # Tailwind config & global styles
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Design System

### Color Palette
- **Primary**: Dark forest green (`primary-50` through `primary-950`)
- **Accent**: Muted stone and warm tan (`accent-50` through `accent-950`)
- **Neutrals**: Warm off-white and soft grays

### Typography
- **Headings**: DM Serif Display
- **Body**: DM Sans

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Key State Management

Global state managed via React Context:

- **Wishlist** - Array of saved property IDs (persisted)
- **Compare List** - Array of property IDs to compare (max 4, persisted)
- **User** - Authenticated user info (persisted)
- **Filters** - Search filters (query, type, status, price, beds, baths, features)
- **Sort** - Current sort order
- **Pagination** - Current page and items per page

## Demo behavior

This repository uses sample property and agent data. Wishlist and compare selections persist in browser storage. Sign-in and registration are UI previews, not server authentication. The property form saves a draft locally; it does not publish a listing. Contact and enquiry forms open a prefilled email in the visitor's email app. Connect a backend and email service before using these flows in production.
