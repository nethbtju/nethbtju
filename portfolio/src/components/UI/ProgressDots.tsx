import { useShallow } from 'zustand/react/shallow';
import { useStore } from '../../store/useStore';
import { DESTINATIONS } from '../../data/planets';

const LABELS: Record<string, string> = {
  sun:     'Home',
  mercury: 'About',
  mars:    'Experience',
  saturn:  'Projects',
  neptune: 'Contact',
};

export function ProgressDots() {
  const { currentTarget, travelTo } = useStore(useShallow(s => ({
    currentTarget: s.currentTarget,
    travelTo:      s.travelTo,
  })));

  const activeIdx = DESTINATIONS.indexOf(currentTarget as (typeof DESTINATIONS)[number]);

  return (
    <div className="progress-ring">
      {DESTINATIONS.map((dest, idx) => {
        const isActive  = dest === currentTarget;
        const isVisited = idx < activeIdx;
        let cls = 'ring-dot';
        if (isActive)  cls += ' active';
        if (isVisited) cls += ' visited';

        return (
          <div
            key={dest}
            className={cls}
            title={LABELS[dest]}
            onClick={() => travelTo(dest)}
            style={{ cursor: 'pointer' }}
          />
        );
      })}
    </div>
  );
}
