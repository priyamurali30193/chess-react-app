import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import ChessboardComponent from './components/ChessboardComponent';
import MoveHistoryTable from './components/MoveHistoryTable';
import GameControls from './components/GameControls';
import AIPlayer from './components/AIPlayer';
import Timer from './components/Timer'; // Import Timer component
import './styles/App.css';

const App = () => {
  const [game, setGame] = useState(new Chess());
  const [gameOver, setGameOver] = useState(false);
  const [whiteMoves, setWhiteMoves] = useState([]);
  const [blackMoves, setBlackMoves] = useState([]);
  const [showGameOptions, setShowGameOptions] = useState(false);
  const [gameMode, setGameMode] = useState(null);
  const [currentTurn, setCurrentTurn] = useState('w'); // Track current player's turn
  const [moveMade, setMoveMade] = useState(false); // Track if move was made
  const [resetTimer, setResetTimer] = useState(false); // Reset timer flag

  // Handle player move
  const handleMove = (from, to) => {
    if (gameOver) return false;

    let move = null;
    setGame((prevGame) => {
      move = prevGame.move({ from, to, promotion: 'q' });
      return { ...prevGame };
    });

    if (move === null) {
      alert('Invalid Move!');
    } else {
      if (game.turn() === 'w') {
        setWhiteMoves((prevMoves) => [...prevMoves, move.san]);
        setCurrentTurn('b'); // Switch turn to black
      } else {
        setBlackMoves((prevMoves) => [...prevMoves, move.san]);
        setCurrentTurn('w'); // Switch turn to white
      }
      setMoveMade(true); // Move is made, start/stop the timer
    }
  };

  // Reset the game
  const resetGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setGameOver(false);
    setWhiteMoves([]);
    setBlackMoves([]);
    setMoveMade(false); // Reset move state
    setCurrentTurn('w'); // Reset to white's turn
    setResetTimer(true); // Reset timer
    setTimeout(() => setResetTimer(false), 0); // Allow next reset after current reset
  };

  const toggleGameOptions = () => setShowGameOptions(!showGameOptions);

  const handleGameModeSelect = (mode) => {
    setGameMode(mode);
    setShowGameOptions(false);
    resetGame();
  };

  useEffect(() => {
    if (gameMode === 'AI' && game.turn() === 'b') {
      AIPlayer(game, setGame, setWhiteMoves, setBlackMoves); // AI move when it's the AI's turn
    }
  }, [game, gameMode]);

  return (
    <div className="app-container">
      <div className="logo">
        <h1>DiyaChess </h1>
      </div>

      <GameControls
        toggleGameOptions={toggleGameOptions}
        showGameOptions={showGameOptions}
        handleGameModeSelect={handleGameModeSelect}
        resetGame={resetGame}
      />

      <div className="board-and-history">
        <div className="chess-container">
          {/* White Timer */}
          <div className="timer-container white-timer-container">
            <Timer
              currentTurn={currentTurn}
              moveMade={moveMade}
              resetTimer={resetTimer}
              setGameOver={setGameOver}
              playerColor="black" // Pass player color to differentiate timers
            />
          </div>

          <ChessboardComponent
            position={game.fen()}
            onPieceDrop={(from, to) => handleMove(from, to)}
          />

          {/* Black Timer */}
          <div className="timer-container black-timer-container">
            <Timer
              currentTurn={currentTurn}
              moveMade={moveMade}
              resetTimer={resetTimer}
              setGameOver={setGameOver}
              playerColor="white" // Pass player color to differentiate timers
            />
          </div>
        </div>

        <div className="move-history-container">
          <h3>Move History:</h3>
          <div className="move-history-flex">
            <MoveHistoryTable moves={blackMoves} playerColor="White" />
            <MoveHistoryTable moves={whiteMoves} playerColor="Black" />
          </div>
        </div>

        <div>
          <p>Status: {game.game_over() ? 'Game Over' : 'Game On'}</p>
        </div>
      </div>

      <div className="about-us">
        <h3>About Us</h3>
        <p>“Chess holds its master in its own bonds, shaking the mind and brain so that the inner freedom of the very strongest must suffer.” .</p>
        <p>As players advance and start playing timed games, chess teaches students how to solve problems on-the-fly. In fact, one study conducted amongst school-aged children found that students who participated in chess instruction over a week-long period significantly improved their problem-solving abilities.<br/>
        </p>
      </div>
    </div>
  );
};

export default App;
