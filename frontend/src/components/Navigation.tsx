import { Link } from 'react-router-dom'
import '../styles/Navigation.css'

export default function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/">📈 TradePro</Link>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/markets" className="nav-link">Markets</Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/portfolio" className="nav-link">Portfolio</Link>
          </li>
        </ul>
        <div className="nav-user">
          <span className="user-balance">Balance: $10,000</span>
        </div>
      </div>
    </nav>
  )
}
