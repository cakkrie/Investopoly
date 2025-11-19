import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useState } from 'react';
import { Users, Minus, Plus } from 'lucide-react';
import { Card } from './ui/card';

interface PlayerSetupProps {
  open: boolean;
  onClose: () => void;
  onStartGame: (playerCount: number, playerNames: string[]) => void;
}

const playerIcons = ['dog', 'cat', 'bird', 'fish'];
const playerColors = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B'];

export function PlayerSetup({ open, onClose, onStartGame }: PlayerSetupProps) {
  const [playerCount, setPlayerCount] = useState(2);
  const [playerNames, setPlayerNames] = useState(['Player 1', 'Player 2', 'Player 3', 'Player 4']);

  const handlePlayerCountChange = (delta: number) => {
    const newCount = Math.max(2, Math.min(4, playerCount + delta));
    setPlayerCount(newCount);
  };

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleStart = () => {
    onStartGame(playerCount, playerNames.slice(0, playerCount));
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Start New Game</DialogTitle>
          <DialogDescription>
            Choose the number of players and customize their names
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Player Count Selector */}
          <div className="space-y-3">
            <Label>Number of Players</Label>
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePlayerCountChange(-1)}
                disabled={playerCount <= 2}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-2 min-w-[120px] justify-center">
                <Users className="w-5 h-5 text-gray-600" />
                <span className="text-2xl">{playerCount}</span>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePlayerCountChange(1)}
                disabled={playerCount >= 4}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Player Name Inputs */}
          <div className="space-y-3">
            <Label>Player Names</Label>
            <div className="space-y-2">
              {Array.from({ length: playerCount }).map((_, index) => (
                <Card key={index} className="p-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                      style={{ backgroundColor: playerColors[index] }}
                    >
                      {index + 1}
                    </div>
                    <Input
                      value={playerNames[index]}
                      onChange={(e) => handleNameChange(index, e.target.value)}
                      placeholder={`Player ${index + 1}`}
                      className="flex-1"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button onClick={handleStart} className="w-full">
            Start Game
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}