import { MarketPhase, Asset } from '../types/game';

interface PriceChange {
  assetType: string;
  changePercent: number;
}

// Define market phase rules
const marketPhaseRules: Record<MarketPhase, PriceChange[]> = {
  bull: [
    { assetType: 'stock', changePercent: 10 },
    { assetType: 'crypto', changePercent: 15 },
    { assetType: 'etf', changePercent: 9 },
    { assetType: 'bond', changePercent: 1 },
    { assetType: 'mutual-fund', changePercent: 8 },
    { assetType: 'commodity', changePercent: 1 }, // Gold
  ],
  bear: [
    { assetType: 'stock', changePercent: -10 },
    { assetType: 'crypto', changePercent: -15 },
    { assetType: 'etf', changePercent: -9 },
    { assetType: 'bond', changePercent: 3 },
    { assetType: 'mutual-fund', changePercent: -8 },
    { assetType: 'commodity', changePercent: 10 }, // Gold
  ],
};

export function applyMarketPriceChanges(
  asset: Asset,
  marketPhase: MarketPhase
): Asset {
  const rules = marketPhaseRules[marketPhase];
  const rule = rules.find(r => r.assetType === asset.type);
  
  if (!rule) {
    return asset;
  }

  // For inverse ETFs, reverse the price change direction
  let changePercent = rule.changePercent;
  if (asset.isInverse && asset.type === 'etf') {
    changePercent = -changePercent; // Reverse the direction
  }

  // Calculate new price
  const priceChange = asset.currentPrice * (changePercent / 100);
  const newPrice = Math.max(10, Math.round(asset.currentPrice + priceChange)); // Minimum price of $10

  return {
    ...asset,
    currentPrice: newPrice,
  };
}

export function getMarketPriceChangeSummary(marketPhase: MarketPhase): string[] {
  const rules = marketPhaseRules[marketPhase];
  const summary: string[] = [];

  rules.forEach(rule => {
    const sign = rule.changePercent >= 0 ? '+' : '';
    const assetTypeName = rule.assetType.charAt(0).toUpperCase() + rule.assetType.slice(1).replace('-', ' ');
    summary.push(`${assetTypeName}: ${sign}${Math.round(rule.changePercent)}%`);
  });

  return summary;
}