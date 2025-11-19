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
};

const riskColors = {
  low: 'text-green-600 bg-green-50',
  medium: 'text-yellow-600 bg-yellow-50',
  high: 'text-red-600 bg-red-50',
};

export function AssetDetailsModal({ open, onClose, asset, onBuy, onSell, canBuy }: AssetDetailsModalProps) {
  if (!asset) return null;

  const education = assetEducationData[asset.name];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{asset.name}</DialogTitle>
          <DialogDescription>{assetTypeLabels[asset.type]}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm text-gray-600">{asset.description}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Coins className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-900">Price</span>
              </div>
              <p className="text-xl text-blue-700">${asset.currentPrice}</p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-900">Dividend</span>
              </div>
              <p className="text-xl text-green-700">${asset.dividend}/round</p>
            </div>
          </div>

          <div className="p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-gray-600" />
              <span className="text-sm">Risk Level</span>
            </div>
            <Badge className={riskColors[asset.riskLevel]}>
              {asset.riskLevel.toUpperCase()}
            </Badge>
          </div>

          {education && (
            <>
              {/* Industry Section */}
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  <h4 className="text-indigo-900">Industry Classification</h4>
                </div>
                <p className="text-indigo-800 mb-3">{education.industry}</p>
                <p className="text-sm text-indigo-700">{education.explanation}</p>
              </div>

              {/* Financial Factors Section */}
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <h4 className="text-purple-900">Key Financial Factors</h4>
                </div>
                <ul className="space-y-2">
                  {education.financialFactors.map((factor, index) => (
                    <li key={index} className="text-sm text-purple-700 flex items-start">
                      <span className="mr-2 text-purple-500">•</span>
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Metrics Section */}
              {education.keyMetrics && education.keyMetrics.length > 0 && (
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-slate-600" />
                    <h4 className="text-slate-900">Important Metrics</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {education.keyMetrics.map((metric, index) => (
                      <Badge key={index} variant="outline" className="text-slate-700">
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {asset.owner !== null && (
            <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded">
              <p className="text-sm text-amber-800">This asset is currently owned by Player {asset.owner + 1}</p>
            </div>
          )}

          {!canBuy && asset.owner === null && (
            <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
              <p className="text-sm text-red-800">Insufficient funds to purchase this asset</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {asset.owner === null && (
            <Button onClick={() => onBuy(asset)} disabled={!canBuy}>
              Buy Asset
            </Button>
          )}
          {asset.owner !== null && onSell && (
            <Button onClick={() => onSell(asset)}>
              Sell Asset
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}