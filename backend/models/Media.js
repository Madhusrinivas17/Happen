const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contentType: { type: String, required: true },
  data: { type: Buffer },
  sourceUrl: { type: String },
  uploadedBy: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Media', mediaSchema);
