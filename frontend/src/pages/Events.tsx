import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ChevronDown, RotateCcw } from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { EventCard } from '../components/EventCard';
import { LogoIcon } from '../components/BrandLogo';
import { EventCategory, EventStatus } from '../types';

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
  'Upcoming',
  'Registration Open',
  'Starting Soon',
  'Live',
  'Completed',
];

export const Events: React.FC = () => {
  const { events } = useEvents();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlCategory = (searchParams.get('category') as EventCategory) || 'All';
  const urlStatus = (searchParams.get('status') as EventStatus) || 'All';
  const urlQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'All'>(urlCategory);
  const [selectedStatus, setSelectedStatus] = useState<EventStatus | 'All'>(urlStatus);
  const [sortBy, setSortBy] = useState<'soonest' | 'latest' | 'name'>('soonest');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (searchQuery) params.q = searchQuery;
    if (selectedCategory !== 'All') params.category = selectedCategory;
    if (selectedStatus !== 'All') params.status = selectedStatus;
    setSearchParams(params, { replace: true });
  }, [searchQuery, selectedCategory, selectedStatus, setSearchParams]);

  useEffect(() => {
    const cat = searchParams.get('category') as EventCategory;
    const st = searchParams.get('status') as EventStatus;
    const q = searchParams.get('q');
    if (cat) setSelectedCategory(cat);
    if (st) setSelectedStatus(st);
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const filteredEvents = useMemo(() => {
    return events
      .filter((evt) => {
        if (selectedCategory !== 'All' && evt.category !== selectedCategory) {
          return false;
        }
        if (selectedStatus !== 'All' && evt.status !== selectedStatus) {
          return false;
        }
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = evt.title.toLowerCase().includes(q);
          const matchVenue = evt.venue.toLowerCase().includes(q);
          const matchCategory = evt.category.toLowerCase().includes(q);
          const matchDesc = evt.description.toLowerCase().includes(q);
          if (!matchTitle && !matchVenue && !matchCategory && !matchDesc) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'soonest') return a.date.localeCompare(b.date);
        if (sortBy === 'latest') return b.date.localeCompare(a.date);
        return a.title.localeCompare(b.title);
      });
  }, [events, selectedCategory, selectedStatus, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dark Navy Header Banner as in Screenshot */}
      <section className="relative overflow-hidden bg-[#0b1120] text-white pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-5">
              <LogoIcon
                size="xl"
                rounded="rounded-2xl"
                className="ring-2 ring-indigo-400/40 shadow-xl shadow-indigo-500/20 shrink-0"
              />
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                  All Events
                </h1>
                <p className="mt-1.5 text-sm sm:text-base text-slate-300">
                  Find events that match your interests
                </p>
              </div>
            </div>

            {/* Handwritten note in the corner as in mockup */}
            <div className="hidden md:block select-none rotate-2">
              <span className="font-handwriting text-2xl sm:text-3xl text-slate-200 block text-right">
                Good Events <br />
                Great People <span className="text-rose-400">♥</span>
              </span>
            </div>
          </div>

          {/* Search bar inside header */}
          <div className="mt-8 max-w-3xl">
            <div className="relative flex items-center">
              <input
                type="text"
                id="events-search-bar"
                placeholder="Search events by name, category or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border-0 bg-white py-3.5 pl-6 pr-14 text-sm text-slate-900 placeholder:text-slate-400 shadow-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                className="absolute right-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-xs"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Row Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-5">
        {/* Category Pills (Row 1) */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`pill-cat-${cat.toLowerCase()}`}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Status Pills & Sort By (Row 2) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="flex flex-wrap items-center gap-2">
            {STATUSES.map((st) => {
              const isActive = selectedStatus === st;
              const label = st === 'All' ? 'All Status' : st;
              return (
                <button
                  key={st}
                  id={`pill-status-${st.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedStatus(st)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {label}
                </button>
              );
            })}

            {(searchQuery || selectedCategory !== 'All' || selectedStatus !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedStatus('All');
                }}
                className="ml-2 inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:underline"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5 self-end sm:self-auto text-xs text-slate-600 font-medium">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs focus:border-indigo-500 focus:outline-hidden"
            >
              <option value="soonest">Date (Soonest) →</option>
              <option value="latest">Date (Latest) →</option>
              <option value="name">Alphabetical (A - Z)</option>
            </select>
          </div>
        </div>

        {/* 3-Column Grid of 9 Events */}
        {filteredEvents.length > 0 ? (
          <div
            id="events-page-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2"
          >
            {filteredEvents.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
            <p className="text-base font-semibold text-slate-800">No events match your criteria</p>
            <p className="text-xs text-slate-400 mt-1">Try selecting a different category or status</p>
          </div>
        )}
      </section>
    </div>
  );
};
