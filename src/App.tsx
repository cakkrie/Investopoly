import { useState, useEffect } from 'react';
import { GameBoard } from './components/GameBoard';
import { PlayerStats } from './components/PlayerStats';
import { DiceRoller } from './components/DiceRoller';
import { MarketPhaseIndicator } from './components/MarketPhaseIndicator';
import { EventCard } from './components/EventCard';
import { AssetDetailsModal } from './components/AssetDetailsModal';
import { DiceRollModal } from './components/DiceRollModal';
import { DividendModal } from './components/DividendModal';
import { PlayerSetup } from './components/PlayerSetup';
import { TradeModal } from './components/TradeModal';
import { TradeOfferModal } from './components/TradeOfferModal';
import { MarketInfoModal } from './components/MarketInfoModal';
import { boardSpaces } from './data/boardSpaces';
import { GameState, MarketPhase, BoardSpace, Asset } from './types/game';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { PlayCircle, Users } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { applyMarketPriceChanges } from './utils/pricingEngine';

const marketPhases: MarketPhase[] = ['bull', 'bear'];

const sampleQuiz = {
  question: 'Which type of asset typically has the lowest risk?',
  options: ['Cryptocurrency', 'Government Bonds', 'Individual Stocks', 'Small-Cap Stocks'],
  correctAnswer: 1,
  explanation: 'Government bonds are backed by the government and have historically been the safest investment option with the lowest risk.',
};

const eventExamples = [
  { 
    type: 'market' as const, 
    title: 'Fed Raises Interest Rates', 
    description: 'The Federal Reserve just raised interest rates to combat inflation.', 
    impact: 'Market shifts to BEAR',
    marketChange: 'bear' as const
  },
  { 
    type: 'market' as const, 
    title: 'Fed Lowers Interest Rates', 
    description: 'The Federal Reserve just lowered interest rates to stimulate growth.', 
    impact: 'Market shifts to BULL',
    marketChange: 'bull' as const
  },
  { 
    type: 'market' as const, 
    title: 'Trump Raises Tariffs', 
    description: 'Trump just raised tariffs on imports, increasing trade tensions.', 
    impact: 'Market shifts to BEAR',
    marketChange: 'bear' as const
  },
  { 
    type: 'market' as const, 
    title: 'Trump Lowers Tariffs', 
    description: 'Trump just lowered tariffs, promoting free trade.', 
    impact: 'Market shifts to BULL',
    marketChange: 'bull' as const
  },
  { 
    type: 'market' as const, 
    title: 'Corporate Earnings Beat Expectations', 
    description: 'Corporate earnings are higher than expected across multiple sectors!', 
    impact: 'Market shifts to BULL',
    marketChange: 'bull' as const
  },
  { 
    type: 'market' as const, 
    title: 'Unemployment Rate Rising', 
    description: 'The unemployment rate is increasing, signaling economic concerns.', 
    impact: 'Market shifts to BEAR',
    marketChange: 'bear' as const
  },
];

