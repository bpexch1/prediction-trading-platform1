import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [status, setStatus] = useState<string>('Loading...')

  useEffect(() => {
    axios.get('/api/health')
      .then(res => setStatus(`Backend connected: ${res.data.status}`))
      .catch(err => setStatus(`Error: ${err.message}`))
  }, [])

  return (
    <div className="container">
      <h1>Prediction Trading Platform</h1>
      <p>Status: {status}</p>
    </div>
  )
}

export default App
