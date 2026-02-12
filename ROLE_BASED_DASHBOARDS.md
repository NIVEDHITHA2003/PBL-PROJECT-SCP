# Role-Based Dashboard Implementation Guide

## Overview
Three distinct dashboards with different UI, features, and permissions based on user roles.

---

## 🎯 ROLE COMPARISON

| Feature | Student | Faculty | Admin |
|---------|---------|---------|-------|
| **View Own Data** | ✅ | ❌ | ✅ |
| **Add/Edit/Delete Data** | ✅ Own only | ❌ | ✅ All |
| **View Campus Stats** | ❌ | ✅ Read-only | ✅ |
| **User Management** | ❌ | ❌ | ✅ |
| **Set Goals** | ❌ | ❌ | ✅ |
| **Filter Data** | ❌ | ✅ | ✅ |
| **Activity Logs** | ❌ | ❌ | ✅ |

---

## 📁 FILE STRUCTURE

```
client/src/
├── pages/
│   ├── StudentDashboard.jsx    ← Personal data entry & tracking
│   ├── FacultyDashboard.jsx    ← Campus-wide analytics (read-only)
│   └── AdminDashboard.jsx      ← Full system control
├── components/
│   ├── StatCard.jsx            ← Reusable stat display
│   ├── DataTable.jsx           ← Table with edit/delete
│   ├── Navbar.jsx              ← Role-based navigation
│   └── PrivateRoute.jsx        ← Route protection

server/
├── controllers/
│   ├── dashboardController.js  ← Role-specific data aggregation
│   └── goalController.js       ← Admin goal management
├── routes/
│   ├── dashboardRoutes.js      ← /api/dashboard/student|faculty|admin
│   └── goalRoutes.js           ← /api/goals (Admin only)
└── middleware/
    └── auth.js                 ← JWT + role authorization
```

---

## 🔐 BACKEND SECURITY

### Role-Based Middleware
```javascript
// Protect route (JWT required)
router.get('/student', protect, authorize('Student'), getStudentDashboard);

// Multiple roles allowed
router.get('/data', protect, authorize('Faculty', 'Admin'), getData);

// Admin only
router.post('/goals', protect, authorize('Admin'), createGoal);
```

### API Endpoints
```
GET  /api/dashboard/student  → Student's own data + suggestions
GET  /api/dashboard/faculty  → Campus aggregated data (read-only)
GET  /api/dashboard/admin    → Full system stats + user management

POST /api/goals              → Create sustainability goal (Admin only)
GET  /api/goals              → Get all goals (Admin only)
```

---

## 🎨 DASHBOARD DIFFERENCES

### 1. STUDENT DASHBOARD
**Purpose**: Personal sustainability tracking

**UI Elements**:
- Welcome message with user name
- 3 stat cards (own totals)
- Data entry form (add/edit)
- Personal records table (edit/delete buttons)
- Line chart (own monthly trends)
- Personalized suggestions

**Features**:
- ✅ Add resource entries
- ✅ Edit own records
- ✅ Delete own records
- ✅ View own trends
- ✅ Get personalized suggestions
- ❌ Cannot see other users' data

**Color Theme**: Green (eco-friendly)

---

### 2. FACULTY DASHBOARD
**Purpose**: Campus-wide monitoring

**UI Elements**:
- Campus overview cards (aggregated totals)
- Filter controls (month/year)
- Line chart (campus monthly comparison)
- Pie chart (resource distribution)
- Campus statistics grid
- Sustainability insights

**Features**:
- ✅ View campus-wide data
- ✅ Filter by month/year
- ✅ Compare monthly trends
- ✅ View resource distribution
- ✅ Read sustainability insights
- ❌ Cannot edit any data
- ❌ Cannot manage users

**Color Theme**: Blue (analytical)

---

### 3. ADMIN DASHBOARD
**Purpose**: Full system control

