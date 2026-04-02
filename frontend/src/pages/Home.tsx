import { Link } from 'react-router-dom'
import '../styles/Home.css'

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to TradePro</h1>
          <p>The ultimate prediction trading platform for smart investors</p>
          <div className="hero-stats">
            <div className="stat">
              <h3>$2.5B+</h3>
              <p>Total Trading Volume</p>
            </div>
            <div className="stat">
              <h3>50K+</h3>
              <p>Active Traders</p>
            </div>
            <div className="stat">
              <h3>99.9%</h3>
              <p>Uptime</p>
            </div>
          </div>
          <div className="hero-buttons">
            <Link to="/markets" className="btn btn-primary">Start Trading</Link>
            <Link to="/dashboard" className="btn btn-secondary">View Dashboard</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose TradePro?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Execute trades in milliseconds with our optimized platform</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure</h3>
            <p>Bank-level security with encrypted transactions</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Advanced Analytics</h3>
            <p>Real-time charts and technical analysis tools</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3>Smart Insights</h3>
            <p>AI-powered recommendations and market predictions</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>Global Markets</h3>
            <p>Trade 24/7 across major global markets</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile Friendly</h3>
            <p>Trade on the go with our responsive platform</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to Start Your Trading Journey?</h2>
        <p>Join thousands of successful traders on TradePro</p>
        <Link to="/markets" className="btn btn-large">Open Markets</Link>
      </section>
    </div>
  )
}
