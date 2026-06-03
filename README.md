# Blog Web App (MERN Stack)

A fully-featured, modern blogging platform built using the MERN stack (MongoDB, Express, React, Node.js). The application includes an interactive client-side user experience, a built-in AI assistant for generating blog articles, and an admin dashboard for blog and comment management.

## Live Deployments

* **Frontend Client:** [https://blog-client-two-gamma.vercel.app/](https://blog-client-two-gamma.vercel.app/)
* **Backend Server:** [https://blog-server-dun-eta.vercel.app/](https://blog-server-dun-eta.vercel.app/)

---

## Features

### Client Portal
* **Clean & Modern UI:** Responsive blog listing, detailed article view, and category filters.
* **Newsletter Subscription:** Stay updated with the latest posts.
* **Commenting System:** Readers can leave comments under posts (pending admin approval).

### Admin Dashboard
* **Secure Authentication:** JWT-secured administrator login.
* **Metrics & Analytics:** Visual counts of total blogs, comments, drafts, and recent posts list.
* **AI Article Generator:** Integrates Google Gemini AI to draft structured blogs instantly based on a prompt.
* **Content Management:** Create (with image upload), read, publish/unpublish, and delete articles.
* **Comment Moderation:** Review, approve, or delete reader comments before they appear live.

---

## Technology Stack

* **Frontend:** React, Vite, Vanilla CSS, ESLint
* **Backend:** Node.js, Express.js (v5)
* **Database:** MongoDB & Mongoose
* **Image Hosting:** ImageKit SDK (for optimized image uploads & transforms)
* **Artificial Intelligence:** Google Gemini AI SDK (`@google/genai`)
* **Deployment:** Vercel (Serverless Functions)

---

## Repository Structure

```text
├── client/                 # React frontend (Vite)
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── assets/         # UI images and icons
│   │   ├── components/     # Reusable layout components
│   │   ├── context/        # Global state management
│   │   ├── pages/          # Pages (Home, Blog, Admin dashboard views)
│   │   └── main.jsx
│   └── vercel.json         # Frontend Vercel rewrites configuration
│
└── server/                 # Express backend (Node.js)
    ├── configs/            # DB, Gemini, and ImageKit configurations
    ├── controllers/        # Route controllers (admin & blog business logic)
    ├── middleware/         # Auth verification and Multer image uploading
    ├── models/             # Mongoose schemas (blog, comment)
    ├── routes/             # API routing endpoints
    ├── server.js           # Server entry point
    └── vercel.json         # Backend Vercel routing & runtime configurations
