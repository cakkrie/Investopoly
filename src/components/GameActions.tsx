import { Button } from './ui/button';
import { Card } from './ui/card';
import { Dice3, ShoppingCart, ArrowRight, ArrowLeftRight } from 'lucide-react';

interface GameActionsProps {
  onRoll: () => void;
  onBuyAsset: () => void;
  onEndTurn: () => void;
  onTrade?: () => void;
  canRoll: boolean;
  canBuyAsset: boolean;
  hasRolled: boolean;
}

export function GameActions({ 
  onRoll, 
  onBuyAsset, 
  onEndTurn,
  onTrade, 
  canRoll, 
  canBuyAsset,
  hasRolled 
}: GameActionsProps) {
  return (
    <Card className="p-4 bg-gradient-to-br from-slate-50 to-white">
      <div className="flex items-center gap-2 mb-4">
        <Dice3 className="w-5 h-5 text-slate-700" />
        <h3 className="text-slate-800">Game Actions</h3>
      </div>

      <div className="space-y-2">
        <Button 
          onClick={onRoll}
          disabled={!canRoll}
          className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white"
          size="lg"
        >
          <Dice3 className="w-5 h-5 mr-2" />
          Roll Dice
        </Button>

        <div className="flex gap-2">
          <Button 
            onClick={onBuyAsset}
            disabled={!canBuyAsset}
            variant="outline"
            className="flex-1 h-12"
            size="lg"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Buy Asset
          </Button>

          {onTrade && (
            <Button 
              onClick={onTrade}
              disabled={!hasRolled}
              variant="outline"
              className="flex-1 h-12 border-blue-200 hover:bg-blue-50"
              size="lg"
            >
              <ArrowLeftRight className="w-5 h-5 mr-2" />
              Trade
            </Button>
          )}
        </div>

        <Button 
          onClick={onEndTurn}
          disabled={!hasRolled}
          variant="secondary"
          className="w-full h-12 bg-slate-100 hover:bg-slate-200 text-slate-800"
          size="lg"
        >
          End Turn
        </Button>
      </div>
    </Card>
  );
}