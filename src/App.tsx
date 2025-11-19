import { useState, useEffect } from 'react';
import { GameBoard } from './components/GameBoard';
import { PlayerStats } from './components/PlayerStats';
import { DiceRoller } from './components/DiceRoller';
import { MarketPhaseIndicator } from './components/MarketPhaseIndicator';
import { EventCard } from './components/EventCard';
import { QuizModal } from './components/QuizModal';
import { AssetDetailsModal } from './components/AssetDetailsModal';
import { PolicyVoting } from './components/PolicyVoting';
import { DiceRollModal } from './components/DiceRollModal';
import { PlayerSetup } from './components/PlayerSetup';
import { boardSpaces } from './data/boardSpaces';
import { GameState, MarketPhase, BoardSpace, Asset } from './types/game';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { PlayCircle, Users } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const marketPhases: MarketPhase[] = ['bull', 'bear', 'stagnation', 'recession'];

const sampleQuiz = {
  question: 'Which type of asset typically has the lowest risk?',
  options: ['Cryptocurrency', 'Government Bonds', 'Individual Stocks', 'Small-Cap Stocks'],
  correctAnswer: 1,
  explanation: 'Government bonds are backed by the government and have historically been the safest investment option with the lowest risk.',
};

const eventExamples = [
  { type: 'chance' as const, title: 'Tech Boom!', description: 'The technology sector is experiencing unprecedented growth!', impact: 'All tech stocks increase by 20%' },
  { type: 'event' as const, title: 'Interest Rates Rise!', description: 'The Federal Reserve has announced an interest rate hike.', impact: 'Bond prices increase, stock prices decrease by 10%' },
  { type: 'chance' as const, title: 'Crypto Crash', description: 'Major cryptocurrency exchange collapses!', impact: 'All crypto assets lose 30% of their value' },
  { type: 'event' as const, title: 'Dividend Windfall', description: 'Your investments are paying out higher than expected dividends!', impact: 'Receive double dividends this round' },
];

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [showPlayerSetup, setShowPlayerSetup] = useState(true);
  const [gameState, setGameState] = useState<GameState>({
    currentPlayer: 0,
    marketPhase: 'bull',
    round: 1,
    players: [],
    dice: [1, 1],
  });

  const [spaces, setSpaces] = useState(boardSpaces);
  const [showEvent, setShowEvent] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(eventExamples[0]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<BoardSpace | null>(null);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [hasRolled, setHasRolled] = useState(false);
  const [showDiceRoll, setShowDiceRoll] = useState(false);

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
      dice: [1, 1]
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
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    const total = die1 + die2;

    setGameState(prev => ({
      ...prev,
      dice: [die1, die2],
    }));

    setHasRolled(true);
    setShowDiceRoll(true);

    // 20% chance to trigger quiz when rolling dice
    const shouldShowQuiz = Math.random() < 0.2;
    if (shouldShowQuiz) {
      setTimeout(() => {
        setShowQuiz(true);
      }, 500);
    }

    // Move player
    setTimeout(() => {
      setGameState(prev => {
        const newPlayers = [...prev.players];
        const currentPlayer = newPlayers[prev.currentPlayer];
        const oldPosition = currentPlayer.position;
        const newPosition = (currentPlayer.position + total) % 40;
        currentPlayer.position = newPosition;

        // Check if passed or landed on START (position 0)
        if (newPosition < oldPosition || newPosition === 0) {
          currentPlayer.cash += 1000;
          toast.success('Passed START! Collected $1000');
        }

        return { ...prev, players: newPlayers };
      });

      // Check space type and trigger events
      const landedSpace = spaces[gameState.players[gameState.currentPlayer].position];
      if (landedSpace.type === 'chance' || landedSpace.type === 'event') {
        setTimeout(() => {
          const randomEvent = eventExamples[Math.floor(Math.random() * eventExamples.length)];
          setCurrentEvent(randomEvent);
          setShowEvent(true);
        }, 500);
      }
    }, 1000);
  };

  const endTurn = () => {
    setGameState(prev => {
      let nextPlayer = (prev.currentPlayer + 1) % prev.players.length;
      let newRound = prev.round;
      let newPhase = prev.marketPhase;

      // New round when back to player 1
      if (nextPlayer === 0) {
        newRound += 1;
        // Change market phase every 3 rounds
        if (newRound % 3 === 0) {
          newPhase = marketPhases[Math.floor(Math.random() * marketPhases.length)];
          toast.info(`Market Phase Changed: ${newPhase.toUpperCase()}`);
        }

        // Pay dividends
        const updatedPlayers = prev.players.map(player => ({
          ...player,
          cash: player.cash + player.assets.reduce((sum, asset) => sum + asset.dividend, 0),
        }));

        return {
          ...prev,
          currentPlayer: nextPlayer,
          round: newRound,
          marketPhase: newPhase,
          players: updatedPlayers,
        };
      }

      return {
        ...prev,
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

      toast.success(`Purchased ${asset.name} for $${asset.currentPrice}!`);
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
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
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
              />
            </div>

            {/* Right Column - Player Stats (compact) */}
            <div className="space-y-3">
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
        onClose={() => setShowEvent(false)}
        title={currentEvent.title}
        description={currentEvent.description}
        type={currentEvent.type}
        impact={currentEvent.impact}
      />

      <QuizModal 
        open={showQuiz}
        onClose={() => setShowQuiz(false)}
        quiz={sampleQuiz}
        onAnswer={handleQuizAnswer}
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
    </div>
  );
}

export default App;