# The Shop - E-Commerce Website

A modern, fully-responsive e-commerce platform built with Next.js 16 and React 19.

## Project Structure

```

├── app/
│   ├── layout.tsx                 # Root layout with global providers
│   ├── globals.css                # Global styles with design tokens
│   ├── page.tsx                   # Home page
│   ├── about/
│   │   └── page.tsx              # About page with FAQs
│   ├── shop/
│   │   └── page.tsx              # Shop with filters
│   ├── collections/
│   │   └── [id]/
│   │       └── page.tsx          # Collection-specific pages
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx          # Product detail page
│   ├── cart/
│   │   └── page.tsx              # Shopping cart
│   ├── checkout/
│   │   ├── [step]/
│   │   │   └── page.tsx          # Multi-step checkout
│   │   └── success/
│   │       └── page.tsx          # Order confirmation
│   └── profile/
│       └── page.tsx              # User dashboard
│
├── components/
│   ├── layout/
│   │   ├── header.tsx            # Navigation header
│   │   └── footer.tsx            # Footer
│   ├── modals/
│   │   ├── search-overlay.tsx    # Search modal
│   │   └── collections-dropdown.tsx
│   └── home/
│       ├── hero-section.tsx
│       ├── featured-products.tsx
│       ├── services-section.tsx
│       ├── testimonials.tsx
│       ├── lifestyle-gallery.tsx
│       └── newsletter-section.tsx
│
├── context/
│   └── cart-context.tsx          # Shopping cart state management
│
└── public/
    └── images/                    # Product images and assets

```

## Features

### Frontend

- Responsive design (mobile-first)
- Product browsing with filtering
- Shopping cart with persistent storage
- Multi-step checkout flow
- User profile dashboard
- Search functionality
- Collections system
- Product detail pages
- Newsletter signup

### User Features

- Browse products and collections
- Filter by size, color, price
- Add items to cart
- View order history
- Manage saved addresses
- Track orders
- Save favorites/wishlist

## Color Scheme

- **Primary**: Dark Green (#2D5016)
- **Accent**: Warm Orange (#D97D4A)
- **Background**: Cream (#F5E6D3)
- **Text**: Dark Gray/Black
- **Supporting**: White, Red (for badges)

## Backend Integration Points

Backend integration code is included as comments throughout the application. To enable backend functionality, uncomment and implement:

### 1. **Authentication** (`/app/profile/page.tsx`)

\`\`\`javascript
// POST /api/auth/login { email, password }
// POST /api/auth/logout
// GET /api/auth/user
\`\`\`

### 2. **Products Search** (`/components/modals/search-overlay.tsx`)

\`\`\`javascript
// GET /api/products/search?q={query}
\`\`\`

### 3. **Cart Management** (`/context/cart-context.tsx`)

\`\`\`javascript
// POST /api/cart/add
// GET /api/cart
// DELETE /api/cart/remove/{itemId}
\`\`\`

### 4. **Orders** (`/app/checkout/[step]/page.tsx`)

\`\`\`javascript
// POST /api/orders/create
// GET /api/orders/{orderId}
// GET /api/orders (user order history)
\`\`\`

### 5. **Newsletter** (`/components/home/newsletter-section.tsx`)

\`\`\`javascript
// POST /api/newsletter/subscribe { email }
\`\`\`

### 6. **Checkout** (`/app/checkout/[step]/page.tsx`)

\`\`\`javascript
// POST /api/checkout/validate-promo
// POST /api/checkout/place-order
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Download or clone the project
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Run development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Technologies Used

- **Framework**: Next.js 16
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **State Management**: React Context API
- **Storage**: localStorage (for cart)

## Features Implemented

✅ Responsive navigation with mobile menu
✅ Search overlay (closes on outside click)
✅ Collections dropdown (closes on outside click)
✅ Product catalog with filtering
✅ Product detail pages
✅ Shopping cart with local storage
✅ Multi-step checkout (Cart → Shipping → Payment → Confirm)
✅ Order confirmation
✅ User profile dashboard
✅ Order history
✅ Address management
✅ FAQ accordion sections
✅ Newsletter signup
✅ Service highlights
✅ Testimonials
✅ Lifestyle gallery

## Data Model

### Product

- id, name, price, image, rating, category, sizes, colors

### Cart Item

- id, name, price, quantity, size, color, image

### Order

- id, items, total, status, shippingAddress, paymentMethod, trackingId

### User

- id, email, name, addresses, orders, wishlist

## Environment Variables

No environment variables are required for the dummy data version. When connecting backend:

\`\`\`
NEXT_PUBLIC_API_URL=http://your-api.com
\`\`\`

## Future Enhancements

- [ ] Payment gateway integration (Stripe, eSewa, Khalti)
- [ ] Real product database
- [ ] User authentication
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] SMS tracking updates
- [ ] Advanced filters (brand, material, etc.)
- [ ] Product recommendations
- [ ] Social sharing
- [ ] Live chat support

## Notes

- All product data is currently dummy data using placeholder images
- Cart data persists in browser localStorage
- Mobile-responsive design works on all screen sizes
- All backend API calls are marked with comments for easy implementation
- Design follows the provided Figma specifications

## Support

For issues or questions, please refer to the documentation or contact support at promotdharu.2020@gmail.com

---

Built with care for The Shop by v0
