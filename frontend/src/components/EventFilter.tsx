import React from 'react';
import { Search, X, Filter, RotateCcw } from 'lucide-react';
import { EventCategory, EventStatus } from '../types';

interface EventFilterProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedCategory: EventCategory | 'All';
  onCategoryChange: (cat: EventCategory | 'All') => void;
  selectedStatus: EventStatus | 'All';
  onStatusChange: (status: EventStatus | 'All') => void;
  onReset: () => void;
  totalFiltered: number;
  totalAll: number;
}

const CATEGORIES: (EventCategory | 'All')[] = [
  'All',
  'Technical',
  'Cultural',
  'Sports',
  'Workshop',
  'Hackathon',
  'Seminar',
  'Other',
];

const STATUSES: (EventStatus | 'All')[] = [
  'All',
  'Live',
  'Starting Soon',
  'Registration Open',
  'Upcoming',
  'Completed',
];

export const EventFilter: React.FC<EventFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  onReset,
  totalFiltered,
  totalAll,
}) => {
  const isFiltered = searchQuery !== '' || selectedCategory !== 'All' || selectedStatus !== 'All';

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          id="event-search-input"
          type="text"
          placeholder="Search by event title, organizer, topic, or venue..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-11 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            title="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Category
          </label>
          <span className="text-xs text-slate-400">Select one</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`filter-category-${cat.toLowerCase()}`}
                onClick={() => onCategoryChange(cat)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Status Badges Filter */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Event Status
          </label>
          <span className="text-xs text-slate-400">Real-time status</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((st) => {
            const isActive = selectedStatus === st;
            let statusColor = 'bg-slate-100 text-slate-700 hover:bg-slate-200';

            if (isActive) {
              if (st === 'Live') statusColor = 'bg-emerald-600 text-white ring-2 ring-emerald-500/30';
              else if (st === 'Starting Soon') statusColor = 'bg-amber-500 text-white ring-2 ring-amber-500/30';
              else if (st === 'Registration Open') statusColor = 'bg-indigo-600 text-white ring-2 ring-indigo-500/30';
              else if (st === 'Upcoming') statusColor = 'bg-blue-600 text-white ring-2 ring-blue-500/30';
              else if (st === 'Completed') statusColor = 'bg-slate-700 text-white ring-2 ring-slate-500/30';
              else statusColor = 'bg-slate-900 text-white';
            }

            return (
              <button
                key={st}
                id={`filter-status-${st.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => onStatusChange(st)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${statusColor}`}
              >
                {st === 'Live' && '🟢 '}
                {st === 'Starting Soon' && '🟡 '}
                {st === 'Upcoming' && '🔵 '}
                {st === 'Completed' && '⚪ '}
                {st}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Filter Summary & Clear */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-2 text-slate-500">
          <Filter className="h-3.5 w-3.5" />
          <span>
            Showing <strong className="font-semibold text-slate-800">{totalFiltered}</strong> of{' '}
            {totalAll} events
          </span>
        </div>

        {isFiltered && (
          <button
            onClick={onReset}
            id="reset-filters-btn"
            className="inline-flex items-center gap-1 font-medium text-rose-600 hover:text-rose-700 hover:underline"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset filters</span>
          </button>
        )}
      </div>
    </div>
  );
};
