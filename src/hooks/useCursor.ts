import { useEffect, useRef } from 'react';

/**
 * Manages the custom cursor via rAF — no React state, zero re-renders.
 * Returns refs to attach to the dot and ring elements.
 */
export function useCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't activate on touch / coarse pointer devices
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mq.matches) return;

    // Also skip if reduced motion
    const rmq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (rmq.matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onEnterInteractive = () => {
      ring.style.transform = `translate(${ringX - 24}px, ${ringY - 24}px) scale(1.6)`;
      ring.style.borderColor = 'var(--color-cyan-bright)';
      ring.style.opacity = '0.9';
    };

    const onLeaveInteractive = () => {
      ring.style.borderColor = 'var(--color-cyan)';
      ring.style.opacity = '0.7';
      // scale reset handled by rAF
    };

    const interactiveSelector = 'a, button, [role="button"], input, textarea, label[for], [data-cursor-grow]';

    const addInteractiveListeners = () => {
      document.querySelectorAll<HTMLElement>(interactiveSelector).forEach((el) => {
        el.addEventListener('mouseenter', onEnterInteractive);
        el.addEventListener('mouseleave', onLeaveInteractive);
      });
    };

    const removeInteractiveListeners = () => {
      document.querySelectorAll<HTMLElement>(interactiveSelector).forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
    };

    const animate = () => {
      // Dot follows instantly
      dot.style.transform = `translate(${mouseX - 2}px, ${mouseY - 2}px)`;

      // Ring lags slightly (lerp)
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;

      rafId = requestAnimationFrame(animate);
    };

    // Hide cursor on text inputs
    const onFocusInput = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };
    const onBlurInput = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '0.7';
    };
    document.querySelectorAll('input, textarea').forEach((el) => {
      el.addEventListener('focus', onFocusInput);
      el.addEventListener('blur', onBlurInput);
    });

    document.addEventListener('mousemove', onMove);
    addInteractiveListeners();
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      removeInteractiveListeners();
      document.querySelectorAll('input, textarea').forEach((el) => {
        el.removeEventListener('focus', onFocusInput);
        el.removeEventListener('blur', onBlurInput);
      });
      cancelAnimationFrame(rafId);
    };
  }, []);

  return { dotRef, ringRef };
}

