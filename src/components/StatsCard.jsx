import React from 'react'
export function StatsCard({ label, value, sub, highlight, icon, flash }) {
  const flashClass = flash === 'up' ? 'flash-up' : flash === 'down' ? 'flash-down' : ''
  return (
    <div className={`stats-card ${flashClass}`}>
      <div className="stats-card-header">
        <span className="stats-label">{label}</span>
        {icon && <span>{icon}</span>}
      </div>
      <div className={`stats-value mono ${highlight === 'green' ? 'val-green' : highlight === 'red' ? 'val-red' : ''}`}>
        {value ?? <span className="skeleton" />}
      </div>
      {sub && <div className="stats-sub">{sub}</div>}
      <style>{`
        .stats-card { background:var(--bg-card); border:1px solid var(--border); border-radius:16px; padding:20px 22px; display:flex; flex-direction:column; gap:8px; box-shadow:var(--card-shadow); transition:background 0.3s,border-color 0.3s,transform 0.15s; animation:fadeInUp 0.5s ease both; }
        .stats-card:hover { transform:translateY(-2px); border-color:var(--border-accent); }
        .flash-up { animation:ticker-flash-up 0.6s ease; }
        .flash-down { animation:ticker-flash-down 0.6s ease; }
        .stats-card-header { display:flex; justify-content:space-between; align-items:center; }
        .stats-label { font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:1.2px; color:var(--text-secondary); }
        .stats-value { font-size:24px; font-weight:700; color:var(--text-primary); letter-spacing:-0.5px; }
        .val-green { color:var(--green); }
        .val-red { color:var(--red); }
        .stats-sub { font-size:12px; color:var(--text-muted); font-family:'Space Mono',monospace; }
        .skeleton { display:inline-block; width:120px; height:24px; border-radius:4px; background:linear-gradient(90deg,var(--border) 25%,var(--bg-card-hover) 50%,var(--border) 75%); background-size:200% 100%; animation:shimmer 1.5s infinite; }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
      `}</style>
    </div>
  )
}
