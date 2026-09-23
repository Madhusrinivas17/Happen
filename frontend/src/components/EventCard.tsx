import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { CampusEvent } from '../types';
import { StatusBadge } from './StatusBadge';

interface EventCardProps {
  event: CampusEvent;
  compact?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  // Parse Month and Day from YYYY-MM-DD
  const getMonthAndDay = (dateStr: string) => {
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const monthNames = [
          'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
          'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
        ];
        const monthIdx = parseInt(parts[1], 10) - 1;
        const month = monthNames[monthIdx] || 'SEP';
        const day = parts[2];
        return { month, day };
      }
    } catch {
      // fallback
    }
    return { month: 'SEP', day: '15' };
  };

  const { month, day } = getMonthAndDay(event.date);

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'Technical':
        return 'text-sky-700 bg-sky-50 border-sky-200';
      case 'Cultural':
        return 'text-pink-700 bg-pink-50 border-pink-200';
      case 'Sports':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Workshop':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'Hackathon':
        return 'text-purple-700 bg-purple-50 border-purple-200';
      case 'Seminar':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      default:
        return 'text-slate-700 bg-slate-100 border-slate-200';
    }
  };

  return (
    <article
      id={`event-card-${event.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-200"
    >
      {/* Banner / Image */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Floating Status Badge (Top-Left) */}
        {event.status !== 'Upcoming' && (
          <div className="absolute top-3 left-3 z-10 drop-shadow-sm">
            <StatusBadge status={event.status} size="sm" />
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start gap-3.5">
          {/* Square Date Box (Month + Big Day) */}
          <div className="flex flex-col items-center justify-center shrink-0 rounded-xl border border-slate-200 bg-slate-50/80 px-2.5 py-1.5 min-w-[50px] text-center shadow-2xs">
            <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
              {month}
            </span>
            <span className="text-xl font-extrabold text-slate-900 leading-none mt-0.5">
              {day}
            </span>
          </div>

          {/* Title & Key details */}
          <div className="flex-1 min-w-0">
            <h3 className="line-clamp-1 text-sm sm:text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
              {event.title}
            </h3>

            {/* Venue with Pin */}
            <div className="mt-1.5 flex items-center gap-1 text-xs text-slate-600">
              <MapPin className="h-3.5 w-3.5 text-rose-500 shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>

            {/* Time with Clock */}
            <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
              <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{event.time}</span>
            </div>
          </div>

        </div>

        {/* Bottom Row: Category Pill & Arrow Link */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span
            className={`inline-block rounded-md border px-2.5 py-0.5 text-[11px] font-semibold ${getCategoryStyles(
              event.category
            )}`}
          >
            {event.category}
          </span>

          <Link
            to={`/events/${event.id}`}
            id={`view-arrow-${event.id}`}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors"
            title="View event details"
          >
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};
