# Project Report - Sustainable Campus Planning Tool

## Table of Contents
1. Executive Summary
2. Introduction
3. System Architecture
4. Technology Stack Justification
5. Database Design
6. Implementation Details
7. Security Features
8. Testing & Validation
9. Deployment
10. Future Enhancements
11. Conclusion

---

## 1. Executive Summary

The Sustainable Campus Planning Tool is a full-stack web application designed to help educational institutions monitor and improve their sustainability practices. The system enables tracking of electricity usage, water consumption, and waste generation while providing data-driven insights and recommendations.

**Key Features:**
- Role-based access control (Admin, Faculty, Student)
- Real-time resource usage tracking
- Data visualization with interactive charts
- AI-powered sustainability recommendations
- Comprehensive admin dashboard

---

## 2. Introduction

### 2.1 Problem Statement
Educational institutions struggle to track and manage their environmental impact due to:
- Lack of centralized data collection systems
- Difficulty in analyzing sustainability metrics
- Limited visibility into resource consumption patterns
- Absence of actionable insights for improvement

### 2.2 Objectives
- Develop a centralized platform for sustainability data management
- Implement role-based access for different user types
- Provide visual analytics for resource consumption
- Generate automated sustainability recommendations
- Enable data-driven decision making

### 2.3 Scope
- User authentication and authorization
- Resource usage data entry and management
- Analytics and reporting
- Admin user management
- Responsive web interface

---

## 3. System Architecture

### 3.1 Architecture Pattern: MVC (Model-View-Controller)

```
┌─────────────────────────────────────────────────┐
│                   CLIENT LAYER                   │
│  (React.js - View + Controller)                 │
│  - Components, Pages, Context, Services         │
└─────────────────┬───────────────────────────────┘
                  │ HTTP/REST API
                  │ (JSON)
┌─────────────────▼───────────────────────────────┐
│                  SERVER LAYER                    │
│  (Express.js - Controller)                      │
│  - Routes, Middleware, Controllers              │
└─────────────────┬───────────────────────────────┘
                  │ Mongoose ODM
                  │
┌─────────────────▼───────────────────────────────┐
│                  MODEL LAYER                     │
│  (MongoDB - Model)                              │
│  - User, ResourceUsage, SustainabilityGoal      │
└─────────────────────────────────────────────────┘
```

### 3.2 System Flow

```
User Registration/Login
        ↓
JWT Token Generation
        ↓
Role-Based Dashboard Access
        ↓
Data Entry (CRUD Operations)
        ↓
MongoDB Storage
        ↓
Data Aggregation & Analytics
        ↓
Chart.js Visualization
        ↓
Sustainability Recommendations
```

### 3.3 Component Interaction

**Frontend Components:**
- AuthContext: Global authentication state
- PrivateRoute: Route protection
- Navbar: Navigation component
- Pages: Login, Register, Dashboard, Resources, Admin

**Backend Components:**
- Models: Data schemas
- Controllers: Business logic
- Routes: API endpoints
- Middleware: Auth, error handling

---

## 4. Technology Stack Justification

### 4.1 Frontend: React.js + Vite

**Why React?**
- Component-based architecture for reusability
- Virtual DOM for optimal performance
- Large ecosystem (Chart.js, React Router)
- Strong community support

**Why Vite?**
- Faster development server than CRA
- Optimized build process
- Better HMR (Hot Module Replacement)

### 4.2 Styling: Tailwind CSS

**Advantages:**
- Utility-first approach for rapid development
- Smaller bundle size (unused styles purged)
- Consistent design system
- Responsive design utilities

### 4.3 Backend: Node.js + Express.js

**Why Node.js?**
- JavaScript full-stack consistency
- Non-blocking I/O for scalability
- npm ecosystem
- Excellent for REST APIs

**Why Express.js?**
- Minimal and flexible
- Robust routing
- Middleware support
- Industry standard

### 4.4 Database: MongoDB

