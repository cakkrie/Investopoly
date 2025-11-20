import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Asset } from '../types/game';
import { Badge } from './ui/badge';
import { TrendingUp, Shield, Coins, BookOpen, BarChart3 } from 'lucide-react';
import { assetEducationData } from '../data/assetEducation';

interface AssetDetailsModalProps {
  open: boolean;
  onClose: () => void;
  asset: Asset | null;
  onBuy: (asset: Asset) => void;
  onSell?: (asset: Asset) => void;
  canBuy: boolean;
}

const assetTypeLabels = {
  bond: 'Government/Corporate Bond',
  etf: 'Exchange-Traded Fund',
  stock: 'Individual Stock',
  crypto: 'Cryptocurrency',
  'mutual-fund': 'Mutual Fund',
  commodity: 'Commodity / Precious Metal',
};

const riskColors = {
  low: 'text-green-800 bg-green-100 border-green-300',
  medium: 'text-yellow-800 bg-yellow-100 border-yellow-300',
  high: 'text-red-800 bg-red-100 border-red-300',
};

export function AssetDetailsModal({ open, onClose, asset, onBuy, onSell, canBuy }: AssetDetailsModalProps) {
  if (!asset) return null;

  const education = assetEducationData[asset.name];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#1a7f5c]">{asset.name}</DialogTitle>
          <DialogDescription className="text-gray-600">{assetTypeLabels[asset.type]}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm text-gray-600">{asset.description}</p>

          {asset.isInverse && (
            <div className="p-3 bg-orange-50 border-l-4 border-[#ff9800] rounded">
              <p className="text-sm text-orange-900">
                <span className="font-bold">⚠️ Inverse ETF:</span> This asset moves in the opposite direction to the market. 
                When other ETFs fall, this one rises, and vice versa.
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Coins className="w-4 h-4 text-[#03a9f4]" />
                <span className="text-sm font-medium text-gray-800">Price</span>
              </div>
              <p className="text-2xl font-bold text-[#03a9f4]">${asset.currentPrice}</p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-[#1a7f5c]" />
                <span className="text-sm font-medium text-gray-800">Dividend</span>
              </div>
              <p className="text-2xl font-bold text-[#1a7f5c]">${asset.dividend}/round</p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-gray-700" />
              <span className="text-sm font-medium text-gray-800">Risk Level</span>
            </div>
            <Badge className={riskColors[asset.riskLevel]}>
              {asset.riskLevel.toUpperCase()}
            </Badge>
          </div>

          {education && (
            <>
              {/* Industry Section */}
              <div className="p-4 bg-cyan-50 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-[#00bcd4]" />
                  <h4 className="font-semibold text-gray-800">Industry Classification</h4>
                </div>
                <p className="text-gray-800 mb-3 font-medium">{education.industry}</p>
                <p className="text-sm text-gray-700">{education.explanation}</p>
              </div>

              {/* Financial Factors Section */}
              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="w-5 h-5 text-[#ffc107]" />
                  <h4 className="font-semibold text-gray-800">Key Financial Factors</h4>
                </div>
                <ul className="space-y-2">
                  {education.financialFactors.map((factor, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="mr-2 text-[#ffc107] font-bold">•</span>
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Metrics Section */}
              {education.keyMetrics && education.keyMetrics.length > 0 && (
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <h4 className="font-semibold text-gray-800">Important Metrics</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {education.keyMetrics.map((metric, index) => (
                      <Badge key={index} variant="outline" className="text-purple-700 border-purple-400">
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {asset.owner !== null && (
            <div className="p-3 bg-amber-50 border-l-4 border-[#ffb700] rounded">
              <p className="text-sm text-amber-900 font-medium">This asset is currently owned by Player {asset.owner + 1}</p>
            </div>
          )}

          {!canBuy && asset.owner === null && (
            <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
              <p className="text-sm text-red-800 font-medium">Insufficient funds to purchase this asset</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-gray-300">
            Close
          </Button>
          {asset.owner === null && (
            <Button onClick={() => onBuy(asset)} disabled={!canBuy} className="bg-[#1a7f5c] hover:bg-[#146647] text-white">
              Buy Asset
            </Button>
          )}
          {asset.owner !== null && onSell && (
            <Button onClick={() => onSell(asset)} className="bg-[#ff9800] hover:bg-[#e68900] text-white">
              Sell Asset
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}