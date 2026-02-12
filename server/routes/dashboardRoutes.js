const express = require('express');
const { getStudentDashboard, getFacultyDashboard, getAdminDashboard } = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/student', protect, authorize('Student'), getStudentDashboard);
router.get('/faculty', protect, authorize('Faculty'), getFacultyDashboard);
router.get('/admin', protect, authorize('Admin'), getAdminDashboard);

module.exports = router;
