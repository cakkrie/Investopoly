import { Fragment } from 'react';
import { BoardSpace as BoardSpaceType, Player, MarketPhase } from '../types/game';
import { BoardSpace } from './BoardSpace';
import { MarketPhaseIndicator } from './MarketPhaseIndicator';
import { PolicyVoting } from './PolicyVoting';
import { GameActions } from './GameActions';

interface GameBoardProps {
  spaces: BoardSpaceType[];
  players: Player[];
  onSpaceClick: (space: BoardSpaceType) => void;
  marketPhase: MarketPhase;
  round: number;
  onRoll: () => void;
  canRoll: boolean;
  onBuyAsset: () => void;
  canBuyAsset: boolean;
  onEndTurn: () => void;
  hasRolled: boolean;
}

export function GameBoard({ spaces, players, onSpaceClick, marketPhase, round, onRoll, canRoll, onBuyAsset, canBuyAsset, onEndTurn, hasRolled }: GameBoardProps) {
  // Board layout for CLOCKWISE movement starting from START (position 0)
  // 36 total spaces arranged in 10x10 grid (with corners)
  // Position 0-8: Bottom row (LEFT to RIGHT)
  // Position 9-17: Right side (BOTTOM to TOP)
  // Position 18-26: Top row (RIGHT to LEFT)
  // Position 27-35: Left side (TOP to BOTTOM)
  // Corners at: 0 (BL), 9 (BR), 18 (TR), 27 (TL)
  
  const bottomSpaces = spaces.slice(0, 9);       // 0-8
  const rightSpaces = spaces.slice(9, 18);       // 9-17
  const topSpaces = spaces.slice(18, 27);        // 18-26
  const leftSpaces = spaces.slice(27, 36);       // 27-35

  const playerPositions = players.map(p => ({
    id: p.id,
    position: p.position,
    color: p.color,
    icon: p.icon,
  }));

  return (
    <div className="inline-block p-2 rounded-lg shadow-2xl">
      <div className="grid grid-cols-[repeat(10,120px)] grid-rows-[repeat(10,120px)] gap-0">
        {/* Top row - LEFT to RIGHT: 27, 26, 25, 24, 23, 22, 21, 20, 19, 18 */}
        <div className="w-[120px] h-[120px]">
          <BoardSpace space={leftSpaces[0]} players={playerPositions} onSpaceClick={onSpaceClick} />
        </div>
        {topSpaces.slice(1).reverse().map(space => (
          <div key={space.id} className="w-[120px] h-[120px]">
            <BoardSpace space={space} players={playerPositions} onSpaceClick={onSpaceClick} />
          </div>
        ))}
        <div className="w-[120px] h-[120px]">
          <BoardSpace space={topSpaces[0]} players={playerPositions} onSpaceClick={onSpaceClick} />
        </div>

        {/* Middle rows - 8 rows */}
        {[...Array(8)].map((_, rowIndex) => (
          <Fragment key={`row-${rowIndex}`}>
            {/* Left side space - TOP to BOTTOM: 28, 29, 30, 31, 32, 33, 34, 35 */}
            <div className="w-[120px] h-[120px]">
              <BoardSpace 
                space={leftSpaces[rowIndex + 1]} 
                players={playerPositions} 
                onSpaceClick={onSpaceClick} 
              />
            </div>
            
            {/* Center area - 8 columns */}
            {rowIndex === 3 || rowIndex === 4 ? (
              // Center info area (spans 2 rows and 8 columns in the middle)
              rowIndex === 3 ? (
                <div className="col-span-8 row-span-2 flex gap-3 items-start justify-center p-4">
                  <div className="flex-1 flex flex-col gap-3">
                    <GameActions 
                      onRoll={onRoll}
                      canRoll={canRoll}
                      onBuyAsset={onBuyAsset} 
                      canBuyAsset={canBuyAsset} 
                      onEndTurn={onEndTurn} 
                      hasRolled={hasRolled} 
                    />
                    <MarketPhaseIndicator phase={marketPhase} round={round} />
                  </div>
                  <div className="flex-1">
                    <PolicyVoting round={round} />
                  </div>
                </div>
              ) : null
            ) : (
              [...Array(8)].map((_, colIndex) => (
                <div key={`empty-${rowIndex}-${colIndex}`} className="w-[120px] h-[120px]" />
              ))
            )}
            
            {/* Right side space - BOTTOM to TOP: 17, 16, 15, 14, 13, 12, 11, 10 */}
            <div className="w-[120px] h-[120px]">
              <BoardSpace 
                space={rightSpaces[8 - rowIndex]} 
                players={playerPositions} 
                onSpaceClick={onSpaceClick} 
              />
            </div>
          </Fragment>
        ))}

        {/* Bottom row - LEFT to RIGHT: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 */}
        <div className="w-[120px] h-[120px]">
          <BoardSpace space={bottomSpaces[0]} players={playerPositions} onSpaceClick={onSpaceClick} />
        </div>
        {bottomSpaces.slice(1, 9).map(space => (
          <div key={space.id} className="w-[120px] h-[120px]">
            <BoardSpace space={space} players={playerPositions} onSpaceClick={onSpaceClick} />
          </div>
        ))}
        <div className="w-[120px] h-[120px]">
          <BoardSpace space={rightSpaces[0]} players={playerPositions} onSpaceClick={onSpaceClick} />
        </div>
      </div>
    </div>
  );
}