export type EventCategory =
  | 'Technical'
  | 'Cultural'
  | 'Sports'
  | 'Workshop'
  | 'Hackathon'
  | 'Seminar'
  | 'Other';

export type EventStatus =
  | 'Upcoming'
  | 'Registration Open'
  | 'Starting Soon'
  | 'Live'
  | 'Completed';

export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "10:00 AM - 1:00 PM"
  venue: string; // e.g. "Auditorium Hall A"
  building?: string;
  room?: string;
  status: EventStatus;
  organizer: string;
  image: string;
  capacity?: number;
  registeredCount?: number;
  contactEmail?: string;
  tags?: string[];
  featured?: boolean;
}

export type UserRole = 'public' | 'coordinator' | 'admin';

export interface AuthUser {
  role: UserRole;
  name: string;
  email: string;
  department?: string;
}

export interface CoordinatorUser {
  id: string;
  name: string;
  email: string;
  department: string;
  assignedEventsCount: number;
  status: 'Active' | 'Invited' | 'Suspended';
  lastActive: string;
}

export interface CampusVideo {
  title: string;
  description: string;
  url: string;
}

export interface CampusMedia {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
}
