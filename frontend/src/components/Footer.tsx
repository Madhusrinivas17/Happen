import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#0b1120] text-slate-400 pt-12 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Mission */}
          <div className="md:col-span-1 space-y-3">
            <BrandLogo size="md" />
            <p className="text-xs leading-relaxed text-slate-400">
              Where Ideas Meet People. The official student events and club activities platform of Sri Vasavi Engineering College.
            </p>
          </div>

          {/* Quick Discovery */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Explore Events
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/events" className="hover:text-white transition-colors">
                  All Campus Events
                </Link>
              </li>
              <li>
                <Link to="/events?category=Technical" className="hover:text-white transition-colors">
                  Technical Sprints & Hackathons
                </Link>
              </li>
              <li>
                <Link to="/events?category=Cultural" className="hover:text-white transition-colors">
                  Cultural Fest & Dance Nights
                </Link>
              </li>
              <li>
                <Link to="/events?category=Workshop" className="hover:text-white transition-colors">
                  Hands-on Workshops
                </Link>
              </li>
              <li>
                <Link to="/events?status=Live" className="hover:text-white transition-colors">
                  Live on Campus Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals & Access */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Portals & Access
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Coordinator & Admin Login
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-white transition-colors">
                  Campus Events Feed
                </Link>
              </li>
              <li>
                <Link to="/events?category=Other" className="hover:text-white transition-colors">
                  Student Clubs & Societies
                </Link>
              </li>
            </ul>
          </div>

          {/* Campus Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Campus Info
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                <span>Sri Vasavi Engineering College (SVEC), Pedatadepalli, Tadepalligudem</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                <span>events@svec.edu</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                <span>Student Affairs: +91 8818 284355</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Happen. Sri Vasavi Engineering College.</p>
          <p className="font-handwriting text-base text-slate-400">
            "Not just events, but experiences." ♥
          </p>
        </div>
      </div>
    </footer>
  );
};
