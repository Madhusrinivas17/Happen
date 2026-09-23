const Media = require('../models/Media');

const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No media file provided' });
    }

    const media = await Media.create({
      name: req.file.originalname,
      contentType: req.file.mimetype,
      data: req.file.buffer,
      uploadedBy: req.user._id.toString(),
    });

    res.status(201).json({
      id: media.id,
      name: media.name,
      type: media.contentType.startsWith('image/') ? 'image' : 'video',
      url: media.sourceUrl || `/api/media/${media.id}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).send('Media not found');
    }

    res.set('Content-Type', media.contentType);
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    res.send(media.data);
  } catch (error) {
    res.status(404).send('Media not found');
  }
};

const listMedia = async (req, res) => {
  try {
    const media = await Media.find({}).sort({ createdAt: -1 }).select('-data');
    res.json(media.map((item) => ({
      id: item.id,
      name: item.name,
      type: item.contentType.startsWith('image/') ? 'image' : 'video',
      url: item.sourceUrl || `/api/media/${item.id}`,
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ message: 'Media not found' });
    if (req.user.role !== 'Admin' && media.uploadedBy !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this media' });
    }
    await media.deleteOne();
    res.json({ message: 'Media removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMediaLink = async (req, res) => {
  try {
    const { name, url } = req.body;
    if (!name || !url) return res.status(400).json({ message: 'Name and URL are required' });
    const media = await Media.create({
      name,
      contentType: 'video/external',
      sourceUrl: url,
      uploadedBy: req.user._id.toString(),
    });
    res.status(201).json({ id: media.id, name: media.name, type: 'video', url: media.sourceUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadMedia, createMediaLink, getMedia, listMedia, deleteMedia };
