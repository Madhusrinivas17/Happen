const express = require('express');
const { getEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getEvents)
  .post(protect, authorize('Admin', 'Coordinator'), createEvent);

router.route('/:id')
  .get(getEventById)
  .put(protect, authorize('Admin', 'Coordinator'), updateEvent)
  .delete(protect, authorize('Admin', 'Coordinator'), deleteEvent);

module.exports = router;
