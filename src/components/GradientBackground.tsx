interface GradientBackgroundProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'subtle';
  children: React.ReactNode;
  className?: string;
}

export function GradientBackground({ 
  variant = 'primary', 
  children, 
  className = '' 
}: GradientBackgroundProps) {
  const variants = {
    primary: {
      bg: 'bg-gradient-to-br from-white via-blue-50/30 to-white',
      orbs: (
        <>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200 to-sky-200 rounded-full opacity-15 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full opacity-15 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-100 via-sky-100 to-cyan-100 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute top-20 right-1/4 w-64 h-64 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full opacity-12 blur-2xl"></div>
          <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-gradient-to-br from-sky-200 to-cyan-200 rounded-full opacity-12 blur-2xl"></div>
        </>
      ),
    },
    secondary: {
      bg: 'bg-gradient-to-br from-white via-blue-50/20 to-white',
      orbs: (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-sky-200 to-cyan-200 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-gradient-to-br from-blue-200 to-sky-200 rounded-full opacity-8 blur-3xl"></div>
        </>
      ),
    },
    accent: {
      bg: 'bg-gradient-to-br from-white via-sky-50/20 to-white',
      orbs: (
        <>
          <div className="absolute -top-32 right-1/4 w-80 h-80 bg-gradient-to-br from-sky-200 to-blue-200 rounded-full opacity-12 blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full opacity-12 blur-3xl"></div>
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-10 blur-2xl"></div>
        </>
      ),
    },
    subtle: {
      bg: 'bg-gradient-to-br from-white via-blue-50/15 to-white',
      orbs: (
        <>
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full opacity-8 blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-br from-sky-100 to-blue-100 rounded-full opacity-6 blur-3xl"></div>
        </>
      ),
    },
  };

  const { bg, orbs } = variants[variant];

  return (
    <div className={`relative ${bg} overflow-hidden ${className}`}>
      <div className="absolute inset-0 overflow-hidden">
        {orbs}
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
