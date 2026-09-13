import React from 'react';
import {
  Palette,
  Sparkles,
  Tag,
  RefreshCw,
  MessageCircle,
  Edit3,
  Headphones,
  Cpu,
  Zap,
  ShieldCheck,
  LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Palette,
  Sparkles,
  Tag,
  RefreshCw,
  MessageCircle,
  Edit3,
  Headphones,
  Cpu,
  Zap,
  ShieldCheck,
};

interface HighlightProps {
  title: string;
  icon: LucideIcon | string;
  tagline: string;
  isLast?: boolean;
  isActive?: boolean;
  className?: string;
}

export default function Highlight({
  title,
  icon,
  tagline,
  isLast = false,
  isActive = false,
  className = '',
}: HighlightProps) {
  // Resolve icon component if string is provided
  const IconComponent: LucideIcon =
    typeof icon === 'string' ? iconMap[icon] || Sparkles : icon;

  const textColorClass = isActive
    ? 'text-light transition-colors duration-300'
    : 'text-dark-grey transition-colors duration-300';

  return (
    <div
      data-highlight-row
      className={`py-5 sm:py-8 border-t border-light/20 ${
        isLast ? 'border-b' : ''
      } ${className}`}
    >
      {/* Mobile Layout (< md) */}
      <div className="flex flex-col gap-5 sm:gap-6 md:hidden text-left">
        {/* Title and Icon in the same line */}
        <div className="flex items-center justify-between gap-3">
          <h3 className={`font-jakarta text-lg sm:text-xl font-semibold ${textColorClass}`}>
            {title.endsWith('.') ? title : `${title}.`}
          </h3>
          <div className={`shrink-0 ${textColorClass}`}>
            <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
        </div>

        {/* Description underneath */}
        <p className={`font-jakarta text-lg sm:text-xl font-semibold leading-relaxed ${textColorClass}`}>
          {tagline}
        </p>
      </div>

      {/* Desktop Layout (>= md) */}
      <div className="hidden md:grid md:grid-cols-12 md:items-center md:gap-6">
        {/* Title on Left */}
        <div className="md:col-span-4 text-right">
          <h3 className={`font-jakarta text-xl md:text-2xl font-semibold ${textColorClass}`}>
            {title.endsWith('.') ? title : `${title}.`}
          </h3>
        </div>

        {/* Icon in Middle */}
        <div className={`md:col-span-2 flex items-center justify-center ${textColorClass}`}>
          <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" />
        </div>

        {/* Detail on Right */}
        <div className="md:col-span-6 text-left">
          <p className={`font-jakarta text-xl md:text-2xl font-semibold leading-relaxed max-w-sm sm:max-w-md ${textColorClass}`}>
            {tagline}
          </p>
        </div>
      </div>
    </div>
  );
}
