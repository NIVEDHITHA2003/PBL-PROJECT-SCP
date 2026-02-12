# Installation Instructions

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js (v16 or higher) - Download from https://nodejs.org
- ✅ Git - Download from https://git-scm.com
- ✅ MongoDB Atlas account - Sign up at https://www.mongodb.com/cloud/atlas
- ✅ Code editor (VS Code recommended) - Download from https://code.visualstudio.com

### Verify Installation
```bash
node --version    # Should show v16.x.x or higher
npm --version     # Should show 8.x.x or higher
git --version     # Should show 2.x.x or higher
```

---

## Step-by-Step Installation

### Step 1: MongoDB Atlas Setup (5 minutes)

1. **Create Account & Cluster**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free account
   - Create a new cluster (M0 Free tier)
   - Wait for cluster to be created (~3 minutes)

2. **Create Database User**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `campususer`
   - Password: Generate secure password (save it!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

3. **Configure Network Access**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

4. **Get Connection String**
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://campususer:<password>@cluster0.xxxxx.mongodb.net/`
   - Replace `<password>` with your actual password
   - Add database name at the end: `sustainable-campus`
   - Final: `mongodb+srv://campususer:yourpassword@cluster0.xxxxx.mongodb.net/sustainable-campus`

---

### Step 2: Backend Setup (3 minutes)

1. **Navigate to Server Folder**
   ```bash
   cd server
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   This will install:
   - express
   - mongoose
   - bcryptjs
   - jsonwebtoken
   - cors
   - dotenv
   - nodemon (dev dependency)

3. **Create Environment File**
   - Copy `.env.example` to `.env`
   ```bash
   copy .env.example .env
   ```

4. **Edit .env File**
   Open `server/.env` in your code editor and update:
   ```env
   MONGO_URI=mongodb+srv://campususer:yourpassword@cluster0.xxxxx.mongodb.net/sustainable-campus
   JWT_SECRET=my_super_secret_jwt_key_12345_change_in_production
   PORT=5000
   NODE_ENV=development
   ```

5. **Test Backend**
   ```bash
   npm run dev
   ```
   You should see:
   ```
   Server running on port 5000
   MongoDB Connected Successfully
   ```

---

### Step 3: Frontend Setup (3 minutes)

1. **Open New Terminal**
   Keep the backend running, open a new terminal window

2. **Navigate to Client Folder**
   ```bash
   cd client
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```
   This will install:
   - react
   - react-dom
   - react-router-dom
   - axios
   - chart.js
   - react-chartjs-2
   - react-toastify
   - vite
   - tailwindcss
   - And other dev dependencies

4. **Create Environment File**
   ```bash
   copy .env.example .env
   ```

5. **Edit .env File**
   Open `client/.env` and verify:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

6. **Start Frontend**
   ```bash
   npm run dev
   ```
   You should see:
   ```
   VITE v5.0.8  ready in 500 ms
   ➜  Local:   http://localhost:3000/
   ```

---

### Step 4: Access Application

1. **Open Browser**
   - Go to: http://localhost:3000

2. **Register First User**
   - Click "Register"
   - Fill in details:
     - Name: Admin User
     - Email: admin@campus.edu
     - Password: admin123
     - Role: Admin
   - Click "Register"

3. **You're In!**
   - You should be redirected to the dashboard
   - You'll see welcome message and empty charts

---

## Quick Test

### Test 1: Add Resource Entry
1. Click "Resources" in navbar
2. Fill in the form:
   - Electricity: 450
   - Water: 280
   - Waste: 35
   - Month: 11
   - Year: 2024
3. Click "Add Entry"
4. You should see the entry in the table below

### Test 2: View Dashboard
1. Click "Dashboard" in navbar
2. You should see:
   - Analytics cards with your data
   - Chart showing your resource usage
   - Sustainability suggestions

### Test 3: Admin Features
1. Click "Admin" in navbar
2. You should see your user in the table
3. Try registering another user (open incognito window)
4. Refresh admin page - you should see both users

---

## Troubleshooting

### Problem: "npm install" fails
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rmdir /s /q node_modules
del package-lock.json

# Try again
npm install
```

### Problem: "MongoDB connection failed"
**Solution:**
- Check your MONGO_URI is correct
- Verify password doesn't have special characters (or URL encode them)
- Ensure IP whitelist includes 0.0.0.0/0
- Check database user has correct permissions

### Problem: "Port 5000 already in use"
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F

# Or change port in server/.env
PORT=5001
```

### Problem: "CORS error in browser"
**Solution:**
- Ensure backend is running on port 5000
- Check vite.config.js proxy configuration
- Verify CORS is enabled in server.js

### Problem: "Module not found" error
**Solution:**
```bash
# Make sure you're in the correct directory
cd server  # or cd client

# Reinstall dependencies
npm install
```

### Problem: Frontend shows blank page
**Solution:**
- Check browser console for errors (F12)
- Verify backend is running
- Check .env file has correct API URL
- Clear browser cache (Ctrl + Shift + Delete)

---

## Development Workflow

### Daily Development
1. **Start Backend**
   ```bash
   cd server
   npm run dev
   ```

2. **Start Frontend** (new terminal)
   ```bash
   cd client
   npm run dev
   ```

3. **Make Changes**
   - Edit files in your code editor
   - Changes auto-reload (hot module replacement)

4. **Test Changes**
   - Check browser for frontend changes
   - Check terminal for backend logs

### Stop Servers
- Press `Ctrl + C` in each terminal
- Type `Y` when asked to terminate

---

## VS Code Setup (Recommended)

### Install Extensions
1. **ES7+ React/Redux/React-Native snippets**
   - Quick React component creation

2. **Tailwind CSS IntelliSense**
   - Autocomplete for Tailwind classes

3. **ESLint**
   - Code quality checking

4. **Prettier**
   - Code formatting

5. **MongoDB for VS Code**
   - View database directly in VS Code

### Open Project
```bash
# Open entire project in VS Code
code .
```

### Integrated Terminal
- Use `Ctrl + `` (backtick) to open terminal in VS Code
- Split terminal for backend and frontend

---

## Git Setup (Optional)

### Initialize Repository
```bash
git init
git add .
git commit -m "Initial commit: Sustainable Campus Planning Tool"
```

### Create GitHub Repository
1. Go to https://github.com
2. Click "New repository"
3. Name: `sustainable-campus-planning`
4. Don't initialize with README (we already have one)
5. Click "Create repository"

### Push to GitHub
```bash
git remote add origin https://github.com/yourusername/sustainable-campus-planning.git
git branch -M main
git push -u origin main
```

---

## Production Build (Optional)

### Build Frontend
```bash
cd client
npm run build
```
- Creates optimized production build in `client/dist/`

### Test Production Build
```bash
npm run preview
```
- Serves production build locally

---

## Next Steps

1. ✅ **Read Documentation**
   - Start with README.md
   - Review API_DOCUMENTATION.md
   - Check SETUP_GUIDE.md for testing

2. ✅ **Explore Code**
   - Backend: Start with server/server.js
   - Frontend: Start with client/src/App.jsx
   - Models: Check server/models/

3. ✅ **Test Features**
   - Register multiple users with different roles
   - Add various resource entries
   - Test admin features
   - Check responsive design (resize browser)

4. ✅ **Customize**
   - Change colors in tailwind.config.js
   - Modify sustainability thresholds
   - Add new features
   - Improve UI/UX

5. ✅ **Deploy**
   - Follow DEPLOYMENT.md guide
   - Deploy to Vercel and Render
   - Share your live URL!

---

## Support

### Documentation
- 📖 README.md - Project overview
- 📖 SETUP_GUIDE.md - Testing guide
- 📖 API_DOCUMENTATION.md - API reference
- 📖 DEPLOYMENT.md - Deployment steps
- 📖 PROJECT_REPORT.md - Full report

### Resources
- React: https://react.dev/learn
- Express: https://expressjs.com/en/guide/routing.html
- MongoDB: https://www.mongodb.com/docs/manual/
- Tailwind: https://tailwindcss.com/docs

### Common Commands
```bash
# Backend
cd server
npm install          # Install dependencies
npm run dev          # Start development server
npm start            # Start production server

# Frontend
cd client
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## Success Checklist

- [ ] Node.js and npm installed
- [ ] MongoDB Atlas cluster created
- [ ] Backend dependencies installed
- [ ] Backend .env configured
- [ ] Backend server running (port 5000)
- [ ] Frontend dependencies installed
- [ ] Frontend .env configured
- [ ] Frontend server running (port 3000)
- [ ] Can access http://localhost:3000
- [ ] Can register a new user
- [ ] Can login successfully
- [ ] Can add resource entries
- [ ] Can view dashboard with charts
- [ ] Admin features working

---

## 🎉 Installation Complete!

You now have a fully functional development environment for the Sustainable Campus Planning Tool.

**Happy Coding! 🚀**

---

**Estimated Total Setup Time**: 15-20 minutes
**Last Updated**: December 2024
