# Sustainable Campus Planning Tool

## Project Overview
A role-based web application for educational institutions to track, analyze, and improve sustainability practices including energy usage, water consumption, and waste management.

## Tech Stack
- **Frontend**: React.js (Vite), Tailwind CSS, Chart.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)

## Architecture
- MVC Pattern (Backend)
- RESTful API Design
- Role-Based Access Control (Admin, Faculty, Student)

## Features
- User authentication and authorization
- Role-based dashboards
- Resource usage tracking (electricity, water, waste)
- Data visualization with charts
- Sustainability recommendations
- Admin user management

## Installation

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- Git

### Backend Setup
```bash
cd server
npm install
# Create .env file with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# PORT=5000
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
# Create .env file with:
# VITE_API_URL=http://localhost:5000
npm run dev
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user

### Resources
- POST /api/resources - Create resource entry
- GET /api/resources - Get all resources
- PUT /api/resources/:id - Update resource
- DELETE /api/resources/:id - Delete resource

### Admin
- GET /api/users - Get all users
- DELETE /api/users/:id - Delete user

## Git Branching Strategy
- `main` - Production-ready code
- `dev` - Development branch
- `feature/*` - Feature branches

## Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Team
PBL Project - Sustainable Campus Planning

## License
MIT
