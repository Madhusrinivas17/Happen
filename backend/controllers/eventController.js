const supabase = require('../config/supabase');

const getEvents = async (req, res) => {
  try {
    const { data, error } = await supabase.from('events').select('*').order('created_at', { ascending: false });
    if (error) return res.status(500).json({ message: error.message });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const { data, error } = await supabase.from('events').select('*').eq('id', req.params.id).maybeSingle();
    if (error) return res.status(500).json({ message: error.message });
    if (!data) return res.status(404).json({ message: 'Event not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createEvent = async (req, res) => {
  try {
    const event = {
      title: req.body.title, description: req.body.description, date: req.body.date,
      time: req.body.time, venue: req.body.venue, building: req.body.building || null,
      room: req.body.room || null, category: req.body.category, image: req.body.image || null,
      capacity: req.body.capacity ?? null, registered_count: req.body.registeredCount ?? 0,
      contact_email: req.body.contactEmail || null, tags: req.body.tags || [],
      status: req.body.status || 'Upcoming', organizer: req.user.id, organizer_name: req.user.name,
    };
    const { data, error } = await supabase.from('events').insert(event).select('*').single();
    if (error) return res.status(500).json({ message: error.message });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { data: event, error: findError } = await supabase.from('events').select('organizer').eq('id', req.params.id).maybeSingle();
    if (findError) return res.status(500).json({ message: findError.message });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (req.user.role !== 'Admin' && event.organizer !== req.user.id) return res.status(403).json({ message: 'Not authorized to update this event' });
    const updates = { ...req.body };
    if ('registeredCount' in updates) { updates.registered_count = updates.registeredCount; delete updates.registeredCount; }
    if ('contactEmail' in updates) { updates.contact_email = updates.contactEmail; delete updates.contactEmail; }
    delete updates.id; delete updates.organizer;
    const { data, error } = await supabase.from('events').update(updates).eq('id', req.params.id).select('*').single();
    if (error) return res.status(500).json({ message: error.message });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { data: event, error: findError } = await supabase.from('events').select('organizer').eq('id', req.params.id).maybeSingle();
    if (findError) return res.status(500).json({ message: findError.message });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (req.user.role !== 'Admin' && event.organizer !== req.user.id) return res.status(403).json({ message: 'Not authorized to delete this event' });
    const { error } = await supabase.from('events').delete().eq('id', req.params.id);
    if (error) return res.status(500).json({ message: error.message });
    res.json({ message: 'Event removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getEvents, getEventById, createEvent, updateEvent, deleteEvent };
