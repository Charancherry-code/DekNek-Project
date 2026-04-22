# User Dashboard App

A beginner-friendly full-stack MERN app with JWT authentication, protected dashboard routes, and user-specific task CRUD.

## 🚀 Live Deployment

- **Frontend**: [https://dek-nek-project.vercel.app](https://dek-nek-project.vercel.app)
- **Backend**: [https://deknek-production-44d4.up.railway.app](https://deknek-production-44d4.up.railway.app)

## Project Overview

- Backend API with Node.js, Express, MongoDB, and JWT auth
- Frontend app with Vite React, Tailwind CSS, and protected routes
- User-specific CRUD operations for dashboard tasks
- Deployment-ready setup for Vercel or Netlify on the frontend and Render or Railway on the backend

## Features

- 🔐 **Authentication**: Signup and login with JWT tokens
- 🔒 **Security**: Password hashing with bcrypt
- 📝 **Task Management**: Create, read, update, and delete tasks
- 👤 **User Isolation**: Each user sees only their own tasks
- 🎨 **Modern UI**: Responsive design with Tailwind CSS
- ⚡ **Real-time Feedback**: Loading spinners and toast notifications
- 🛡️ **Protected Routes**: JWT middleware for API protection

## Tech Stack

- **Frontend**: Vite, React 19, Tailwind CSS, React Router
- **Backend**: Node.js, Express, CORS
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcrypt
- **Deployment**: 
  - Frontend: Vercel
  - Backend: Railway

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

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB account (for database)

### Clone and Run

```bash
# Clone the repository
git clone https://github.com/Charancherry-code/DekNek-Project.git
cd DekNek-Project

# Run Backend
cd backend
npm install
npm run dev

# Run Frontend (in a new terminal)
cd frontend
npm install
npm run dev
```

Visit http://localhost:5173 to see the application.

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

### Backend on Railway

The backend is currently deployed on Railway. To deploy or update:

1. Create a new project from your GitHub repo.
2. Set the service root to `backend`.
3. Add environment variables:
   - `PORT` = `5000`
   - `MONGO_URI_DIRECT` = your MongoDB connection string
   - `JWT_SECRET` = your secret key for JWT
   - `FRONTEND_URL` = `https://dek-nek-project.vercel.app`
4. Deploy and copy the backend URL.

### Frontend on Vercel

The frontend is currently deployed on Vercel. To deploy or update:

1. Import the GitHub repository into Vercel.
2. Set the project root directory to `frontend`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable:
   - `VITE_API_URL` = `https://deknek-production-44d4.up.railway.app`
6. Deploy.

### Backend on Render (Alternative)

1. Push repo to GitHub.
2. Create a new Web Service from the `backend` folder.
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables:
   - `PORT`
   - `MONGO_URI` or `MONGO_URI_DIRECT`
   - `JWT_SECRET`
   - `FRONTEND_URL` set to your frontend URL
6. Deploy and copy the backend URL.

## Project Status

✅ **Completed**
- Backend deployed on Railway
- Frontend deployed on Vercel
- Authentication system fully functional
- Task CRUD operations working
- CORS configured for cross-origin requests
- CSP headers configured for frontend security

## Testing

To test the live application:

1. Visit [https://dek-nek-project.vercel.app](https://dek-nek-project.vercel.app)
2. Click "Signup" to create a new account
3. Enter your name, email, and password (min 6 characters)
4. You'll be redirected to the dashboard
5. Create, update, and delete tasks
6. Each user sees only their own tasks

## API Testing

You can test the backend API directly:

```bash
# Health check
curl https://deknek-production-44d4.up.railway.app/health

# Signup
curl -X POST https://deknek-production-44d4.up.railway.app/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"test","email":"test@example.com","password":"password123"}'

# Login
curl -X POST https://deknek-production-44d4.up.railway.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Troubleshooting

### MongoDB Connection Issues
If you encounter `querySrv EREFUSED` errors:
- Use the standard Atlas connection string in `MONGO_URI_DIRECT`
- Leave `MONGO_URI` empty or as a backup
- Ensure your MongoDB Atlas IP whitelist includes your deployment platform

### CORS Errors
- Ensure `FRONTEND_URL` in Railway matches your Vercel URL exactly
- The backend now supports multiple origins for development flexibility

### CSP Errors
- The frontend includes a CSP meta tag to allow script execution
- If CSP errors persist, check your Vercel deployment settings

### Frontend Not Connecting to Backend
- Verify `VITE_API_URL` is set correctly in Vercel environment variables
- Hard refresh the browser after deployment (`Ctrl + Shift + R`)
- Check browser console for specific error messages

## License

This project is open source and available for educational purposes.

## Contributing

Feel free to fork this project and submit pull requests for improvements.
