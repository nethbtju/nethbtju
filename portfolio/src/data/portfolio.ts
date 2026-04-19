export interface SkillItem  { name: string; pct: number }
export interface DetailItem { k: string; v: string }
export interface LinkItem   { label: string; href: string; sub?: string }

export interface AboutPanel {
  type: 'about';
  title: string;
  content: string;
  skills: SkillItem[];
  details: DetailItem[];
}
export interface JobPanel {
  type: 'job';
  title: string;
  company: string;
  period: string;
  desc: string;
  bullets: string[];
  tags: string[];
}
export interface ProjectPanel {
  type: 'project';
  status: 'live' | 'oss' | 'wip';
  title: string;
  subtitle: string;
  desc: string;
  bullets: string[];
  tags: string[];
  links: LinkItem[];
}
export interface ContactPanel {
  type: 'contact';
  title: string;
  desc: string;
  links: LinkItem[];
}

export type PanelData = AboutPanel | JobPanel | ProjectPanel | ContactPanel;

export interface MoonData {
  name: string;
  subtitle: string;
  num: string;
  desc: string;
  tags: string[];
  color: string;
  status?: string;
  panel: PanelData;
}
export interface PlanetData {
  tag: string;
  name: string;
  desc: string;
  color: string;
  panel?: PanelData;
  moons?: MoonData[];
}

