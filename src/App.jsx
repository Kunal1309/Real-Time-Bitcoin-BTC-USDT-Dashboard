import React, { useState, useEffect } from 'react'
import { useBybitWebSocket } from './hooks/useBybitWebSocket'
import { StatsCard } from './components/StatsCard'
import { TradingViewChart } from './components/TradingViewChart'
import { Sparkline } from './components/Sparkline'
import { ConnectionStatus } from './components/ConnectionStatus'

function fmt(num, d = 2) {
  const n = parseFloat(num)
  return isNaN(n) ? null : n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })
}
function fmtVol(num) {
  const n = parseFloat(num)
  if (isNaN(n)) return null
  if (n >= 1e9) return '$' + (n/1e9).toFixed(2) + 'B'
  if (n >= 1e6) return '$' + (n/1e6).toFixed(2) + 'M'
  return '$' + n.toFixed(0)
}

export default function App() {
  const [theme, setTheme] = useState('dark')
  const { tickerData, status, priceHistory, priceDirection } = useBybitWebSocket()
  const [flashDir, setFlashDir] = useState(null)

  useEffect(() => { document.documentElement.setAttribute('data-theme', theme) }, [theme])
  useEffect(() => {
    if (priceDirection) {
      setFlashDir(priceDirection)
      const t = setTimeout(() => setFlashDir(null), 600)
      return () => clearTimeout(t)
    }
  }, [priceDirection, tickerData?.lastPrice])

  const price = fmt(tickerData?.lastPrice)
  const change24h = tickerData?.price24hPcnt ? (parseFloat(tickerData.price24hPcnt) * 100).toFixed(2) : null
  const changeNum = change24h ? parseFloat(change24h) : null
  const changeDisplay = change24h ? (changeNum >= 0 ? '+' : '') + change24h + '%' : null

  return (
    <div className="app">
      <div className="bg-glow" />
      <header className="header">
        <div className="logo">
          <span style={{ fontSize:36 }}>&#8383;</span>
          <div>
            <div style={{ fontSize:22, fontWeight:800 }}>BTC/USDT</div>
            <div className="mono" style={{ fontSize:10, color:'var(--text-muted)', letterSpacing:2 }}>LIVE DASHBOARD</div>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <ConnectionStatus status={status} />
          <button className="theme-toggle" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </header>

      <section className="price-hero">
        <div>
          <span className="mono" style={{ fontSize:10, letterSpacing:2, color:'var(--text-muted)', textTransform:'uppercase', display:'block', marginBottom:8 }}>Last Price</span>
          <div className={'price-value mono' + (priceDirection === 'up' ? ' price-up' : priceDirection === 'down' ? ' price-down' : '')}>
            {price ? '$' + price : 'Loading...'}
          </div>
          {changeDisplay && (
            <div className={'mono ' + (changeNum >= 0 ? 'val-green' : 'val-red')} style={{ fontSize:16, fontWeight:700, marginTop:8 }}>
              {changeNum >= 0 ? '▲' : '▼'} {changeDisplay} 24h
            </div>
          )}
        </div>
        <div>
          <div className="mono" style={{ fontSize:10, color:'var(--text-muted)', letterSpacing:1.5, marginBottom:8 }}>60s PRICE</div>
          <Sparkline data={priceHistory} width={220} height={55} />
        </div>
      </section>

      <section className="stats-grid">
        <StatsCard label="Mark Price" value={fmt(tickerData?.markPrice) ? '$' + fmt(tickerData?.markPrice) : null} icon="Target" flash={flashDir} />
        <StatsCard label="24h High" value={fmt(tickerData?.highPrice24h) ? '$' + fmt(tickerData?.highPrice24h) : null} icon="High" highlight="green" />
        <StatsCard label="24h Low" value={fmt(tickerData?.lowPrice24h) ? '$' + fmt(tickerData?.lowPrice24h) : null} icon="Low" highlight="red" />
        <StatsCard label="24h Volume" value={fmtVol(tickerData?.turnover24h)} icon="Vol" sub="Turnover" />
        <StatsCard label="24h Change" value={changeDisplay} icon="Chg" highlight={changeNum >= 0 ? 'green' : changeNum !== null ? 'red' : null} />
        <StatsCard label="Bid Price" value={fmt(tickerData?.bid1Price) ? '$' + fmt(tickerData?.bid1Price) : null} icon="Bid" />
        <StatsCard label="Ask Price" value={fmt(tickerData?.ask1Price) ? '$' + fmt(tickerData?.ask1Price) : null} icon="Ask" />
        <StatsCard label="Open Interest" value={fmtVol(tickerData?.openInterestValue)} icon="OI" sub="USD Value" />
      </section>

      <section style={{ marginBottom:40 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:16 }}>
          <h2 style={{ fontSize:18, fontWeight:800 }}>Advanced Chart</h2>
          <span className="mono" style={{ fontSize:11, color:'var(--text-muted)' }}>BYBIT:BTCUSDT.P · TradingView</span>
        </div>
        <TradingViewChart theme={theme} />
      </section>

      <footer className="mono" style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--text-muted)', paddingTop:20, borderTop:'1px solid var(--border)' }}>
        <span>ByBit WebSocket API</span>
        <span>BTC Dashboard 2025</span>
      </footer>

      <style>{`
        .app { min-height:100vh; max-width:1400px; margin:0 auto; padding:0 24px 48px; position:relative; }
        .bg-glow { position:fixed; top:-200px; left:50%; transform:translateX(-50%); width:800px; height:400px; background:radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%); pointer-events:none; z-index:0; }
        .header { display:flex; justify-content:space-between; align-items:center; padding:24px 0 20px; border-bottom:1px solid var(--border); margin-bottom:32px; position:relative; z-index:1; }
        .logo { display:flex; align-items:center; gap:14px; }
        .theme-toggle { background:var(--bg-card); border:1px solid var(--border); color:var(--text-primary); padding:8px 16px; border-radius:100px; cursor:pointer; font-size:13px; font-family:'Syne',sans-serif; font-weight:600; transition:all 0.3s; }
        .theme-toggle:hover { border-color:var(--accent); }
        .price-hero { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:32px; padding:32px 36px; background:var(--bg-card); border:1px solid var(--border); border-radius:20px; box-shadow:var(--card-shadow); animation:fadeInUp 0.4s ease both; }
        .price-value { font-size:clamp(36px,5vw,56px); font-weight:700; color:var(--text-primary); letter-spacing:-2px; transition:color 0.15s; line-height:1; }
        .price-up { color:var(--green) !important; }
        .price-down { color:var(--red) !important; }
        .val-green { color:var(--green); }
        .val-red { color:var(--red); }
        .stats-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(200px,1fr)); gap:16px; margin-bottom:36px; }
      `}</style>
    </div>
  )
}
