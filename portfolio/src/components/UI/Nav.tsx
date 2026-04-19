import { useShallow } from 'zustand/react/shallow';
import { useStore } from '../../store/useStore';

export function Nav() {
  const { travelTo, currentTarget } = useStore(useShallow(s => ({ travelTo: s.travelTo, currentTarget: s.currentTarget })));

  const links = [
    { id: 'sun',     label: 'Home'       },
    { id: 'mercury', label: 'About'      },
    { id: 'mars',    label: 'Experience' },
    { id: 'saturn',  label: 'Projects'   },
    { id: 'neptune', label: 'Contact'    },
  ] as const;

  return (
    <nav className="nav">
      <div className="nav-logo" onClick={() => travelTo('sun')}>nethbtju.exe</div>
      <ul className="nav-links">
        {links.map(link => (
          <li key={link.id}>
            <button
              className={currentTarget === link.id ? 'active' : ''}
              onClick={() => travelTo(link.id)}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
