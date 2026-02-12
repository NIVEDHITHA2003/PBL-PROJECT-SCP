# Quick Setup & Testing Guide

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### Step 2: Configure Environment Variables

**Backend (.env in server folder):**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/sustainable-campus
JWT_SECRET=your_super_secret_jwt_key_12345
PORT=5000
NODE_ENV=development
```

**Frontend (.env in client folder):**
```env
VITE_API_URL=http://localhost:5000
```

### Step 3: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### Step 4: Access Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

## 🧪 Testing Checklist

### 1. User Registration & Authentication
- [ ] Register with valid data (Admin role)
- [ ] Register with duplicate email (should fail)
- [ ] Login with correct credentials
- [ ] Login with wrong password (should fail)
- [ ] Access protected route without token (should redirect)

### 2. Dashboard
- [ ] View welcome message with user name
- [ ] See analytics cards (electricity, water, waste)
- [ ] View resource usage chart
- [ ] Read sustainability suggestions

### 3. Resource Management
- [ ] Add new resource entry
- [ ] View all resource entries in table
- [ ] Edit existing resource entry
- [ ] Delete resource entry
- [ ] Verify form validation (negative numbers should fail)

### 4. Admin Features (Admin role only)
- [ ] Access admin page
- [ ] View all users in system
- [ ] Delete a user (not yourself)
- [ ] Verify non-admin cannot access admin page

### 5. Role-Based Access
- [ ] Login as Student - can only see own data
- [ ] Login as Faculty - can only see own data
- [ ] Login as Admin - can see all data
- [ ] Verify users cannot edit others' resources

### 6. UI/UX
- [ ] Responsive design on mobile (< 768px)
- [ ] Responsive design on tablet (768px - 1024px)
- [ ] Responsive design on desktop (> 1024px)
- [ ] Toast notifications appear on actions
- [ ] Loading states show during API calls
- [ ] Navigation works correctly

---

## 📊 Sample Test Data

### Test Users
```javascript
// Admin User
{
  name: "Admin User",
  email: "admin@campus.edu",
  password: "admin123",
  role: "Admin"
}

// Faculty User
{
  name: "Dr. Smith",
  email: "smith@campus.edu",
  password: "faculty123",
  role: "Faculty"
}

// Student User
{
  name: "John Doe",
  email: "john@campus.edu",
  password: "student123",
  role: "Student"
}
```

### Sample Resource Entries
```javascript
// High usage (triggers warnings)
{
  electricityUsage: 650,
  waterConsumption: 450,
  wasteGenerated: 75,
  month: 11,
  year: 2024
}

// Normal usage
{
  electricityUsage: 350,
  waterConsumption: 200,
  wasteGenerated: 30,
  month: 10,
  year: 2024
}

// Low usage (good sustainability)
{
  electricityUsage: 200,
  waterConsumption: 150,
  wasteGenerated: 20,
  month: 9,
  year: 2024
}
```

---

## 🔧 Postman Testing

### Import Collection

Create a new Postman collection with these requests:

**1. Register User**
```
POST http://localhost:5000/api/auth/register
Body (JSON):
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123",
  "role": "Student"
}
```

**2. Login User**
```
POST http://localhost:5000/api/auth/login
Body (JSON):
{
  "email": "test@example.com",
  "password": "test123"
}
```
→ Copy the token from response

**3. Get Current User**
```
GET http://localhost:5000/api/auth/me
Headers:
Authorization: Bearer <paste_token_here>
```

**4. Create Resource**
```
POST http://localhost:5000/api/resources
Headers:
Authorization: Bearer <token>
Body (JSON):
{
  "electricityUsage": 450,
  "waterConsumption": 280,
  "wasteGenerated": 35,
  "month": 11,
  "year": 2024
}
```

**5. Get All Resources**
```
GET http://localhost:5000/api/resources
Headers:
Authorization: Bearer <token>
```

**6. Get Analytics**
```
GET http://localhost:5000/api/resources/analytics
Headers:
Authorization: Bearer <token>
```

**7. Update Resource**
```
PUT http://localhost:5000/api/resources/<resource_id>
Headers:
Authorization: Bearer <token>
Body (JSON):
{
  "electricityUsage": 400
}
```

**8. Delete Resource**
```
DELETE http://localhost:5000/api/resources/<resource_id>
Headers:
Authorization: Bearer <token>
```

**9. Get All Users (Admin only)**
```
GET http://localhost:5000/api/users
Headers:
Authorization: Bearer <admin_token>
```

**10. Delete User (Admin only)**
```
DELETE http://localhost:5000/api/users/<user_id>
Headers:
Authorization: Bearer <admin_token>
```

---

## 🐛 Common Issues & Solutions

### Issue: MongoDB Connection Failed
**Solution:**
- Check MONGO_URI is correct
- Verify MongoDB Atlas IP whitelist includes your IP
- Ensure database user has correct permissions

### Issue: CORS Error
**Solution:**
- Verify backend is running on port 5000
- Check Vite proxy configuration
- Ensure CORS is enabled in server.js

### Issue: JWT Token Invalid
**Solution:**
- Check JWT_SECRET is set in .env
- Verify token is being sent in Authorization header
- Token format: "Bearer <token>"

### Issue: Port Already in Use
**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Issue: Module Not Found
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📈 Performance Testing

### Load Testing Scenarios
1. **Concurrent Users**: 10 users registering simultaneously
2. **Data Volume**: 1000 resource entries per user
3. **Query Performance**: Filter by month/year with large dataset
4. **Chart Rendering**: Display 12 months of data

### Expected Response Times
- Authentication: < 500ms
- CRUD Operations: < 300ms
- Analytics: < 1s
- Chart Rendering: < 2s

---

## ✅ Pre-Deployment Checklist

### Code Quality
- [ ] No console.log statements in production code
- [ ] All environment variables documented
- [ ] Error handling implemented
- [ ] Input validation on all forms
- [ ] Loading states for async operations

### Security
- [ ] Passwords hashed with bcrypt
- [ ] JWT tokens expire after 30 days
- [ ] CORS configured for production URLs
- [ ] No sensitive data in error messages
- [ ] .env files in .gitignore

### Testing
- [ ] All API endpoints tested
- [ ] All user flows tested
- [ ] Responsive design verified
- [ ] Cross-browser compatibility checked
- [ ] Error scenarios handled

### Documentation
- [ ] README.md complete
- [ ] API documentation available
- [ ] Deployment guide written
- [ ] Code comments added
- [ ] Project report finalized

---

## 🎯 Demo Script for Presentation

### 1. Introduction (2 min)
- Show landing page
- Explain project purpose
- Highlight key features

### 2. User Registration (1 min)
- Register as Admin
- Show role selection
- Demonstrate validation

### 3. Dashboard Tour (3 min)
- Show analytics cards
- Explain chart visualization
- Highlight sustainability suggestions

### 4. Resource Management (3 min)
- Add resource entry
- Edit existing entry
- Delete entry
- Show filtering by month/year

### 5. Admin Features (2 min)
- View all users
- Show role-based access
- Demonstrate user deletion

### 6. Technical Architecture (3 min)
- Show folder structure
- Explain MERN stack
- Discuss security features

### 7. Deployment (2 min)
- Show live URLs
- Explain deployment process
- Discuss scalability

### 8. Q&A (4 min)
- Answer questions
- Demonstrate specific features
- Discuss future enhancements

---

## 📞 Support

For issues or questions:
1. Check this guide first
2. Review error messages in console
3. Check API documentation
4. Review project report
5. Contact team members

---

**Last Updated:** December 2024
**Version:** 1.0.0
