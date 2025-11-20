export type AssetType = 'bond' | 'etf' | 'stock' | 'crypto' | 'mutual-fund' | 'commodity';
export type MarketPhase = 'bull' | 'bear';
export type SpaceType = 'asset' | 'event' | 'chance' | 'corner' | 'tax';

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  basePrice: number;
  currentPrice: number;
  owner: number | null;
  dividend: number;
  riskLevel: 'low' | 'medium' | 'high';
  description: string;
  purchaseId?: string; // Unique ID for each purchase instance
  isInverse?: boolean; // Flag for inverse ETFs that move opposite to market
}

export interface BoardSpace {
  id: number;
  type: SpaceType;
  name: string;
  asset?: Asset;
  position: number;
}

export interface Player {
  id: number;
  name: string;
  color: string;
  icon: string;
  cash: number;
  position: number;
  assets: Asset[];
  netWorth: number;
  goal: string;
}

export interface GameState {
  currentPlayer: number;
  marketPhase: MarketPhase;
  round: number;
  players: Player[];
  dice: number;
}