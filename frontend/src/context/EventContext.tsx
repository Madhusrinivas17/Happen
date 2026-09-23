import React, { createContext, useContext, useState, useEffect } from 'react';
import { CampusEvent, CampusMedia, CampusVideo, CoordinatorUser, EventStatus } from '../types';
import { INITIAL_EVENTS, INITIAL_COORDINATORS } from '../data/events';
import { apiRequest, resolveApiUrl } from '../lib/api';

interface EventContextType {
  events: CampusEvent[];
  coordinators: CoordinatorUser[];
  video: CampusVideo | null;
  media: CampusMedia[];
  getEventById: (id: string) => CampusEvent | undefined;
  addEvent: (event: Omit<CampusEvent, 'id'>) => string;
  updateEvent: (id: string, updatedFields: Partial<CampusEvent>) => void;
  deleteEvent: (id: string) => void;
  updateEventStatus: (id: string, status: EventStatus) => void;
  addCoordinator: (coord: Omit<CoordinatorUser, 'id' | 'assignedEventsCount' | 'lastActive'>) => void;
  toggleCoordinatorStatus: (id: string) => void;
  removeCoordinator: (id: string) => void;
  updateVideo: (video: CampusVideo | null) => void;
  addMedia: (items: CampusMedia[]) => void;
  addMediaLink: (video: CampusVideo) => Promise<void>;
  deleteMedia: (id: string) => void;
  resetToDefaultEvents: () => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

const EVENTS_STORAGE_KEY = 'happen_events_v2';
const COORD_STORAGE_KEY = 'happen_coordinators_v2';
const VIDEO_STORAGE_KEY = 'happen_home_video_v1';
const MEDIA_STORAGE_KEY = 'happen_campus_media_v1';

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<CampusEvent[]>(() => {
    try {
      const stored = localStorage.getItem(EVENTS_STORAGE_KEY) || localStorage.getItem('campusnest_events_v2');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_EVENTS;
  });

  const [coordinators, setCoordinators] = useState<CoordinatorUser[]>(() => {
    try {
      const stored = localStorage.getItem(COORD_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_COORDINATORS;
  });

  const [video, setVideo] = useState<CampusVideo | null>(() => {
    try {
      const stored = localStorage.getItem(VIDEO_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [media, setMedia] = useState<CampusMedia[]>(() => {
    try {
      const stored = localStorage.getItem(MEDIA_STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    let cancelled = false;

    const loadSharedData = async () => {
      try {
        const [eventsResponse, mediaResponse] = await Promise.all([
          apiRequest('/events'),
          apiRequest('/media'),
        ]);
        const remoteEvents = await eventsResponse.json();
        const remoteMedia = await mediaResponse.json();

        if (!cancelled) {
          setEvents(remoteEvents.map((event: any) => ({
            ...event,
            id: event._id || event.id,
            date: typeof event.date === 'string' ? event.date.slice(0, 10) : event.date,
            organizer: event.organizer?.name || event.organizer || '',
            status: event.status || 'Upcoming',
          })));
          setMedia(remoteMedia.map((item: CampusMedia) => ({
            ...item,
            url: resolveApiUrl(item.url),
          })));
        }
      } catch {
        // Keep the cached/default data available when the API is temporarily unavailable.
      }
    };

    loadSharedData();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
    } catch {
      // ignore
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem(COORD_STORAGE_KEY, JSON.stringify(coordinators));
    } catch {
      // ignore
    }
  }, [coordinators]);

  useEffect(() => {
    try {
      if (video) {
        localStorage.setItem(VIDEO_STORAGE_KEY, JSON.stringify(video));
      } else {
        localStorage.removeItem(VIDEO_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [video]);

  useEffect(() => {
    try {
      localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(media));
    } catch {
      // ignore
    }
  }, [media]);

  const getEventById = (id: string) => {
    return events.find((e) => e.id === id);
  };

  const addEvent = async (eventData: Omit<CampusEvent, 'id'>): Promise<string> => {
    const response = await apiRequest('/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });
    const savedEvent = await response.json();
    const newEvent: CampusEvent = {
      ...eventData,
      ...savedEvent,
      id: savedEvent._id || savedEvent.id,
      date: typeof savedEvent.date === 'string' ? savedEvent.date.slice(0, 10) : eventData.date,
      organizer: savedEvent.organizer?.name || eventData.organizer,
    };
    setEvents((prev) => [newEvent, ...prev.filter((event) => event.id !== newEvent.id)]);
    return newEvent.id;
  };

  const updateEvent = async (id: string, updatedFields: Partial<CampusEvent>) => {
    const response = await apiRequest(`/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFields),
    });
    const savedEvent = await response.json();
    setEvents((prev) => prev.map((item) => item.id === id ? {
      ...item,
      ...updatedFields,
      ...savedEvent,
      id: savedEvent._id || savedEvent.id || id,
      date: typeof savedEvent.date === 'string' ? savedEvent.date.slice(0, 10) : item.date,
      organizer: savedEvent.organizer?.name || item.organizer,
    } : item));
  };

  const deleteEvent = async (id: string) => {
    await apiRequest(`/events/${id}`, { method: 'DELETE' });
    setEvents((prev) => prev.filter((item) => item.id !== id));
  };

  const updateEventStatus = async (id: string, status: EventStatus) => {
    await updateEvent(id, { status });
  };

  const addCoordinator = (
    coord: Omit<CoordinatorUser, 'id' | 'assignedEventsCount' | 'lastActive'>
  ) => {
    const newCoord: CoordinatorUser = {
      ...coord,
      id: 'coord-' + Date.now(),
      assignedEventsCount: 0,
      lastActive: 'Just now',
    };
    setCoordinators((prev) => [newCoord, ...prev]);
  };

  const toggleCoordinatorStatus = (id: string) => {
    setCoordinators((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === 'Active' ? 'Suspended' : 'Active';
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  const removeCoordinator = (id: string) => {
    setCoordinators((prev) => prev.filter((c) => c.id !== id));
  };

  const updateVideo = (nextVideo: CampusVideo | null) => {
    setVideo(nextVideo);
  };

  const addMediaLink = async (nextVideo: CampusVideo) => {
    const response = await apiRequest('/media/link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nextVideo.title, url: nextVideo.url }),
    });
    const savedItem = await response.json();
    setMedia((current) => [{ ...savedItem, url: resolveApiUrl(savedItem.url) }, ...current]);
    setVideo(null);
  };

  const addMedia = async (items: CampusMedia[]) => {
    const uploadedItems: CampusMedia[] = [];
    for (const item of items) {
      const blobResponse = await fetch(item.url);
      const formData = new FormData();
      formData.append('file', await blobResponse.blob(), item.name);
      const response = await apiRequest('/media', { method: 'POST', body: formData });
      const savedItem = await response.json();
      uploadedItems.push({ ...savedItem, url: resolveApiUrl(savedItem.url) });
    }
    setMedia((current) => [...uploadedItems, ...current]);
  };

  const deleteMedia = async (id: string) => {
    await apiRequest(`/media/${id}`, { method: 'DELETE' });
    setMedia((current) => current.filter((item) => item.id !== id));
  };

  const resetToDefaultEvents = () => {
    setEvents(INITIAL_EVENTS);
    setCoordinators(INITIAL_COORDINATORS);
    try {
      localStorage.removeItem(EVENTS_STORAGE_KEY);
      localStorage.removeItem(COORD_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <EventContext.Provider
      value={{
        events,
        coordinators,
        video,
        media,
        getEventById,
        addEvent,
        updateEvent,
        deleteEvent,
        updateEventStatus,
        addCoordinator,
        toggleCoordinatorStatus,
        removeCoordinator,
        updateVideo,
        addMedia,
        addMediaLink,
        deleteMedia,
        resetToDefaultEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
