import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeftRight, AlertCircle } from 'lucide-react';
import { Asset } from '../types/game';

interface TradeOffer {
  fromPlayerId: number;
  fromPlayerName: string;
  fromPlayerColor: string;
  toPlayerId: number;
  offerCash: number;
  offerAssets: Asset[];
  requestCash: number;
  requestAssets: Asset[];
}

interface TradeOfferModalProps {
  open: boolean;
  onClose: () => void;
  tradeOffer: TradeOffer | null;
  onAccept: () => void;
  onDecline: () => void;
}

export function TradeOfferModal({ open, onClose, tradeOffer, onAccept, onDecline }: TradeOfferModalProps) {
  if (!tradeOffer) return null;

  const handleAccept = () => {
    onAccept();
    onClose();
  };

  const handleDecline = () => {
    onDecline();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5 text-blue-600" />
            Trade Offer Received
          </DialogTitle>
          <DialogDescription>
            <span style={{ color: tradeOffer.fromPlayerColor }}>{tradeOffer.fromPlayerName}</span> wants to trade with you
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Trade Details */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* They Offer */}
            <Card className="p-4 border-2 border-green-200 bg-green-50">
              <h3 className="text-sm mb-3 text-green-800">They Offer You</h3>
              
              <div className="space-y-2">
                {tradeOffer.offerCash > 0 && (
                  <div className="flex items-center gap-2 p-2 bg-white rounded">
                    <div className="text-2xl text-green-600">${tradeOffer.offerCash}</div>
                  </div>
                )}
                
                {tradeOffer.offerAssets.length > 0 && (
                  <div className="space-y-1">
                    <div className="text-xs text-green-700 mb-1">Assets:</div>
                    {tradeOffer.offerAssets.map((asset) => (
                      <div key={asset.purchaseId} className="p-2 bg-white rounded border text-xs">
                        <div className="flex justify-between items-center">
                          <span>{asset.name}</span>
                          <Badge variant="outline" className="text-[10px]">{asset.type}</Badge>
                        </div>
                        <div className="text-gray-500 mt-1">
                          Value: ${asset.currentPrice} • Dividend: ${asset.dividend}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {tradeOffer.offerCash === 0 && tradeOffer.offerAssets.length === 0 && (
                  <p className="text-xs text-gray-500 italic">Nothing</p>
                )}
              </div>
            </Card>

            {/* They Request */}
            <Card className="p-4 border-2 border-red-200 bg-red-50">
              <h3 className="text-sm mb-3 text-red-800">They Want From You</h3>
              
              <div className="space-y-2">
                {tradeOffer.requestCash > 0 && (
                  <div className="flex items-center gap-2 p-2 bg-white rounded">
                    <div className="text-2xl text-red-600">${tradeOffer.requestCash}</div>
                  </div>
                )}
                
                {tradeOffer.requestAssets.length > 0 && (
                  <div className="space-y-1">
                    <div className="text-xs text-red-700 mb-1">Assets:</div>
                    {tradeOffer.requestAssets.map((asset) => (
                      <div key={asset.purchaseId} className="p-2 bg-white rounded border text-xs">
                        <div className="flex justify-between items-center">
                          <span>{asset.name}</span>
                          <Badge variant="outline" className="text-[10px]">{asset.type}</Badge>
                        </div>
                        <div className="text-gray-500 mt-1">
                          Value: ${asset.currentPrice} • Dividend: ${asset.dividend}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {tradeOffer.requestCash === 0 && tradeOffer.requestAssets.length === 0 && (
                  <p className="text-xs text-gray-500 italic">Nothing</p>
                )}
              </div>
            </Card>
          </div>

          {/* Warning */}
          <Card className="p-3 bg-amber-50 border-amber-200">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
              <p className="text-xs text-amber-800">
                Make sure this trade is fair! Once you accept, the assets and cash will be exchanged immediately.
              </p>
            </div>
          </Card>
        </div>

        <DialogFooter className="gap-2">
          <Button 
            variant="outline" 
            onClick={handleDecline}
            className="border-red-300 text-red-700 hover:bg-red-50"
          >
            Decline Trade
          </Button>
          <Button 
            onClick={handleAccept}
            className="bg-green-600 hover:bg-green-700"
          >
            Accept Trade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
