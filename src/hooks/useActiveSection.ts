import { useState, useEffect, useRef } from 'react';

/** Returns the id of the section currently most visible in the viewport. */
export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const entries = new Map<string, number>();

    observerRef.current = new IntersectionObserver(
      (obs) => {
        obs.forEach((entry) => {
          entries.set(entry.target.id, entry.intersectionRatio);
        });
        let maxRatio = 0;
        let maxId = activeId;
        entries.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            maxId = id;
          }
        });
        if (maxRatio > 0) setActiveId(maxId);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sectionIds]); // eslint-disable-line react-hooks/exhaustive-deps

  return activeId;
}

