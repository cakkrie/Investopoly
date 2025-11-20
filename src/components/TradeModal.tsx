import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { ArrowLeftRight, DollarSign } from 'lucide-react';
import { Asset } from '../types/game';

interface Player {
  id: number;
  name: string;
  color: string;
  cash: number;
  assets: Asset[];
}

interface TradeModalProps {
  open: boolean;
  onClose: () => void;
  currentPlayer: Player;
  allPlayers: Player[];
  onProposeTrade: (
    targetPlayerId: number,
    offerCash: number,
    offerAssets: Asset[],
    requestCash: number,
    requestAssets: Asset[]
  ) => void;
}

export function TradeModal({ open, onClose, currentPlayer, allPlayers, onProposeTrade }: TradeModalProps) {
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const [offerCash, setOfferCash] = useState(0);
  const [offerAssetIds, setOfferAssetIds] = useState<string[]>([]);
  const [requestCash, setRequestCash] = useState(0);
  const [requestAssetIds, setRequestAssetIds] = useState<string[]>([]);

  const otherPlayers = allPlayers.filter(p => p.id !== currentPlayer.id);
  const selectedPlayer = allPlayers.find(p => p.id === selectedPlayerId);

  const handleOfferAssetToggle = (purchaseId: string) => {
    setOfferAssetIds(prev =>
      prev.includes(purchaseId)
        ? prev.filter(id => id !== purchaseId)
        : [...prev, purchaseId]
    );
  };

  const handleRequestAssetToggle = (purchaseId: string) => {
    setRequestAssetIds(prev =>
      prev.includes(purchaseId)
        ? prev.filter(id => id !== purchaseId)
        : [...prev, purchaseId]
    );
  };

  const handlePropose = () => {
    if (selectedPlayerId === null) return;

    const offerAssets = currentPlayer.assets.filter(a => a.purchaseId && offerAssetIds.includes(a.purchaseId));
    const requestAssets = selectedPlayer?.assets.filter(a => a.purchaseId && requestAssetIds.includes(a.purchaseId)) || [];

    onProposeTrade(selectedPlayerId, offerCash, offerAssets, requestCash, requestAssets);
    handleClose();
  };

  const handleClose = () => {
    setSelectedPlayerId(null);
    setOfferCash(0);
    setOfferAssetIds([]);
    setRequestCash(0);
    setRequestAssetIds([]);
    onClose();
  };

  const canPropose = selectedPlayerId !== null && 
    (offerCash > 0 || offerAssetIds.length > 0) &&
    (requestCash > 0 || requestAssetIds.length > 0) &&
    offerCash <= currentPlayer.cash &&
    requestCash <= (selectedPlayer?.cash || 0);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5 text-blue-600" />
            Propose Trade
          </DialogTitle>
          <DialogDescription>
            Select a player and choose what to offer and what to request
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Player Selection */}
          <div className="space-y-2">
            <Label>Trade With</Label>
            <Select 
              value={selectedPlayerId?.toString()} 
              onValueChange={(value) => {
                setSelectedPlayerId(Number(value));
                setRequestCash(0);
                setRequestAssetIds([]);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a player" />
              </SelectTrigger>
              <SelectContent>
                {otherPlayers.map(player => (
                  <SelectItem key={player.id} value={player.id.toString()}>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: player.color }}
                      />
                      {player.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedPlayerId !== null && (
            <div className="grid md:grid-cols-2 gap-4">
              {/* Your Offer */}
              <Card className="p-4 border-2 border-green-200 bg-green-50">
                <h3 className="text-sm mb-3 text-green-800">You Offer</h3>
                
                {/* Offer Cash */}
                <div className="space-y-2 mb-4">
                  <Label className="text-xs text-green-700">Cash (You have ${currentPlayer.cash})</Label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-700" />
                    <Input
                      type="number"
                      min="0"
                      max={currentPlayer.cash}
                      value={offerCash}
                      onChange={(e) => setOfferCash(Math.min(Number(e.target.value), currentPlayer.cash))}
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Offer Assets */}
                <div className="space-y-2">
                  <Label className="text-xs text-green-700">Assets</Label>
                  {currentPlayer.assets.length > 0 ? (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {currentPlayer.assets.map((asset) => (
                        <div key={asset.purchaseId} className="flex items-center gap-2 p-2 bg-white rounded border">
                          <Checkbox
                            checked={offerAssetIds.includes(asset.purchaseId!)}
                            onCheckedChange={() => handleOfferAssetToggle(asset.purchaseId!)}
                          />
                          <div className="flex-1 text-xs">
                            <div>{asset.name}</div>
                            <div className="text-gray-500">${asset.currentPrice}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500">No assets to offer</p>
                  )}
                </div>
              </Card>

              {/* Your Request */}
              <Card className="p-4 border-2 border-blue-200 bg-blue-50">
                <h3 className="text-sm mb-3 text-blue-800">You Request</h3>
                
                {/* Request Cash */}
                <div className="space-y-2 mb-4">
                  <Label className="text-xs text-blue-700">Cash (They have ${selectedPlayer?.cash})</Label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-blue-700" />
                    <Input
                      type="number"
                      min="0"
                      max={selectedPlayer?.cash || 0}
                      value={requestCash}
                      onChange={(e) => setRequestCash(Math.min(Number(e.target.value), selectedPlayer?.cash || 0))}
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Request Assets */}
                <div className="space-y-2">
                  <Label className="text-xs text-blue-700">Assets</Label>
                  {selectedPlayer && selectedPlayer.assets.length > 0 ? (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {selectedPlayer.assets.map((asset) => (
                        <div key={asset.purchaseId} className="flex items-center gap-2 p-2 bg-white rounded border">
                          <Checkbox
                            checked={requestAssetIds.includes(asset.purchaseId!)}
                            onCheckedChange={() => handleRequestAssetToggle(asset.purchaseId!)}
                          />
                          <div className="flex-1 text-xs">
                            <div>{asset.name}</div>
                            <div className="text-gray-500">${asset.currentPrice}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500">No assets available</p>
                  )}
                </div>
              </Card>
            </div>
          )}

          {/* Trade Summary */}
          {selectedPlayerId !== null && (offerCash > 0 || offerAssetIds.length > 0 || requestCash > 0 || requestAssetIds.length > 0) && (
            <Card className="p-4 bg-gray-50">
              <h4 className="text-sm mb-2">Trade Summary</h4>
              <div className="flex items-center justify-between gap-4 text-xs">
                <div className="flex-1">
                  <Badge className="mb-2 bg-green-600">You Give</Badge>
                  {offerCash > 0 && <div>• ${offerCash} cash</div>}
                  {offerAssetIds.length > 0 && <div>• {offerAssetIds.length} asset(s)</div>}
                </div>
                <ArrowLeftRight className="w-5 h-5 text-gray-400" />
                <div className="flex-1 text-right">
                  <Badge className="mb-2 bg-blue-600">You Get</Badge>
                  {requestCash > 0 && <div>${requestCash} cash •</div>}
                  {requestAssetIds.length > 0 && <div>{requestAssetIds.length} asset(s) •</div>}
                </div>
              </div>
            </Card>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handlePropose}
            disabled={!canPropose}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Propose Trade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
