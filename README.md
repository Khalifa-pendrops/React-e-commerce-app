## Real Trift - Modern E-commerce UI (React + Redux)

<p align="center">
  <img src="./src/asset/Real-Trift.gif" width="720" height="360" alt="App preview">
</p>

Real Trift is a modernized e-commerce front end built with React, Redux Toolkit,
and styled-components. It includes a neon/dark UI refresh, smooth UX touches,
and a resilient data layer that falls back to local sample products when the
remote API is unavailable.

---

### Highlights
- Modern neon UI theme applied across pages and components.
- Full-page burst animation on app load for a quick visual intro.
- Product list search, category filters, and price sorting.
- Cart quantity controls, remove buttons, and live totals.
- Toast notifications for key actions (add to cart, checkout, search, etc).
- Stripe Checkout (test mode) flow wired on the cart page.

---

### Tech Stack
- React 17+
- Redux Toolkit + redux-persist
- styled-components
- React Router DOM
- Material UI icons
- Stripe Checkout (test key)

---

### Project Structure
- `src/components/` UI building blocks (Navbar, Slider, Product cards, BurstBg, Toast)
- `src/pages/` top-level routes (Home, ProductList, Product, Cart, Login, Register, Success)
- `src/redux/` state slices and API calls
- `src/data.js` sample/fallback products and category data

---

### Getting Started

Requirements:
- Node.js (LTS recommended)
- npm or yarn

Install:
```bash
npm install
# or
yarn install
```

Run:
```bash
npm start
# or
yarn start
```

Build:
```bash
npm run build
# or
yarn build
```

Test:
```bash
npm test
# or
yarn test
```

---

### Data Source and Fallback
The app attempts to fetch products from a remote API. If the API is unreachable,
it automatically falls back to local data in `src/data.js` (`sampleProducts`).
This keeps the UI usable for demos and portfolios.

---

### Notes
- Cart behavior is fully client-side. Quantities and totals update immediately.
- Search works from the navbar (routes to `/products?q=...`) and within the
  product list page.
- The wishlist count is currently static because there is no wishlist slice yet.

---

### Improvements
Server side and data base could be added for full prod-ready app. This is still in progress.

---

