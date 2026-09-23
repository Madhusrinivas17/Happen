const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['Upcoming', 'Registration Open', 'Starting Soon', 'Live', 'Completed'],
    default: 'Upcoming',
  },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
