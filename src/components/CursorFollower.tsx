'use client';

import { useEffect, useRef, useState } from 'react';

export default function CursorFollower() {
  const followerRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState<string>('');
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Only activate cursor follower on fine pointer devices (mouse/trackpad)
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;
    if (!isPointerFine) return;

    const checkCursorTextAtPoint = (x: number, y: number) => {
      if (x < 0 || y < 0) return;
      const elementAtPoint = document.elementFromPoint(x, y) as HTMLElement | null;
      const target = elementAtPoint?.closest<HTMLElement>('[data-cursor-text]');
      if (target) {
        const text = target.getAttribute('data-cursor-text');
        setCursorText(text || '');
      } else {
        setCursorText('');
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) {
        currentPos.current = { x: e.clientX, y: e.clientY };
        setIsVisible(true);
      }

      checkCursorTextAtPoint(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setCursorText('');
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    // MutationObserver to react INSTANTLY when data-cursor-text attribute changes on click/render
    const observer = new MutationObserver(() => {
      checkCursorTextAtPoint(targetPos.current.x, targetPos.current.y);
    });

    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ['data-cursor-text'],
    });

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const updatePosition = () => {
      const ease = 0.12; // Eased follow speed
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, ease);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, ease);

      if (followerRef.current) {
        const isExpanded = followerRef.current.dataset.expanded === 'true';
        const translateY = isExpanded ? '-120%' : '-50%';
        followerRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, ${translateY})`;
      }

      animationFrameId.current = requestAnimationFrame(updatePosition);
    };

    animationFrameId.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isVisible]);

  const isExpanded = Boolean(cursorText);

  return (
    <div
      ref={followerRef}
      aria-hidden="true"
      data-expanded={isExpanded}
      className={`pointer-events-none fixed top-0 left-0 z-[99999] flex items-center justify-center bg-white mix-blend-difference transform-gpu transition-all duration-300 ease-out overflow-hidden ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${
        isExpanded
          ? 'w-[72px] h-[30px] rounded-md shadow-sm'
          : 'w-3.5 h-3.5 rounded-sm'
      }`}
    >
      {cursorText && (
        <span className="font-bebas text-base sm:text-lg leading-none tracking-wider uppercase text-black text-center select-none whitespace-nowrap translate-y-[1.5px]">
          {cursorText}
        </span>
      )}
    </div>
  );
}
