import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '../../store/useStore';
import type { AboutPanel, JobPanel, ProjectPanel, ContactPanel, PanelData } from '../../data/portfolio';

// ── Sub-renderers ──────────────────────────────────────────────────
function AboutContent({ p }: { p: AboutPanel }) {
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate skill bars after mount
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        barRefs.current.forEach((el, i) => {
          if (el) el.style.width = `${p.skills[i].pct}%`;
        });
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [p]);

  return (
    <>
      <div className="panel-section-tag">Crew Profile</div>
      <div className="panel-title">{p.title}</div>
      <div className="panel-divider" />
      {p.content.split('\n\n').map((para, i) => (
        <p key={i} className="about-para">{para}</p>
      ))}
      <div className="panel-divider" />
      <div className="panel-company" style={{ marginBottom: '1rem' }}>Core Proficiency</div>
      {p.skills.map((s, i) => (
        <div key={s.name} className="skill-row">
          <div className="skill-head">
            <span>{s.name}</span>
            <span className="skill-pct">{s.pct}%</span>
          </div>
          <div className="skill-track">
            <div
              className="skill-fill"
              ref={el => { barRefs.current[i] = el; }}
              style={{ width: 0, transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)' }}
            />
          </div>
        </div>
      ))}
      <div className="panel-divider" />
      {p.details.map(d => (
        <div key={d.k} className="contact-row">
          <span className="contact-key">{d.k}</span>
          <span className="contact-val" dangerouslySetInnerHTML={{ __html: d.v }} />
        </div>
      ))}
    </>
  );
}

function JobContent({ p }: { p: JobPanel }) {
  return (
    <>
      <div className="panel-section-tag">Mission Log</div>
      <div className="panel-company">{p.company}</div>
      <div className="panel-title">{p.title}</div>
      <div className="panel-period">{p.period}</div>
      <div className="panel-divider" />
      <p className="panel-desc">{p.desc}</p>
      <ul className="panel-bullets">
        {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
      <div className="panel-tags">
        {p.tags.map(t => <span key={t} className="panel-tag">{t}</span>)}
      </div>
    </>
  );
}

function ProjectContent({ p }: { p: ProjectPanel }) {
  const statusClass = { live: 'status-live', oss: 'status-oss', wip: 'status-wip' }[p.status];
  const statusLabel = { live: 'Live', oss: 'Open Source', wip: 'In Progress' }[p.status];

  return (
    <>
      <div className="panel-section-tag">Deployed System</div>
      <span className={`panel-status ${statusClass}`}>{statusLabel}</span>
      <div className="panel-title">{p.title}</div>
      <div className="panel-company" style={{ color: 'var(--muted)', fontSize: '0.75rem', marginBottom: '1rem' }}>
        {p.subtitle}
      </div>
      <div className="panel-divider" />
      <p className="panel-desc">{p.desc}</p>
      <ul className="panel-bullets">
        {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
      <div className="panel-tags">
        {p.tags.map(t => <span key={t} className="panel-tag">{t}</span>)}
      </div>
      <div style={{ marginTop: '1.5rem' }}>
        {p.links.map(lk => (
          <a key={lk.label} href={lk.href} className="panel-link">{lk.label}</a>
        ))}
      </div>
    </>
  );
}

function ContactContent({ p }: { p: ContactPanel }) {
  return (
    <>
      <div className="panel-section-tag">Open Comms</div>
      <div className="panel-title">{p.title}</div>
      <div className="panel-divider" />
      <p className="about-para">{p.desc}</p>
      <div className="panel-divider" />
      {p.links.map(lk => (
        <div key={lk.label} className="contact-row">
          <span className="contact-key">{lk.label}</span>
          <span className="contact-val">
            <a href={lk.href}>{lk.sub}</a>
          </span>
        </div>
      ))}
    </>
  );
}

function PanelContent({ data }: { data: PanelData }) {
  if (data.type === 'about')   return <AboutContent   p={data} />;
  if (data.type === 'job')     return <JobContent     p={data} />;
  if (data.type === 'project') return <ProjectContent p={data} />;
  if (data.type === 'contact') return <ContactContent p={data} />;
  return null;
}

// ── Main Panel ─────────────────────────────────────────────────────
export function Panel() {
  const { panelOpen, panelData, closePanel } = useStore(useShallow(s => ({
    panelOpen:  s.panelOpen,
    panelData:  s.panelData,
    closePanel: s.closePanel,
  })));

  return (
    <div className={`side-panel ${panelOpen ? 'open' : ''}`}>
      <button className="panel-close" onClick={closePanel}>✕ Close</button>
      <div className="panel-content">
        {panelData && <PanelContent data={panelData} />}
      </div>
    </div>
  );
}
