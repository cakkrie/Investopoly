import { MarketPhase } from '../types/game';
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface MarketPhaseIndicatorProps {
  phase: MarketPhase;
  round: number;
  onClick?: () => void;
}

const phaseConfig = {
  bull: {
    label: 'Bull Market',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-500',
    description: 'Strong growth driven by earnings and optimism',
    effects: ['Stocks +10%', 'Crypto +15%', 'ETFs +9%', 'Bonds +1%', 'Mutual Funds +8%', 'Gold +1%'],
  },
  bear: {
    label: 'Bear Market',
    icon: TrendingDown,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-500',
    description: 'Declining growth. Earnings weaken, sentiment collapses',
    effects: ['Stocks -10%', 'Crypto -15%', 'ETFs -9%', 'Bonds +3%', 'Mutual Funds -8%', 'Gold +10%'],
  },
};

export function MarketPhaseIndicator({ phase, round, onClick }: MarketPhaseIndicatorProps) {
  const config = phaseConfig[phase];
  const Icon = config.icon;

  return (
    <div 
      className={`${config.bgColor} p-4 cursor-pointer hover:shadow-lg transition-all rounded-lg border border-gray-200 active:scale-[0.98]`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
    >
      <div className="flex items-start gap-3 pointer-events-none">
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
          <p className="text-xs text-gray-500 mt-3 italic">Click anywhere for detailed information</p>
        </div>
      </div>
    </div>
  );
}