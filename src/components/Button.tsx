import React from 'react';

export interface ButtonProps {
  text: string;
  link?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'light';
}

export default function Button({
  text,
  link,
  onClick,
  className = '',
  variant = 'default',
}: ButtonProps) {
  const isLightVariant = variant === 'light';

  const baseClasses = `group relative inline-flex items-center justify-center gap-2 px-5 h-[38px] rounded-sm border-2 border-transparent font-bebas text-lg md:text-xl leading-none tracking-wider uppercase cursor-pointer select-none overflow-hidden bg-clip-padding transform-gpu [-webkit-mask-image:-webkit-radial-gradient(white,black)] bg-no-repeat bg-[length:100%_250%] [background-position:0_0] hover:[background-position:0_100%] transition-[background-position,color] duration-300 ease-out ${
    isLightVariant
      ? 'bg-[linear-gradient(to_top,#0197D1_45%,#E0DED9_45.1%)] text-dark hover:text-light'
      : 'bg-[linear-gradient(to_top,#0197D1_45%,#111111_45.1%)] text-light'
  }`;

  const content = (
    <span className="relative z-10 pt-0.5 leading-none">
      {text}
    </span>
  );

  const combinedClasses = `${baseClasses} ${className}`.trim();

  if (link) {
    return (
      <a href={link} onClick={onClick} className={combinedClasses}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={combinedClasses}>
      {content}
    </button>
  );
}
