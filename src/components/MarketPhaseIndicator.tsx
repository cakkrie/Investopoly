import { MarketPhase } from '../types/game';
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface MarketPhaseIndicatorProps {
  phase: MarketPhase;
  round: number;
}

const phaseConfig = {
  bull: {
    label: 'Bull Market',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-500',
    description: 'High growth & confidence. Stocks +15% revenue',
    effects: ['Stocks +15%', 'Crypto +25%', 'ETFs +12%'],
  },
  bear: {
    label: 'Bear Market',
    icon: TrendingDown,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-500',
    description: 'Declining growth. Stocks -15% revenue',
    effects: ['Stocks -15%', 'Crypto -20%', 'Bonds +5%'],
  },
  stagnation: {
    label: 'Stagnation',
    icon: Minus,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-500',
    description: 'Flat market. Minimal changes',
    effects: ['All assets ±3%', 'Dividends normal', 'Low volatility'],
  },
  recession: {
    label: 'Recession',
    icon: AlertTriangle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-500',
    description: 'Economic downturn. Flight to safety',
    effects: ['Stocks -25%', 'Bonds +10%', 'Crypto -30%'],
  },
};

export function MarketPhaseIndicator({ phase, round }: MarketPhaseIndicatorProps) {
  const config = phaseConfig[phase];
  const Icon = config.icon;

  return (
    <Card className={`${config.bgColor} border-l-4 ${config.borderColor} p-4`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-6 h-6 ${config.color} mt-0.5`} />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`${config.color}`}>
              {config.label}
            </h3>
            <Badge variant="outline">Round {round}</Badge>
          </div>
          <p className="text-sm text-gray-700 mb-3">{config.description}</p>
          <div className="space-y-1">
            {config.effects.map((effect, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                <span className="text-xs text-gray-600">{effect}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