**Why MongoDB?**
- Flexible schema for evolving requirements
- JSON-like documents (BSON)
- Excellent for time-series data
- Horizontal scalability
- Aggregation framework for analytics

### 4.5 Authentication: JWT

**Why JWT?**
- Stateless authentication
- Scalable (no server-side sessions)
- Secure token-based system
- Cross-domain support

---

## 5. Database Design

### 5.1 Entity Relationship Diagram

```
┌─────────────────┐
│      User       │
├─────────────────┤
│ _id (PK)        │
│ name            │
│ email (unique)  │
│ password (hash) │
│ role            │
│ createdAt       │
│ updatedAt       │
└────────┬────────┘
         │ 1
         │
         │ N
┌────────▼────────────────┐
│   ResourceUsage         │
├─────────────────────────┤
│ _id (PK)                │
│ userId (FK)             │
│ electricityUsage        │
│ waterConsumption        │
│ wasteGenerated          │
│ month                   │
│ year                    │
│ createdAt               │
│ updatedAt               │
└─────────────────────────┘

┌─────────────────────────┐
│  SustainabilityGoal     │
├─────────────────────────┤
│ _id (PK)                │
│ targetType              │
│ targetValue             │
│ description             │
│ createdAt               │
│ updatedAt               │
└─────────────────────────┘
```

### 5.2 Schema Details

**User Schema:**
- Stores user credentials and role
- Password hashed using bcrypt (12 rounds)
- Email validation and uniqueness constraint
- Timestamps for audit trail

**ResourceUsage Schema:**
- References User via userId
- Stores monthly resource consumption
- Indexed on userId, month, year for fast queries
- Validation for positive numbers

**SustainabilityGoal Schema:**
- Defines target thresholds
- Enum for targetType (energy/water/waste)
- Used for generating recommendations

---

## 6. Implementation Details

### 6.1 Authentication Flow

1. **Registration:**
   - User submits credentials
   - Password hashed with bcrypt
   - User document created in MongoDB
   - JWT token generated and returned

2. **Login:**
   - User submits email/password
   - Password compared with hash
   - JWT token generated on success
   - Token stored in localStorage

3. **Protected Routes:**
   - Token sent in Authorization header
   - Middleware verifies token
   - User object attached to request
   - Role-based authorization applied

### 6.2 CRUD Operations

**Create Resource:**
```javascript
POST /api/resources
Body: { electricityUsage, waterConsumption, wasteGenerated, month, year }
Auth: Required
```

**Read Resources:**
```javascript
GET /api/resources?month=11&year=2024
Auth: Required
Filter: Admin sees all, others see own data
```

**Update Resource:**
```javascript
PUT /api/resources/:id
Auth: Required
Authorization: Owner or Admin only
```

**Delete Resource:**
```javascript
DELETE /api/resources/:id
Auth: Required
Authorization: Owner or Admin only
```

### 6.3 Analytics Implementation

**Aggregation Pipeline:**
```javascript
ResourceUsage.aggregate([
  { $match: filter },
  {
    $group: {
      _id: null,
      totalElectricity: { $sum: '$electricityUsage' },
      avgElectricity: { $avg: '$electricityUsage' },
      // ... other metrics
    }
  }
])
```

### 6.4 Sustainability Recommendations

**Logic:**
```javascript
if (avgElectricity > 500) {
  suggest: "Use energy-efficient appliances"
}
if (avgWater > 300) {
  suggest: "Install water-saving fixtures"
}
if (avgWaste > 50) {
  suggest: "Implement recycling programs"
}
```

---

## 7. Security Features

### 7.1 Authentication Security
- Passwords hashed with bcrypt (salt rounds: 12)
- JWT tokens with 30-day expiration
- Secure token storage in localStorage
- Token validation on every protected request

### 7.2 Authorization
- Role-based access control (RBAC)
- Middleware checks user role
- Admin-only routes protected
- Users can only modify their own data

