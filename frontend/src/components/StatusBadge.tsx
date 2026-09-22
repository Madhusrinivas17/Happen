import React from 'react';
import { EventStatus } from '../types';

interface StatusBadgeProps {
  status: EventStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-[10px] font-bold px-2 py-0.5',
    md: 'text-[11px] font-bold px-2.5 py-0.5',
    lg: 'text-xs font-bold px-3 py-1',
  };

  switch (status) {
    case 'Live':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-red-600 text-white shadow-xs tracking-wider ${sizeClasses[size]}`}
        >
          + LIVE
        </span>
      );

    case 'Starting Soon':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-amber-500 text-white shadow-xs tracking-wider ${sizeClasses[size]}`}
        >
          Starting Soon
        </span>
      );

    case 'Registration Open':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-blue-600 text-white shadow-xs tracking-wider ${sizeClasses[size]}`}
        >
          Registration Open
        </span>
      );

    case 'Upcoming':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-indigo-600 text-white shadow-xs tracking-wider ${sizeClasses[size]}`}
        >
          Upcoming
        </span>
      );

    case 'Completed':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-slate-600 text-white shadow-xs tracking-wider ${sizeClasses[size]}`}
        >
          Completed
        </span>
      );

    default:
      return (
        <span
          className={`inline-flex items-center rounded-full bg-slate-200 text-slate-800 ${sizeClasses[size]}`}
        >
          {status}
        </span>
      );
  }
};
