# Happen

Happen is a web application featuring a React/Vite frontend and a Node.js/Express backend, with role-based access control and event management capabilities.

## Project Structure

```
Happen/
├── frontend/             # React (Vite) frontend application
│   ├── public/           # Static assets
│   ├── src/              # Source code
│   │   ├── components/   # Reusable UI components
│   │   ├── context/      # State management context
│   │   ├── pages/        # Application views (Home, Dashboards)
│   │   └── App.tsx       # Root component
│   ├── package.json      # Frontend dependencies
│   └── vite.config.ts    # Vite configuration
└── backend/              # Node.js + Express + MongoDB backend
    ├── config/           # Database configuration
    ├── controllers/      # API logic and route handlers
    ├── middleware/       # JWT and authorization middleware
    ├── models/           # Mongoose schemas (User, Event)
    ├── routes/           # Express routes
    ├── .env              # Environment variables
    └── server.js         # Entry point for the backend server
```

## User Roles

The system supports three user roles:
1. **Admin**: Full access to the system. Can manage all users and events.
2. **Coordinator**: Can create events, and manage (update/delete) their own events.
3. **Public**: No account required to browse events and view event details.

## Backend APIs

The backend runs on port `5000` by default. Base URL: `http://localhost:5000/api`

### Health Check
- `GET /api/health` - Check if the backend server is running.

### Authentication
- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Login and receive a JWT.

### Events
- `GET /api/events` - Retrieve all events (Public access).
- `GET /api/events/:id` - Retrieve details of a specific event (Public access).
- `POST /api/events` - Create a new event (Protected: Admin, Coordinator).
- `PUT /api/events/:id` - Update an existing event (Protected: Admin, Coordinator).
- `DELETE /api/events/:id` - Delete an event (Protected: Admin, Coordinator).

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB installed locally or a MongoDB Atlas account

### 1. Setup Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your `.env` file with your `MONGODB_URI` and `JWT_SECRET`.
4. Start the server:
   ```bash
   npm start
   ```

### 2. Setup Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
