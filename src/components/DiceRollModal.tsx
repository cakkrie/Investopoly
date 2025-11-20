import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { VisuallyHidden } from './ui/visually-hidden';

interface DiceRollModalProps {
  open: boolean;
  onClose: () => void;
  dice: number;
}

// Dice dot patterns for visual representation
const DiceDots = ({ value }: { value: number }) => {
  const dotPositions = {
    1: [[4, 4]], // center
    2: [[1, 1], [7, 7]], // diagonal
    3: [[1, 1], [4, 4], [7, 7]], // diagonal with center
    4: [[1, 1], [1, 7], [7, 1], [7, 7]], // corners
    5: [[1, 1], [1, 7], [4, 4], [7, 1], [7, 7]], // corners + center
    6: [[1, 1], [1, 4], [1, 7], [7, 1], [7, 4], [7, 7]], // two columns
  };

  const dots = dotPositions[value as keyof typeof dotPositions] || [];

  return (
    <div className="grid grid-cols-[repeat(8,1fr)] grid-rows-[repeat(8,1fr)] w-full h-full p-3">
      {Array.from({ length: 64 }).map((_, idx) => {
        const row = Math.floor(idx / 8);
        const col = idx % 8;
        const hasDot = dots.some(([r, c]) => r === row && c === col);
        
        return (
          <div key={idx} className="flex items-center justify-center">
            {hasDot && (
              <div className="w-3 h-3 bg-slate-800 rounded-full shadow-inner" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export function DiceRollModal({ open, onClose, dice }: DiceRollModalProps) {
  const [animatingNumber, setAnimatingNumber] = useState(1);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (open) {
      setIsAnimating(true);
      setAnimatingNumber(1);
      
      // Cycle through numbers 1-6 rapidly
      let currentNum = 1;
      const interval = setInterval(() => {
        currentNum = (currentNum % 6) + 1;
        setAnimatingNumber(currentNum);
      }, 100); // Change number every 100ms

      // Stop after 1 second and show final result
      setTimeout(() => {
        clearInterval(interval);
        setAnimatingNumber(dice);
        setIsAnimating(false);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [open, dice]);
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <VisuallyHidden>
          <DialogTitle>Dice Roll Result</DialogTitle>
          <DialogDescription>
            You rolled {dice}
          </DialogDescription>
        </VisuallyHidden>
        
        <div className="flex flex-col items-center justify-center py-8">
          <h3 className="mb-8 text-slate-700">
            {isAnimating ? 'Rolling Dice...' : 'You Rolled'}
          </h3>
          
          {/* Dice container */}
          <div className="relative mb-6">
            {/* Main dice */}
            <div className="relative w-40 h-40 bg-white rounded-2xl border-4 border-[#1a7f5c] shadow-2xl overflow-hidden">
              {/* Dice dots pattern */}
              <DiceDots value={animatingNumber} />
              
              {/* Corner decorations */}
              <div className="absolute top-2 left-2 w-2 h-2 bg-[#1a7f5c]/20 rounded-full" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-[#1a7f5c]/20 rounded-full" />
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-[#1a7f5c]/20 rounded-full" />
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-[#1a7f5c]/20 rounded-full" />
            </div>
          </div>

          {!isAnimating && (
            <div className="text-center mt-4">
              <p className="text-slate-900 font-bold">Move {dice} spaces forward</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}