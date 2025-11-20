import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { DollarSign, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';

interface DividendModalProps {
  open: boolean;
  onClose: () => void;
  totalDividend: number;
  assetDividends: { name: string; dividend: number; count: number }[];
}

export function DividendModal({ open, onClose, totalDividend, assetDividends }: DividendModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <TrendingUp className="w-6 h-6 text-green-600" />
            Dividend Day!
          </DialogTitle>
          <DialogDescription>
            Collect your dividends from all owned assets
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <DollarSign className="w-8 h-8 text-green-600" />
              <span className="text-4xl text-green-700">${totalDividend}</span>
            </div>
            <p className="text-sm text-green-700">Total Dividends Received</p>
          </div>

          {assetDividends.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Dividend Breakdown:</p>
              <div className="max-h-48 overflow-y-auto space-y-1">
                {assetDividends.map((asset, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between items-center bg-gray-50 rounded px-3 py-2 text-sm"
                  >
                    <span className="text-gray-700">
                      {asset.name} {asset.count > 1 && `(×${asset.count})`}
                    </span>
                    <span className="text-green-600">
                      ${asset.dividend * asset.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              You don't own any dividend-paying assets yet.
            </p>
          )}

          <Button 
            onClick={onClose} 
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}