### 7.3 Input Validation
- Mongoose schema validation
- Email format validation
- Password minimum length (6 characters)
- Positive number validation for metrics

### 7.4 Error Handling
- Try-catch blocks in all async functions
- Centralized error handler middleware
- Proper HTTP status codes
- No sensitive data in error messages

### 7.5 Security Headers
- CORS configuration
- JSON body parsing limits
- Environment variable protection

---

## 8. Testing & Validation

### 8.1 API Testing (Postman)

**Test Cases:**
1. User Registration
   - Valid data → 201 Created
   - Duplicate email → 400 Bad Request
   - Invalid email → 400 Bad Request

2. User Login
   - Valid credentials → 200 OK + token
   - Invalid credentials → 401 Unauthorized

3. Resource CRUD
   - Create without auth → 401
   - Create with auth → 201
   - Get resources → 200 + data array
   - Update own resource → 200
   - Update others' resource → 403
   - Delete resource → 200

4. Admin Operations
   - Get users as admin → 200
   - Get users as student → 403
   - Delete user as admin → 200

### 8.2 Frontend Testing

**Manual Testing:**
- Responsive design on mobile/tablet/desktop
- Form validation
- Loading states
- Error messages
- Toast notifications
- Chart rendering
- Navigation flow

### 8.3 Integration Testing

**End-to-End Flow:**
1. Register new user
2. Login with credentials
3. Add resource entries
4. View dashboard with charts
5. Edit resource entry
6. Delete resource entry
7. Admin: View all users
8. Admin: Delete user
9. Logout

---

## 9. Deployment

### 9.1 Deployment Architecture

```
┌──────────────────┐
│   Vercel CDN     │  ← React Frontend
│  (Global Edge)   │
└────────┬─────────┘
         │ HTTPS
         │
┌────────▼─────────┐
│  Render Server   │  ← Express Backend
│   (Cloud VM)     │
└────────┬─────────┘
         │ MongoDB Protocol
         │
┌────────▼─────────┐
│  MongoDB Atlas   │  ← Database
│  (Cloud Cluster) │
└──────────────────┘
```

### 9.2 Environment Configuration

**Production Environment Variables:**

Backend (Render):
```
MONGO_URI=mongodb+srv://...
JWT_SECRET=production_secret
NODE_ENV=production
PORT=5000
```

Frontend (Vercel):
```
VITE_API_URL=https://api.example.com
```

### 9.3 CI/CD Pipeline

- Git push to main branch
- Automatic deployment triggered
- Build process runs
- Tests executed (if configured)
- Deployment to production
- Health checks performed

---

## 10. Future Enhancements

### 10.1 Features
- Email notifications for threshold breaches
- PDF report generation
- Data export (CSV, Excel)
- Mobile app (React Native)
- Real-time data updates (WebSockets)
- Machine learning predictions
- Comparative analytics (campus vs campus)

### 10.2 Technical Improvements
- Redis caching for analytics
- GraphQL API
- Microservices architecture
- Docker containerization
- Kubernetes orchestration
- Automated testing (Jest, Cypress)
- Performance monitoring (New Relic)

### 10.3 Sustainability Features
- Carbon footprint calculator
- Solar panel integration
- IoT sensor integration
- Gamification for user engagement
- Sustainability challenges
- Leaderboards

---

## 11. Conclusion

The Sustainable Campus Planning Tool successfully addresses the need for centralized sustainability management in educational institutions. The MERN stack provides a robust, scalable foundation, while the role-based architecture ensures appropriate access control.

**Key Achievements:**
✅ Full-stack MERN implementation
✅ Secure JWT authentication
✅ Role-based authorization
✅ Real-time data visualization
✅ Responsive UI/UX
✅ RESTful API design
✅ Production deployment
✅ Comprehensive documentation

**Impact:**
- Enables data-driven sustainability decisions
- Reduces manual tracking overhead
- Provides actionable insights
- Promotes environmental awareness
- Scalable for institutional growth

