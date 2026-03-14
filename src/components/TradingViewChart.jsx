import React from 'react'

export function TradingViewChart({ theme }) {
  const src = `https://s.tradingview.com/widgetembed/?frameElementId=tradingview_btc&symbol=BYBIT%3ABTCUSDT.P&interval=1&hidesidetoolbar=0&hidetoptoolbar=0&symboledit=1&saveimage=1&toolbarbg=${theme === 'dark' ? '16161f' : 'ffffff'}&studies=[]&theme=${theme}&style=1&timezone=Etc%2FUTC&withdateranges=1&showpopupbutton=1&locale=en`

  return (
    <div style={{ width:'100%', height:'500px', background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'16px', overflow:'hidden', boxShadow:'var(--card-shadow)' }}>
      <iframe
        id="tradingview_btc"
        src={src}
        style={{ width:'100%', height:'100%', border:'none' }}
        allowFullScreen
        allow="clipboard-write"
      />
    </div>
  )
}
