# 🛍️ AlmaLane – E-Commerce Platform  

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)  
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)  
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)  
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-%5E2.9-purple?style=for-the-badge&logo=redux)  
![Jest](https://img.shields.io/badge/Jest-29.7-red?style=for-the-badge&logo=jest&logoColor=white)  

AlmaLane is a modern **e-commerce web application** built with **Next.js, TypeScript, Tailwind CSS, and Redux Toolkit**.  
It provides a seamless shopping experience with **authentication, cart & wishlist management, product filtering, search, and pagination**.  

---
## 🚀 Live Demo  

Check out the live version of **AlmaLane** here:  

👉 [Live Project on Netlify](https://almalane.netlify.app/)
👉 [Figma Used](https://tinyurl.com/kfrau46v)

## ⚡ Tech Stack  

- **Next.js 15 (App Router)** – Server-side rendering, static site generation, dynamic routing.  
- **TypeScript** – Strict type safety across components, Redux store, and API integration.  
- **Tailwind CSS** – Utility-first responsive UI design.  
- **Redux Toolkit** – Centralized state management for authentication, cart, wishlist, and filters.  
- **Next.js Navigation** – Dynamic product pages (`/products/[id]`) and category-based routing.  
- **Jest + React Testing Library** – Unit tests for auth, product listing, and cart features.  

---

## ✨ Features  

✅ **Authentication** – Login & Signup with validation  
✅ **Cart Management** – Add, remove, update quantity  
✅ **Wishlist** – Save favorite products  
✅ **Product Filtering** – Category-based filtering  
✅ **Product Search** – Real-time search with `SearchContext`  
✅ **Pagination** – 9 products per page, Prev/Next navigation, active page indicator  
✅ **Dynamic Product Pages** – Next.js `[id]` routes for product details  
✅ **Responsive UI** – Tailwind-powered design for all screen sizes  

---

## 🔧 Implementation Highlights  

- **TypeScript First Approach** – Strongly typed Redux store, components, and API calls to reduce runtime errors.  
- **Pagination** – Client-side pagination with `useState` and `useMemo`.  
- **Next.js Dynamic Routing** – Product pages generated dynamically for better SEO and performance.  
- **Testing** – Critical flows (signup, login, cart) tested with Jest + React Testing Library.  

---

## 📂 Project Structure  

```bash
.
├── components/       # Reusable UI components (Header, Footer, ProductCards, etc.)
├── container/        # Feature-based components (Auth, ProductShowcase, Cart, etc.)
├── store/            # Redux Toolkit slices (authSlice, cartSlice, wishlistSlice)
├── contexts/         # Context API (SearchContext)
├── lib/              # API integrations & utils
├── pages/            # Next.js App Router entry points
└── tests/            # Unit tests with Jest + RTL
```

## 📌 Future Enhancements

✅ Add backend (Django / Node.js + Express + MongoDB)
✅ Payment gateway integration (Stripe/Razorpay)
✅ Order history & tracking
✅ User profile & address management

## 🚀 Getting Started  

Follow these steps to run AlmaLane locally:  

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/yourusername/almalane.git
cd almalane
```
### 2️⃣ Install dependencies
```bash
npm instal
```
### 3️⃣ Run the development server
```bash
npm run dev
```
