import React, { useRef, useEffect } from 'react'
export function Sparkline({ data, width = 200, height = 50 }) {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || data.length < 2) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr; canvas.height = height * dpr
    canvas.style.width = width + 'px'; canvas.style.height = height + 'px'
    ctx.scale(dpr, dpr); ctx.clearRect(0, 0, width, height)
    const prices = data.map(d => d.price)
    const min = Math.min(...prices), max = Math.max(...prices), range = max - min || 1
    const xStep = width / (prices.length - 1)
    const toX = i => i * xStep
    const toY = p => height - ((p - min) / range) * (height * 0.85) - height * 0.075
    const isUp = prices[prices.length - 1] >= prices[0]
    const grad = ctx.createLinearGradient(0, 0, 0, height)
    grad.addColorStop(0, isUp ? 'rgba(0,230,118,0.3)' : 'rgba(255,61,113,0.3)')
    grad.addColorStop(1, isUp ? 'rgba(0,230,118,0)' : 'rgba(255,61,113,0)')
    ctx.beginPath(); ctx.moveTo(toX(0), toY(prices[0]))
    for (let i = 1; i < prices.length; i++) {
      const xc = (toX(i-1)+toX(i))/2, yc = (toY(prices[i-1])+toY(prices[i]))/2
      ctx.quadraticCurveTo(toX(i-1), toY(prices[i-1]), xc, yc)
    }
    ctx.lineTo(toX(prices.length-1), height); ctx.lineTo(toX(0), height)
    ctx.closePath(); ctx.fillStyle = grad; ctx.fill()
    ctx.beginPath(); ctx.moveTo(toX(0), toY(prices[0]))
    for (let i = 1; i < prices.length; i++) {
      const xc = (toX(i-1)+toX(i))/2, yc = (toY(prices[i-1])+toY(prices[i]))/2
      ctx.quadraticCurveTo(toX(i-1), toY(prices[i-1]), xc, yc)
    }
    ctx.strokeStyle = isUp ? '#00e676' : '#ff3d71'; ctx.lineWidth = 2; ctx.stroke()
  }, [data, width, height])
  return (
    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
      <canvas ref={canvasRef} style={{ borderRadius:4 }} />
      {data.length < 2 && <span style={{ fontSize:11, color:'var(--text-muted)', fontFamily:'Space Mono' }}>Collecting...</span>}
    </div>
  )
}
