# 📋 QUICK REFERENCE CARD

## Sustainable Campus Planning Tool - Cheat Sheet

---

## 🚀 QUICK START (Copy & Paste)

```bash
# 1. Backend Setup
cd server
npm install
# Create .env with MONGO_URI and JWT_SECRET
npm run dev

# 2. Frontend Setup (new terminal)
cd client
npm install
# Create .env with VITE_API_URL
npm run dev

# 3. Open Browser
# http://localhost:3000
```

---

## 📁 PROJECT STRUCTURE

```
pbl-project/
├── 📄 START_HERE.md          ← BEGIN HERE!
├── 📄 INSTALLATION.md         ← Setup guide
├── 📄 PROJECT_COMPLETE.md     ← Summary
├── 📁 server/                 ← Backend
│   ├── server.js
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   └── middleware/
└── 📁 client/                 ← Frontend
    └── src/
        ├── pages/
        ├── components/
        ├── context/
        └── services/
```

---

## 🔑 KEY FILES

| File | Purpose |
|------|---------|
| **START_HERE.md** | Quick start guide |
| **INSTALLATION.md** | Detailed setup |
| **PROJECT_REPORT.md** | Viva preparation |
| **API_DOCUMENTATION.md** | API reference |
| **DEPLOYMENT.md** | Deploy guide |

---

## 🌐 API ENDPOINTS

### Auth
- POST `/api/auth/register` - Register
- POST `/api/auth/login` - Login
- GET `/api/auth/me` - Get user

### Resources
- POST `/api/resources` - Create
- GET `/api/resources` - Read all
- PUT `/api/resources/:id` - Update
- DELETE `/api/resources/:id` - Delete
- GET `/api/resources/analytics` - Analytics

### Admin
- GET `/api/users` - Get all users
- DELETE `/api/users/:id` - Delete user

---

## 🎨 TECH STACK

```
Frontend:  React + Vite + Tailwind CSS + Chart.js
Backend:   Node.js + Express + JWT
Database:  MongoDB + Mongoose
Auth:      JWT + bcrypt
```

---

## 🔐 ENVIRONMENT VARIABLES

### Backend (.env)
```env
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret
PORT=5000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

---

## 👥 USER ROLES

| Role | Access |
|------|--------|
| **Admin** | Full access + user management |
| **Faculty** | Own data + analytics |
| **Student** | Own data only |

---

## 📊 FEATURES

✅ User authentication (JWT)
✅ Role-based access control
✅ Resource tracking (electricity, water, waste)
✅ Dashboard with charts
✅ Analytics & suggestions
✅ Admin user management
✅ Responsive design

---

## 🧪 TEST USERS

```javascript
// Admin
email: admin@campus.edu
password: admin123
role: Admin

// Faculty
email: faculty@campus.edu
password: faculty123
role: Faculty

// Student
email: student@campus.edu
password: student123
role: Student
```

---

## 📈 SAMPLE DATA

```javascript
{
  electricityUsage: 450,
  waterConsumption: 280,
  wasteGenerated: 35,
  month: 11,
  year: 2024
}
```

---

## 🐛 TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| Port in use | Change PORT in .env |
| MongoDB error | Check MONGO_URI |
| CORS error | Verify backend running |
| Module not found | Run npm install |

---

## 🚀 DEPLOYMENT

```
Frontend → Vercel
Backend  → Render
Database → MongoDB Atlas
```

---

## 📞 URLS

| Service | URL |
|---------|-----|
| Frontend Dev | http://localhost:3000 |
| Backend Dev | http://localhost:5000 |
| MongoDB Atlas | https://cloud.mongodb.com |

---

## 🎓 VIVA QUICK ANSWERS

**Q: Why MERN?**
A: JavaScript full-stack, React components, Express flexibility, MongoDB schema flexibility

**Q: How does auth work?**
A: Register → bcrypt hash → JWT token → localStorage → Authorization header → middleware verify

**Q: Database relationships?**
A: One-to-Many: User → ResourceUsage (via userId)

**Q: Security measures?**
A: bcrypt hashing, JWT tokens, role-based auth, input validation, CORS

---

## ✅ CHECKLIST

- [ ] Install Node.js
- [ ] Setup MongoDB Atlas
- [ ] Install dependencies
- [ ] Configure .env files
- [ ] Run servers
- [ ] Test features
- [ ] Read documentation
- [ ] Deploy (optional)
- [ ] Prepare viva

---

## 📚 DOCUMENTATION MAP

```
START_HERE.md          → Quick start
INSTALLATION.md        → Detailed setup
SETUP_GUIDE.md         → Testing
API_DOCUMENTATION.md   → API reference
ARCHITECTURE.md        → System design
FILE_STRUCTURE.md      → Project structure
DEPLOYMENT.md          → Deploy guide
PROJECT_REPORT.md      → Full report + Viva
PROJECT_SUMMARY.md     → Summary
INDEX.md               → Master index
```

---

## 🎯 COMMANDS CHEAT SHEET

```bash
# Install
npm install

# Run Development
npm run dev

# Build Production
npm run build

# Preview Build
npm run preview

# Check Version
node --version
npm --version

# Kill Port (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

---

## 🔧 NPM SCRIPTS

### Backend
```json
"start": "node server.js"
"dev": "nodemon server.js"
```

### Frontend
```json
"dev": "vite"
"build": "vite build"
"preview": "vite preview"
```

---

## 🎨 COLOR PALETTE

```css
Primary:   #22c55e (Green)
Light:     #dcfce7 (Light Green)
Dark:      #15803d (Dark Green)
Yellow:    #eab308 (Electricity)
Blue:      #3b82f6 (Water)
Red:       #ef4444 (Waste)
```

---

## 📊 PROJECT STATS

```
Files:      50+
Code:       2,500+ lines
Endpoints:  10
Pages:      5
Components: 7
Models:     3
Docs:       12
```

---

## 🏆 COMPLETION STATUS

```
Phase 1: ✅ Complete
Phase 2: ✅ Complete
Phase 3: ✅ Complete
Docs:    ✅ Complete
Tests:   ✅ Complete
Deploy:  ✅ Ready
Viva:    ✅ Prepared
```

---

## 🎉 QUICK WINS

1. ✅ Complete MERN stack
2. ✅ All features working
3. ✅ 12 documentation files
4. ✅ Production ready
5. ✅ Viva prepared
6. ✅ Security implemented
7. ✅ Responsive design
8. ✅ Clean architecture

---

## 📞 NEED HELP?

1. Read START_HERE.md
2. Check INSTALLATION.md
3. Review troubleshooting
4. Check documentation
5. Test step-by-step

---

## 🚀 NEXT STEPS

1. Open START_HERE.md
2. Follow 3-step quick start
3. Test all features
4. Read documentation
5. Deploy to production
6. Prepare presentation

---

**Print this page for quick reference! 📄**

**Last Updated**: December 2024
**Version**: 1.0.0
