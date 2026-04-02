import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock user data
const mockUser = {
  id: '1',
  name: 'John Trader',
  email: 'john@trading.com',
  balance: 10000,
  portfolio_value: 15234.50,
  profit_loss: 5234.50,
  member_since: '2024-01-15'
};

const mockTrades = [
  { id: '1', symbol: 'BTC', type: 'buy', amount: 0.5, price: 45000, date: '2024-03-28', status: 'completed' },
  { id: '2', symbol: 'ETH', type: 'sell', amount: 2, price: 2500, date: '2024-03-27', status: 'completed' },
  { id: '3', symbol: 'DOGE', type: 'buy', amount: 1000, price: 0.12, date: '2024-03-26', status: 'pending' }
];

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/user', (req, res) => {
  res.json(mockUser);
});

app.get('/api/user/dashboard', (req, res) => {
  res.json({
    user: mockUser,
    portfolio: {
      total_value: mockUser.portfolio_value,
      cash_balance: mockUser.balance,
      profit_loss: mockUser.profit_loss,
      profit_loss_percentage: ((mockUser.profit_loss / mockUser.balance) * 100).toFixed(2)
    },
    recent_trades: mockTrades.slice(0, 3)
  });
});

app.get('/api/trades', (req, res) => {
  res.json(mockTrades);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
