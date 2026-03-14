import { useState, useEffect, useRef, useCallback } from 'react'
const WS_URL = 'wss://stream.bybit.com/v5/public/linear'
export function useBybitWebSocket() {
  const [tickerData, setTickerData] = useState(null)
  const [status, setStatus] = useState('Disconnected')
  const [priceHistory, setPriceHistory] = useState([])
  const [priceDirection, setPriceDirection] = useState(null)
  const wsRef = useRef(null)
  const retryRef = useRef(null)
  const retryCountRef = useRef(0)
  const prevPriceRef = useRef(null)
  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return
    setStatus('Connecting...')
    const ws = new WebSocket(WS_URL)
    wsRef.current = ws
    ws.onopen = () => {
      setStatus('Connected')
      retryCountRef.current = 0
      ws.send(JSON.stringify({ op: 'subscribe', args: ['tickers.BTCUSDT'] }))
    }
    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data)
        if (msg.topic === 'tickers.BTCUSDT' && msg.data) {
          const data = msg.data
          const lastPrice = parseFloat(data.lastPrice)
          setTickerData(prev => ({ ...prev, ...data }))
          if (!isNaN(lastPrice)) {
            if (prevPriceRef.current !== null) {
              if (lastPrice > prevPriceRef.current) setPriceDirection('up')
              else if (lastPrice < prevPriceRef.current) setPriceDirection('down')
              else setPriceDirection(null)
            }
            prevPriceRef.current = lastPrice
            setPriceHistory(prev => {
              const now = Date.now()
              return [...prev, { time: now, price: lastPrice }].filter(p => now - p.time <= 60000)
            })
          }
        }
      } catch (e) { console.error('WS parse error:', e) }
    }
    ws.onerror = () => setStatus('Error')
    ws.onclose = () => {
      setStatus('Disconnected')
      wsRef.current = null
      const delay = Math.min(1000 * Math.pow(2, retryCountRef.current), 30000)
      retryCountRef.current += 1
      retryRef.current = setTimeout(() => { setStatus('Reconnecting...'); connect() }, delay)
    }
  }, [])
  useEffect(() => {
    connect()
    return () => { clearTimeout(retryRef.current); wsRef.current?.close() }
  }, [connect])
  return { tickerData, status, priceHistory, priceDirection }
}
