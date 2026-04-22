# User Dashboard App

A full-stack MERN application with JWT authentication and task management capabilities.

## Live Deployment

- Frontend: https://dek-nek-project.vercel.app
- Backend: https://deknek-production-44d4.up.railway.app

## Overview

This application provides user authentication and a personal task management dashboard. Users can create accounts, securely log in, and manage their tasks through a protected interface. Each user's data is isolated - users can only access their own tasks.

## Features

- User registration and login with JWT authentication
- Password hashing using bcrypt for security
- Protected dashboard routes requiring authentication
- Full CRUD operations for tasks (Create, Read, Update, Delete)
- User-specific task isolation
- Real-time loading states and toast notifications
- Responsive UI built with Tailwind CSS
- Automatic token-based authentication via axios interceptors

## Tech Stack

### Frontend
- React 19
- Vite (build tool)
- Tailwind CSS (styling)
- React Router (routing)
- Axios (HTTP client)
- React Hot Toast (notifications)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (JSON Web Tokens)
- bcrypt (password hashing)
- CORS (Cross-Origin Resource Sharing)

### Deployment
- Frontend: Vercel
- Backend: Railway

## Project Structure

```
deknek/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js  # Auth logic (signup, login)
│   │   │   └── taskController.js  # Task CRUD operations
│   │   ├── middleware/
│   │   │   └── authMiddleware.js  # JWT verification
│   │   ├── models/
│   │   │   ├── User.js            # User schema
│   │   │   └── Task.js            # Task schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js      # Auth endpoints
│   │   │   └── taskRoutes.js      # Task endpoints
│   │   └── server.js              # Express server setup
│   ├── package.json
│   └── .env                       # Environment variables
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   └── DashboardPage.jsx
│   │   ├── lib/
│   │   │   ├── api.js             # Axios instance with auth
│   │   │   ├── auth.js            # Token management
│   │   │   └── error.js          # Error handling
│   │   ├── components/
│   │   │   └── Spinner.jsx        # Loading component
│   │   ├── App.jsx                # Main app component
│   │   └── main.jsx               # Entry point
│   ├── index.html
│   └── package.json
└── README.md
```

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB account (for database)

### Clone the Repository
```bash
git clone https://github.com/Charancherry-code/DekNek-Project.git
cd DekNek-Project
```

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGO_URI_DIRECT=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
```

Start the backend server:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env.local` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000
```

Start the frontend development server:
```bash
npm run dev
```

The frontend will be available at http://localhost:5173 and the backend at http://localhost:5000.

## API Documentation

### Authentication Endpoints

#### POST /auth/signup
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST /auth/login
Authenticate an existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Task Endpoints (Protected)

All task endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

#### GET /tasks
Get all tasks for the authenticated user.

**Response (200):**
```json
[
  {
    "_id": "task_id",
    "title": "Task title",
    "description": "Task description",
    "userId": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### POST /tasks
Create a new task for the authenticated user.

**Request Body:**
```json
{
  "title": "New task",
  "description": "Task description"
}
```

**Response (201):**
```json
{
  "_id": "task_id",
  "title": "New task",
  "description": "Task description",
  "userId": "user_id",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### PUT /tasks/:id
Update an existing task.

**Request Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description"
}
```

**Response (200):**
```json
{
  "_id": "task_id",
  "title": "Updated title",
  "description": "Updated description",
  "userId": "user_id",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T01:00:00.000Z"
}
```

#### DELETE /tasks/:id
Delete a task.

**Response (200):**
```json
{
  "message": "Task deleted"
}
```

## Deployment

### Backend Deployment (Railway)

1. Create a new project on Railway from your GitHub repository
2. Set the root directory to `backend`
3. Configure environment variables:
   - `PORT`: 5000
   - `MONGO_URI_DIRECT`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `FRONTEND_URL`: https://dek-nek-project.vercel.app
4. Deploy the service

### Frontend Deployment (Vercel)

1. Import the GitHub repository into Vercel
2. Set the root directory to `frontend`
3. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Add environment variable:
   - `VITE_API_URL`: https://deknek-production-44d4.up.railway.app
5. Deploy the application

## Security Features

- Passwords are hashed using bcrypt before storage
- JWT tokens for secure authentication
- Protected API routes requiring valid tokens
- CORS configuration for cross-origin requests
- Content Security Policy (CSP) headers for frontend security
- User data isolation - users can only access their own tasks

## Troubleshooting

### MongoDB Connection Issues
If you encounter `querySrv EREFUSED` errors, use the standard MongoDB Atlas connection string in `MONGO_URI_DIRECT` instead of the `mongodb+srv` format.

### CORS Errors
Ensure the `FRONTEND_URL` environment variable in Railway exactly matches your Vercel deployment URL.

### Authentication Errors
If you receive "Not authorized" errors:
- Verify your JWT token is valid
- Check that the token is included in the Authorization header
- Ensure the token hasn't expired

## License

This project is open source and available for educational purposes.

## Contributing

Contributions are welcome. Feel free to submit pull requests for improvements or bug fixes.
