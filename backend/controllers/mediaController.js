const supabase = require('../config/supabase');
const BUCKET = 'happen-media';

const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No media file provided' });
    }

    const path = `${req.user.id}/${Date.now()}-${req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, req.file.buffer, { contentType: req.file.mimetype, upsert: false });
    if (uploadError) return res.status(500).json({ message: uploadError.message });
    const { data: publicUrl } = supabase.storage.from(BUCKET).getPublicUrl(path);
    const { data: media, error: insertError } = await supabase.from('media').insert({
      name: req.file.originalname, type: req.file.mimetype.startsWith('image/') ? 'image' : 'video', url: publicUrl.publicUrl, storage_path: path, uploaded_by: req.user.id,
    }).select('*').single();
    if (insertError) return res.status(500).json({ message: insertError.message });

    res.status(201).json({
      id: media.id, name: media.name, type: media.type, url: media.url,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMedia = async (req, res) => {
  res.status(404).send('Media is served from Supabase Storage');
};

const listMedia = async (req, res) => {
  try {
    const { data, error } = await supabase.from('media').select('id,name,type,url').order('created_at', { ascending: false });
    if (error) return res.status(500).json({ message: error.message });
    res.json(data || []);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const deleteMedia = async (req, res) => {
  try {
    const { data: media, error: findError } = await supabase.from('media').select('storage_path,uploaded_by').eq('id', req.params.id).maybeSingle();
    if (findError) return res.status(500).json({ message: findError.message });
    if (!media) return res.status(404).json({ message: 'Media not found' });
    if (req.user.role !== 'Admin' && media.uploaded_by !== req.user.id) return res.status(403).json({ message: 'Not authorized to delete this media' });
    if (media.storage_path) await supabase.storage.from(BUCKET).remove([media.storage_path]);
    const { error } = await supabase.from('media').delete().eq('id', req.params.id);
    if (error) return res.status(500).json({ message: error.message });
    res.json({ message: 'Media removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMediaLink = async (req, res) => {
  try {
    const { name, url } = req.body;
    if (!name || !url) return res.status(400).json({ message: 'Name and URL are required' });
    const { data: media, error } = await supabase.from('media').insert({ name, type: 'video', url, uploaded_by: req.user.id }).select('*').single();
    if (error) return res.status(500).json({ message: error.message });
    res.status(201).json({ id: media.id, name: media.name, type: media.type, url: media.url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadMedia, createMediaLink, getMedia, listMedia, deleteMedia };
