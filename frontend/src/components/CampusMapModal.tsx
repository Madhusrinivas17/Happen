import React, { useState } from 'react';
import { X, MapPin, Navigation, Compass, Copy, Check, ExternalLink, Building2 } from 'lucide-react';
import { CampusEvent } from '../types';
import { LogoIcon } from './BrandLogo';

interface CampusMapModalProps {
  event: CampusEvent;
  isOpen: boolean;
  onClose: () => void;
}

export const CampusMapModal: React.FC<CampusMapModalProps> = ({ event, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLocation = () => {
    const text = `${event.venue}, ${event.building || 'Main Campus'}, ${event.room || ''}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="campus-map-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="campus-map-modal-content"
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <LogoIcon size="sm" rounded="rounded-lg" className="border border-slate-200 shrink-0" />
            <div>
              <h3 className="text-base font-bold text-slate-900">Campus Venue Location</h3>
              <p className="text-xs text-slate-500">Interactive campus map guide & directions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            id="close-campus-map-modal"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Map Mockup Area */}
        <div className="relative h-64 w-full bg-slate-100 border-b border-slate-200 overflow-hidden">
          {/* Stylized Vector Campus Grid Map */}
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />

          {/* Campus Roads and Paths */}
          <svg className="absolute inset-0 h-full w-full opacity-40" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 120 Q 200 130 400 90 T 700 110" fill="none" stroke="#94a3b8" strokeWidth="18" />
            <path d="M 280 0 L 280 260" fill="none" stroke="#94a3b8" strokeWidth="14" />
            <path d="M 500 0 L 500 260" fill="none" stroke="#94a3b8" strokeWidth="12" />
            <path d="M 100 40 L 600 220" fill="none" stroke="#cbd5e1" strokeWidth="8" strokeDasharray="6 6" />
          </svg>

          {/* Campus Buildings Visual Boxes */}
          <div className="absolute top-8 left-12 h-20 w-32 rounded-lg border border-slate-300 bg-white/90 p-2 shadow-xs backdrop-blur-xs flex flex-col justify-center text-center">
            <span className="text-[10px] font-bold text-slate-700">Central Library</span>
            <span className="text-[8px] text-slate-400">Block A</span>
          </div>

          <div className="absolute top-28 right-16 h-24 w-36 rounded-lg border border-slate-300 bg-white/90 p-2 shadow-xs backdrop-blur-xs flex flex-col justify-center text-center">
            <span className="text-[10px] font-bold text-slate-700">Student Activity Centre</span>
            <span className="text-[8px] text-slate-400">SAC Amphitheatre</span>
          </div>

          <div className="absolute bottom-4 left-24 h-16 w-28 rounded-lg border border-slate-300 bg-white/90 p-2 shadow-xs backdrop-blur-xs flex flex-col justify-center text-center">
            <span className="text-[10px] font-bold text-slate-700">Sports Complex</span>
            <span className="text-[8px] text-slate-400">Field Arena</span>
          </div>

          {/* Highlighted Target Venue Pin */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white shadow-xl">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping"></span>
              <span>{event.venue}</span>
            </div>
            <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-rose-600 text-white shadow-lg ring-4 ring-rose-300/60 animate-bounce">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="h-2 w-6 rounded-full bg-slate-400/40 blur-xs"></div>
          </div>

          {/* North compass indicator */}
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-md bg-white/80 px-2 py-1 text-[11px] font-semibold text-slate-600 shadow-xs backdrop-blur-xs">
            <Compass className="h-3.5 w-3.5 text-blue-600" />
            <span>N</span>
          </div>
        </div>

        {/* Venue Information Details */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3.5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <Building2 className="h-4 w-4 text-blue-600" />
                <span>Building & Facility</span>
              </div>
              <p className="mt-1 font-semibold text-slate-900">{event.building || 'Campus Central Complex'}</p>
              <p className="text-xs text-slate-500">{event.venue}</p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3.5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <MapPin className="h-4 w-4 text-rose-600" />
                <span>Room / Floor</span>
              </div>
              <p className="mt-1 font-semibold text-slate-900">{event.room || 'Main Hall / Ground Level'}</p>
              <p className="text-xs text-slate-500">Signboards visible near entry</p>
            </div>
          </div>

          {/* Walking Guide */}
          <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
              <Navigation className="h-4 w-4 text-blue-600" />
              <span>Walking Directions on Campus</span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-blue-800">
              From the <strong>Main College Gate</strong>: Take the Central Boulevard walkway past the Fountain circle.
              Turn right at the Science Block. Elevator and staircase access available on the east wing.
            </p>
          </div>

          {/* Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={handleCopyLocation}
              id="copy-venue-btn"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span className="text-emerald-700">Copied Location</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-slate-500" />
                  <span>Copy Address</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
              >
                Close Map
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
