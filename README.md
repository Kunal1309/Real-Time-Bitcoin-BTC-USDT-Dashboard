# ₿ BTC/USDT Real-Time Dashboard

A production-grade **live Bitcoin dashboard** built with React + Vite, powered by the **ByBit WebSocket API** and **TradingView Advanced Chart**.

![Dashboard Preview](https://img.shields.io/badge/BTC-Live%20Dashboard-f7931a?style=for-the-badge&logo=bitcoin)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=for-the-badge&logo=vite)
![WebSocket](https://img.shields.io/badge/WebSocket-ByBit%20API-yellow?style=for-the-badge)

---

## ✨ Features

- ⚡ Live BTC/USDT price via ByBit WebSocket API
- 📊 Real-time stats — Mark Price, 24h High/Low, Volume, Change, Bid/Ask, Open Interest
- 🟢 Green / 🔴 Red flash animation on every price change
- 📈 TradingView Advanced Chart with live candles
- 🕯️ 60-second Sparkline mini-chart
- 🔌 WebSocket connection status badge
- 🔁 Auto-reconnect with exponential backoff
- 🌙 Light / Dark mode toggle

---

## 📁 Project Structure
```
btc-dashboard/
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── components/
│   │   ├── ConnectionStatus.jsx
│   │   ├── Sparkline.jsx
│   │   ├── StatsCard.jsx
│   │   └── TradingViewChart.jsx
│   ├── hooks/
│   │   └── useBybitWebSocket.js
│   └── styles/
│       └── global.css
```

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/btc-dashboard.git
cd btc-dashboard
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 4. Build for production
```bash
npm run build
npm run preview
```

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite 5 | Build tool |
| ByBit WebSocket API | Live market data |
| TradingView Widget | Advanced charting |
| Canvas API | Sparkline mini-chart |
| CSS Variables | Light/Dark theming |

---

## 📡 WebSocket Details

**Endpoint:** `wss://stream.bybit.com/v5/public/linear`

**Subscribe message:**
```json
{
  "op": "subscribe",
  "args": ["tickers.BTCUSDT"]
}
```

**Key fields from response:**

| Field | Description |
|-------|-------------|
| `lastPrice` | Last traded price |
| `markPrice` | Mark price |
| `highPrice24h` | 24h high |
| `lowPrice24h` | 24h low |
| `turnover24h` | 24h volume in USDT |
| `price24hPcnt` | 24h percent change |
| `bid1Price` / `ask1Price` | Best bid / ask |
| `openInterestValue` | Open interest in USD |

---

## 🎁 Bonus Features

- 60s Sparkline with green/red gradient based on price direction
- Connection status badge: Connected / Reconnecting / Disconnected
- Exponential backoff retry on WebSocket disconnect (max 30s delay)

