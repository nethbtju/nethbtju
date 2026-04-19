import { useStore } from '../../store/useStore';

export function HeroText() {
  const currentTarget = useStore(s => s.currentTarget);
  const visible = currentTarget === 'sun';

  return (
    <div className="hero-text" style={{ opacity: visible ? 1 : 0, pointerEvents: 'none' }}>
      <div className="ht-label">Software Engineer &amp; Systems Architect</div>
      <h1>Neth<br /><em>Botheju</em></h1>
      <p className="ht-sub">Navigate the solar system to explore my work. Scroll to travel deeper into the cosmos.</p>
    </div>
  );
}
