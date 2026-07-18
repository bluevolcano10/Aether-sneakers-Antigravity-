# AETHER SNEAKERS // IMMERSIVE 3D E-COMMERCE PLATFORM

A premium, modern shoe e-commerce platform blending a futuristic luxury aesthetic (inspired by Nike, Apple, ACRONYM, and On Running) with immersive 3D graphics, smooth kinetic animations, and a fully functional shopping cart, wishlist, profile, and checkout pipeline.
DEPLOYEMENT LINK:https://aether96.netlify.app/

---

## 🚀 Key Features

### 1. **Interactive 3D Sneaker Hero Module**
*   Procedurally designed futuristic sneaker using raw **Three.js** geometries and materials (specular chrome panels, carbon weave upper, and glowing led stripes).
*   Follows mouse movements smoothly via yaw/pitch interpolation.
*   Floats on a continuous trigonometric cosine-wave overlay, reflecting soft shadows on a responsive ground plane.
*   Drifting background particle field.

### 2. **Cinematic 3D Human Walk Cycle Parallax**
*   Procedural human skeleton figures generated dynamically with Three.js cylinder and sphere bones.
*   Mannequins walk continuously across staggered depth lanes (z-index lanes) creating natural visual depth.
*   Figures wear muted semi-transparent clothing (`opacity: 0.16`) while their sneakers have high metallic reflections and electric blue/cyan neon glowing stripes, drawing focus directly to the footwear.
*   Smooth joints rotation driven by custom parametric trigonometric walking equations.

### 3. **Laboratory Catalog & Real-Time Filters**
*   Structured database ([products.json](src/data/products.json)) comprising **50 unique shoe models** with details on techwear specs, materials, and sizes.
*   Multi-collapsible filtering sidebar: Search keywords, price slider, size grids, brand selections, category selections, ratings, and stock checks.
*   Alphabetical, price, and rating sorting.

### 4. **Detailed Product Display & Zoom Lens**
*   Multi-angle thumbnail navigation galleries (Front, Side, Back, Top, Sole, Lifestyle, Detail).
*   **Hover Zoom Lens**: Pans scaled background image coordinates matching mouse hover.
*   **360° Live Mode**: Toggles the interactive WebGL product canvas inside the gallery frame.
*   Verified reviews logs showing overall star ratings.
*   Related products matching category/brand, and a recently viewed carousel.

### 5. **Checkout Wizard & Persistent Cart Contexts**
*   Global state engines utilizing React Context API (`CartContext`, `WishlistContext`, `AuthContext`) with direct sync to `localStorage`.
*   Interactive slide-out sidebar drawer and a full cart review page supporting discount codes (`AETHER10` / `FUTURE20`) and quantity adjustments.
*   5-step checkout flow (Shipping form validation, Delivery speeds, Payment inputs formatting, Review, and Confirmation) displaying a generated tracking ID.

---

## 🛠️ Tech Stack

*   **Frontend Library**: React (Hooks, Context, Web APIs)
*   **Build Pipeline**: Vite (Fast HMR compilation)
*   **3D Render Engine**: Three.js (WebGL renderer)
*   **Animations**: Framer Motion (Page transition fades, scroll reveals) & CSS Keyframes
*   **Styling**: Vanilla CSS (Custom tokens, Glassmorphism panels, CSS variables)
*   **State Persistence**: LocalStorage API
*   **Routing**: React Router DOM (v6)

---

## 📁 Repository Structure

```text
aether-sneakers/
├── src/
│   ├── components/            # Reusable 3D & UI components
│   │   ├── CustomCursor.jsx   # Pointer trailing custom cursor
│   │   ├── WalkersCanvas.jsx  # 3D human walking background
│   │   ├── HeroSneakerCanvas.jsx # 3D rotating hero shoe
│   │   ├── ProductCanvas.jsx  # 3D thumbnail shoe preview
│   │   ├── Navbar.jsx         # Sticky blurred header menu
│   │   ├── ProductCard.jsx    # Card with 3D hover activations
│   │   └── CartDrawer.jsx     # Slide-out sidebar cart drawer
│   ├── context/               # Global React Context state engines
│   │   ├── CartContext.jsx
│   │   ├── WishlistContext.jsx
│   │   └── AuthContext.jsx
│   ├── data/
│   │   └── products.json      # Database catalog of 50 items
│   ├── hooks/
│   │   └── useMagnetic.js     # Magnetic hover cursor pull hook
│   ├── pages/                 # Routing page views
│   │   ├── Home.jsx           # Premium landing page shell
│   │   ├── Shop.jsx           # Real-time search and filter grid
│   │   ├── ProductDetails.jsx # Galleries, 3D toggles, and reviews
│   │   ├── Cart.jsx           # Full checkout list view
│   │   ├── Wishlist.jsx       # Persistent saved items list
│   │   ├── Checkout.jsx       # Multi-step checkout wizard
│   │   ├── Profile.jsx        # Account dashboard and order history
│   │   ├── Auth.jsx           # Login and register panels
│   │   └── NotFound.jsx       # Luxury 404 error coordinates
│   ├── App.jsx                # Global Router & Context Providers
│   ├── index.css              # Custom styling sheet & variables
│   └── main.jsx               # Application entrypoint
├── package.json
└── README.md
```

---

## ⚙️ Setup & Installation

### 1. Clone the project and navigate to the directory
```bash
git clone https://github.com/your-username/aether-sneakers.git
cd aether-sneakers
```

### 2. Install dependencies
```bash
npm install
```

### 3. Launch the development server
```bash
npm run dev
```
Open **`http://localhost:5173/`** in your browser to view the application.

### 4. Build for production
To bundle the application into an optimized static distribution package:
```bash
npm run build
```

---

## 🎟️ Active Promotional Codes
Use these codes during checkout to test calculations:
*   **`AETHER10`**: Deducts 10% off your subtotal.
*   **`FUTURE20`**: Deducts 20% off your subtotal.

---

## 🔮 Future Roadmap
*   **Database Integration**: Swap the local `products.json` file for a headless database (MongoDB, Supabase, or PostgreSQL).
*   **Server Authentication**: Connect mock session forms to a real authentication service (Firebase Auth, NextAuth, or JWT server routes).
*   **Aether Pay API**: Connect checkout payment portals to an active processor (Stripe, PayPal, or crypto wallet pipelines).