export const DATA: Record<string, PlanetData> = {
  sun: {
    tag: 'Home Base', name: 'Sun',
    desc: 'The gravitational center. Start your journey here.',
    color: '#ffd54f',
  },
  mercury: {
    tag: 'Crew Profile', name: 'Mercury',
    desc: 'Small, fast, intensely personal. Learn about the engineer behind the code.',
    color: '#b0bec5',
    panel: {
      type: 'about',
      title: 'Neth Botheju',
      content: `I'm a software engineer based in Melbourne, Australia, with a deep obsession for the hard problems: distributed consensus, observability at scale, developer tooling that actually sparks joy.

My path into software was unconventional — I started in physics, wrote simulations, got obsessed with making them faster, and never looked back. These days I spend most of my time designing systems that have to be correct AND fast.

Outside of work I write about distributed systems on my blog, contribute to open-source Go projects, and occasionally enter 48-hour hackathons just to stay humble.`,
      skills: [
        { name: 'Go',                  pct: 95 },
        { name: 'TypeScript',          pct: 92 },
        { name: 'Distributed Systems', pct: 90 },
        { name: 'Cloud Infra',         pct: 88 },
        { name: 'Python',              pct: 85 },
        { name: 'Rust',                pct: 72 },
      ],
      details: [
        { k: 'Location',  v: 'Melbourne, VIC — Australia' },
        { k: 'Role',      v: 'Software Engineer' },
        { k: 'Education', v: 'BE Software Engineering, Monash University' },
        { k: 'Resume',    v: '<a href="#">Download PDF ↗</a>' },
      ],
    },
  },
  mars: {
    tag: 'Mission Log - Experience', name: 'Mars',
    desc: 'From university LMS internships to shipping cloud infrastructure at Microsoft. Three roles, real systems, and a lot learned along the way.',
    color: '#ef5350',
    moons: [
      {
        name: 'Phobos', subtitle: 'eSolutions, Monash University',
        num: 'Mission 01',
        desc: 'Software engineering on Moodle 4.1 greenfield development within the in-house LMS team for 83,000+ students.',
        tags: ['PHP', 'Moodle', 'JavaScript', 'MySQL', 'Git'],
        color: '#ef9a9a',
        panel: {
          type: 'job',
          title: 'Software Developer',
          company: 'eSolutions, Monash University',
          period: '2023-2025',
          desc: 'Internship transitioned to part-time role on the in-house development team at eSolutions, Monash University, contributing to the greenfield development of the university\'s Learning Management System on Moodle 4.1.',
          bullets: [
            'Contributed to greenfield Moodle 4.1 LMS development from the ground up',
            'Built and customised Moodle plugins and themes to meet university requirements',
            'Collaborated within an agile in-house team on iterative feature delivery',
            'Worked with PHP, JavaScript, and MySQL in a large-scale production codebase',
          ],
          tags: ['PHP', 'Moodle', 'JavaScript', 'MySQL', 'Git', 'Agile'],
        },
      },
      {
        name: 'Deimos', subtitle: 'Deloitte — Toyota Australia',
        num: 'Mission 02',
        desc: 'Business Analyst and Front-end Developer at Deloitte, contributing to the Toyota Australia website.',
        tags: ['JavaScript', 'HTML', 'CSS', 'Git'],
        color: '#ffab91',
        panel: {
          type: 'job',
          title: 'Software Engineering Intern',
          company: 'Deloitte',
          period: 'Summer, 2024',
          desc: 'Internship at Deloitte Australia working on the Toyota Australia website as part of a client-facing engineering team.',
          bullets: [
            'Contributed to front-end development of the Toyota Australia public-facing website',
            'Worked within a professional consulting team on a large automotive client engagement',
            'Collaborated on iterative delivery of web features to production',
          ],
          tags: ['JavaScript', 'HTML', 'CSS', 'Git'],
        },
      },
      {
        name: 'Ares-1', subtitle: 'Microsoft — Azure Kubernetes Service',
        num: 'Mission 03',
        desc: 'Software engineer on Azure Kubernetes Service, building control plane infrastructure and internal observability tooling.',
        tags: ['Go', 'Python', 'KCL', 'Helm', 'AKS', 'Azure'],
        color: '#ffcc02',
        panel: {
          type: 'job',
          title: 'Software Engineer',
          company: 'Microsoft',
          period: '2025-Present',
          desc: 'Worked on the Azure Kubernetes Service (AKS) team, delivering infrastructure tooling and control plane improvements that directly impacted reliability and resource efficiency for enterprise customers at scale.',
          bullets: [
            'Designed and implemented a config-as-code system for authoring Kusto-driven dashboards, enabling internal engineers to triage and monitor AKS clusters with standardised observability workflows',
            'Data-mined live customer workload telemetry to fit t-shirt sizing models for DaemonSet resource profiles, reducing over-provisioning and CPU throttling across the fleet',
            'Developed a scaled provisioned control plane pathway for resource-intensive customers requiring high-throughput, low-latency Kubernetes API server performance',
            'Worked across the full infrastructure stack with Go, Python, KCL, Helm, HCP, Jupyter Notebooks, YAML, and Azure cloud primitives',
          ],
          tags: ['Go', 'Python', 'KCL', 'Helm', 'HCP', 'Azure', 'Kubernetes', 'Kusto', 'Jupyter'],
        },
      },
    ],
  },
  saturn: {
    tag: 'Deployed Systems', name: 'Saturn',
    desc: 'Six projects orbiting in production. Scroll through the rings to explore each one.',
    color: '#ffd54f',
    moons: [
      {
        name: 'Titan', subtitle: 'Helix — Distributed Tracing',
        num: 'Project 01',
        desc: 'Open-source distributed tracing library for Go services. Zero-dependency core.',
        tags: ['Go', 'OpenTelemetry', 'gRPC'], color: '#80cbc4', status: 'live',
        panel: {
          type: 'project', status: 'live',
          title: 'Helix',
          subtitle: 'Open-source distributed tracing for Go',
          desc: 'A zero-dependency distributed tracing library for Go services with pluggable exporters. Battle-tested across 50+ production environments and 4,200 GitHub stars.',
          bullets: [
            'Zero external dependencies in the core library',
            'Pluggable exporters: Jaeger, Tempo, Honeycomb, Datadog',
            'Automatic context propagation across goroutines',
            'Sub-microsecond overhead per span (<0.3μs)',
            '4,200 GitHub stars — growing 15% month-over-month',
          ],
          tags: ['Go', 'OpenTelemetry', 'gRPC', 'OTLP'],
          links: [{ label: 'GitHub →', href: '#' }, { label: 'Docs ↗', href: '#' }],
        },
      },
      {
        name: 'Enceladus', subtitle: 'Vantage — Observability Dashboard',
        num: 'Project 02',
        desc: 'Developer observability dashboard with live tail, traces, and anomaly detection.',
        tags: ['TypeScript', 'React', 'ClickHouse'], color: '#90caf9', status: 'live',
        panel: {
          type: 'project', status: 'live',
          title: 'Vantage',
          subtitle: 'Developer observability at light speed',
          desc: 'Observability dashboard with live log tail, distributed traces, and ML-powered anomaly detection. Built on a custom sub-5ms query engine. Deployed as a single Docker container.',
          bullets: [
            'Sub-5ms query engine for logs over 10B+ row datasets',
            'Real-time log streaming with <250ms end-to-end latency',
            'Anomaly detection using isolation forests (no GPU required)',
            'Single Docker container — zero infrastructure to manage',
            '1,200 cloud instances running in production',
          ],
          tags: ['TypeScript', 'React', 'ClickHouse', 'Rust', 'WebSocket'],
          links: [{ label: 'Live demo ↗', href: '#' }, { label: 'GitHub →', href: '#' }],
        },
      },
      {
        name: 'Rhea', subtitle: 'Sidecar — Secrets CLI',
        num: 'Project 03',
        desc: 'CLI for managing multi-environment secrets. AES-256, Git-native, 8.2k stars.',
        tags: ['Rust', 'CLI', 'Crypto'], color: '#ce93d8', status: 'oss',
        panel: {
          type: 'project', status: 'oss',
          title: 'Sidecar',
          subtitle: "Secrets management that doesn't suck",
          desc: 'CLI tool for multi-environment secrets management with AES-256 encryption, Git-native workflow, and support for 12 cloud secret backends. 8,200 GitHub stars.',
          bullets: [
            'AES-256-GCM encryption with PBKDF2 key derivation',
            'Git-native: secrets travel with your repo, safely encrypted',
            'Supports AWS SSM, GCP Secret Manager, Vault, and 9 more',
            '#3 trending Rust CLI tool in 2023 — 8,200 GitHub stars',
            'Adopted by teams at Stripe, Shopify, and Cloudflare',
          ],
          tags: ['Rust', 'AES-256', 'PBKDF2', 'Git', 'AWS', 'GCP'],
          links: [{ label: 'GitHub ↗', href: '#' }, { label: 'crates.io →', href: '#' }],
        },
      },
      {
        name: 'Dione', subtitle: 'Driftwork — Schema Drift Detection',
        num: 'Project 04',
        desc: 'Schema drift detection for distributed PostgreSQL clusters via WAL parsing.',
        tags: ['Go', 'PostgreSQL', 'Protobuf'], color: '#a5d6a7', status: 'wip',
        panel: {
          type: 'project', status: 'wip',
          title: 'Driftwork',
          subtitle: 'Catch schema drift before it breaks prod',
          desc: 'Real-time schema drift detection for distributed databases. Parses Postgres WAL streams, compares schemas across cluster nodes, and surfaces breaking changes before they reach production.',
          bullets: [
            'Parses WAL with <2ms latency overhead per transaction',
            'Detects: column drops, type changes, constraint mutations',
            'Slack/PagerDuty alerts with one-line deployment',
            'Currently in private beta with 12 design partners',
          ],
          tags: ['Go', 'PostgreSQL', 'WAL', 'Protobuf', 'gRPC'],
          links: [{ label: 'Follow progress →', href: '#' }],
        },
      },
      {
        name: 'Tethys', subtitle: 'Latency.fm — Global Benchmarks',
        num: 'Project 05',
        desc: 'Global latency benchmarking across 40 regions. Rendered as a world heatmap.',
        tags: ['Next.js', 'D3.js', 'Cloudflare Workers'], color: '#80deea', status: 'live',
        panel: {
          type: 'project', status: 'live',
          title: 'Latency.fm',
          subtitle: "The internet's ping map",
          desc: 'Global latency benchmarking tool that pings 40 cloud regions every 60 seconds and renders a world heatmap. Built to dogfood Vantage. 2k monthly users.',
          bullets: [
            '40 measurement nodes across 6 continents',
            'Updates every 60 seconds — 86,400 data points per day',
            'D3.js choropleth map with sub-region drill-down',
            'Built on Cloudflare Workers — zero cold starts',
            '2,000 monthly active users with zero marketing spend',
          ],
          tags: ['Next.js', 'D3.js', 'Cloudflare Workers', 'TimescaleDB'],
          links: [{ label: 'Visit site ↗', href: '#' }, { label: 'API docs →', href: '#' }],
        },
      },
      {
        name: 'Mimas', subtitle: 'Pulsar — Event Sourcing',
        num: 'Project 06',
        desc: 'Event sourcing framework for TypeScript with full end-to-end type inference.',
        tags: ['TypeScript', 'CQRS', 'Event Sourcing'], color: '#f48fb1', status: 'oss',
        panel: {
          type: 'project', status: 'oss',
          title: 'Pulsar',
          subtitle: 'Event sourcing that TypeScript actually likes',
          desc: 'Event sourcing framework for TypeScript with full type inference end-to-end. Define aggregates, projections, and sagas with zero type assertions. Works with any event store backend.',
          bullets: [
            'Full type inference — zero `as` casts required anywhere',
            'Works with EventStoreDB, DynamoDB, PostgreSQL, in-memory',
            'Saga orchestration with compensation transactions built-in',
            'Ships with React hooks for real-time projection subscriptions',
            '380 GitHub stars and growing',
          ],
          tags: ['TypeScript', 'CQRS', 'EventStoreDB', 'DynamoDB', 'React'],
          links: [{ label: 'GitHub ↗', href: '#' }, { label: 'npm →', href: '#' }],
        },
      },
    ],
  },
  neptune: {
    tag: 'Open Comms', name: 'Neptune',
    desc: 'Deep space transmissions welcome. Open to mid level roles and collaboration.',
    color: '#5c8aff',
    panel: {
      type: 'contact',
      title: 'Establish Contact',
      desc: 'Open to mid level engineering roles, interesting front end or back end projects, and AI assisted development.',
      links: [
        { label: '✉ Email',    href: 'mailto:nethbotheju04@gmail.com', sub: 'nethbotheju04@gmail.com' },
        { label: '◈ GitHub',   href: '#', sub: 'github.com/nethbtju' },
        { label: '◉ LinkedIn', href: '#', sub: 'linkedin.com/in/nethbotheju' },
      ],
    },
  },
};
