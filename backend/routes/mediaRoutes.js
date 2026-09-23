const express = require('express');
const multer = require('multer');
const { protect, authorize } = require('../middleware/authMiddleware');
const { uploadMedia, createMediaLink, getMedia, listMedia, deleteMedia } = require('../controllers/mediaController');

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      callback(null, true);
    } else {
      callback(new Error('Only image and video files are allowed'));
    }
  },
});

router.get('/', listMedia);
router.get('/:id', getMedia);
router.post('/', protect, authorize('Admin', 'Coordinator'), upload.single('file'), uploadMedia);
router.post('/link', protect, authorize('Admin', 'Coordinator'), createMediaLink);
router.delete('/:id', protect, authorize('Admin', 'Coordinator'), deleteMedia);

module.exports = router;
