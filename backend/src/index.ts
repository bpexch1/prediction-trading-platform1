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
  { id: '3', symbol: 'DOGE', type: 'buy', amount: 1000, price: 0.12, date: '2024-03-26', status: 'pending' },
  { id: '4', symbol: 'BTC', type: 'buy', amount: 0.2, price: 42000, date: '2024-03-25', status: 'completed' },
  { id: '5', symbol: 'ETH', type: 'buy', amount: 5, price: 2300, date: '2024-03-24', status: 'completed' }
];

const mockMarkets = [
  { id: '1', symbol: 'BTC', name: 'Bitcoin', price: 42500.00, change: 1250.50, changePercent: 3.04, volume: 28500000000, marketCap: '$830B' },
  { id: '2', symbol: 'ETH', name: 'Ethereum', price: 2350.00, change: 85.50, changePercent: 3.77, volume: 15200000000, marketCap: '$282B' },
  { id: '3', symbol: 'BNB', name: 'Binance Coin', price: 610.50, change: -15.20, changePercent: -2.43, volume: 1850000000, marketCap: '$92.7B' },
  { id: '4', symbol: 'SOL', name: 'Solana', price: 180.75, change: 5.25, changePercent: 2.98, volume: 2450000000, marketCap: '$79.2B' },
  { id: '5', symbol: 'XRP', name: 'Ripple', price: 2.45, change: 0.08, changePercent: 3.37, volume: 3200000000, marketCap: '$130B' },
  { id: '6', symbol: 'DOGE', name: 'Dogecoin', price: 0.325, change: 0.015, changePercent: 4.82, volume: 850000000, marketCap: '$46.8B' },
  { id: '7', symbol: 'ADA', name: 'Cardano', price: 1.05, change: -0.05, changePercent: -4.55, volume: 680000000, marketCap: '$37.3B' },
  { id: '8', symbol: 'AVAX', name: 'Avalanche', price: 38.50, change: 2.10, changePercent: 5.77, volume: 520000000, marketCap: '$13.8B' }
];

const mockPortfolio = {
  totalValue: 25450.75,
  totalGain: 7450.75,
  totalGainPercent: 41.28,
  cashBalance: 3500,
  allocations: [
    {
      id: '1',
      symbol: 'BTC',
      amount: 0.7,
      buyPrice: 35000,
      currentPrice: 42500,
      value: 29750,
      gain: 5250,
      gainPercent: 21.43
    },
    {
      id: '2',
      symbol: 'ETH',
      amount: 7,
      buyPrice: 2200,
      currentPrice: 2350,
      value: 16450,
      gain: 1050,
      gainPercent: 6.81
    },
    {
      id: '3',
      symbol: 'DOGE',
      amount: 1000,
      buyPrice: 0.10,
      currentPrice: 0.325,
      value: 325,
      gain: 225,
      gainPercent: 225
    }
  ]
};

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

app.get('/api/markets', (req, res) => {
  res.json(mockMarkets);
});

app.get('/api/portfolio', (req, res) => {
  res.json(mockPortfolio);
});

app.post('/api/trades', (req, res) => {
  const { symbol, type, amount, price } = req.body;
  
  if (!symbol || !type || !amount || !price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newTrade = {
    id: String(mockTrades.length + 1),
    symbol,
    type,
    amount: parseFloat(amount),
    price: parseFloat(price),
    date: new Date().toISOString().split('T')[0],
    status: 'pending'
  };

  mockTrades.unshift(newTrade);
  res.status(201).json(newTrade);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
