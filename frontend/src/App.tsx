import { useState, useEffect } from 'react'
import axios from 'axios'
import Dashboard from './Dashboard'
import './App.css'

function App() {
  const [backendConnected, setBackendConnected] = useState<boolean>(false)

  useEffect(() => {
    axios.get('/api/health')
      .then(() => setBackendConnected(true))
      .catch(() => setBackendConnected(false))
  }, [])

  return (
    <div className="app">
      {!backendConnected && (
        <div className="banner error">
          ⚠️ Backend connection failed. Some features may not work.
        </div>
      )}
      {backendConnected && (
        <div className="banner success">
          ✓ Backend connected successfully
        </div>
      )}
      <Dashboard />
    </div>
  )
}

export default App
