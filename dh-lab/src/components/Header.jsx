export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="brand" aria-label="Diffie-Hellman Key Exchange Simulator">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none">
              <path d="M14 21v-5a10 10 0 0 1 20 0v5" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
              <rect x="10" y="20" width="28" height="21" rx="5" fill="currentColor" />
              <circle cx="24" cy="29" r="2.5" fill="#2563EB" />
              <path d="M24 31.5v4" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </span>
          <span className="brand-copy">
            <span className="brand-name">Diffie-Hellman</span>
            <span className="brand-tagline">Key Exchange Simulator</span>
          </span>
        </div>
        <div className="header-meta">
          <span className="lab-badge">Cryptography Lab</span>
          <span className="lab-status"><span aria-hidden="true" />Interactive Experiment</span>
        </div>
      </div>
    </header>
  );
}
