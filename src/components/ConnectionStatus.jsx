import React from 'react'
export function ConnectionStatus({ status }) {
  const isConnected = status === 'Connected'
  const isConnecting = status === 'Connecting...' || status === 'Reconnecting...'
  return (
    <div className={`conn-status ${isConnected ? 'connected' : isConnecting ? 'connecting' : 'disconnected'}`}>
      <span className="conn-dot" />
      <span>{status}</span>
      <style>{`
        .conn-status { display:inline-flex; align-items:center; gap:6px; padding:5px 12px; border-radius:100px; font-size:11px; font-weight:700; letter-spacing:0.8px; text-transform:uppercase; font-family:'Space Mono',monospace; border:1px solid transparent; transition:all 0.3s; }
        .connected { background:var(--green-bg); color:var(--green); border-color:rgba(0,230,118,0.2); }
        .connecting { background:rgba(247,147,26,0.1); color:var(--accent); border-color:rgba(247,147,26,0.2); }
        .disconnected { background:var(--red-bg); color:var(--red); border-color:rgba(255,61,113,0.2); }
        .conn-dot { width:7px; height:7px; border-radius:50%; background:currentColor; flex-shrink:0; }
        .connected .conn-dot { animation:pulse-green 2s infinite; }
        .connecting .conn-dot { animation:spin 1s linear infinite; border-radius:0; width:8px; height:8px; border:2px solid currentColor; border-top-color:transparent; background:transparent; }
      `}</style>
    </div>
  )
}
