import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Share2,
  Calendar,
  Clock,
  MapPin,
  Tag,
  Radio,
  Users,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { StatusBadge } from '../components/StatusBadge';
import { LogoIcon } from '../components/BrandLogo';

export const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEventById, events } = useEvents();

  const [copiedShare, setCopiedShare] = useState(false);

  const event = getEventById(id || '');

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center max-w-md shadow-xs">
          <h2 className="text-xl font-bold text-slate-900">Event Not Found</h2>
          <p className="text-sm text-slate-500 mt-2">The event may have been removed or updated.</p>
          <Link
            to="/events"
            className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-5 py-2 text-xs font-semibold text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Events</span>
          </Link>
        </div>
      </div>
    );
  }

  // Parse Month, Day, Year
  const parts = event.date.split('-');
  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const monthIdx = parseInt(parts[1] || '9', 10) - 1;
  const month = monthNames[monthIdx] || 'SEP';
  const day = parts[2] || '15';
  const year = parts[0] || '2026';

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const relatedEvents = events.filter((e) => e.id !== event.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Back & Share Navigation */}
        <div className="flex items-center justify-between">
          <Link
            to="/events"
            id="event-back-link"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Events</span>
          </Link>

          <button
            onClick={handleShare}
            id="event-share-btn"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
          >
            <Share2 className="h-3.5 w-3.5 text-slate-500" />
            <span>{copiedShare ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>

        {/* Hero Banner with Badges */}
        <div className="relative aspect-21/9 sm:aspect-24/9 w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 shadow-sm">
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover opacity-90"
          />

          {/* Top-Left Status Badge */}
          {event.status !== 'Upcoming' && (
            <div className="absolute top-4 left-4 z-10 drop-shadow-md">
              <StatusBadge status={event.status} size="lg" />
            </div>
          )}

          {/* Top-Right Category Badge */}
          <div className="absolute top-4 right-4 z-10">
            <span className="rounded-full bg-slate-950/70 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-white border border-white/20">
              {event.category}
            </span>
          </div>
        </div>

        {/* Event Header Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5">
            {/* Square Date Box */}
            <div className="flex flex-col items-center justify-center shrink-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-center min-w-[72px]">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {month}
              </span>
              <span className="text-3xl font-extrabold text-slate-900 leading-none my-0.5">
                {day}
              </span>
              <span className="text-[10px] font-semibold text-slate-400">
                {year}
              </span>
            </div>

            {/* Title & Metadata */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <LogoIcon
                  size="md"
                  rounded="rounded-xl"
                  className="border border-slate-200 shrink-0"
                />
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {event.title}
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs sm:text-sm text-slate-600">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-rose-500 shrink-0" />
                  <span>{event.venue}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                  <span>{event.time}</span>
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (8 cols): Description & Event Details */}
          <div className="lg:col-span-8 space-y-6">
            {/* About the Event */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5">
                <LogoIcon size="xs" rounded="rounded-md" />
                <h2 className="text-lg font-bold text-slate-900">About the Event</h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {event.description}
              </p>
            </div>

            {/* Event Details Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-5">
              <div className="flex items-center gap-2.5">
                <LogoIcon size="xs" rounded="rounded-md" />
                <h2 className="text-lg font-bold text-slate-900">Event Details</h2>
              </div>

              <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                <div className="flex items-center py-3">
                  <span className="w-32 flex items-center gap-2 text-slate-500 font-medium">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span>Date</span>
                  </span>
                  <span className="font-semibold text-slate-900">{day} {month} {year}</span>
                </div>

                <div className="flex items-center py-3">
                  <span className="w-32 flex items-center gap-2 text-slate-500 font-medium">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span>Time</span>
                  </span>
                  <span className="font-semibold text-slate-900">{event.time}</span>
                </div>

                <div className="flex items-center py-3">
                  <span className="w-32 flex items-center gap-2 text-slate-500 font-medium">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span>Venue</span>
                  </span>
                  <span className="font-semibold text-slate-900">{event.building}</span>
                </div>

                <div className="flex items-center py-3">
                  <span className="w-32 flex items-center gap-2 text-slate-500 font-medium">
                    <Tag className="h-4 w-4 text-slate-400" />
                    <span>Category</span>
                  </span>
                  <span className="font-semibold text-slate-900">{event.category}</span>
                </div>

                <div className="flex items-center py-3">
                  <span className="w-32 flex items-center gap-2 text-slate-500 font-medium">
                    <Radio className="h-4 w-4 text-slate-400" />
                    <span>Status</span>
                  </span>
                  <span className="font-semibold text-emerald-600">{event.status}</span>
                </div>

                <div className="flex items-center py-3">
                  <span className="w-32 flex items-center gap-2 text-slate-500 font-medium">
                    <Users className="h-4 w-4 text-slate-400" />
                    <span>Organizer</span>
                  </span>
                  <span className="font-semibold text-slate-900">{event.organizer}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Organizer, Location, Related Events */}
          <div className="lg:col-span-4 space-y-6">
            {/* Organizer Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Organizer
              </h3>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{event.organizer}</h4>
                    <p className="text-xs text-slate-500">Official Student Body</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Related Events */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Related Events
              </h3>

              <div className="space-y-3">
                {relatedEvents.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/events/${rel.id}`}
                    className="group flex items-center gap-3 rounded-xl p-2 hover:bg-slate-50 transition-colors"
                  >
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="h-12 w-14 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                        {rel.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{rel.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Campus Map Modal */}
    </div>
  );
};
