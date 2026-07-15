# 💻 Online Coding Platform — Frontend Client

A responsive, interactive frontend client mimicking LeetCode. Features clean UI states, custom code compilation editors, runtime logging displays, and comprehensive administration panels.

---

## 🚀 Deployed Endpoint
* **Client App Live URL:** [https://frontend-peach-ten-81.vercel.app](https://frontend-peach-ten-81.vercel.app)
* **Hosting Platform:** Vercel

---

## 🛠️ Core Stack
* **UI Framework:** React 18 / Vite
* **State Management:** Redux Toolkit (auth slices & status variables)
* **HTTP Client:** Axios (configured with credentials for HTTP-only cookie tracking)
* **Form Validation:** React Hook Form + Zod resolvers
* **Navigation:** React Router

---

## 🌟 Key Frontend Features

### 💻 Rich Coding Workspace
* Interactive syntax highlighting editor.
* Custom input support to test code variations.
* Live console results demonstrating runtime, peak memory consumption, and compiler errors.

### 🛡️ Secure Navigation & Routing
* Client-side private routing guards matching Redux authentication flags.
* LocalStorage state sync (`wasLoggedIn`) preventing infinite loaders on guest views.

### ⚙️ Admin Interface
* Forms to create and manage DSA problems directly.
* Video metadata interface supporting solution uploads and content deletion.

### ⚡ Client Performance Tuning
* **Parallel Handlers:** `/ping` and `checkAuth()` run asynchronously in `Promise.all()` to decrease initial wait states by 50%.
* **Axios Interceptors:** Automatic single retry configured for transient network errors and API timeouts.
* **Auto-Cancel:** 10-second `AbortController` timeouts on token validation checks ensure the user does not experience frozen loading screens.

---

## 📂 Frontend Directory Structure

```text
├── public/            # Static assets
└── src/
    ├── component/     # Modular views (AdminPanel, AdminUpload, Editorial, ChatAi, Submissions)
    ├── pages/         # Page templates (Homepage, Login, Signup, ProblemPage, Admin)
    ├── store/         # Redux global store configurations
    ├── utils/         # Global Axios client instance with cookie headers
    ├── authSlice.js   # Redux state reducer for credentials, checkAuth, and logout
    ├── App.jsx        # Routing engine & parallel boot configs
    └── main.jsx       # React DOM entry point
```

---

## ⚙️ Installation & Development Setup

### Requirements
* Node.js (v18+)
* Active Backend REST Server running

### Setup Steps
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install npm packages:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of `frontend/`:
   ```env
   VITE_API_URL="http://localhost:3000"
   ```
4. Run the local development server:
   ```bash
   npm run dev
   ```
5. Build the optimized production distribution:
   ```bash
   npm run build
   ```