**UI Elements**:
- System summary cards (users, records, goals)
- User role distribution chart
- Overall statistics panel
- User management table (delete users)
- Goal creation form
- Goal progress bars
- Recent activity feed

**Features**:
- ✅ View all system data
- ✅ Manage users (delete)
- ✅ Create sustainability goals
- ✅ Track goal progress
- ✅ View recent activity
- ✅ Full CRUD on all data
- ✅ System analytics

**Color Theme**: Red/Multi-color (control)

---

## 🚀 ROUTING IMPLEMENTATION

### App.jsx Routes
```javascript
<Route path="/dashboard/student" element={
  <PrivateRoute>
    <StudentDashboard />
  </PrivateRoute>
} />

<Route path="/dashboard/faculty" element={
  <PrivateRoute>
    <FacultyDashboard />
  </PrivateRoute>
} />

<Route path="/dashboard/admin" element={
  <PrivateRoute adminOnly>
    <AdminDashboard />
  </PrivateRoute>
} />
```

### Login Redirect Logic
```javascript
const roleRoutes = {
  'Student': '/dashboard/student',
  'Faculty': '/dashboard/faculty',
  'Admin': '/dashboard/admin'
};
navigate(roleRoutes[data.role]);
```

### Navbar Dynamic Links
```javascript
const getDashboardLink = () => {
  const roleRoutes = {
    'Student': '/dashboard/student',
    'Faculty': '/dashboard/faculty',
    'Admin': '/dashboard/admin'
  };
  return roleRoutes[user?.role] || '/dashboard/student';
};
```

---

## 📊 DATA AGGREGATION

### Student Dashboard Data
```javascript
// Own data only
const resources = await ResourceUsage.find({ userId: req.user._id });

// Personal stats
const stats = await ResourceUsage.aggregate([
  { $match: { userId: req.user._id } },
  { $group: { _id: null, totalElectricity: { $sum: '$electricityUsage' } } }
]);

// Personalized suggestions
if (avgElectricity > 500) suggestions.push('Reduce electricity usage');
```

### Faculty Dashboard Data
```javascript
// Campus-wide aggregation
const campusStats = await ResourceUsage.aggregate([
  { $match: filter }, // Optional month/year filter
  { $group: { _id: null, totalElectricity: { $sum: '$electricityUsage' } } }
]);

// Monthly trends
const monthlyTrends = await ResourceUsage.aggregate([
  { $group: { _id: { month: '$month', year: '$year' }, electricity: { $sum: '$electricityUsage' } } },
  { $sort: { '_id.year': -1, '_id.month': -1 } }
]);
```

### Admin Dashboard Data
```javascript
// System summary
const totalUsers = await User.countDocuments();
const totalRecords = await ResourceUsage.countDocuments();

// User distribution
const usersByRole = await User.aggregate([
  { $group: { _id: '$role', count: { $sum: 1 } } }
]);

// Recent activity
const recentActivity = await ResourceUsage.find()
  .populate('userId', 'name email role')
  .sort({ createdAt: -1 })
  .limit(10);

// Goal progress
const goalProgress = goals.map(goal => ({
  ...goal,
  percentage: (actual / goal.targetValue) * 100
}));
```

---

## 🎨 UI DIFFERENCES

### Student Dashboard
```
┌─────────────────────────────────────────┐
│ Welcome, John! (Student)                │
├─────────────────────────────────────────┤
│ [⚡ My Electricity] [💧 My Water] [♻️ Waste] │
├─────────────────────────────────────────┤
│ Add Resource Entry Form                 │
│ [Electricity] [Water] [Waste] [Add]     │
├─────────────────────────────────────────┤
│ My Records Table                        │
│ Period | Elec | Water | Waste | Actions │
│ 11/24  | 450  | 280   | 35    | Edit Del│
├─────────────────────────────────────────┤
│ My Monthly Trends (Line Chart)          │
├─────────────────────────────────────────┤
│ 🌱 Your Suggestions                     │
│ • Reduce electricity usage              │
└─────────────────────────────────────────┘
```

