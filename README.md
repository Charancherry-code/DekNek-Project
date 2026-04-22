# User Dashboard App

A beginner-friendly full-stack MERN app with JWT authentication, protected dashboard routes, and user-specific task CRUD.

## Project Overview

- Backend API with Node.js, Express, MongoDB, and JWT auth
- Frontend app with Vite React, Tailwind CSS, and protected routes
- User-specific CRUD operations for dashboard tasks
- Deployment-ready setup for Vercel or Netlify on the frontend and Render or Railway on the backend

## Features

- Signup and login
- Password hashing with bcrypt
- JWT token generation and verification
- Protected dashboard route
- Create, read, update, and delete tasks
- Each user sees only their own tasks
- Loading spinner and toast notifications
- Responsive UI with Tailwind CSS

## Tech Stack

- Frontend: Vite, React, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- Authentication: JWT + bcrypt
- Deployment: Vercel or Netlify for frontend, Render or Railway for backend

## Folder Structure

```text
deknek/
  backend/
    src/
      config/
        db.js
      controllers/
        authController.js
        taskController.js
      middleware/
        authMiddleware.js
      models/
        User.js
        Task.js
      routes/
        authRoutes.js
        taskRoutes.js
      server.js
    .env.example
    package.json
  frontend/
    index.html
    vite.config.js
    src/
      App.jsx
      main.jsx
      globals.css
      pages/
        DashboardPage.jsx
        LoginPage.jsx
        SignupPage.jsx
      components/
        Spinner.jsx
      lib/
        api.js
        auth.js
        error.js
    .env.example
    jsconfig.json
    package.json
  README.md
```

## Step-by-Step Implementation

### 1) Backend Setup

1. Install dependencies: `express`, `mongoose`, `bcryptjs`, `jsonwebtoken`, `cors`, `dotenv`
2. Create the MongoDB connection in `src/config/db.js`
3. Create models:
   - `User`: name, email, password
   - `Task`: title, description, userId
4. Build auth controller:
   - Signup: validate input, hash password, create user, return JWT
   - Login: validate credentials, return JWT
5. Build task controller:
   - CRUD operations scoped by `userId`
6. Add JWT middleware to protect task routes
7. Wire routes:
   - `/auth/signup`
   - `/auth/login`
   - `/tasks` for GET, POST, PUT, DELETE
8. Add CORS, JSON middleware, and error handling in `src/server.js`

### 2) Frontend Setup

1. Create a Vite React app with Tailwind CSS
2. Add pages:
   - `/login`
   - `/signup`
   - `/dashboard`
3. Add token helpers to manage JWT in `localStorage`
4. Add an axios instance with an Authorization header interceptor
5. Protect dashboard route by checking token and redirecting unauthorized users
6. Implement task CRUD UI in the dashboard
7. Add loading spinner and toast notifications

## Environment Variables

### Backend (`backend/.env`)

Use `backend/.env.example` as reference:

```env
PORT=5000
MONGO_URI=your_mongodb_srv_connection_string
MONGO_URI_DIRECT=your_atlas_standard_connection_string
JWT_SECRET=your_super_secret_jwt_key
FRONTEND_URL=http://localhost:5173
```

If `mongodb+srv` fails with `querySrv EREFUSED`, paste the standard Atlas connection string into `MONGO_URI_DIRECT` and leave `MONGO_URI` empty or keep it as a backup.

### Frontend (`frontend/.env.local`)

Use `frontend/.env.example` as reference:

```env
VITE_API_URL=http://localhost:5000
```

## Local Development

### Run Backend

```bash
cd backend
npm install
npm run dev
```

### Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on http://localhost:5173 and backend on http://localhost:5000.

## API Endpoints

### Auth

- `POST /auth/signup`
- `POST /auth/login`

### Tasks (Protected)

- `GET /tasks`
- `POST /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

For protected endpoints, include:

`Authorization: Bearer <token>`

## Deployment Instructions

### Backend on Render

1. Push repo to GitHub.
2. Create a new Web Service from the `backend` folder.
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables:
   - `PORT`
   - `MONGO_URI`

- `MONGO_URI_DIRECT` if you are using the standard Atlas connection string
- `JWT_SECRET`
- `FRONTEND_URL` set to your frontend URL

6. Deploy and copy the backend URL.

### Backend on Railway

1. Create a new project from your GitHub repo.
2. Set the service root to `backend`.
3. Add the same environment variables as above.
4. Deploy and copy the backend URL.

### Frontend on Vercel

1. Import the GitHub repository into Vercel.
2. Set the project root directory to `frontend`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable:
   - `VITE_API_URL` = deployed backend URL
6. Deploy.

## Submission Checklist

- Push code to GitHub with this structure
- Deploy backend on Render or Railway
- Deploy frontend on Vercel
- Test signup, login, and task CRUD on the live website
- Submit the GitHub and deployed links using the provided Google Form
