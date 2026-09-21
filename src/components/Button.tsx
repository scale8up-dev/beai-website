import React from 'react';
import Link from 'next/link';

export interface ButtonProps {
  text: string;
  link?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'light';
  size?: 'sm' | 'default' | 'lg' | 'xl';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({
  text,
  link,
  onClick,
  className = '',
  variant = 'default',
  size = 'default',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const isLightVariant = variant === 'light';

  const sizeClasses =
    size === 'sm'
      ? 'px-3.5 h-[32px] text-base'
      : size === 'lg'
      ? 'px-7 md:px-8 h-[46px] md:h-[52px] text-xl md:text-2xl'
      : size === 'xl'
      ? 'px-8 md:px-10 h-[52px] md:h-[60px] text-2xl md:text-3xl'
      : 'px-5 h-[38px] text-lg md:text-xl';

  const baseClasses = `group relative inline-flex items-center justify-center gap-2 rounded-sm border-2 border-transparent font-bebas leading-none tracking-wider uppercase select-none overflow-hidden bg-clip-padding transform-gpu [-webkit-mask-image:-webkit-radial-gradient(white,black)] bg-no-repeat bg-[length:100%_250%] [background-position:0_0] ${
    disabled
      ? 'opacity-35 cursor-not-allowed pointer-events-none'
      : 'cursor-pointer hover:[background-position:0_100%] transition-[background-position,color] duration-300 ease-out'
  } ${sizeClasses} ${
    isLightVariant
      ? 'bg-[linear-gradient(to_top,var(--color-accent)_45%,var(--color-light)_45.1%)] text-dark hover:text-dark'
      : 'bg-[linear-gradient(to_top,var(--color-accent)_45%,var(--color-dark)_45.1%)] text-light hover:text-dark'
  }`;

  const content = (
    <span className="relative z-10 pt-0.5 leading-none">
      {text}
    </span>
  );

  const combinedClasses = `${baseClasses} ${className}`.trim();

  if (link) {
    const isExternal = link.startsWith('http');
    return (
      <Link
        href={link}
        onClick={onClick}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={combinedClasses}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
    >
      {content}
    </button>
  );
}

