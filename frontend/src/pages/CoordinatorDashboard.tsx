import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Plus,
  Settings,
  LogOut,
  Clock,
  Radio,
  CheckCircle,
  Edit2,
  Trash2,
  Eye,
  Search,
  ShieldAlert,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';
import { StatusBadge } from '../components/StatusBadge';
import { EventModal } from '../components/EventModal';
import { BrandLogo, LogoIcon } from '../components/BrandLogo';
import { CampusEvent, EventStatus } from '../types';

export const CoordinatorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { events, deleteEvent, addEvent, updateEvent, updateEventStatus } = useEvents();
  const { logout, isAdmin, user } = useAuth();

  const [activeSidebarTab, setActiveSidebarTab] = useState<'dashboard' | 'events' | 'add' | 'settings'>('dashboard');
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CampusEvent | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const liveCount = events.filter((e) => e.status === 'Live').length;
  const upcomingCount = events.filter((e) => e.status === 'Upcoming' || e.status === 'Starting Soon').length;
  const completedCount = events.filter((e) => e.status === 'Completed').length;
  const myEventsCount = events.length;

  const handleOpenAdd = () => {
    setEditingEvent(null);
    setIsEventModalOpen(true);
  };

  const handleOpenEdit = (evt: CampusEvent) => {
    setEditingEvent(evt);
    setIsEventModalOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove "${title}"?`)) {
      deleteEvent(id);
    }
  };

  const handleSaveEvent = (data: Omit<CampusEvent, 'id'>) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, data);
    } else {
      addEvent(data);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.venue.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      {/* Left Sidebar (Matches Screenshot screen 6) */}
      <aside className="w-64 shrink-0 bg-[#0b1120] text-slate-300 flex flex-col justify-between border-r border-slate-800 hidden md:flex">
        <div className="p-6 space-y-6">
          {/* Logo in Sidebar */}
          <Link to="/" className="block">
            <BrandLogo size="sm" showSubtitle={false} />
          </Link>

          {/* Navigation Menu */}
          <nav className="space-y-1.5 pt-2">
            <button
              onClick={() => setActiveSidebarTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeSidebarTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveSidebarTab('events')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeSidebarTab === 'events'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span>My Events</span>
            </button>

            <button
              onClick={handleOpenAdd}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>Add Event</span>
            </button>

            <button
              onClick={() => setActiveSidebarTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeSidebarTab === 'settings'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
          </nav>

          {/* Quick Cross-Dashboard Link - Only accessible to Administrators */}
          <div className="pt-4 border-t border-slate-800/80 space-y-1.5">
            {isAdmin && (
              <>
                <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-purple-400">
                  Admin Switch
                </div>
                <Link
                  to="/admin"
                  id="coord-to-admin-sidebar-btn"
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-purple-300 hover:text-white hover:bg-slate-800 transition-all"
                >
                  <ShieldAlert className="h-4 w-4 text-purple-400" />
                  <span>Return to Admin View</span>
                </Link>
              </>
            )}
            <Link
              to="/"
              id="coord-to-public-sidebar-btn"
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              <ExternalLink className="h-4 w-4 text-slate-400" />
              <span>Public Website</span>
            </Link>
          </div>
        </div>

        {/* Bottom Logout */}
        <div className="p-6 border-t border-slate-800/80">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 space-y-8 overflow-y-auto">
        {/* Header with "+ Add New Event" button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <LogoIcon
              size="lg"
              rounded="rounded-2xl"
              className="shadow-md border border-slate-200 shrink-0"
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Coordinator Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Manage your events and keep the momentum going!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {isAdmin && (
              <Link
                to="/admin"
                id="coord-header-switch-to-admin"
                className="inline-flex items-center gap-1.5 rounded-full border border-purple-300 bg-purple-50 hover:bg-purple-100 px-4 py-2 text-xs font-semibold text-purple-700 shadow-xs transition-colors"
              >
                <ShieldAlert className="h-3.5 w-3.5 text-purple-600" />
                <span>Return to Admin View</span>
              </Link>
            )}

            <button
              onClick={handleOpenAdd}
              id="coord-add-event-btn"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>+ Add New Event</span>
            </button>
          </div>
        </div>

        {/* Administrator Preview Mode Notice */}
        {isAdmin && (
          <div className="rounded-2xl border border-purple-200 bg-purple-50/80 px-4 py-3 flex items-center justify-between gap-3 text-xs text-purple-900">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-purple-600 shrink-0" />
              <span>
                <strong>Administrator Preview:</strong> You are viewing the Coordinator Dashboard with elevated administrative authority.
              </span>
            </div>
            <Link
              to="/admin"
              className="font-semibold text-purple-700 hover:text-purple-900 underline underline-offset-2 shrink-0"
            >
              Go to Admin View →
            </Link>
          </div>
        )}

        {/* Mobile Tab Bar */}
        <div className="flex md:hidden items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200 text-xs">
          <button
            onClick={() => setActiveSidebarTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 ${
              activeSidebarTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-slate-600 bg-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveSidebarTab('events')}
            className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 ${
              activeSidebarTab === 'events' ? 'bg-indigo-600 text-white' : 'text-slate-600 bg-white'
            }`}
          >
            My Events
          </button>
          <button
            onClick={() => setActiveSidebarTab('settings')}
            className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 ${
              activeSidebarTab === 'settings' ? 'bg-indigo-600 text-white' : 'text-slate-600 bg-white'
            }`}
          >
            Settings
          </button>
        </div>

        {/* 4 Metric Cards as in Screenshot */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* My Events */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900">{myEventsCount}</p>
              <p className="text-xs font-medium text-slate-500 mt-0.5">My Events</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Calendar className="h-5 w-5" />
            </div>
          </div>

          {/* Upcoming */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900">{upcomingCount}</p>
              <p className="text-xs font-medium text-slate-500 mt-0.5">Upcoming</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Clock className="h-5 w-5" />
            </div>
          </div>

          {/* Live */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900">{liveCount}</p>
              <p className="text-xs font-medium text-slate-500 mt-0.5">Live</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Radio className="h-5 w-5 animate-pulse" />
            </div>
          </div>

          {/* Completed */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900">{completedCount}</p>
              <p className="text-xs font-medium text-slate-500 mt-0.5">Completed</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <CheckCircle className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* My Events Table */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <LogoIcon size="sm" rounded="rounded-lg" className="border border-slate-200 shrink-0" />
              <div>
                <h2 className="text-base font-bold text-slate-900">My Events</h2>
                <p className="text-xs text-slate-500">Scheduled sessions and workshops under your management</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-full border border-slate-200 bg-slate-50 pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <Link
                to="/events"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              >
                View All →
              </Link>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50/75 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Event</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredEvents.map((evt, idx) => (
                  <tr key={evt.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 text-center text-slate-400 font-semibold">
                      {idx + 1}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={evt.image}
                          alt=""
                          className="h-8 w-11 rounded-md object-cover"
                        />
                        <div>
                          <p className="font-bold text-slate-900 text-xs hover:text-indigo-600 transition-colors cursor-pointer" onClick={() => handleOpenEdit(evt)}>
                            {evt.title}
                          </p>
                          <p className="text-[11px] text-slate-400">{evt.venue}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {evt.date}
                    </td>

                    <td className="py-3.5 px-4">
                      {/* One-click status dropdown to make status updates instant! */}
                      <select
                        value={evt.status}
                        onChange={(e) => updateEventStatus(evt.id, e.target.value as EventStatus)}
                        className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-800 shadow-2xs focus:border-indigo-500 focus:outline-hidden"
                      >
                        <option value="Live">🟢 Live</option>
                        <option value="Starting Soon">🟡 Starting Soon</option>
                        <option value="Registration Open">🔵 Registration Open</option>
                        <option value="Upcoming">🟣 Upcoming</option>
                        <option value="Completed">⚪ Completed</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(evt)}
                          title="Edit event"
                          className="p-1 text-slate-400 hover:text-indigo-600 rounded transition-colors"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(evt.id, evt.title)}
                          title="Delete event"
                          className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Edit/Add Event Modal */}
      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onSave={handleSaveEvent}
        initialData={editingEvent}
        mode={editingEvent ? 'edit' : 'create'}
      />
    </div>
  );
};
