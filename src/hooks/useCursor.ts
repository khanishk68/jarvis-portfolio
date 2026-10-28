import { useEffect, useRef } from 'react';

/**
 * Manages the custom cursor via rAF with event delegation.
 * Smoothly scales ring when hovering over interactive elements (buttons, links, inputs).
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
    let isHovering = false;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const interactiveSelector = 'a, button, [role="button"], input, textarea, label[for], [data-cursor-grow]';

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest(interactiveSelector);
      if (interactive !== isHovering) {
        isHovering = interactive;
        if (isHovering) {
          ring.style.borderColor = 'var(--color-cyan-bright)';
          ring.style.opacity = '0.9';
        } else {
          ring.style.borderColor = 'var(--color-cyan)';
          ring.style.opacity = '0.7';
        }
      }
    };

    const animate = () => {
      // Dot follows instantly
      dot.style.transform = `translate(${mouseX - 2}px, ${mouseY - 2}px)`;

      // Ring lags slightly (lerp)
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      const scale = isHovering ? 1.5 : 1;
      ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px) scale(${scale})`;

      rafId = requestAnimationFrame(animate);
    };

    // Hide cursor on focused text inputs
    const onFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.matches('input, textarea')) {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
      }
    };

    const onFocusOut = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '0.7';
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);

    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return { dotRef, ringRef };
}
