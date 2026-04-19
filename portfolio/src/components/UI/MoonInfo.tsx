import { useShallow } from 'zustand/react/shallow';
import { useStore } from '../../store/useStore';
import { DATA } from '../../data/portfolio';

export function MoonInfo() {
  const { currentTarget, currentMoonTarget, openPanel } = useStore(useShallow(s => ({
    currentTarget:     s.currentTarget,
    currentMoonTarget: s.currentMoonTarget,
    openPanel:         s.openPanel,
  })));

  const visible = !!currentMoonTarget;
  const moonData = DATA[currentTarget]?.moons?.find(m => m.name === currentMoonTarget);

  if (!visible || !moonData) {
    return <div className="moon-info" style={{ opacity: 0, pointerEvents: 'none' }} />;
  }

  const handleOpen = () => {
    if (moonData.panel) openPanel(moonData.panel);
  };

  return (
    <div className="moon-info" style={{ opacity: 1, pointerEvents: 'all' }}>
      <div className="mi-num">{moonData.num}</div>
      <div className="mi-name">{moonData.name}</div>
      <div className="mi-subtitle">{moonData.subtitle}</div>
      <div className="mi-desc">{moonData.desc}</div>
      <div className="mi-tags">
        {moonData.tags.map(tag => (
          <span key={tag} className="mi-tag">{tag}</span>
        ))}
      </div>
      <button className="mi-open" onClick={handleOpen}>View details →</button>
    </div>
  );
}
