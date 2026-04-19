import { useStore } from '../../store/useStore';

export function LocationBadge() {
  const location = useStore(s => s.location);
  return (
    <div className="location-badge">
      Sol System / <span>{location}</span>
    </div>
  );
}