const chanceCards = [
  {
    type: 'chance' as const,
    title: 'Job Offer!',
    description: 'You got a job offer!',
    impact: 'Receive $1,000',
    action: 'job-offer' as const
  },
  {
    type: 'chance' as const,
    title: 'Medical Emergency',
    description: 'Player has a medical emergency, have to pay $500 to get therapy',
    impact: 'Pay $500',
    action: 'medical-emergency' as const
  },
  {
    type: 'chance' as const,
    title: 'Crypto Crash :(',
    description: 'Crypto crash :(',
    impact: 'All crypto assets decrease by 30%',
    action: 'crypto-crash' as const
  },
  {
    type: 'chance' as const,
    title: 'AI Hype Continues',
    description: 'AI hype continues',
    impact: 'Tech stocks and S&P 500 ETF +15%, other stocks/ETFs/mutual funds +5%',
    action: 'ai-hype' as const
  },
  {
    type: 'chance' as const,
    title: 'AI Bubble Burst Expected',
    description: 'Experts expect AI bubble to burst',
    impact: 'Tech stocks -10%, other stocks/ETFs/mutual funds -5%',
    action: 'ai-bubble-burst' as const
  },
];

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [showPlayerSetup, setShowPlayerSetup] = useState(true);
  const [gameState, setGameState] = useState<GameState>({
    currentPlayer: 0,
    marketPhase: 'bull',
    round: 1,
    players: [],
    dice: 1,
  });

  const [spaces, setSpaces] = useState(boardSpaces);
  const [showEvent, setShowEvent] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(eventExamples[0]);
  const [selectedSpace, setSelectedSpace] = useState<BoardSpace | null>(null);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [hasRolled, setHasRolled] = useState(false);
  const [showDiceRoll, setShowDiceRoll] = useState(false);
  const [showDividendModal, setShowDividendModal] = useState(false);
  const [dividendData, setDividendData] = useState<{ total: number; breakdown: { name: string; dividend: number; count: number }[] }>({ total: 0, breakdown: [] });
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [showTradeOfferModal, setShowTradeOfferModal] = useState(false);
  const [showMarketInfo, setShowMarketInfo] = useState(false);
  const [tradeOffer, setTradeOffer] = useState<{
    fromPlayerId: number;
    fromPlayerName: string;
    fromPlayerColor: string;
    toPlayerId: number;
    offerCash: number;
    offerAssets: Asset[];
    requestCash: number;
    requestAssets: Asset[];
  } | null>(null);

  const playerColors = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B'];
  const playerIcons = ['dog', 'cat', 'bird', 'fish'] as const;
  const playerGoals = [
    'Retire with $2M in assets',
    'Reach FIRE by turn 20',
    'Own 3 dividend-paying stocks',
    'Build a diversified portfolio'
  ];

  const handleStartGame = (playerCount: number, playerNames: string[]) => {
    const players = playerNames.map((name, index) => ({
      id: index,
      name,
      color: playerColors[index],
      icon: playerIcons[index],
      cash: 1500,
      position: 0,
      assets: [],
      netWorth: 1500,
      goal: playerGoals[index]
    }));

    setGameState(prev => ({
      ...prev,
      players,
      currentPlayer: 0,
      round: 1,
      marketPhase: 'bull',
      dice: 1
    }));

    setSpaces(boardSpaces);
    setGameStarted(true);
    setShowPlayerSetup(false);
  };

  const handleNewGame = () => {
    setGameStarted(false);
    setShowPlayerSetup(true);
    setHasRolled(false);
    setShowDiceRoll(false);
  };

  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;

    setGameState(prev => ({
      ...prev,
      dice: roll,
    }));

    setHasRolled(true);
    setShowDiceRoll(true);

    // Move player
    setTimeout(() => {
      setGameState(prev => {
        const newPlayers = [...prev.players];
        const currentPlayer = newPlayers[prev.currentPlayer];
        const oldPosition = currentPlayer.position;
        const newPosition = (currentPlayer.position + roll) % 28; // 28 spaces (7 per side)
        currentPlayer.position = newPosition;

        // Check if passed or landed on START (position 0)
        if (newPosition < oldPosition || newPosition === 0) {
          currentPlayer.cash += 1000;
          toast.success('Passed START! Collected $1000');
        }

        // Check if passed or landed on DIVIDEND DAY (position 14)
        const passedDividendDay = oldPosition < 14 && newPosition >= 14;
        const landedOnDividendDay = newPosition === 14;
        
        if (passedDividendDay || landedOnDividendDay) {
          // Calculate dividends
          const assetMap = new Map<string, { name: string; dividend: number; count: number }>();
          
          currentPlayer.assets.forEach(asset => {
            const existing = assetMap.get(asset.name);
            if (existing) {
              existing.count += 1;
            } else {
              assetMap.set(asset.name, { name: asset.name, dividend: asset.dividend, count: 1 });
            }
          });

          const breakdown = Array.from(assetMap.values());
          const totalDividend = breakdown.reduce((sum, item) => sum + (item.dividend * item.count), 0);
          
          currentPlayer.cash += totalDividend;
          currentPlayer.netWorth = currentPlayer.cash + currentPlayer.assets.reduce((sum, a) => sum + a.currentPrice, 0);

          // Show dividend modal after a delay
          setTimeout(() => {
            setDividendData({ total: totalDividend, breakdown });
            setShowDividendModal(true);
          }, 1200);
        }

        return { ...prev, players: newPlayers };
      });

      // Check space type and trigger events
      const landedSpace = spaces[gameState.players[gameState.currentPlayer].position];
      if (landedSpace.type === 'chance') {
        setTimeout(() => {
          const randomChance = chanceCards[Math.floor(Math.random() * chanceCards.length)];
          setCurrentEvent(randomChance);
          setShowEvent(true);
        }, 500);
      } else if (landedSpace.type === 'corner' && landedSpace.name === 'MARKET EVENT') {
        setTimeout(() => {
          const randomEvent = eventExamples[Math.floor(Math.random() * eventExamples.length)];
          setCurrentEvent(randomEvent);
          setShowEvent(true);
        }, 500);
      }
    }, 1000);
  };

  const endTurn = () => {
    // Apply market price changes to all assets
    setSpaces(prev => {
      return prev.map(space => {
        if (space.type === 'asset' && space.asset) {
          return {
            ...space,
            asset: applyMarketPriceChanges(space.asset, gameState.marketPhase),
          };
        }
        return space;
      });
    });

    // Update player portfolio prices
    setGameState(prev => {
      const newPlayers = prev.players.map(player => ({
        ...player,
        assets: player.assets.map(asset => applyMarketPriceChanges(asset, prev.marketPhase)),
      }));

      // Recalculate net worth for all players
      newPlayers.forEach(player => {
        player.netWorth = player.cash + player.assets.reduce((sum, a) => sum + a.currentPrice, 0);
      });

      let nextPlayer = (prev.currentPlayer + 1) % prev.players.length;
      let newRound = prev.round;
      let newPhase = prev.marketPhase;

      // New round when back to player 1
      if (nextPlayer === 0) {
        newRound += 1;

        return {
          ...prev,
          players: newPlayers,
          currentPlayer: nextPlayer,
          round: newRound,
          marketPhase: newPhase,
        };
      }

      return {
        ...prev,
        players: newPlayers,
        currentPlayer: nextPlayer,
      };
    });

    setHasRolled(false);
    setShowDiceRoll(false);
  };

  const handleSpaceClick = (space: BoardSpace) => {
    if (space.type === 'asset' && space.asset) {
      setSelectedSpace(space);
      setShowAssetModal(true);
    }
  };

  const handleBuyAsset = (asset: Asset) => {
    const currentPlayer = gameState.players[gameState.currentPlayer];
    
    // Check if player is on the asset's space
    const currentSpace = spaces[currentPlayer.position];
    if (currentSpace.asset?.id !== asset.id) {
      toast.error('You can only buy the asset you landed on!');
      return;
    }
    
    if (currentPlayer.cash >= asset.currentPrice) {
      setGameState(prev => {
        const newPlayers = [...prev.players];
        const player = newPlayers[prev.currentPlayer];
        
        player.cash -= asset.currentPrice;
        // Add unique purchaseId for each purchase
        player.assets.push({ ...asset, purchaseId: `${asset.id}-${Date.now()}-${Math.random()}` });
        player.netWorth = player.cash + player.assets.reduce((sum, a) => sum + a.currentPrice, 0);

        return { ...prev, players: newPlayers };
      });

      // Update the toast to show player name and remaining cash
      const remainingCash = currentPlayer.cash - asset.currentPrice;
      toast.success(`${currentPlayer.name} successfully bought ${asset.name}! Cash remaining: $${remainingCash}`);
      setShowAssetModal(false);
    } else {
      toast.error('Insufficient funds!');
    }
  };

  const handleQuizAnswer = (correct: boolean) => {
    if (correct) {
      // Reward player with bonus cash
      setGameState(prev => {
        const newPlayers = [...prev.players];
        const player = newPlayers[prev.currentPlayer];
        player.cash += 100;
        player.netWorth = player.cash + player.assets.reduce((sum, a) => sum + a.currentPrice, 0);
        return { ...prev, players: newPlayers };
      });
      toast.success('Correct! You earned $100 bonus!');
    } else {
      toast.error('Incorrect. Study up on investing!');
    }
  };

  const handleBuyAssetClick = () => {
    if (!currentPlayer) return;
    const landedSpace = spaces[currentPlayer.position];
    if (landedSpace.type === 'asset' && landedSpace.asset) {
      setSelectedSpace(landedSpace);
      setShowAssetModal(true);
    } else {
      toast.info('You must land on an asset space to buy it!');
    }
  };

  const handleSellAsset = (asset: Asset) => {
    setGameState(prev => {
      const newPlayers = [...prev.players];
      const player = newPlayers[prev.currentPlayer];
      
      // Find and remove the specific asset instance
      const assetIndex = player.assets.findIndex(a => a.purchaseId === asset.purchaseId);
      if (assetIndex !== -1) {
        const soldAsset = player.assets[assetIndex];
        player.assets.splice(assetIndex, 1);
        player.cash += soldAsset.currentPrice;
        player.netWorth = player.cash + player.assets.reduce((sum, a) => sum + a.currentPrice, 0);
        
        toast.success(`Sold ${soldAsset.name} for $${soldAsset.currentPrice}!`);
      }
      
      return { ...prev, players: newPlayers };
    });
  };

  const handleTrade = () => {
    setShowTradeModal(true);
  };

  const handleProposeTrade = (
    targetPlayerId: number,
    offerCash: number,
    offerAssets: Asset[],
    requestCash: number,
    requestAssets: Asset[]
  ) => {
    const fromPlayer = gameState.players[gameState.currentPlayer];
    const toPlayer = gameState.players.find(p => p.id === targetPlayerId);
    
    if (!toPlayer) return;

    setTradeOffer({
      fromPlayerId: fromPlayer.id,
      fromPlayerName: fromPlayer.name,
      fromPlayerColor: fromPlayer.color,
      toPlayerId: targetPlayerId,
      offerCash,
      offerAssets,
      requestCash,
      requestAssets,
    });

    setShowTradeOfferModal(true);
    toast.info(`Trade offer sent to ${toPlayer.name}!`);
  };

  const handleAcceptTrade = () => {
    if (!tradeOffer) return;

    setGameState(prev => {
      const newPlayers = [...prev.players];
      const fromPlayer = newPlayers.find(p => p.id === tradeOffer.fromPlayerId);
      const toPlayer = newPlayers.find(p => p.id === tradeOffer.toPlayerId);

      if (!fromPlayer || !toPlayer) return prev;

      // Transfer cash
      fromPlayer.cash -= tradeOffer.offerCash;
      fromPlayer.cash += tradeOffer.requestCash;
      toPlayer.cash += tradeOffer.offerCash;
      toPlayer.cash -= tradeOffer.requestCash;

      // Transfer assets from fromPlayer to toPlayer
      tradeOffer.offerAssets.forEach(asset => {
        const index = fromPlayer.assets.findIndex(a => a.purchaseId === asset.purchaseId);
        if (index !== -1) {
          const transferredAsset = fromPlayer.assets.splice(index, 1)[0];
          toPlayer.assets.push(transferredAsset);
        }
      });

      // Transfer assets from toPlayer to fromPlayer
      tradeOffer.requestAssets.forEach(asset => {
        const index = toPlayer.assets.findIndex(a => a.purchaseId === asset.purchaseId);
        if (index !== -1) {
          const transferredAsset = toPlayer.assets.splice(index, 1)[0];
          fromPlayer.assets.push(transferredAsset);
        }
      });

      // Update net worth
      fromPlayer.netWorth = fromPlayer.cash + fromPlayer.assets.reduce((sum, a) => sum + a.currentPrice, 0);
      toPlayer.netWorth = toPlayer.cash + toPlayer.assets.reduce((sum, a) => sum + a.currentPrice, 0);

      return { ...prev, players: newPlayers };
    });

    toast.success('Trade completed successfully!');
    setShowTradeOfferModal(false);
    setTradeOffer(null);
  };

  const handleDeclineTrade = () => {
    if (!tradeOffer) return;
    
    const fromPlayer = gameState.players.find(p => p.id === tradeOffer.fromPlayerId);
    toast.info(`Trade declined by ${gameState.players.find(p => p.id === tradeOffer.toPlayerId)?.name}`);
    setShowTradeOfferModal(false);
    setTradeOffer(null);
  };

  const handleEventClose = () => {
    const event = currentEvent as any;
    
    // Handle market events
    if (event.marketChange && event.marketChange !== gameState.marketPhase) {
      setGameState(prev => ({
        ...prev,
        marketPhase: event.marketChange as MarketPhase,
      }));
      toast.success(`Market changed to ${event.marketChange.toUpperCase()}!`, {
        duration: 3000,
      });
    }
    
    // Handle chance card actions
    if (event.action) {
      switch (event.action) {
        case 'job-offer':
          setGameState(prev => {
            const newPlayers = [...prev.players];
            const player = newPlayers[prev.currentPlayer];
            player.cash += 1000;
            player.netWorth = player.cash + player.assets.reduce((sum, a) => sum + a.currentPrice, 0);
            return { ...prev, players: newPlayers };
          });
          toast.success('You received $1,000 from your new job!');
          break;
          
        case 'medical-emergency':
          setGameState(prev => {
            const newPlayers = [...prev.players];
            const player = newPlayers[prev.currentPlayer];
            player.cash = Math.max(0, player.cash - 500);
            player.netWorth = player.cash + player.assets.reduce((sum, a) => sum + a.currentPrice, 0);
            return { ...prev, players: newPlayers };
          });
          toast.error('Medical emergency! Paid $500 for therapy');
          break;
          
        case 'crypto-crash':
          // Decrease all crypto assets by 30%
          setSpaces(prev => prev.map(space => {
            if (space.type === 'asset' && space.asset && space.asset.type === 'crypto') {
              return {
                ...space,
                asset: {
                  ...space.asset,
                  currentPrice: Math.round(space.asset.currentPrice * 0.7),
                },
              };
            }
            return space;
          }));
          
          // Update player portfolios
          setGameState(prev => {
            const newPlayers = prev.players.map(player => ({
              ...player,
              assets: player.assets.map(asset => 
                asset.type === 'crypto' 
                  ? { ...asset, currentPrice: Math.round(asset.currentPrice * 0.7) }
                  : asset
              ),
            }));
            
            // Recalculate net worth
            newPlayers.forEach(player => {
              player.netWorth = player.cash + player.assets.reduce((sum, a) => sum + a.currentPrice, 0);
            });
            
            return { ...prev, players: newPlayers };
          });
          toast.error('Crypto crash! All crypto assets decreased by 30%');
          break;
          
        case 'ai-hype':
          // Tech Stock and S&P 500 ETF increase by 15%
          // All other stocks, ETFs, mutual funds increase by 5%
          setSpaces(prev => prev.map(space => {
            if (space.type === 'asset' && space.asset) {
              const isTechStock = space.asset.name === 'Tech Stock';
              const isSP500 = space.asset.name === 'S&P 500 ETF';
              const isStockETForMF = ['stock', 'etf', 'mutual-fund'].includes(space.asset.type);
              
              if (isTechStock || isSP500) {
                return {
                  ...space,
                  asset: {
                    ...space.asset,
                    currentPrice: Math.round(space.asset.currentPrice * 1.15),
                  },
                };
              } else if (isStockETForMF) {
                return {
                  ...space,
                  asset: {
                    ...space.asset,
                    currentPrice: Math.round(space.asset.currentPrice * 1.05),
                  },
                };
              }
            }
            return space;
          }));
          
          // Update player portfolios
          setGameState(prev => {
            const newPlayers = prev.players.map(player => ({
              ...player,
              assets: player.assets.map(asset => {
                const isTechStock = asset.name === 'Tech Stock';
                const isSP500 = asset.name === 'S&P 500 ETF';
                const isStockETForMF = ['stock', 'etf', 'mutual-fund'].includes(asset.type);
                
                if (isTechStock || isSP500) {
                  return { ...asset, currentPrice: Math.round(asset.currentPrice * 1.15) };
                } else if (isStockETForMF) {
                  return { ...asset, currentPrice: Math.round(asset.currentPrice * 1.05) };
                }
                return asset;
              }),
            }));
            
            // Recalculate net worth
            newPlayers.forEach(player => {
              player.netWorth = player.cash + player.assets.reduce((sum, a) => sum + a.currentPrice, 0);
            });
            
            return { ...prev, players: newPlayers };
          });
          toast.success('AI hype continues! Tech stocks soaring!');
          break;
          
        case 'ai-bubble-burst':
          // Tech Stock decreases by 10%
          // All other stocks, ETFs, mutual funds decrease by 5%
          setSpaces(prev => prev.map(space => {
            if (space.type === 'asset' && space.asset) {
              const isTechStock = space.asset.name === 'Tech Stock';
              const isStockETForMF = ['stock', 'etf', 'mutual-fund'].includes(space.asset.type);
              
              if (isTechStock) {
                return {
                  ...space,
                  asset: {
                    ...space.asset,
                    currentPrice: Math.round(space.asset.currentPrice * 0.9),
                  },
                };
              } else if (isStockETForMF) {
                return {
                  ...space,
                  asset: {
                    ...space.asset,
                    currentPrice: Math.round(space.asset.currentPrice * 0.95),
                  },
                };
              }
            }
            return space;
          }));
          
          // Update player portfolios
          setGameState(prev => {
            const newPlayers = prev.players.map(player => ({
              ...player,
              assets: player.assets.map(asset => {
                const isTechStock = asset.name === 'Tech Stock';
                const isStockETForMF = ['stock', 'etf', 'mutual-fund'].includes(asset.type);
                
                if (isTechStock) {
                  return { ...asset, currentPrice: Math.round(asset.currentPrice * 0.9) };
                } else if (isStockETForMF) {
                  return { ...asset, currentPrice: Math.round(asset.currentPrice * 0.95) };
                }
                return asset;
              }),
            }));
            
            // Recalculate net worth
            newPlayers.forEach(player => {
              player.netWorth = player.cash + player.assets.reduce((sum, a) => sum + a.currentPrice, 0);
            });
            
            return { ...prev, players: newPlayers };
          });
          toast.error('AI bubble burst expected! Tech stocks declining');
          break;
      }
    }
    
    setShowEvent(false);
  };

  const currentPlayer = gameState.players[gameState.currentPlayer];
  const canBuyAsset = selectedSpace?.asset && currentPlayer
    ? currentPlayer.cash >= selectedSpace.asset.currentPrice && selectedSpace.asset.owner === null
    : false;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl mb-2 text-slate-800">INVESTOPOLY</h1>
              <p className="text-sm text-gray-600">Learn investing through gameplay</p>
            </div>
            <div className="flex items-center gap-3">
              {gameStarted && (
                <Card className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">{gameState.players.length} Players</span>
                  </div>
                </Card>
              )}
              <Button variant="outline" className="gap-2" onClick={handleNewGame}>
                <PlayCircle className="w-4 h-4" />
                New Game
              </Button>
            </div>
          </div>
        </header>

        {gameStarted && currentPlayer && (
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_260px] gap-4">
            {/* Left Column - Game Board */}
            <div>
              <GameBoard 
                spaces={spaces} 
                players={gameState.players}
                onSpaceClick={handleSpaceClick}
                marketPhase={gameState.marketPhase}
                round={gameState.round}
                dice={gameState.dice}
                onRoll={rollDice}
                canRoll={!hasRolled}
                onBuyAsset={handleBuyAssetClick}
                canBuyAsset={hasRolled && spaces[currentPlayer.position].type === 'asset' && spaces[currentPlayer.position].asset?.owner === null}
                onEndTurn={endTurn}
                hasRolled={hasRolled}
                onTrade={handleTrade}
                onMarketInfoClick={() => setShowMarketInfo(true)}
              />
            </div>

            {/* Right Column - Player Stats (compact) */}
            <div className="grid grid-cols-2 xl:grid-cols-1 gap-2.5">
              {gameState.players.map(player => (
                <PlayerStats 
                  key={player.id}
                  player={player}
                  isCurrentPlayer={player.id === gameState.currentPlayer}
                  onSellAsset={handleSellAsset}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <EventCard 
        open={showEvent}
        onClose={handleEventClose}
        title={currentEvent.title}
        description={currentEvent.description}
        type={currentEvent.type}
        impact={currentEvent.impact}
      />

      <AssetDetailsModal 
        open={showAssetModal}
        onClose={() => setShowAssetModal(false)}
        asset={selectedSpace?.asset || null}
        onBuy={handleBuyAsset}
        onSell={handleSellAsset}
        canBuy={canBuyAsset}
      />

      <DiceRollModal 
        open={showDiceRoll}
        onClose={() => setShowDiceRoll(false)}
        dice={gameState.dice}
      />

      <PlayerSetup 
        open={showPlayerSetup}
        onClose={() => setShowPlayerSetup(false)}
        onStartGame={handleStartGame}
      />

      <DividendModal 
        open={showDividendModal}
        onClose={() => setShowDividendModal(false)}
        totalDividend={dividendData.total}
        assetDividends={dividendData.breakdown}
      />

      <TradeModal 
        open={showTradeModal}
        onClose={() => setShowTradeModal(false)}
        currentPlayer={currentPlayer}
        allPlayers={gameState.players}
        onProposeTrade={handleProposeTrade}
      />

      <TradeOfferModal 
        open={showTradeOfferModal}
        onClose={() => setShowTradeOfferModal(false)}
        tradeOffer={tradeOffer}
        onAccept={handleAcceptTrade}
        onDecline={handleDeclineTrade}
      />

      <MarketInfoModal 
        open={showMarketInfo}
        onClose={() => setShowMarketInfo(false)}
        phase={gameState.marketPhase}
      />
    </div>
  );
}

export default App;