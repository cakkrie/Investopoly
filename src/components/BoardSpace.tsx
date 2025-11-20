import { BoardSpace as BoardSpaceType } from '../types/game';
import { Building2, TrendingUp, Zap, DollarSign, AlertCircle, Dog, Cat, Bird, Fish } from 'lucide-react';
import { cn } from './ui/utils';

interface BoardSpaceProps {
  space: BoardSpaceType;
  players: Array<{ id: number; position: number; color: string; icon: string }>;
  onSpaceClick: (space: BoardSpaceType) => void;
}

const assetTypeColors = {
  bond: 'bg-blue-50 border-[#03a9f4]',
  etf: 'bg-red-50 border-[#c62828]',
  stock: 'bg-green-50 border-[#1a7f5c]',
  crypto: 'bg-orange-50 border-[#ff9800]',
  'mutual-fund': 'bg-cyan-50 border-[#00bcd4]',
  commodity: 'bg-amber-50 border-[#ffb700]',
};

const riskTextColors = {
  low: 'text-white bg-[#1a7f5c]',
  medium: 'text-white bg-[#ffc107]',
  high: 'text-white bg-[#ff5722]',
};

export function BoardSpace({ space, players, onSpaceClick }: BoardSpaceProps) {
  const playersOnSpace = players.filter(p => p.position === space.position);
  
  const getSpaceContent = () => {
    if (space.type === 'corner') {
      return (
        <div className="h-full flex flex-col items-center justify-center p-2 bg-[#1a7f5c] text-white">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider">{space.name}</p>
          </div>
        </div>
      );
    }
    
    if (space.type === 'asset' && space.asset) {
      const colorClass = assetTypeColors[space.asset.type];
      const returnRate = ((space.asset.dividend / space.asset.currentPrice) * 100).toFixed(1);
      
      return (
        <div 
          className={cn(
            "h-full flex flex-col border-t-8 cursor-pointer hover:shadow-lg transition-shadow relative",
            colorClass
          )}
          onClick={() => onSpaceClick(space)}
        >
          {/* Asset name at top */}
          <div className="px-1.5 pt-1">
            <p className="text-xs uppercase tracking-tight text-center font-medium">{space.asset.name}</p>
          </div>
          
          {/* Spacer */}
          <div className="flex-1" />
          
          {/* Price and return rate in bottom-right */}
          <div className="absolute bottom-1 right-1 text-right">
            <p className="text-sm font-semibold">${space.asset.currentPrice}</p>
            <p className="text-[10px] text-gray-600">{returnRate}%</p>
          </div>
          
          {/* Owner icon in center if owned */}
          {space.asset.owner !== null && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Building2 className="w-4 h-4" />
            </div>
          )}
          
          {/* Risk label in bottom-left corner */}
          <div className="absolute bottom-0 left-0">
            <span className={cn(
              "text-[9px] px-2 py-1 pl-1.5 font-bold uppercase",
              riskTextColors[space.asset.riskLevel]
            )}>
              {space.asset.riskLevel}
            </span>
          </div>
        </div>
      );
    }
    
    if (space.type === 'chance') {
      return (
        <div className="h-full flex items-center justify-center bg-[#ffc107]">
          <Zap className="w-5 h-5 text-orange-800" />
        </div>
      );
    }
    
    if (space.type === 'event') {
      return (
        <div className="h-full flex items-center justify-center bg-rose-100 border-t-4 border-rose-500">
          <AlertCircle className="w-4 h-4 text-rose-600" />
        </div>
      );
    }
    
    if (space.type === 'tax') {
      return (
        <div className="h-full flex flex-col items-center justify-center bg-[#03a9f4] p-1">
          <DollarSign className="w-5 h-5 text-white" />
          <p className="text-[9px] text-center text-white font-medium">{space.name}</p>
        </div>
      );
    }
  };

  const getPlayerIcon = (iconName: string) => {
    switch (iconName) {
      case 'dog':
        return Dog;
      case 'cat':
        return Cat;
      case 'bird':
        return Bird;
      case 'fish':
        return Fish;
      default:
        return Dog;
    }
  };

  return (
    <div className="relative w-full h-full bg-white border border-gray-300">
      {getSpaceContent()}
      {playersOnSpace.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 flex gap-0.5 p-0.5 justify-center">
          {playersOnSpace.map(player => {
            const Icon = getPlayerIcon(player.icon);
            return (
              <div
                key={player.id}
                className="w-5 h-5 rounded-full flex items-center justify-center shadow-md text-white"
                style={{ backgroundColor: player.color }}
              >
                <Icon className="w-3 h-3" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}