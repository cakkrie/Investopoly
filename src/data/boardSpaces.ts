import { BoardSpace } from '../types/game';

export const boardSpaces: BoardSpace[] = [
  // Bottom row (left to right) - 7 spaces
  { 
    id: 0, 
    type: 'corner', 
    name: 'START', 
    position: 0 
  },
  { 
    id: 1, 
    type: 'asset', 
    name: 'US Treasury Bond', 
    position: 1, 
    asset: { 
      id: 'a1', 
      name: 'US Treasury Bond', 
      type: 'bond', 
      basePrice: 100, 
      currentPrice: 100, 
      owner: null, 
      dividend: 5, 
      riskLevel: 'low', 
      description: 'Safe government-backed bond' 
    } 
  },
  { 
    id: 2, 
    type: 'chance', 
    name: 'Market Event', 
    position: 2 
  },
  { 
    id: 3, 
    type: 'asset', 
    name: 'Corporate Bond', 
    position: 3, 
    asset: { 
      id: 'a2', 
      name: 'Corporate Bond', 
      type: 'bond', 
      basePrice: 150, 
      currentPrice: 150, 
      owner: null, 
      dividend: 8, 
      riskLevel: 'low', 
      description: 'Corporate debt security' 
    } 
  },
  { 
    id: 4, 
    type: 'asset', 
    name: 'S&P 500 ETF', 
    position: 4, 
    asset: { 
      id: 'a3', 
      name: 'S&P 500 ETF', 
      type: 'etf', 
      basePrice: 200, 
      currentPrice: 200, 
      owner: null, 
      dividend: 12, 
      riskLevel: 'medium', 
      description: 'Diversified market index' 
    } 
  },
  { 
    id: 5, 
    type: 'asset', 
    name: 'Tech Stock', 
    position: 5, 
    asset: { 
      id: 'a4', 
      name: 'Tech Stock', 
      type: 'stock', 
      basePrice: 250, 
      currentPrice: 250, 
      owner: null, 
      dividend: 0, 
      riskLevel: 'high', 
      description: 'High-growth tech company well-known for reinvesting profits instead of paying dividends' 
    } 
  },
  { 
    id: 6, 
    type: 'asset', 
    name: 'Dividend Stock', 
    position: 6, 
    asset: { 
      id: 'a6', 
      name: 'Dividend Stock', 
      type: 'stock', 
      basePrice: 280, 
      currentPrice: 280, 
      owner: null, 
      dividend: 25, 
      riskLevel: 'medium', 
      description: 'Regular dividend payer' 
    } 
  },
  
  // Right side (bottom to top) - 7 spaces
  { 
    id: 7, 
    type: 'corner', 
    name: 'MARKET EVENT', 
    position: 7 
  },
  { 
    id: 8, 
    type: 'asset', 
    name: 'Bitcoin', 
    position: 8, 
    asset: { 
      id: 'a7', 
      name: 'Bitcoin', 
      type: 'crypto', 
      basePrice: 400, 
      currentPrice: 400, 
      owner: null, 
      dividend: 0, 
      riskLevel: 'high', 
      description: 'Leading cryptocurrency' 
    } 
  },
  { 
    id: 9, 
    type: 'asset', 
    name: 'Real Estate ETF', 
    position: 9, 
    asset: { 
      id: 'a8', 
      name: 'Real Estate ETF', 
      type: 'etf', 
      basePrice: 220, 
      currentPrice: 220, 
      owner: null, 
      dividend: 18, 
      riskLevel: 'medium', 
      description: 'Property investment fund' 
    } 
  },
  { 
    id: 10, 
    type: 'chance', 
    name: 'Market Event', 
    position: 10 
  },
  { 
    id: 11, 
    type: 'asset', 
    name: 'Ethereum', 
    position: 11, 
    asset: { 
      id: 'a9', 
      name: 'Ethereum', 
      type: 'crypto', 
      basePrice: 350, 
      currentPrice: 350, 
      owner: null, 
      dividend: 0, 
      riskLevel: 'high', 
      description: 'Smart contract platform' 
    } 
  },
  { 
    id: 12, 
    type: 'asset', 
    name: 'Growth Mutual Fund', 
    position: 12, 
    asset: { 
      id: 'a10', 
      name: 'Growth Mutual Fund', 
      type: 'mutual-fund', 
      basePrice: 180, 
      currentPrice: 180, 
      owner: null, 
      dividend: 14, 
      riskLevel: 'medium', 
      description: 'Actively managed fund' 
    } 
  },
  { 
    id: 13, 
    type: 'asset', 
    name: 'Energy Stock', 
    position: 13, 
    asset: { 
      id: 'a11', 
      name: 'Energy Stock', 
      type: 'stock', 
      basePrice: 260, 
      currentPrice: 260, 
      owner: null, 
      dividend: 22, 
      riskLevel: 'medium', 
      description: 'Energy sector company' 
    } 
  },
  
  // Top row (right to left) - 7 spaces
  { 
    id: 14, 
    type: 'corner', 
    name: 'DIVIDEND DAY', 
    position: 14 
  },
  { 
    id: 15, 
    type: 'asset', 
    name: 'Healthcare Stock', 
    position: 15, 
    asset: { 
      id: 'a13', 
      name: 'Healthcare Stock', 
      type: 'stock', 
      basePrice: 290, 
      currentPrice: 290, 
      owner: null, 
      dividend: 19, 
      riskLevel: 'medium', 
      description: 'Healthcare sector stock' 
    } 
  },
  { 
    id: 16, 
    type: 'chance', 
    name: 'Market Event', 
    position: 16 
  },
  { 
    id: 17, 
    type: 'asset', 
    name: 'Inverse ETF', 
    position: 17, 
    asset: { 
      id: 'a14', 
      name: 'Inverse ETF', 
      type: 'etf', 
      basePrice: 210, 
      currentPrice: 210, 
      owner: null, 
      dividend: 16, 
      riskLevel: 'high', 
      description: 'Profits when market falls', 
      isInverse: true 
    } 
  },
  { 
    id: 18, 
    type: 'asset', 
    name: 'Municipal Bond', 
    position: 18, 
    asset: { 
      id: 'a15', 
      name: 'Municipal Bond', 
      type: 'bond', 
      basePrice: 120, 
      currentPrice: 120, 
      owner: null, 
      dividend: 6, 
      riskLevel: 'low', 
      description: 'Tax-advantaged bond' 
    } 
  },
  { 
    id: 19, 
    type: 'asset', 
    name: 'Small Cap Stock', 
    position: 19, 
    asset: { 
      id: 'a17', 
      name: 'Small Cap Stock', 
      type: 'stock', 
      basePrice: 200, 
      currentPrice: 200, 
      owner: null, 
      dividend: 21, 
      riskLevel: 'high', 
      description: 'High growth potential' 
    } 
  },
  { 
    id: 20, 
    type: 'asset', 
    name: 'Balanced Fund', 
    position: 20, 
    asset: { 
      id: 'a18', 
      name: 'Balanced Fund', 
      type: 'mutual-fund', 
      basePrice: 190, 
      currentPrice: 190, 
      owner: null, 
      dividend: 13, 
      riskLevel: 'low', 
      description: 'Conservative portfolio' 
    } 
  },
  
  // Left side (top to bottom) - 7 spaces
  { 
    id: 21, 
    type: 'corner', 
    name: 'MARKET EVENT', 
    position: 21 
  },
  { 
    id: 22, 
    type: 'asset', 
    name: 'Gold', 
    position: 22, 
    asset: { 
      id: 'a21', 
      name: 'Gold', 
      type: 'commodity', 
      basePrice: 150, 
      currentPrice: 150, 
      owner: null, 
      dividend: 0, 
      riskLevel: 'low', 
      description: 'Precious metal safe haven' 
    } 
  },
  { 
    id: 23, 
    type: 'asset', 
    name: 'Index Mutual Fund', 
    position: 23, 
    asset: { 
      id: 'a22', 
      name: 'Index Mutual Fund', 
      type: 'mutual-fund', 
      basePrice: 170, 
      currentPrice: 170, 
      owner: null, 
      dividend: 11, 
      riskLevel: 'low', 
      description: 'Low-fee index tracker' 
    } 
  },
  { 
    id: 24, 
    type: 'chance', 
    name: 'Market Event', 
    position: 24 
  },
  { 
    id: 25, 
    type: 'asset', 
    name: 'Tech Stock', 
    position: 25, 
    asset: { 
      id: 'a24', 
      name: 'Tech Stock', 
      type: 'stock', 
      basePrice: 250, 
      currentPrice: 250, 
      owner: null, 
      dividend: 0, 
      riskLevel: 'high', 
      description: 'High-growth tech company well-known for reinvesting profits instead of paying dividends' 
    } 
  },
  { 
    id: 26, 
    type: 'asset', 
    name: 'Healthcare Stock', 
    position: 26, 
    asset: { 
      id: 'a25', 
      name: 'Healthcare Stock', 
      type: 'stock', 
      basePrice: 290, 
      currentPrice: 290, 
      owner: null, 
      dividend: 19, 
      riskLevel: 'medium', 
      description: 'Healthcare sector stock' 
    } 
  },
  { 
    id: 27, 
    type: 'asset', 
    name: 'Consumer Stock', 
    position: 27, 
    asset: { 
      id: 'a20', 
      name: 'Consumer Stock', 
      type: 'stock', 
      basePrice: 270, 
      currentPrice: 270, 
      owner: null, 
      dividend: 18, 
      riskLevel: 'medium', 
      description: 'Consumer goods company' 
    } 
  },
];