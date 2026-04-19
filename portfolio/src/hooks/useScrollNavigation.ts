import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { PLANET_DEFS, DESTINATIONS } from '../data/planets';
import { DATA } from '../data/portfolio';

const SCROLL_THRESH = 120;

export function useScrollNavigation() {
  const scrollAccumRef = useRef(0);

  useEffect(() => {
    const handleScroll = (delta: number) => {
      const { currentTarget, currentMoonTarget, isTransitioning, travelTo, goNextPlanet, goPrevPlanet } =
        useStore.getState();

      if (isTransitioning) return;
      scrollAccumRef.current += delta;

      const planet = PLANET_DEFS.find(p => p.id === currentTarget);
      const portfolioData = DATA[currentTarget];

      // If on a planet with portfolio moons, scroll through them before moving on
      if (currentTarget !== 'sun' && portfolioData?.moons?.length && planet?.moons.length) {
        const moonLabels = planet.moons.map(m => m.label);

        if (scrollAccumRef.current > SCROLL_THRESH) {
          scrollAccumRef.current = 0;
          if (!currentMoonTarget) {
            travelTo(currentTarget, moonLabels[0]);
          } else {
            const idx = moonLabels.indexOf(currentMoonTarget);
            if (idx < moonLabels.length - 1) {
              travelTo(currentTarget, moonLabels[idx + 1]);
            } else {
              goNextPlanet();
            }
          }
        } else if (scrollAccumRef.current < -SCROLL_THRESH) {
          scrollAccumRef.current = 0;
          if (currentMoonTarget) {
            const idx = moonLabels.indexOf(currentMoonTarget);
            if (idx > 0) {
              travelTo(currentTarget, moonLabels[idx - 1]);
            } else {
              travelTo(currentTarget); // back to planet overview
            }
          } else {
            goPrevPlanet();
          }
        }
        return;
      }

      if (scrollAccumRef.current > SCROLL_THRESH) {
        scrollAccumRef.current = 0;
        goNextPlanet();
      } else if (scrollAccumRef.current < -SCROLL_THRESH) {
        scrollAccumRef.current = 0;
        goPrevPlanet();
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      handleScroll(e.deltaY);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') handleScroll(200);
      if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  handleScroll(-200);
      if (e.key === 'Escape') {
        const { closePanel, currentMoonTarget, currentTarget, travelTo } = useStore.getState();
        closePanel();
        if (currentMoonTarget) travelTo(currentTarget);
      }
    };
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) handleScroll(dy * 3);
    };

    window.addEventListener('wheel',      onWheel,      { passive: false });
    window.addEventListener('keydown',    onKeyDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend',   onTouchEnd,   { passive: true });

    return () => {
      window.removeEventListener('wheel',      onWheel);
      window.removeEventListener('keydown',    onKeyDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend',   onTouchEnd);
    };
  }, []); // single mount — reads store non-reactively via getState()
}

export function useNavHighlight() {
  const currentTarget = useStore(s => s.currentTarget);
  // Returns which DESTINATIONS index is active
  return DESTINATIONS.indexOf(currentTarget as (typeof DESTINATIONS)[number]);
}
