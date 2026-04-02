import { useState, useEffect } from 'react'
import axios from 'axios'
import './Dashboard.css'

interface User {
  id: string
  name: string
  email: string
  balance: number
  portfolio_value: number
  profit_loss: number
  member_since: string
}

interface Trade {
  id: string
  symbol: string
  type: 'buy' | 'sell'
  amount: number
  price: number
  date: string
  status: string
}

interface DashboardData {
  user: User
  portfolio: {
    total_value: number
    cash_balance: number
    profit_loss: number
    profit_loss_percentage: string
  }
  recent_trades: Trade[]
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    axios.get('/api/user/dashboard')
      .then(res => {
        setData(res.data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="dashboard"><p>Loading dashboard...</p></div>
  if (error) return <div className="dashboard"><p>Error: {error}</p></div>
  if (!data) return <div className="dashboard"><p>No data available</p></div>

  const { user, portfolio, recent_trades } = data

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="user-info">Welcome, {user.name}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Portfolio Value</h3>
          <p className="stat-value">${portfolio.total_value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        </div>
        
        <div className="stat-card">
          <h3>Cash Balance</h3>
          <p className="stat-value">${portfolio.cash_balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        </div>
        
        <div className={`stat-card ${portfolio.profit_loss >= 0 ? 'positive' : 'negative'}`}>
          <h3>Profit/Loss</h3>
          <p className="stat-value">${Math.abs(portfolio.profit_loss).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          <p className="stat-percent">{portfolio.profit_loss >= 0 ? '+' : '-'}{portfolio.profit_loss_percentage}%</p>
        </div>

        <div className="stat-card">
          <h3>Member Since</h3>
          <p className="stat-value">{new Date(user.member_since).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="recent-trades">
        <h2>Recent Trades</h2>
        <div className="trades-table">
          <div className="table-header">
            <div className="col">Symbol</div>
            <div className="col">Type</div>
            <div className="col">Amount</div>
            <div className="col">Price</div>
            <div className="col">Date</div>
            <div className="col">Status</div>
          </div>
          {recent_trades.map(trade => (
            <div key={trade.id} className="table-row">
              <div className="col">{trade.symbol}</div>
              <div className={`col type-${trade.type}`}>{trade.type.toUpperCase()}</div>
              <div className="col">{trade.amount}</div>
              <div className="col">${trade.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <div className="col">{new Date(trade.date).toLocaleDateString()}</div>
              <div className={`col status-${trade.status}`}>{trade.status}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="user-details">
        <h2>Account Details</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.id}</p>
      </div>
    </div>
  )
}
