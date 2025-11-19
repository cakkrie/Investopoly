import { BoardSpace } from '../types/game';

export const boardSpaces: BoardSpace[] = [
  // Bottom row (left to right) - 9 cards
  { id: 0, type: 'corner', name: 'START', position: 0 },
  { id: 1, type: 'asset', name: 'US Treasury Bond', position: 1, asset: { id: 'a1', name: 'US Treasury Bond', type: 'bond', basePrice: 100, currentPrice: 100, owner: null, dividend: 5, riskLevel: 'low', description: 'Safe government-backed bond' } },
  { id: 2, type: 'chance', name: 'Market Event', position: 2 },
  { id: 3, type: 'asset', name: 'Corporate Bond', position: 3, asset: { id: 'a2', name: 'Corporate Bond', type: 'bond', basePrice: 150, currentPrice: 150, owner: null, dividend: 8, riskLevel: 'low', description: 'Corporate debt security' } },
  { id: 4, type: 'asset', name: 'S&P 500 ETF', position: 4, asset: { id: 'a3', name: 'S&P 500 ETF', type: 'etf', basePrice: 200, currentPrice: 200, owner: null, dividend: 12, riskLevel: 'medium', description: 'Diversified market index' } },
  { id: 5, type: 'tax', name: 'Capital Gains Tax', position: 5 },
  { id: 6, type: 'asset', name: 'Tech Stock', position: 6, asset: { id: 'a4', name: 'Tech Stock', type: 'stock', basePrice: 250, currentPrice: 250, owner: null, dividend: 15, riskLevel: 'high', description: 'High-growth technology company' } },
  { id: 7, type: 'asset', name: 'Blue Chip Stock', position: 7, asset: { id: 'a5', name: 'Blue Chip Stock', type: 'stock', basePrice: 300, currentPrice: 300, owner: null, dividend: 20, riskLevel: 'medium', description: 'Established company stock' } },
  { id: 8, type: 'asset', name: 'Dividend Stock', position: 8, asset: { id: 'a6', name: 'Dividend Stock', type: 'stock', basePrice: 280, currentPrice: 280, owner: null, dividend: 25, riskLevel: 'medium', description: 'Regular dividend payer' } },
  
  // Right side (bottom to top) - 9 cards
  { id: 9, type: 'corner', name: 'MARKET WATCH', position: 9 },
  { id: 10, type: 'asset', name: 'Bitcoin', position: 10, asset: { id: 'a7', name: 'Bitcoin', type: 'crypto', basePrice: 400, currentPrice: 400, owner: null, dividend: 30, riskLevel: 'high', description: 'Leading cryptocurrency' } },
  { id: 11, type: 'asset', name: 'Real Estate ETF', position: 11, asset: { id: 'a8', name: 'Real Estate ETF', type: 'etf', basePrice: 220, currentPrice: 220, owner: null, dividend: 18, riskLevel: 'medium', description: 'Property investment fund' } },
  { id: 12, type: 'chance', name: 'Market Event', position: 12 },
  { id: 13, type: 'asset', name: 'Ethereum', position: 13, asset: { id: 'a9', name: 'Ethereum', type: 'crypto', basePrice: 350, currentPrice: 350, owner: null, dividend: 28, riskLevel: 'high', description: 'Smart contract platform' } },
  { id: 14, type: 'asset', name: 'Growth Mutual Fund', position: 14, asset: { id: 'a10', name: 'Growth Mutual Fund', type: 'mutual-fund', basePrice: 180, currentPrice: 180, owner: null, dividend: 14, riskLevel: 'medium', description: 'Actively managed fund' } },
  { id: 15, type: 'tax', name: 'Transaction Fee', position: 15 },
  { id: 16, type: 'asset', name: 'Energy Stock', position: 16, asset: { id: 'a11', name: 'Energy Stock', type: 'stock', basePrice: 260, currentPrice: 260, owner: null, dividend: 22, riskLevel: 'medium', description: 'Energy sector company' } },
  { id: 17, type: 'asset', name: 'Altcoin Portfolio', position: 17, asset: { id: 'a12', name: 'Altcoin Portfolio', type: 'crypto', basePrice: 300, currentPrice: 300, owner: null, dividend: 35, riskLevel: 'high', description: 'High-risk crypto basket' } },
  
  // Top row (right to left) - 9 cards
  { id: 18, type: 'corner', name: 'DIVIDEND DAY', position: 18 },
  { id: 19, type: 'asset', name: 'Healthcare Stock', position: 19, asset: { id: 'a13', name: 'Healthcare Stock', type: 'stock', basePrice: 290, currentPrice: 290, owner: null, dividend: 19, riskLevel: 'medium', description: 'Healthcare sector stock' } },
  { id: 20, type: 'chance', name: 'Market Event', position: 20 },
  { id: 21, type: 'asset', name: 'International ETF', position: 21, asset: { id: 'a14', name: 'International ETF', type: 'etf', basePrice: 210, currentPrice: 210, owner: null, dividend: 16, riskLevel: 'medium', description: 'Global diversification' } },
  { id: 22, type: 'asset', name: 'Municipal Bond', position: 22, asset: { id: 'a15', name: 'Municipal Bond', type: 'bond', basePrice: 120, currentPrice: 120, owner: null, dividend: 6, riskLevel: 'low', description: 'Tax-advantaged bond' } },
  { id: 23, type: 'tax', name: 'Income Tax', position: 23 },
  { id: 24, type: 'asset', name: 'Value Stock', position: 24, asset: { id: 'a16', name: 'Value Stock', type: 'stock', basePrice: 240, currentPrice: 240, owner: null, dividend: 17, riskLevel: 'medium', description: 'Undervalued opportunity' } },
  { id: 25, type: 'asset', name: 'Small Cap Stock', position: 25, asset: { id: 'a17', name: 'Small Cap Stock', type: 'stock', basePrice: 200, currentPrice: 200, owner: null, dividend: 21, riskLevel: 'high', description: 'High growth potential' } },
  { id: 26, type: 'asset', name: 'Balanced Fund', position: 26, asset: { id: 'a18', name: 'Balanced Fund', type: 'mutual-fund', basePrice: 190, currentPrice: 190, owner: null, dividend: 13, riskLevel: 'low', description: 'Conservative portfolio' } },
  
  // Left side (top to bottom) - 9 cards
  { id: 27, type: 'corner', name: 'RECESSION', position: 27 },
  { id: 28, type: 'asset', name: 'Gold ETF', position: 28, asset: { id: 'a19', name: 'Gold ETF', type: 'etf', basePrice: 230, currentPrice: 230, owner: null, dividend: 10, riskLevel: 'low', description: 'Safe haven asset' } },
  { id: 29, type: 'asset', name: 'Consumer Stock', position: 29, asset: { id: 'a20', name: 'Consumer Stock', type: 'stock', basePrice: 270, currentPrice: 270, owner: null, dividend: 18, riskLevel: 'medium', description: 'Consumer goods company' } },
  { id: 30, type: 'chance', name: 'Market Event', position: 30 },
  { id: 31, type: 'asset', name: 'DeFi Token', position: 31, asset: { id: 'a21', name: 'DeFi Token', type: 'crypto', basePrice: 320, currentPrice: 320, owner: null, dividend: 40, riskLevel: 'high', description: 'Decentralized finance' } },
  { id: 32, type: 'asset', name: 'Index Mutual Fund', position: 32, asset: { id: 'a22', name: 'Index Mutual Fund', type: 'mutual-fund', basePrice: 170, currentPrice: 170, owner: null, dividend: 11, riskLevel: 'low', description: 'Low-fee index tracker' } },
  { id: 33, type: 'tax', name: 'Wealth Tax', position: 33 },
  { id: 34, type: 'asset', name: 'Emerging Market ETF', position: 34, asset: { id: 'a23', name: 'Emerging Market ETF', type: 'etf', basePrice: 195, currentPrice: 195, owner: null, dividend: 20, riskLevel: 'high', description: 'High-growth markets' } },
  { id: 35, type: 'asset', name: 'Inflation-Protected Bond', position: 35, asset: { id: 'a24', name: 'Inflation-Protected Bond', type: 'bond', basePrice: 130, currentPrice: 130, owner: null, dividend: 7, riskLevel: 'low', description: 'TIPS bond' } },
];