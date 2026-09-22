import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, Tag, Users, FileText, Image as ImageIcon } from 'lucide-react';
import { CampusEvent, EventCategory, EventStatus } from '../types';
import { LogoIcon } from './BrandLogo';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<CampusEvent, 'id'>) => void;
  initialData?: CampusEvent | null;
  mode: 'create' | 'edit';
}

const CATEGORIES: EventCategory[] = [
  'Technical',
  'Cultural',
  'Sports',
  'Workshop',
  'Hackathon',
  'Seminar',
  'Other',
];

const STATUSES: EventStatus[] = [
  'Upcoming',
  'Registration Open',
  'Starting Soon',
  'Live',
  'Completed',
];

const SAMPLE_IMAGES = [
  { label: 'Tech & Code', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Workshop', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Robotics', url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Sports', url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Music & Stage', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Seminar', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80' },
];

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  mode,
}) => {
  const [formData, setFormData] = useState<Omit<CampusEvent, 'id'>>({
    title: '',
    description: '',
    category: 'Workshop',
    date: '2026-09-20',
    time: '10:00 AM - 01:00 PM',
    venue: '',
    building: '',
    room: '',
    status: 'Upcoming',
    organizer: '',
    image: SAMPLE_IMAGES[0].url,
    capacity: 100,
    registeredCount: 0,
    contactEmail: '',
    tags: ['Campus'],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        category: initialData.category,
        date: initialData.date,
        time: initialData.time,
        venue: initialData.venue,
        building: initialData.building || '',
        room: initialData.room || '',
        status: initialData.status,
        organizer: initialData.organizer,
        image: initialData.image,
        capacity: initialData.capacity || 100,
        registeredCount: initialData.registeredCount || 0,
        contactEmail: initialData.contactEmail || '',
        tags: initialData.tags || ['Campus'],
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'Workshop',
        date: '2026-09-20',
        time: '10:00 AM - 01:00 PM',
        venue: '',
        building: '',
        room: '',
        status: 'Upcoming',
        organizer: '',
        image: SAMPLE_IMAGES[0].url,
        capacity: 100,
        registeredCount: 0,
        contactEmail: '',
        tags: ['Campus'],
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.venue.trim()) {
      alert('Please fill in at least the Title and Venue.');
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div
      id="event-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="event-modal-container"
        className="relative my-8 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <LogoIcon size="sm" rounded="rounded-lg" className="border border-slate-200 shrink-0" />
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {mode === 'create' ? 'Post New Campus Event' : 'Edit Event Information'}
              </h2>
              <p className="text-xs text-slate-500">
                Provide event schedule, venue location, and real-time status.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Event Title *
            </label>
            <input
              type="text"
              required
              id="event-form-title"
              placeholder="e.g. Annual AI & Robotics Symposium"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Category *
              </label>
              <select
                id="event-form-category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as EventCategory })
                }
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Current Status *
              </label>
              <select
                id="event-form-status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as EventStatus })
                }
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
              >
                {STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Date (YYYY-MM-DD) *
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  id="event-form-date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Time Schedule *
              </label>
              <input
                type="text"
                required
                id="event-form-time"
                placeholder="e.g. 10:00 AM - 01:00 PM"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Venue, Building, Room */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Venue Name *
            </label>
            <input
              type="text"
              required
              id="event-form-venue"
              placeholder="e.g. CSE Seminar Hall / Amphitheatre"
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Building / Block
              </label>
              <input
                type="text"
                placeholder="e.g. Technology Block A"
                value={formData.building}
                onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Room / Floor
              </label>
              <input
                type="text"
                placeholder="e.g. Room 304, 3rd Floor"
                value={formData.room}
                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Organizer & Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Organizer / Club / Dept *
              </label>
              <input
                type="text"
                required
                id="event-form-organizer"
                placeholder="e.g. Turing Society / Cultural Council"
                value={formData.organizer}
                onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Contact Email
              </label>
              <input
                type="email"
                placeholder="e.g. eventlead@college.edu"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Event Description
            </label>
            <textarea
              rows={3}
              id="event-form-description"
              placeholder="Describe the event, agenda, rules, or key highlights..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Image Presets */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Event Banner Image
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
              {SAMPLE_IMAGES.map((img, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setFormData({ ...formData, image: img.url })}
                  className={`overflow-hidden rounded-lg border text-[10px] text-center transition-all ${
                    formData.image === img.url
                      ? 'border-blue-600 ring-2 ring-blue-500/40'
                      : 'border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.label} className="h-10 w-full object-cover" />
                  <span className="block py-0.5 truncate bg-slate-50 font-medium">{img.label}</span>
                </button>
              ))}
            </div>
            <input
              type="url"
              placeholder="Or paste custom image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="event-form-submit-btn"
              className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
            >
              {mode === 'create' ? 'Publish Event' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
