import { Player, Asset } from '../types/game';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { Wallet, TrendingUp, Target, Dog, Cat, Bird, Fish, DollarSign } from 'lucide-react';

interface PlayerStatsProps {
  player: Player;
  isCurrentPlayer: boolean;
  onSellAsset?: (asset: Asset) => void;
}

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

export function PlayerStats({ player, isCurrentPlayer, onSellAsset }: PlayerStatsProps) {
  const Icon = getPlayerIcon(player.icon);
  
  return (
    <Card className={`p-3 ${isCurrentPlayer ? 'ring-2 ring-blue-500' : ''}`}>
      <div className="flex items-center gap-2 mb-3">
        <div 
          className="w-8 h-8 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white"
          style={{ backgroundColor: player.color }}
        >
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm truncate">{player.name}</h3>
            {isCurrentPlayer && (
              <Badge variant="default" className="text-[10px] px-1 py-0">Turn</Badge>
            )}
          </div>
          <p className="text-xs text-gray-600">Pos {player.position}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between px-2 py-1 bg-green-50 rounded">
          <div className="flex items-center gap-1">
            <Wallet className="w-3 h-3 text-green-600" />
            <span className="text-xs">Cash</span>
          </div>
          <span className="text-xs text-green-700">${player.cash.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between px-2 py-1 bg-blue-50 rounded">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-blue-600" />
            <span className="text-xs">Worth</span>
          </div>
          <span className="text-xs text-blue-700">${player.netWorth.toLocaleString()}</span>
        </div>

        <div className="px-2 py-1 bg-gray-50 rounded">
          <p className="text-[10px] text-gray-600 truncate">{player.assets.length} assets</p>
        </div>

        {/* Assets List */}
        {player.assets.length > 0 && (
          <div className="mt-2">
            <p className="text-[10px] text-gray-500 mb-1 px-1">Portfolio</p>
            <ScrollArea className="h-[180px]">
              <div className="space-y-1">
                {player.assets.map((asset) => (
                  <div 
                    key={asset.purchaseId || asset.id} 
                    className="px-2 py-1.5 bg-white rounded border border-gray-200 text-xs"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-gray-900">{asset.name}</p>
                        <p className="text-[10px] text-gray-500">${asset.currentPrice}</p>
                      </div>
                      {isCurrentPlayer && onSellAsset && (
                        <Button 
                          size="sm"
                          variant="outline"
                          className="h-6 px-2 text-[10px]"
                          onClick={() => onSellAsset(asset)}
                        >
                          Sell
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </Card>
  );
}