import React from 'react';
import Link from 'next/link';

export interface HollowButtonProps {
  text: string;
  link?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'light';
}

export default function HollowButton({
  text,
  link,
  onClick,
  className = '',
  variant = 'default',
}: HollowButtonProps) {
  const isLightVariant = variant === 'light';

  const baseClasses = `group relative inline-flex items-center justify-center gap-2 px-4 h-[34px] rounded-sm border-2 font-bebas text-lg md:text-xl leading-none tracking-wider uppercase cursor-pointer select-none overflow-hidden bg-clip-padding transform-gpu [-webkit-mask-image:-webkit-radial-gradient(white,black)] bg-no-repeat bg-[length:100%_250%] [background-position:0_0] hover:[background-position:0_100%] transition-[background-position,color,border-color] duration-300 ease-out ${
    isLightVariant
      ? 'bg-[linear-gradient(to_top,#E0DED9_45%,#111111_45.1%)] text-light hover:text-dark border-light'
      : 'bg-[linear-gradient(to_top,#111111_45%,#E0DED9_45.1%)] text-dark hover:text-light border-dark'
  }`;

  const content = (
    <span className="relative z-10 pt-0.5 leading-none">
      {text}
    </span>
  );

  const combinedClasses = `${baseClasses} ${className}`.trim();

  if (link) {
    return (
      <Link href={link} onClick={onClick} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={combinedClasses}>
      {content}
    </button>
  );
}

