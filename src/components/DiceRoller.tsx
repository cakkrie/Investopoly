import { Button } from './ui/button';
import { Card } from './ui/card';
import { Dices } from 'lucide-react';

interface DiceRollerProps {
  dice: number;
  onRoll: () => void;
  disabled: boolean;
}

export function DiceRoller({ dice, onRoll, disabled }: DiceRollerProps) {
  return (
    <Card className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-white rounded-lg shadow-md flex items-center justify-center border-2 border-gray-300">
          <span className="text-2xl">{dice}</span>
        </div>
        
        <div className="flex-1">
          <div className="text-sm text-gray-600 mb-1">Current Roll</div>
          <div className="text-2xl text-indigo-600">{dice}</div>
        </div>
        
        <Button 
          onClick={onRoll} 
          disabled={disabled}
          size="lg"
          className="gap-2"
        >
          <Dices className="w-5 h-5" />
          Roll Dice
        </Button>
      </div>
    </Card>
  );
}
