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

const getVideoEmbedUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname === 'youtu.be' || parsedUrl.hostname.endsWith('youtube.com')) {
      const videoId = parsedUrl.hostname === 'youtu.be'
        ? parsedUrl.pathname.slice(1)
        : parsedUrl.searchParams.get('v') || parsedUrl.pathname.split('/').pop();
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : null;
    }

    if (parsedUrl.hostname === 'vimeo.com' || parsedUrl.hostname.endsWith('.vimeo.com')) {
      const videoId = parsedUrl.pathname.split('/').filter(Boolean).pop();
      return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
    }

    if (parsedUrl.hostname === 'drive.google.com') {
      const fileId = parsedUrl.pathname.match(/\/file\/d\/([^/]+)/)?.[1]
        || parsedUrl.searchParams.get('id');
      return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : null;
    }

    if (parsedUrl.hostname.endsWith('dropbox.com')) {
      parsedUrl.searchParams.set('raw', '1');
      return parsedUrl.toString();
    }

    return null;
  } catch {
    return null;
  }
};

export const Home: React.FC = () => {
  const { events, video, media } = useEvents();
  const navigate = useNavigate();
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Today's events: Coding Sprint 2026, Dance Rehearsals, Web Development Workshop
  const todaysEvents = events.slice(0, 3);
  const publishedMedia = video?.url
    ? [{ id: 'legacy-video', name: video.title, url: video.url, type: 'video' as const }, ...media]
    : media;
  const videoEmbedUrl = video?.url ? getVideoEmbedUrl(video.url) : null;
  const publishedVideos = publishedMedia.filter((item) => item.type === 'video');
  const publishedPhotos = publishedMedia.filter((item) => item.type === 'image');

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
      <section className="relative overflow-hidden bg-[#050b1d] text-white pt-10 pb-24 sm:pt-14 sm:pb-28">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-600/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-indigo-600/25 blur-3xl" />
        <div className="pointer-events-none absolute left-0 top-1/2 h-24 w-28 opacity-40 [background-image:radial-gradient(#695cff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="relative z-10 lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-indigo-400/25 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold text-indigo-200 shadow-inner">
                <LogoIcon size="xs" rounded="rounded-md" />
                <span>Happen Events Platform</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] text-white leading-[0.98]">
                Discover<br />
                <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">What’s Happening</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-lg leading-relaxed font-normal">
                Stay updated with events, workshops, competitions,and activities happening across your campus.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/events"
                  id="hero-explore-events-btn"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-400 hover:to-fuchsia-400 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition-all hover:scale-105"
                >
                  <span>Explore Events</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => setShowVideoModal(true)}
                  id="hero-watch-video-btn"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-950/40 hover:bg-slate-800 px-6 py-3 text-sm font-medium text-white transition-colors"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-700 text-white">
                    <Play className="h-3 w-3 fill-current ml-0.5" />
                  </div>
                  <span>Watch Updates</span>
                </button>
              </div>
            </div>

            {/* Right Campus Visual with cute polaroid sticker */}
            <div className="relative lg:col-span-6 min-h-[340px] sm:min-h-[430px]">
              <div className="absolute left-4 right-0 top-4 h-[88%] rotate-[-7deg] rounded-3xl border-4 border-indigo-500 shadow-[0_0_35px_rgba(99,102,241,0.45)]" />
              <div className="relative mx-auto max-w-md lg:max-w-none overflow-hidden rounded-3xl border-4 border-fuchsia-400/90 shadow-[0_0_45px_rgba(217,70,239,0.3)] bg-slate-900 rotate-[3deg]">
                <img
                  src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=85"
                  alt="Students enjoying a campus event"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                  }}
                  className="h-80 sm:h-[430px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Handwritten sticker overlay as in screenshot */}
                <div className="absolute -right-20 top-8 z-10 rotate-6 select-none sm:right-5">
                  <p className="font-handwriting text-xl sm:text-2xl leading-none text-white drop-shadow-lg">
                    Same Campus <br />
                    Bigger Stories <span className="text-fuchsia-300">♥</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {publishedMedia.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Campus Media</h2>
            <span className="text-xs font-semibold text-slate-500">{publishedMedia.length} posts</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {publishedMedia.map((item) => (
              item.type === 'image' ? (
                <img
                  key={item.id}
                  src={item.url}
                  alt={item.name}
                  className="h-56 w-full rounded-2xl object-cover border border-slate-200 shadow-xs"
                />
              ) : (
                <video
                  key={item.id}
                  src={item.url}
                  controls
                  className="h-56 w-full rounded-2xl bg-slate-950 object-contain border border-slate-200 shadow-xs"
                  title={item.name}
                />
              )
            ))}
          </div>
        </section>
      )}

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
                <h3 className="font-bold text-sm">{video?.title || 'Campus Life & Annual Fests Video'}</h3>
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative aspect-16/9 bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
              {publishedMedia.length > 0 ? (
                <div className="grid max-h-[60vh] w-full gap-3 overflow-y-auto sm:grid-cols-2">
                  {publishedMedia.map((item) => {
                    if (item.type === 'image') {
                      return (
                        <img
                          key={item.id}
                          src={item.url}
                          alt={item.name}
                          className="h-56 w-full rounded-xl object-cover"
                        />
                      );
                    }

                    const itemEmbedUrl = getVideoEmbedUrl(item.url);
                    return itemEmbedUrl ? (
                      <iframe
                        key={item.id}
                        className="h-56 w-full rounded-xl bg-black"
                        src={itemEmbedUrl}
                        title={item.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        key={item.id}
                        className="h-56 w-full rounded-xl bg-black object-contain"
                        controls
                        src={item.url}
                        title={item.name}
                      />
                    );
                  })}
                </div>
              ) : video?.url ? (
                videoEmbedUrl ? (
                  <iframe
                    className="h-full w-full rounded-xl"
                    src={videoEmbedUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                    <video
                      className="max-h-full w-full rounded-xl object-contain"
                      controls
                      autoPlay
                      src={video.url}
                      onError={(event) => {
                        event.currentTarget.style.display = 'none';
                        event.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden text-center">
                      <p className="text-xs text-rose-300">This video link could not be played here.</p>
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-block text-xs font-semibold text-indigo-300 underline"
                      >
                        Open video link
                      </a>
                    </div>
                  </div>
                )
              ) : (
                <>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-white mb-4 animate-pulse">
                    <Play className="h-8 w-8 ml-1 fill-current" />
                  </div>
                  <h4 className="text-lg font-bold flex items-center justify-center gap-2.5">
                    <LogoIcon size="xs" rounded="rounded-md" />
                    <span>Happen Annual Fest Highlight Reel</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-md">
                    A coordinator can publish the latest campus video from the Coordinator Dashboard.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
