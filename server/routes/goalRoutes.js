const express = require('express');
const { createGoal, getGoals, deleteGoal } = require('../controllers/goalController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('Admin'));

router.route('/')
  .post(createGoal)
  .get(getGoals);

router.delete('/:id', deleteGoal);

module.exports = router;
