import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { AlertCircle, Zap, TrendingUp, TrendingDown } from 'lucide-react';

interface EventCardProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  type: 'chance' | 'event' | 'market';
  impact?: string;
}

export function EventCard({ open, onClose, title, description, type, impact }: EventCardProps) {
  const getIcon = () => {
    switch (type) {
      case 'chance':
        return <Zap className="w-12 h-12 text-amber-500" />;
      case 'event':
        return <AlertCircle className="w-12 h-12 text-rose-500" />;
      case 'market':
        return <TrendingUp className="w-12 h-12 text-blue-500" />;
      default:
        return <AlertCircle className="w-12 h-12" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'chance':
        return 'bg-gradient-to-br from-amber-50 to-yellow-100';
      case 'event':
        return 'bg-gradient-to-br from-rose-50 to-red-100';
      case 'market':
        return 'bg-gradient-to-br from-blue-50 to-indigo-100';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className={`${getBackgroundColor()} -m-6 mb-4 p-6 rounded-t-lg`}>
          <div className="flex justify-center mb-4">
            {getIcon()}
          </div>
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">{title}</DialogTitle>
          </DialogHeader>
        </div>
        
        <DialogDescription className="text-center py-4">
          {description}
        </DialogDescription>

        {impact && (
          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm">
              <span className="text-blue-700">Impact: </span>
              {impact}
            </p>
          </div>
        )}

        <DialogFooter className="sm:justify-center">
          <Button onClick={onClose} className="w-full sm:w-auto">
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
