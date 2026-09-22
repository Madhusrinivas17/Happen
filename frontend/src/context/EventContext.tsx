import React, { createContext, useContext, useState, useEffect } from 'react';
import { CampusEvent, CoordinatorUser, EventStatus } from '../types';
import { INITIAL_EVENTS, INITIAL_COORDINATORS } from '../data/events';

interface EventContextType {
  events: CampusEvent[];
  coordinators: CoordinatorUser[];
  getEventById: (id: string) => CampusEvent | undefined;
  addEvent: (event: Omit<CampusEvent, 'id'>) => string;
  updateEvent: (id: string, updatedFields: Partial<CampusEvent>) => void;
  deleteEvent: (id: string) => void;
  updateEventStatus: (id: string, status: EventStatus) => void;
  addCoordinator: (coord: Omit<CoordinatorUser, 'id' | 'assignedEventsCount' | 'lastActive'>) => void;
  toggleCoordinatorStatus: (id: string) => void;
  removeCoordinator: (id: string) => void;
  resetToDefaultEvents: () => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

const EVENTS_STORAGE_KEY = 'happen_events_v2';
const COORD_STORAGE_KEY = 'happen_coordinators_v2';

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

  const getEventById = (id: string) => {
    return events.find((e) => e.id === id);
  };

  const addEvent = (eventData: Omit<CampusEvent, 'id'>): string => {
    const newId = 'evt-' + Date.now();
    const newEvent: CampusEvent = {
      ...eventData,
      id: newId,
    };
    setEvents((prev) => [newEvent, ...prev]);
    return newId;
  };

  const updateEvent = (id: string, updatedFields: Partial<CampusEvent>) => {
    setEvents((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((item) => item.id !== id));
  };

  const updateEventStatus = (id: string, status: EventStatus) => {
    setEvents((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
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
        getEventById,
        addEvent,
        updateEvent,
        deleteEvent,
        updateEventStatus,
        addCoordinator,
        toggleCoordinatorStatus,
        removeCoordinator,
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
