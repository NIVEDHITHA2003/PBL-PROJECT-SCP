const express = require('express');
const {
  createResource,
  getResources,
  updateResource,
  deleteResource,
  getAnalytics
} = require('../controllers/resourceController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
  .post(createResource)
  .get(getResources);

router.get('/analytics', getAnalytics);

router.route('/:id')
  .put(updateResource)
  .delete(deleteResource);

module.exports = router;