---

## Viva Preparation Points

### Architecture Questions
**Q: Why did you choose MERN stack?**
A: JavaScript full-stack consistency, React's component reusability, Express's flexibility, MongoDB's schema flexibility for evolving sustainability metrics, and excellent ecosystem support.

**Q: Explain the MVC pattern in your project.**
A: Models (MongoDB schemas) define data structure, Controllers (Express) handle business logic, Views (React components) render UI. Clear separation of concerns.

**Q: How does authentication work?**
A: User registers → password hashed with bcrypt → JWT token generated → token stored in localStorage → sent in Authorization header → middleware verifies → user authenticated.

### Security Questions
**Q: How do you secure passwords?**
A: Bcrypt hashing with 12 salt rounds. Passwords never stored in plain text. Pre-save hook in User model automatically hashes passwords.

**Q: What is JWT and why use it?**
A: JSON Web Token - stateless authentication. Contains user ID and role. Signed with secret key. Scalable (no server sessions). Expires in 30 days.

**Q: How do you prevent unauthorized access?**
A: Protect middleware checks JWT validity. Authorize middleware checks user role. Users can only modify their own data (ownership check).

### Database Questions
**Q: Why MongoDB over SQL?**
A: Flexible schema for evolving sustainability metrics, JSON-like documents match JavaScript objects, excellent aggregation framework for analytics, horizontal scalability.

**Q: Explain your database relationships.**
A: One-to-many: User → ResourceUsage. Each user can have multiple resource entries. Referenced via userId field.

**Q: How do you optimize queries?**
A: Indexes on userId, month, year. Aggregation pipeline for analytics. Populate for joins. Lean queries when full documents not needed.

### Sustainability Logic Questions
**Q: How do you generate recommendations?**
A: Compare average usage against thresholds. If avgElectricity > 500kWh, suggest energy-efficient appliances. If avgWater > 300L, suggest water-saving fixtures.

**Q: How can this scale to multiple campuses?**
A: Add campus field to User model. Filter data by campus. Comparative analytics between campuses. Multi-tenant architecture.

### Deployment Questions
**Q: Where is your application deployed?**
A: Frontend on Vercel (CDN), Backend on Render (cloud VM), Database on MongoDB Atlas (managed cluster).

**Q: How do you handle environment variables?**
A: .env files locally (gitignored). Platform environment variables in production. Never commit secrets to Git.

**Q: What happens if the server crashes?**
A: Render auto-restarts. MongoDB Atlas has automatic failover. Vercel has global CDN redundancy.

---

## Appendix

### A. Folder Structure
```
pbl-project/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
└── README.md
```

### B. Dependencies

**Backend:**
- express: Web framework
- mongoose: MongoDB ODM
- bcryptjs: Password hashing
- jsonwebtoken: JWT generation
- cors: Cross-origin requests
- dotenv: Environment variables

**Frontend:**
- react: UI library
- react-router-dom: Routing
- axios: HTTP client
- chart.js: Data visualization
- react-chartjs-2: React wrapper for Chart.js
- react-toastify: Notifications
- tailwindcss: Styling

### C. API Endpoints Summary

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| POST | /api/auth/register | No | - | Register user |
| POST | /api/auth/login | No | - | Login user |
| GET | /api/auth/me | Yes | All | Get current user |
| POST | /api/resources | Yes | All | Create resource |
| GET | /api/resources | Yes | All | Get resources |
| PUT | /api/resources/:id | Yes | Owner/Admin | Update resource |
| DELETE | /api/resources/:id | Yes | Owner/Admin | Delete resource |
| GET | /api/resources/analytics | Yes | All | Get analytics |
| GET | /api/users | Yes | Admin | Get all users |
| DELETE | /api/users/:id | Yes | Admin | Delete user |

---

**Project Completed: December 2024**
**Team: PBL Project Group**
**Institution: [Your Institution Name]**
