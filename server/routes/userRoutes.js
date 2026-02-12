const express = require('express');
const { getAllUsers, deleteUser } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('Admin'));

router.get('/', getAllUsers);
router.delete('/:id', deleteUser);

module.exports = router;
