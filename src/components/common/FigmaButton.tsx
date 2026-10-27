import React from 'react';
import { Link } from 'react-router-dom';
import frame55Arrow from '@/assets/icons/Frame 55.png';
import frame7Arrow from '@/assets/icons/Frame 7.png';

export interface FigmaButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  variant?: 'primary' | 'outline' | 'dark' | 'white';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  arrowIcon?: string;
  rightIcon?: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

export default function FigmaButton({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  showArrow = true,
  arrowIcon,
  rightIcon,
  className = '',
  type = 'button',
  target,
  rel,
  ariaLabel,
}: FigmaButtonProps) {
  // Size styles
  const sizeStyles = {
    sm: "pl-4 pr-1.5 py-1 text-xs sm:text-[13px] h-8 sm:h-9",
    md: "pl-5 pr-2 py-1.5 text-xs sm:text-[14px] h-9 sm:h-10",
    lg: "pl-6 pr-2.5 py-2 text-sm sm:text-[15px] h-11 sm:h-12",
  }[size];

  const badgeSizeStyles = {
    sm: "h-5 w-auto",
    md: "h-6 sm:h-[26px] w-auto",
    lg: "h-7 w-auto",
  }[size];

  // Variant styles
  let containerStyles = "";
  let textColor = "";
  let activeArrowIcon = arrowIcon;

  if (variant === 'primary') {
    containerStyles = "bg-[#F97316] hover:bg-[#EA580C] shadow-[0_4px_16px_rgba(249,115,22,0.28)]";
    textColor = "text-white";
    if (!activeArrowIcon) {
      activeArrowIcon = frame7Arrow;
    }
  } else if (variant === 'outline') {
    containerStyles = "border border-[#F97316] bg-transparent hover:bg-[#F97316]/5";
    textColor = "text-[#F97316]";
    if (!activeArrowIcon) {
      activeArrowIcon = frame55Arrow;
    }
  } else if (variant === 'dark') {
    containerStyles = "bg-stone-900 hover:bg-stone-800 border border-stone-700/80 shadow-md";
    textColor = "text-[#FAF4E6]";
    if (!activeArrowIcon) {
      activeArrowIcon = frame7Arrow;
    }
  } else {
    // white
    containerStyles = "bg-white hover:bg-stone-50 text-stone-900 border border-stone-200 shadow-sm";
    textColor = "text-stone-900";
    if (!activeArrowIcon) {
      activeArrowIcon = frame55Arrow;
    }
  }

  const baseClasses = `group inline-flex items-center gap-2.5 sm:gap-3 rounded-full font-playfair font-semibold tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] select-none ${sizeStyles} ${containerStyles} ${className}`;

  const renderBadge = () => {
    if (!showArrow && !rightIcon) return null;

    if (rightIcon) {
      return (
        <span className="flex-shrink-0 group-hover:translate-x-0.5 transition-transform duration-200">
          {rightIcon}
        </span>
      );
    }

    if (activeArrowIcon) {
      return (
        <img
          src={activeArrowIcon}
          alt=""
          className={`object-contain flex-shrink-0 group-hover:translate-x-0.5 transition-transform duration-200 ${badgeSizeStyles}`}
        />
      );
    }

    return (
      <div className={`rounded-full flex items-center justify-center flex-shrink-0 group-hover:translate-x-0.5 transition-transform duration-200 w-6 h-6 border border-current`}>
        <svg 
          className="w-3.5 h-3.5" 
          viewBox="0 0 16 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M2.5 8H13.5M13.5 8L9 3.5M13.5 8L9 12.5" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>
    );
  };

  const content = (
    <>
      <span className={`${textColor} whitespace-nowrap`}>
        {children}
      </span>
      {renderBadge()}
    </>
  );

  const isExternal = Boolean(href) || (typeof to === 'string' && (to.startsWith('http://') || to.startsWith('https://') || to.startsWith('//') || to.startsWith('mailto:')));
  const destination = href || to;

  if (isExternal && destination) {
    return (
      <a
        href={destination}
        target={target || '_blank'}
        rel={rel || 'noopener noreferrer'}
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        className={baseClasses}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  if (to) {
    return (
      <Link 
        to={to} 
        target={target} 
        rel={rel} 
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        className={baseClasses} 
        aria-label={ariaLabel}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      className={baseClasses}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
