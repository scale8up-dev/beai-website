'use client';

import { useState } from 'react';

const COLORS = [
  { name: 'Light', cssVar: '--color-light', bgClass: 'bg-light' },
  { name: 'Dark', cssVar: '--color-dark', bgClass: 'bg-dark' },
  { name: 'Accent', cssVar: '--color-accent', bgClass: 'bg-accent' },
  { name: 'Grey', cssVar: '--color-grey', bgClass: 'bg-grey' },
  { name: 'Dark Grey', cssVar: '--color-dark-grey', bgClass: 'bg-dark-grey' },
];

const FONTS = [
  {
    name: 'Plus Jakarta Sans',
    fontClass: 'font-jakarta',
    family: 'Sans-Serif',
  },
  {
    name: 'Bebas Neue',
    fontClass: 'font-bebas',
    family: 'Display / All Caps',
    isAllCaps: true,
  },
  {
    name: 'IBM Plex Mono',
    fontClass: 'font-ibm-mono',
    family: 'Monospace',
  },
];

const SAMPLE_TEXT = 'The quick brown fox jumps over the lazy dog. 0123456789';

export default function DevToolbar() {
  const [isFontModalOpen, setIsFontModalOpen] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [fontCases, setFontCases] = useState<Record<string, 'upper' | 'lower'>>({
    'Plus Jakarta Sans': 'upper',
    'Bebas Neue': 'upper',
    'IBM Plex Mono': 'lower',
  });

  const handleCopyColor = (colorName: string, cssVar: string) => {
    const hex = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
    if (hex) {
      navigator.clipboard.writeText(hex);
      setCopiedColor(colorName);
      setTimeout(() => {
        setCopiedColor(null);
      }, 2000);
    }
  };

  const toggleFontCase = (fontName: string) => {
    setFontCases((prev) => ({
      ...prev,
      [fontName]: prev[fontName] === 'upper' ? 'lower' : 'upper',
    }));
  };

  return (
    <>
      {/* Right Side Vertically Centered: Color Palette & Font Toolbar Column */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3 rounded-full bg-[#121212]/80 p-2.5 backdrop-blur-md border border-[#E0DED9]/20 shadow-2xl">
        {COLORS.map((color) => (
          <button
            key={color.name}
            onClick={() => handleCopyColor(color.name, color.cssVar)}
            className="group relative flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-125 focus:outline-none"
            title={`${color.name} - Click to copy hex`}
          >
            <span
              className={`w-5 h-5 rounded-full border border-white/20 shadow-inner ${color.bgClass}`}
            />
            {copiedColor === color.name && (
              <span className="absolute right-full mr-2.5 px-2 py-0.5 rounded bg-accent text-dark text-[10px] font-sans font-medium whitespace-nowrap shadow-lg animate-fadeIn">
                Copied {color.name}!
              </span>
            )}
          </button>
        ))}

        <div className="w-4 h-[1px] bg-white/20 my-0.5" />

        {/* Round Font Showcase Button with "A" */}
        <button
          onClick={() => setIsFontModalOpen(true)}
          className="group relative flex items-center justify-center w-5 h-5 rounded-full bg-accent hover:opacity-85 text-dark font-bebas text-sm leading-none font-bold transition-transform duration-200 hover:scale-125 focus:outline-none shadow-md cursor-pointer pt-[1px]"
          title="Font Showcase"
        >
          A
        </button>
      </div>

      {/* Font Showcase Modal */}
      {isFontModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsFontModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl bg-[#121212] border border-[#E0DED9]/20 shadow-2xl text-[#E0DED9] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0DED9]/10 bg-black/40">
              <div>
                <h2 className="text-lg font-semibold text-white">Typography & Fonts</h2>
                <p className="text-xs text-[#E0DED9]/60">Google Fonts loaded via Next.js next/font/google</p>
              </div>
              <button
                onClick={() => setIsFontModalOpen(false)}
                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body (Scrollable, max 85vh total modal height) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {FONTS.map((font) => {
                const isUpper = fontCases[font.name] === 'upper';
                return (
                  <div
                    key={font.name}
                    className="p-4 rounded-xl bg-black/30 border border-[#E0DED9]/10 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-xs font-mono font-medium text-accent uppercase tracking-wider">
                        {font.name}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-white/40 font-mono">
                          {font.fontClass} • {font.family}
                        </span>
                        {!font.isAllCaps && (
                          <button
                            onClick={() => toggleFontCase(font.name)}
                            className="px-2 py-0.5 rounded border border-accent/40 bg-accent/15 hover:bg-accent/30 text-[10px] font-mono font-medium text-white transition-all cursor-pointer flex items-center gap-1 active:scale-95"
                            title="Toggle Uppercase / Lowercase"
                          >
                            <span className="text-white/60">Case:</span>
                            <span className="font-bold text-accent">
                              {isUpper ? 'CAPS' : 'lower'}
                            </span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div
                        className={`${font.fontClass} text-2xl text-white tracking-wide leading-tight ${
                          isUpper ? 'uppercase' : ''
                        }`}
                      >
                        {SAMPLE_TEXT}
                      </div>
                      <div
                        className={`${font.fontClass} text-base text-[#E0DED9]/70 ${
                          isUpper ? 'uppercase tracking-widest' : ''
                        }`}
                      >
                        {isUpper
                          ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789'
                          : 'abcdefghijklmnopqrstuvwxyz 0123456789'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-[#E0DED9]/10 bg-black/40 flex justify-end">
              <button
                onClick={() => setIsFontModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-[#E0DED9]/10 hover:bg-[#E0DED9]/20 text-xs text-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
