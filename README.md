SajiloStore — E-commerce Product & Cart App

Built for the Sajilo Life Pvt. Ltd. React Developer Intern/Trainee assessment.

Live Demo: [ADD LINK]
GitHub Repo: https://github.com/NakarmiKevus/sajilo-ecommerce-assessment

Overview

Browse products from the DummyJSON API, search/filter/sort them, view product details, and manage a cart that persists across page reloads.

Tech Stack

React (Vite), Tailwind CSS v4, React Router, Axios, Context API, LocalStorage
Custom hooks: useProducts, useCategories

Features

Products

Responsive grid with price, rating, discount
Search, category filter, sort by price/rating
Pagination
Loading/error/empty states

Product Details

/product/:id page with image gallery, reviews, stock info
Quantity picker + Add to Cart
404 handling for invalid IDs

Cart

Add/remove/update quantity, capped by stock
Subtotal, 13% tax, total
Persists via LocalStorage
Simple checkout (clears cart + confirmation)

Other

Reusable components: ProductCard, ProductGrid, CartItem, CartSummary, Pagination, Navbar
Centralized API calls in productService.js
Live cart count in Navbar
Handles corrupted LocalStorage data gracefully
Getting Started
bash
git clone https://github.com/NakarmiKevus/sajilo-ecommerce-assessment.git
cd sajilo-ecommerce-assessment
npm install
npm run dev

Open http://localhost:5173.

API

DummyJSON Products

GET /products?limit=194
GET /products/:id
GET /products/categories
Key Decisions
All 194 products fetched upfront; search/filter/sort/pagination run client-side.
Discounted price = price \* (1 - discountPercentage / 100).
Cart stores only essential fields, not the full product.
Checkout is intentionally minimal — no payment/shipping forms.
Search/filter/sort logic stays in Home.jsx (simple page-specific state, not reusable fetch logic).
