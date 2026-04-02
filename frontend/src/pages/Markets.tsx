import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/Markets.css'

interface Market {
  id: string
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: string
  image?: string
}

export default function Markets() {
  const [markets, setMarkets] = useState<Market[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get('/api/markets')
      .then(res => {
        setMarkets(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching markets:', err)
        setLoading(false)
      })
  }, [])

  const filteredMarkets = markets.filter(market =>
    market.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    market.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <div className="markets-container"><p>Loading markets...</p></div>
  }

  return (
    <div className="markets">
      <div className="markets-header">
        <h1>Markets</h1>
        <p>Real-time cryptocurrency and asset prices</p>
      </div>

      <div className="markets-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by symbol or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="markets-table">
          <div className="table-header">
            <div className="col col-symbol">Symbol</div>
            <div className="col col-name">Name</div>
            <div className="col col-price">Price</div>
            <div className="col col-change">24h Change</div>
            <div className="col col-volume">Volume</div>
            <div className="col col-action">Action</div>
          </div>

          {filteredMarkets.length > 0 ? (
            filteredMarkets.map(market => (
              <div key={market.id} className="market-row">
                <div className="col col-symbol">
                  <span className="symbol">{market.symbol}</span>
                </div>
                <div className="col col-name">{market.name}</div>
                <div className="col col-price">
                  ${market.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
                </div>
                <div className={`col col-change ${market.change >= 0 ? 'positive' : 'negative'}`}>
                  <span>{market.change >= 0 ? '+' : ''}{market.change.toFixed(2)}</span>
                  <span className="percent">({market.changePercent.toFixed(2)}%)</span>
                </div>
                <div className="col col-volume">
                  {(market.volume / 1000000).toFixed(2)}M
                </div>
                <div className="col col-action">
                  <button className="btn-trade buy">Buy</button>
                  <button className="btn-trade sell">Sell</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No markets found</div>
          )}
        </div>
      </div>
    </div>
  )
}