### Faculty Dashboard
```
┌─────────────────────────────────────────┐
│ Faculty Dashboard                       │
├─────────────────────────────────────────┤
│ Filter: [Month ▼] [Year] [Clear]       │
├─────────────────────────────────────────┤
│ [⚡ Campus Elec] [💧 Campus Water] [♻️ Waste]│
├─────────────────────────────────────────┤
│ Monthly Comparison    | Resource Dist   │
│ (Line Chart)          | (Pie Chart)     │
├─────────────────────────────────────────┤
│ Campus Statistics Grid                  │
│ Avg Elec | Avg Water | Avg Waste | Recs │
├─────────────────────────────────────────┤
│ 📊 Sustainability Insights              │
│ • Campus average: 450 kWh per entry     │
└─────────────────────────────────────────┘
```

### Admin Dashboard
```
┌─────────────────────────────────────────┐
│ Admin Dashboard - Full Control          │
├─────────────────────────────────────────┤
│ [👥 Total Users] [📊 Records] [🎯 Goals]│
├─────────────────────────────────────────┤
│ Users by Role     | Overall Statistics  │
│ (Bar Chart)       | Total Elec/Water    │
├─────────────────────────────────────────┤
│ User Management Table                   │
│ Name | Email | Role | [Delete]          │
├─────────────────────────────────────────┤
│ Set Sustainability Goals                │
│ [Type ▼] [Value] [Description] [Add]    │
├─────────────────────────────────────────┤
│ Goal Progress Bars                      │
│ Energy Goal ████████░░ 80%              │
├─────────────────────────────────────────┤
│ Recent Activity Feed                    │
│ John (Student) - 11/24: 450 kWh         │
└─────────────────────────────────────────┘
```

---

## 🔒 SECURITY IMPLEMENTATION

### JWT Verification
```javascript
// middleware/auth.js
exports.protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
};
```

### Role Authorization
```javascript
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    next();
  };
};
```

### Frontend Route Protection
```javascript
// PrivateRoute.jsx
if (!user) return <Navigate to="/login" />;
if (adminOnly && user.role !== 'Admin') return <Navigate to="/dashboard/student" />;
return children;
```

---

## 🧪 TESTING SCENARIOS

### Test Student Dashboard
1. Register as Student
2. Add resource entries
3. Edit own record
4. Delete own record
5. View personal chart
6. Check suggestions appear

### Test Faculty Dashboard
1. Register as Faculty
2. View campus statistics
3. Filter by month/year
4. View charts (line & pie)
5. Verify cannot edit data
6. Check insights display

### Test Admin Dashboard
1. Register as Admin
2. View system summary
3. Delete a user
4. Create sustainability goal
5. View goal progress
6. Check recent activity

---

## 📱 RESPONSIVE DESIGN

All dashboards are responsive:
- **Mobile** (< 768px): Single column, stacked cards
- **Tablet** (768-1024px): 2-column grid
- **Desktop** (> 1024px): 3-column grid

---

## 🎯 KEY DIFFERENCES SUMMARY

| Aspect | Student | Faculty | Admin |
|--------|---------|---------|-------|
| **Data Scope** | Own only | Campus-wide | All system |
| **Write Access** | Own data | None | All data |
| **Charts** | Personal trends | Campus comparison | System analytics |
| **Special Features** | Suggestions | Filters | User mgmt + Goals |
| **Primary Action** | Data entry | Monitoring | Management |
| **Color Theme** | Green | Blue | Multi-color |

---

## 🚀 RUNNING THE PROJECT

```bash
# Backend
cd server
npm run dev

# Frontend
cd client
npm run dev
```

**Test URLs**:
- Student: http://localhost:3000/dashboard/student
- Faculty: http://localhost:3000/dashboard/faculty
- Admin: http://localhost:3000/dashboard/admin

---

**All three dashboards are now fully implemented with distinct UI, features, and security!** 🎉
