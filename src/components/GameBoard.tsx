import { Fragment } from 'react';
import { BoardSpace as BoardSpaceType, Player, MarketPhase } from '../types/game';
import { BoardSpace } from './BoardSpace';
import { MarketPhaseIndicator } from './MarketPhaseIndicator';
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
  dice?: number;
  onTrade?: () => void;
  onMarketInfoClick?: () => void;
}

export function GameBoard({ spaces, players, onSpaceClick, marketPhase, round, onRoll, canRoll, onBuyAsset, canBuyAsset, onEndTurn, hasRolled, dice, onTrade, onMarketInfoClick }: GameBoardProps) {
  // Board layout for CLOCKWISE movement starting from START (position 0)
  // 28 total spaces arranged in 8x8 grid (with corners)
  // Position 0-6: Bottom row (LEFT to RIGHT)
  // Position 7-13: Right side (BOTTOM to TOP)
  // Position 14-20: Top row (RIGHT to LEFT)
  // Position 21-27: Left side (TOP to BOTTOM)
  // Corners at: 0 (BL), 7 (BR), 14 (TR), 21 (TL)
  
  const bottomSpaces = spaces.slice(0, 7);       // 0-6
  const rightSpaces = spaces.slice(7, 14);       // 7-13
  const topSpaces = spaces.slice(14, 21);        // 14-20
  const leftSpaces = spaces.slice(21, 28);       // 21-27

  const playerPositions = players.map(p => ({
    id: p.id,
    position: p.position,
    color: p.color,
    icon: p.icon,
  }));

  return (
    <div className="inline-block p-4 rounded-lg shadow-2xl bg-[#1a7f5c]">
      <div className="grid grid-cols-[repeat(8,120px)] grid-rows-[repeat(8,120px)] gap-0 bg-[#c8e6c9] p-2">
        {/* Top row - LEFT to RIGHT: 21, 20, 19, 18, 17, 16, 15, 14 */}
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

        {/* Middle rows - 6 rows */}
        {[...Array(6)].map((_, rowIndex) => (
          <Fragment key={`row-${rowIndex}`}>
            {/* Left side space - TOP to BOTTOM: 22, 23, 24, 25, 26, 27 */}
            <div className="w-[120px] h-[120px]">
              <BoardSpace 
                space={leftSpaces[rowIndex + 1]} 
                players={playerPositions} 
                onSpaceClick={onSpaceClick} 
              />
            </div>
            
            {/* Center area - 6 columns */}
            {rowIndex === 3 ? (
              // Center info area (spans 1 row and 6 columns in the middle)
              <div className="col-span-6 flex gap-3 items-center justify-center p-4">
                <div className="w-[50%] flex flex-col gap-3">
                  <GameActions 
                    onRoll={onRoll}
                    canRoll={canRoll}
                    onBuyAsset={onBuyAsset} 
                    canBuyAsset={canBuyAsset} 
                    onEndTurn={onEndTurn} 
                    hasRolled={hasRolled}
                    onTrade={onTrade}
                  />
                  <MarketPhaseIndicator phase={marketPhase} round={round} onClick={onMarketInfoClick} />
                </div>
              </div>
            ) : (
              [...Array(6)].map((_, colIndex) => (
                <div key={`empty-${rowIndex}-${colIndex}`} className="w-[120px] h-[120px]" />
              ))
            )}
            
            {/* Right side space - BOTTOM to TOP: 13, 12, 11, 10, 9, 8 */}
            <div className="w-[120px] h-[120px]">
              <BoardSpace 
                space={rightSpaces[6 - rowIndex]} 
                players={playerPositions} 
                onSpaceClick={onSpaceClick} 
              />
            </div>
          </Fragment>
        ))}

        {/* Bottom row - LEFT to RIGHT: 0, 1, 2, 3, 4, 5, 6, 7 */}
        <div className="w-[120px] h-[120px]">
          <BoardSpace space={bottomSpaces[0]} players={playerPositions} onSpaceClick={onSpaceClick} />
        </div>
        {bottomSpaces.slice(1, 7).map(space => (
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