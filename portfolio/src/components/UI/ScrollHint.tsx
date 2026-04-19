import { useStore } from '../../store/useStore';

export function ScrollHint() {
  const currentTarget = useStore(s => s.currentTarget);
  const visible = currentTarget === 'sun';

  return (
    <div className="scroll-hint" style={{ opacity: visible ? 1 : 0 }}>
      <div className="scroll-arrow" />
      Scroll to navigate
    </div>
  );
}
