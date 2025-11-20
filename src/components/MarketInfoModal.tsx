import { MarketPhase } from '../types/game';
import { TrendingUp, TrendingDown } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface MarketInfoModalProps {
  open: boolean;
  onClose: () => void;
  phase: MarketPhase;
}

const marketDetails = {
  bull: {
    title: 'Bull Market',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    description: 'A bull market is characterized by rising prices, strong investor confidence, and economic expansion.',
    securities: [
      {
        name: 'Stocks',
        impact: '+10%',
        description: 'Strong growth. The primary beneficiaries of a bull market; prices rise significantly, driven by economic expansion, rising corporate profits, and high investor demand.',
      },
      {
        name: 'Crypto',
        impact: '+15%',
        description: 'Extremely high growth/volatile rallies. The crypto market is known for intense, speculative bull runs where assets can see massive price surges (e.g., 100%+ gains).',
      },
      {
        name: 'ETFs',
        impact: '+9%',
        description: 'Tracks underlying assets. Performance depends entirely on what the ETF holds. A broad market ETF (like an S&P 500 ETF) will perform well, mirroring stock market gains.',
      },
      {
        name: 'Bonds',
        impact: '+1%',
        description: 'Moderate/Stable growth. Bonds generally offer stability, but their returns may be lower than stocks as investor focus is on growth. Rising interest rates to combat inflation (common in strong economies) can put downward pressure on bond prices.',
      },
      {
        name: 'Mutual Funds',
        impact: '+8%',
        description: 'Varies by fund type. Like ETFs, performance depends on the fund\'s investment strategy (e.g., a growth fund will perform very well, while a conservative bond fund will see lower but stable returns).',
      },
      {
        name: 'Gold',
        impact: '+1%',
        description: 'Moderate/Inconsistent. Gold\'s performance in a bull market can vary. In some periods, it may see strong returns alongside other commodities due to economic demand; in others, it might lag stocks as investors chase growth.',
      },
    ],
  },
  bear: {
    title: 'Bear Market',
    icon: TrendingDown,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    description: 'A bear market is characterized by falling prices, declining investor confidence, and economic contraction.',
    securities: [
      {
        name: 'Stocks',
        impact: '-10%',
        description: 'Significant decline. Stocks, particularly cyclical ones, are hit hard, often dropping 20% or more. Defensive stocks (e.g., utilities, consumer staples) tend to perform relatively better than the broader market.',
      },
      {
        name: 'Crypto',
        impact: '-15%',
        description: 'Severe decline/crash. Crypto is highly volatile and risk-averse investors flee the space in a downturn. Prices can drop by 70-90% during a bear market.',
      },
      {
        name: 'ETFs',
        impact: '-9%',
        description: 'Tracks underlying assets. Performance depends on holdings. Broad stock ETFs perform poorly, while specialized "inverse" ETFs (designed to profit from falling markets) or certain defensive ETFs (e.g., some bond or alternative strategy ETFs) may perform well.',
      },
      {
        name: 'Bonds',
        impact: '+3%',
        description: '"Safe haven" asset; stable or positive returns. As investors seek safety and central banks may lower interest rates to stimulate the economy, government bonds (especially Treasuries) are highly sought after, helping preserve capital.',
      },
      {
        name: 'Mutual Funds',
        impact: '-8%',
        description: 'Varies by fund type. Diversified or fixed-income funds tend to weather the storm better than pure equity funds, providing a buffer against losses.',
      },
      {
        name: 'Gold',
        impact: '+10%',
        description: '"Safe haven" asset; strong performance. Gold often performs well during economic uncertainty and bear markets as a store of value, attracting investors fleeing the stock market and hedging against potential currency devaluation or inflation.',
      },
    ],
  },
};

export function MarketInfoModal({ open, onClose, phase }: MarketInfoModalProps) {
  const details = marketDetails[phase];
  const Icon = details.icon;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className={`w-6 h-6 ${details.color}`} />
            {details.title}
          </DialogTitle>
          <DialogDescription>
            {details.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {details.securities.map((security) => (
            <div 
              key={security.name} 
              className={`p-4 rounded-lg border-2 ${details.bgColor} border-gray-200`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-slate-800">{security.name}</h4>
                <span 
                  className={`px-2 py-1 rounded text-sm ${
                    security.impact.startsWith('+') 
                      ? 'bg-green-100 text-green-700' 
                      : security.impact.startsWith('-')
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {security.impact}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {security.description}
              </p>
            </div>
          ))}
        </div>

        <div className={`mt-4 p-4 rounded-lg ${details.bgColor} border-2 border-gray-300`}>
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> These price changes are applied at the end of each turn. 
            Strategic timing of buying and selling assets based on market conditions is key to success!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}