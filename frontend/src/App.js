import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
function App() {
    const [status, setStatus] = useState('Loading...');
    useEffect(() => {
        axios.get('/api/health')
            .then(res => setStatus(`Backend connected: ${res.data.status}`))
            .catch(err => setStatus(`Error: ${err.message}`));
    }, []);
    return (_jsxs("div", { className: "container", children: [_jsx("h1", { children: "Prediction Trading Platform" }), _jsxs("p", { children: ["Status: ", status] })] }));
}
export default App;
