import React, { useState } from 'react';
import logoSrc from '../images/logoo.jpeg';

export { logoSrc };

export interface LogoIconProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  rounded?: string;
  alt?: string;
}

export const LogoIcon: React.FC<LogoIconProps> = ({
  size = 'md',
  className = '',
  rounded = 'rounded-xl',
  alt = 'Logo',
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeMap = {
    xs: 'h-5 w-5',
    sm: 'h-7 w-7',
    md: 'h-9 w-9',
    lg: 'h-11 w-11',
    xl: 'h-14 w-14',
    '2xl': 'h-16 w-16',
  };

  if (imageError) {
    return (
      <div
        className={`relative flex ${sizeMap[size]} ${rounded} items-center justify-center overflow-hidden bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 shrink-0 ${className}`}
      >
        <svg
          className="h-1/2 w-1/2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 4v16" />
          <path d="M19 4v16" />
          <path d="M5 12h14" />
          <path d="M12 2.5v3" />
          <path d="M12 18.5v3" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={logoSrc}
      alt={alt}
      onError={() => setImageError(true)}
      referrerPolicy="no-referrer"
      className={`${sizeMap[size]} ${rounded} object-cover object-center shrink-0 shadow-xs ${className}`}
    />
  );
};

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  showSubtitle?: boolean;
  className?: string;
  textClassName?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  showSubtitle = true,
  className = '',
  textClassName = '',
}) => {
  const [imageError, setImageError] = useState(false);

  const iconSizes = {
    sm: 'h-8 w-8 rounded-lg',
    md: 'h-9 w-9 rounded-xl',
    lg: 'h-11 w-11 rounded-2xl',
  };

  const titleSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div
        className={`relative flex ${iconSizes[size]} items-center justify-center overflow-hidden bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 shrink-0`}
      >
        {!imageError ? (
          <img
            src={logoSrc}
            alt="Happen Logo"
            className="h-full w-full object-cover object-center"
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
          />
        ) : (
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Stylish dynamic 'H' for Happen with spark */}
            <path d="M5 4v16" />
            <path d="M19 4v16" />
            <path d="M5 12h14" />
            <path d="M12 2.5v3" />
            <path d="M12 18.5v3" />
          </svg>
        )}
      </div>

      {showText && (
        <div className={`flex flex-col leading-tight ${textClassName}`}>
          <span
            className={`${titleSizes[size]} font-extrabold tracking-tight text-white flex items-center`}
          >
            Happen<span className="text-indigo-400">.</span>
          </span>
          {showSubtitle && (
            <span className="text-[10px] font-normal text-slate-400 whitespace-nowrap">
              Events Today, Brighter Tomorrows.
            </span>
          )}
        </div>
      )}
    </div>
  );
};
