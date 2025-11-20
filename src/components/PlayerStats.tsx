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
    <Card className={`p-2.5 ${isCurrentPlayer ? 'ring-2 ring-[#03a9f4] shadow-lg' : 'shadow-md'} bg-gradient-to-br from-white to-gray-50`}>
      <div className="flex items-center gap-2 mb-2.5">
        <div 
          className="w-7 h-7 rounded-full shadow-md flex items-center justify-center text-white"
          style={{ backgroundColor: player.color }}
        >
          <Icon className="w-3.5 h-3.5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="text-xs truncate text-gray-900">{player.name}</h3>
            {isCurrentPlayer && (
              <Badge variant="default" className="text-[9px] px-1 py-0 bg-[#03a9f4]">Turn</Badge>
            )}
          </div>
          <p className="text-[10px] text-gray-600">Pos {player.position}</p>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between px-1.5 py-1 bg-[#c8e6c9] rounded">
          <div className="flex items-center gap-1">
            <Wallet className="w-3 h-3 text-[#1a7f5c]" />
            <span className="text-[10px] text-gray-800">Cash</span>
          </div>
          <span className="text-[10px] text-[#1a7f5c]">${player.cash.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between px-1.5 py-1 bg-[#b3e5fc] rounded">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-[#03a9f4]" />
            <span className="text-[10px] text-gray-800">Worth</span>
          </div>
          <span className="text-[10px] text-[#03a9f4]">${player.netWorth.toLocaleString()}</span>
        </div>

        <div className="px-1.5 py-1 bg-[#fff9c4] rounded">
          <p className="text-[10px] text-gray-700">{player.assets.length} assets</p>
        </div>

        {/* Assets List */}
        {player.assets.length > 0 && (
          <div className="mt-1.5">
            <p className="text-[9px] text-gray-600 mb-1 px-1">Portfolio</p>
            <ScrollArea className="h-[160px]">
              <div className="space-y-1">
                {player.assets.map((asset) => (
                  <div 
                    key={asset.purchaseId || asset.id} 
                    className="px-1.5 py-1 bg-white rounded border border-gray-200 text-xs shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-gray-900 text-[10px]">{asset.name}</p>
                        <p className="text-[9px] text-[#1a7f5c]">${asset.currentPrice}</p>
                      </div>
                      {isCurrentPlayer && onSellAsset && (
                        <Button 
                          size="sm"
                          variant="outline"
                          className="h-5 px-1.5 text-[9px] bg-[#ff5722] hover:bg-[#d84315] text-white border-none"
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