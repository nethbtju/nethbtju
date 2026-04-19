import { useShallow } from 'zustand/react/shallow';
import { useStore } from '../../store/useStore';
import { DATA } from '../../data/portfolio';
import { PLANET_DEFS } from '../../data/planets';

export function PlanetInfo() {
  const { currentTarget, currentMoonTarget, travelTo, openPanel } = useStore(useShallow(s => ({
    currentTarget:      s.currentTarget,
    currentMoonTarget:  s.currentMoonTarget,
    travelTo:           s.travelTo,
    openPanel:          s.openPanel,
  })));

  const visible = currentTarget !== 'sun' && !currentMoonTarget;
  const pData   = DATA[currentTarget];
  const pDef    = PLANET_DEFS.find(p => p.id === currentTarget);

  if (!visible || !pData || !pDef) {
    return <div className="planet-info" style={{ opacity: 0, pointerEvents: 'none' }} />;
  }

  const handleExplore = () => {
    if (pData.panel) openPanel(pData.panel);
  };

  return (
    <div className="planet-info" style={{ opacity: 1 }}>
      <div className="pi-tag">{pData.tag}</div>
      <div className="pi-name">{pData.name}</div>
      <div className="pi-desc">{pData.desc}</div>
      <button
        className="pi-cta"
        style={{ color: pDef.color, borderColor: pDef.color + '55' }}
        onClick={handleExplore}
      >
        Explore →
      </button>
    </div>
  );
}
