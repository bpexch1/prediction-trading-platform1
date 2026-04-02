import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/Portfolio.css'

interface Holding {
  id: string
  symbol: string
  amount: number
  buyPrice: number
  currentPrice: number
  value: number
  gain: number
  gainPercent: number
}

interface PortfolioData {
  totalValue: number
  totalGain: number
  totalGainPercent: number
  cashBalance: number
  allocations: Holding[]
}

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/portfolio')
      .then(res => {
        setPortfolio(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching portfolio:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="portfolio-container"><p>Loading portfolio...</p></div>
  }

  if (!portfolio) {
    return <div className="portfolio-container"><p>No portfolio data available</p></div>
  }

  return (
    <div className="portfolio">
      <div className="portfolio-header">
        <h1>My Portfolio</h1>
        <p>Track your investments and performance</p>
      </div>

      <div className="portfolio-container">
        <div className="portfolio-summary">
          <div className="summary-card">
            <h3>Total Portfolio Value</h3>
            <p className="summary-value">${portfolio.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          </div>
          <div className={`summary-card ${portfolio.totalGain >= 0 ? 'positive' : 'negative'}`}>
            <h3>Total Gain/Loss</h3>
            <p className="summary-value">
              ${Math.abs(portfolio.totalGain).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <p className="summary-percent">
              {portfolio.totalGain >= 0 ? '+' : '-'}{portfolio.totalGainPercent.toFixed(2)}%
            </p>
          </div>
          <div className="summary-card">
            <h3>Cash Balance</h3>
            <p className="summary-value">${portfolio.cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>

        <div className="portfolio-allocation">
          <h2>Allocation Breakdown</h2>
          <div className="allocation-chart">
            {portfolio.allocations.map(holding => (
              <div key={holding.id} className="allocation-bar">
                <div className="allocation-bar-inner" style={{ width: `${(holding.value / portfolio.totalValue) * 100}%` }}>
                  <span className="allocation-percent">{((holding.value / portfolio.totalValue) * 100).toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="holdings-table">
          <h2>Holdings</h2>
          <div className="table-header">
            <div className="col col-symbol">Symbol</div>
            <div className="col col-amount">Amount</div>
            <div className="col col-buyPrice">Buy Price</div>
            <div className="col col-currentPrice">Current Price</div>
            <div className="col col-value">Value</div>
            <div className="col col-gain">Gain/Loss</div>
          </div>

          {portfolio.allocations.map(holding => (
            <div key={holding.id} className="table-row">
              <div className="col col-symbol">
                <span className="symbol">{holding.symbol}</span>
              </div>
              <div className="col col-amount">{holding.amount.toFixed(4)}</div>
              <div className="col col-buyPrice">${holding.buyPrice.toFixed(2)}</div>
              <div className="col col-currentPrice">${holding.currentPrice.toFixed(2)}</div>
              <div className="col col-value">${holding.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <div className={`col col-gain ${holding.gain >= 0 ? 'positive' : 'negative'}`}>
                <span>${Math.abs(holding.gain).toFixed(2)}</span>
                <span className="percent">({holding.gainPercent.toFixed(2)}%)</span>
              </div>
            </div>
          ))}
        </div>

        <div className="portfolio-actions">
          <button className="btn btn-primary">Buy Assets</button>
          <button className="btn btn-secondary">Sell Assets</button>
          <button className="btn btn-tertiary">Download Report</button>
        </div>
      </div>
    </div>
  )
}
