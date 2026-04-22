# User Dashboard App

A full-stack MERN application with JWT authentication and task management.

## Live Links

- Frontend: https://dek-nek-project.vercel.app
- Backend: https://deknek-production-44d4.up.railway.app

## What It Does

User signup and login with JWT tokens. Each user has their own dashboard where they can create, update, and delete tasks. Tasks are user-specific - you only see your own tasks.

## Tech Stack

Frontend: React 19, Vite, Tailwind CSS, React Router
Backend: Node.js, Express, MongoDB, Mongoose
Auth: JWT + bcrypt
Deployment: Vercel (frontend), Railway (backend)

## Folder Structure

```
deknek/
  backend/
    src/
      config/db.js
      controllers/
        authController.js
        taskController.js
      middleware/authMiddleware.js
      models/
        User.js
        Task.js
      routes/
        authRoutes.js
        taskRoutes.js
      server.js
    package.json
  frontend/
    src/
      pages/
        DashboardPage.jsx
        LoginPage.jsx
        SignupPage.jsx
      lib/
        api.js
        auth.js
        error.js
      App.jsx
    index.html
    package.json
  README.md
```

## Environment Variables

Backend (.env):
```
PORT=5000
MONGO_URI_DIRECT=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

Frontend (.env.local):
```
VITE_API_URL=http://localhost:5000
```

## Running Locally

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Frontend runs on http://localhost:5173, backend on http://localhost:5000.

## API Endpoints

Auth:
- POST /auth/signup
- POST /auth/login

Tasks (protected, requires JWT):
- GET /tasks
- POST /tasks
- PUT /tasks/:id
- DELETE /tasks/:id

## Deployment

Backend on Railway:
- Set root directory to `backend`
- Environment variables: PORT, MONGO_URI_DIRECT, JWT_SECRET, FRONTEND_URL

Frontend on Vercel:
- Set root directory to `frontend`
- Build command: `npm run build`
- Environment variable: VITE_API_URL
