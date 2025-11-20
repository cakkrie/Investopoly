import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { useState } from 'react';
import { Users, Minus, Plus, Bird, Fish } from 'lucide-react';
import svgPaths from '../imports/svg-60cf1i5cc1';

interface PlayerSetupProps {
  open: boolean;
  onClose: () => void;
  onStartGame: (playerCount: number, playerNames: string[]) => void;
}

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

  // Icon components based on Figma design
  const DogIcon = () => (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
      <g>
        <path d={svgPaths.p27c7df00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d="M26.6667 23.3333V24.1667" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d={svgPaths.p29b9fe00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d="M13.3333 23.3333V24.1667" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d={svgPaths.p3d167c80} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </g>
    </svg>
  );

  const CatIcon = () => (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
      <g>
        <path d={svgPaths.p39065400} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d="M13.3333 23.3333V24.1667" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d="M26.6667 23.3333V24.1667" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d={svgPaths.p27c7df00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </g>
    </svg>
  );

  const playerIconComponents = [DogIcon, CatIcon, Bird, Fish];

  return (
    <Dialog open={open} modal>
      <DialogContent 
        className={`bg-[#e8f5e9] rounded-none border border-[rgba(0,0,0,0.1)] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] p-0 ${
          playerCount === 4 ? 'sm:max-w-[448px]' : 'sm:max-w-[448px]'
        }`}
        showClose={false} 
        onInteractOutside={(e) => e.preventDefault()} 
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogTitle className="sr-only">Start New Game</DialogTitle>
        <DialogDescription className="sr-only">Choose the number of players and customize their names</DialogDescription>
        <div 
          className="relative w-full"
          style={{ height: playerCount === 4 ? '600px' : '446px' }}
        >
          {/* Header */}
          <div className="absolute left-[25px] top-[25px] w-[398px] flex flex-col gap-[8px]">
            <div>
              <p className="font-semibold text-[24px] text-[#1a7f5c] tracking-[0.0703px]">Start New Game</p>
            </div>
            <div>
              <p className="font-normal text-[14px] text-[#364153] tracking-[-0.1504px] leading-[20px]">Choose the number of players and customize their names</p>
            </div>
          </div>

          {/* Number of Players */}
          <div className="absolute left-[25px] top-[117px] w-[398px] flex flex-col gap-[12px]">
            <div className="flex gap-[8px] items-center">
              <p className="font-medium text-[14px] text-[#1e2939] tracking-[-0.1504px]">Number of Players</p>
            </div>
            <div className="flex gap-[24px] items-center justify-center h-[40px]">
              {/* Minus button */}
              <button
                onClick={() => handlePlayerCountChange(-1)}
                disabled={playerCount <= 2}
                className="size-[32px] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <div className="w-full h-full overflow-clip">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                    <path d="M10.6667 16H21.3333" stroke={playerCount <= 2 ? '#99A1AF' : '#99A1AF'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                  </svg>
                </div>
              </button>

              {/* Icon and number */}
              <div className="flex gap-[12px] items-center h-[40px] px-[32px]">
                <div className="w-[40px] h-[40px] overflow-clip">
                  <Users className="w-full h-full text-[#1A7F5C]" strokeWidth={1.67} />
                </div>
                <p className="font-normal text-[30px] text-[#1e2939] tracking-[0.3955px] leading-[36px]">{playerCount}</p>
              </div>

              {/* Plus button */}
              <button
                onClick={() => handlePlayerCountChange(1)}
                disabled={playerCount >= 4}
                className="size-[32px] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <div className="w-full h-full overflow-clip">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                    <path d="M10.6667 16H21.3333" stroke={playerCount >= 4 ? '#99A1AF' : '#1A7F5C'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                    <path d="M16 10.6667V21.3333" stroke={playerCount >= 4 ? '#99A1AF' : '#1A7F5C'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* Player Names Label */}
          <div className="absolute left-[25px] top-[207px] w-[398px] flex gap-[8px] items-center">
            <p className="font-medium text-[14px] text-[#1e2939] tracking-[-0.1504px]">Player Names</p>
          </div>

          {/* Player icons and inputs - positioned absolutely based on player count */}
          {Array.from({ length: playerCount }).map((_, index) => {
            const IconComponent = playerIconComponents[index];
            const positions = [
              { icon: { left: 100, top: 246.5 }, input: { left: 'calc(50% - 90px)', top: 322 } },
              { icon: { left: 280, top: 246.5 }, input: { left: 'calc(50% + 87px)', top: 322 } },
              { icon: { left: 100, top: 246.5 + 130 }, input: { left: 'calc(50% - 90px)', top: 322 + 130 } },
              { icon: { left: 280, top: 246.5 + 130 }, input: { left: 'calc(50% + 87px)', top: 322 + 130 } },
            ];
            
            // For 2 players, use first two positions
            // For 3 players, adjust layout
            // For 4 players, use 2x2 grid
            let position = positions[index];
            if (playerCount === 2) {
              position = positions[index];
            } else if (playerCount === 3) {
              const adjustedPositions = [
                { icon: { left: 64, top: 246.5 }, input: { left: 'calc(50% - 148px)', top: 322 } },
                { icon: { left: 192, top: 246.5 }, input: { left: 'calc(50% - 8px)', top: 322 } },
                { icon: { left: 320, top: 246.5 }, input: { left: 'calc(50% + 132px)', top: 322 } },
              ];
              position = adjustedPositions[index];
            } else {
              position = positions[index];
            }

            return (
              <div key={index}>
                {/* Icon */}
                <div 
                  className="absolute flex items-center justify-center rounded-full size-[65px]"
                  style={{ 
                    backgroundColor: playerColors[index],
                    left: `${position.icon.left}px`,
                    top: `${position.icon.top}px`
                  }}
                >
                  {index < 2 ? (
                    <div className="size-[40px]">
                      <IconComponent />
                    </div>
                  ) : (
                    <IconComponent className="w-[40px] h-[40px] text-white" strokeWidth={1.67} />
                  )}
                </div>

                {/* Input */}
                <div 
                  className="absolute h-[33px] w-[120px] translate-x-[-50%]"
                  style={{ 
                    left: position.input.left,
                    top: `${position.input.top}px`
                  }}
                >
                  <div className="box-border flex h-[33px] items-center justify-center overflow-clip p-[4px] w-[120px]">
                    <input
                      value={playerNames[index]}
                      onChange={(e) => handleNameChange(index, e.target.value)}
                      placeholder={`Player ${index + 1}`}
                      className="w-full font-normal text-[16px] text-[#4a5565] tracking-[-0.3125px] text-center bg-transparent border-0 outline-none"
                    />
                  </div>
                  <div aria-hidden="true" className="absolute border-[#1a7f5c] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
                </div>
              </div>
            );
          })}

          {/* Start Game Button - adjust position based on player count */}
          <button
            onClick={handleStart}
            className="absolute bg-[#1a7f5c] box-border flex gap-[8px] h-[36px] items-center justify-center left-[25px] px-[16px] py-[8px] rounded-[45px] w-[398px]"
            style={{ top: playerCount <= 2 ? '385px' : playerCount === 3 ? '385px' : '540px' }}
          >
            <p className="font-medium text-[14px] text-center text-white tracking-[-0.1504px] leading-[20px]">Start Game</p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}