'use client';

import { useEffect, useRef, useState } from 'react';

export default function CursorFollower() {
  const followerRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Only activate cursor follower on fine pointer devices (mouse/trackpad)
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;
    if (!isPointerFine) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) {
        currentPos.current = { x: e.clientX, y: e.clientY };
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const updatePosition = () => {
      const ease = 0.08; // Increased staggered drag delay
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, ease);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, ease);

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId.current = requestAnimationFrame(updatePosition);
    };

    animationFrameId.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isVisible]);

  return (
    <div
      ref={followerRef}
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 left-0 z-[99999] w-3.5 h-3.5 rounded-sm bg-white mix-blend-difference transform-gpu transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}
