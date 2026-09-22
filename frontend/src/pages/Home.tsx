import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Flag,
  Users,
  Sparkles,
  ArrowRight,
  Play,
  Code2,
  Music,
  Trophy,
  Wrench,
  Lightbulb,
  BookOpen,
  MoreHorizontal,
  X,
} from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { EventCard } from '../components/EventCard';
import { LogoIcon } from '../components/BrandLogo';
import { EventCategory } from '../types';

export const Home: React.FC = () => {
  const { events } = useEvents();
  const navigate = useNavigate();
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Today's events: Coding Sprint 2026, Dance Rehearsals, Web Development Workshop
  const todaysEvents = events.slice(0, 3);

  const categories = [
    {
      name: 'Technical' as EventCategory,
      icon: Code2,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100 hover:border-emerald-300',
    },
    {
      name: 'Cultural' as EventCategory,
      icon: Music,
      color: 'text-pink-600 bg-pink-50 border-pink-100 hover:border-pink-300',
    },
    {
      name: 'Sports' as EventCategory,
      icon: Trophy,
      color: 'text-amber-600 bg-amber-50 border-amber-100 hover:border-amber-300',
    },
    {
      name: 'Workshop' as EventCategory,
      icon: Wrench,
      color: 'text-blue-600 bg-blue-50 border-blue-100 hover:border-blue-300',
    },
    {
      name: 'Hackathon' as EventCategory,
      icon: Lightbulb,
      color: 'text-purple-600 bg-purple-50 border-purple-100 hover:border-purple-300',
    },
    {
      name: 'Seminar' as EventCategory,
      icon: BookOpen,
      color: 'text-orange-600 bg-orange-50 border-orange-100 hover:border-orange-300',
    },
    {
      name: 'Other' as EventCategory,
      icon: MoreHorizontal,
      color: 'text-slate-600 bg-slate-100 border-slate-200 hover:border-slate-300',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section (Dark Navy #0b1120) */}
      <section className="relative overflow-hidden bg-[#0b1120] text-white pt-12 pb-24 sm:pt-16 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-700 bg-slate-900/80 px-3.5 py-1.5 text-xs font-semibold text-indigo-300 shadow-inner">
                <LogoIcon size="xs" rounded="rounded-md" />
                <span>Happen Events Platform</span>
              </div>

              <div className="flex items-start gap-4 sm:gap-5">
                <LogoIcon
                  size="xl"
                  rounded="rounded-2xl"
                  className="mt-1 ring-2 ring-indigo-400/40 shadow-xl shadow-indigo-500/20"
                />
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                  Where Ideas <br />
                  <span className="text-white">Meet People</span>
                </h1>
              </div>

              <p className="text-base sm:text-lg text-slate-300 max-w-lg leading-relaxed font-normal">
                Explore events, build connections, and be part of a vibrant campus community.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/events"
                  id="hero-explore-events-btn"
                  className="inline-flex items-center gap-2 rounded-full bg-indigo-600 hover:bg-indigo-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
                >
                  <span>Explore Events</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => setShowVideoModal(true)}
                  id="hero-watch-video-btn"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 hover:bg-slate-800 px-6 py-3 text-sm font-medium text-white transition-colors"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-700 text-white">
                    <Play className="h-3 w-3 fill-current ml-0.5" />
                  </div>
                  <span>Watch Video</span>
                </button>
              </div>
            </div>

            {/* Right Campus Visual with cute polaroid sticker */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none overflow-hidden rounded-3xl border-2 border-slate-700/60 shadow-2xl bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80"
                  alt="Sri Vasavi Engineering College Campus"
                  className="h-80 sm:h-96 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Handwritten sticker overlay as in screenshot */}
                <div className="absolute bottom-5 right-5 z-10 -rotate-2 select-none">
                  <div className="rounded-xl bg-black/40 backdrop-blur-md px-4 py-2 border border-white/20 text-white shadow-lg">
                    <p className="font-handwriting text-xl sm:text-2xl leading-none text-white">
                      Same Campus <br />
                      Bigger Stories <span className="text-rose-400">♥</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating 4-Stat Bar (-mt-12) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20 -mt-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {/* Stat 1 */}
            <div className="flex items-center gap-3.5 pt-4 lg:pt-0 lg:px-4 first:pt-0 first:px-0">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-900">50+</p>
                <p className="text-xs font-medium text-slate-500">Events Every Year</p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-3.5 pt-4 lg:pt-0 lg:px-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Flag className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-900">20+</p>
                <p className="text-xs font-medium text-slate-500">Clubs & Societies</p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-3.5 pt-4 lg:pt-0 lg:px-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-900">5000+</p>
                <p className="text-xs font-medium text-slate-500">Students Involved</p>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center gap-3.5 pt-4 lg:pt-0 lg:px-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-900">Endless</p>
                <p className="text-xs font-medium text-slate-500">Opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "What's Happening Today?" Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <LogoIcon size="md" rounded="rounded-xl" className="border border-slate-200" />
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              What's Happening Today?
            </h2>
          </div>

          <Link
            to="/events"
            id="home-view-all-today"
            className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {todaysEvents.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      </section>

      {/* "Explore by Category" Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="flex items-center gap-3 mb-8">
          <LogoIcon size="md" rounded="rounded-xl" className="border border-slate-200" />
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Explore by Category
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3.5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                id={`cat-btn-${cat.name.toLowerCase()}`}
                onClick={() => navigate(`/events?category=${cat.name}`)}
                className={`group flex flex-col items-center justify-center rounded-2xl border bg-white p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${cat.color}`}
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-xs group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-bold text-slate-900">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Quote Banner as seen in screenshot */}
      <section id="about-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-handwriting text-2xl sm:text-3xl text-slate-800">
              "Not just events, but experiences."
            </p>
          </div>

          <div>
            <span className="text-sm font-semibold tracking-wide text-slate-600">
              Sri Vasavi Engineering College
            </span>
          </div>
        </div>
      </section>

      {/* Video Modal Placeholder */}
      {showVideoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs animate-in fade-in"
          onClick={() => setShowVideoModal(false)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl bg-slate-900 shadow-2xl border border-slate-700 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <LogoIcon size="xs" rounded="rounded-md" />
                <h3 className="font-bold text-sm">Campus Life & Annual Fests Video</h3>
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative aspect-16/9 bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-white mb-4 animate-pulse">
                <Play className="h-8 w-8 ml-1 fill-current" />
              </div>
              <h4 className="text-lg font-bold flex items-center justify-center gap-2.5">
                <LogoIcon size="xs" rounded="rounded-md" />
                <span>Happen Annual Fest Highlight Reel</span>
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-md">
                Experience the concerts, sports championships, and hackathons hosted at Sri Vasavi Engineering College.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
