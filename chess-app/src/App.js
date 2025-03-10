import React, { useState, useEffect, useCallback } from "react";
import { Chess } from "chess.js";
import ChessboardComponent from "./components/ChessboardComponent";
import MoveHistoryTable from "./components/MoveHistoryTable";
import GameControls from "./components/GameControls";
import Timer from "./components/Timer";
import io from "socket.io-client";
import useAIPlayer from "./hooks/useAIPlayer"; // ✅ AI Player Hook
import DifficultMode from "./components/DifficultMode.jsx"; // AI - Difficult

import "./styles/App.css";
import "./styles/Header.css";

// ✅ Connect to Socket.io server (no rooms)
const socket = io("ws://localhost:5000", {
  transports: ["websocket"],
  withCredentials: true,
});

const App = () => {
  const [game, setGame] = useState(new Chess());
  const [gameMode, setGameMode] = useState(""); 
  const [currentTurn, setCurrentTurn] = useState("w");
  const [whiteMoves, setWhiteMoves] = useState([]);
  const [blackMoves, setBlackMoves] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [moveMade, setMoveMade] = useState(false);
  const [timerActive, setTimerActive] = useState(false);

  // ✅ AI logic only applies when not in multiplayer mode
  useAIPlayer(game, setGame, setCurrentTurn, setGameOver, gameMode);

  /**
   * 🏆 Handle "Play with Friend" move logic (without rooms)
   */
  const handleMoveFriendMode = useCallback((from, to) => {
    if (!game) return;

    const updatedGame = new Chess(game.fen());
    const move = updatedGame.move({ from, to, promotion: "q" });

    if (!move) {
      console.log("❌ Invalid Move:", { from, to });
      return;
    }

    console.log(`✅ Move Made: ${from} → ${to}`);
    
    setGame(updatedGame);
    setCurrentTurn(updatedGame.turn());

    // ✅ Send move to all players (without a room)
    socket.emit("move", { from, to, fen: updatedGame.fen() });
  }, [game]);

  /**
   * 🏆 General Move Handling (AI, Solo, and Friend Mode)
   */
  const handleMove = useCallback((from, to) => {
    if (gameMode === "Play with Friend") {
      handleMoveFriendMode(from, to);
    } else {
      const updatedGame = new Chess(game.fen());
      const move = updatedGame.move({ from, to, promotion: "q" });
  
      if (move) {
        setGame(updatedGame);
        setCurrentTurn(updatedGame.turn());
  
        console.log("✅ Move Made:", move.san, "by", move.color);
  
        setMoveMade(true); // ✅ Set moveMade to true when a move is made
  
        if (move.color === "w") {
          setWhiteMoves((prev) => [...prev, move.san]);
        } else {
          setBlackMoves((prev) => [...prev, move.san]);
        }
      } else {
        console.log("❌ Invalid Move Attempt");
      }
    }
  }, [game, gameMode, handleMoveFriendMode]);

  /**
   * ✅ Listen for moves from opponent in "Play with Friend" mode
   */
  useEffect(() => {
    if (gameMode === "Play with Friend") {
      socket.on("move", ({ fen }) => {
        console.log(`📥 Received Move → New FEN: ${fen}`);

        const updatedGame = new Chess(fen); // ✅ Load opponent's move
        setGame(updatedGame);
        setCurrentTurn(updatedGame.turn());
      });

      return () => socket.off("move");
    }
  }, [gameMode]);

  /**
   * ✅ Handle Game Mode Selection
   */
  const handleGameModeSelect = (mode, difficulty) => {
    setGameMode(mode);
    resetGame();
  };

  // AiDifficultMode
  const handleGamediffiModeSelect = (mode, difficulty) => {
    setGameMode(mode);

    if (mode === "AI" && difficulty === "difficult") {
      console.log("🎯 AI - Difficult Mode Selected");
      setGameMode("AI_difficult");
    }

    resetGame();
  };

  /**
   * ♻️ Reset Game State
   */
  const resetGame = () => {
    setGame(new Chess());
    setWhiteMoves([]);
    setBlackMoves([]);
    setGameOver(false);
    setCurrentTurn("w");
    setMoveMade(false);
    setResetTimer(true);
    setTimerActive(false); // ✅ Reset timer
  };

  return (
    <div className="container">
      <GameControls handleGameModeSelect={handleGameModeSelect} handleGamediffiModeSelect={handleGamediffiModeSelect} resetGame={resetGame} />

      {/* ✅ Render DifficultMode when AI_difficult is selected */}
      {gameMode === "AI_difficult" && (
        <DifficultMode 
          game={game} 
          setGame={setGame} 
          setCurrentTurn={setCurrentTurn} 
          setBlackMoves={setBlackMoves} 
          handleMove={handleMove} // ✅ Pass handleMove to fix the error
        />
      )}

      <div className="board-and-history">
        <div className="chess-container">
          <div className="timer-container black-timer-container">
            <Timer currentTurn={currentTurn} moveMade={moveMade} resetTimer={resetTimer} setGameOver={setGameOver} playerColor="black" timerActive={timerActive} setTimerActive={setTimerActive} />
          </div>

          <div className="game-container">
            <ChessboardComponent position={game.fen()} onMove={handleMove} />
            <MoveHistoryTable whiteMoves={whiteMoves} blackMoves={blackMoves} />
          </div>

          <div className="timer-container white-timer-container">
            <Timer 
              currentTurn={currentTurn} 
              moveMade={moveMade} 
              resetTimer={resetTimer} 
              setGameOver={setGameOver} 
              playerColor="white" 
              timerActive={timerActive}  
              setTimerActive={setTimerActive} // ✅ Added this
            />
          </div>
        </div>

        <p>{gameOver ? "Game Over" : "Game On"}</p>
      </div>
    </div>
  );
};

export default App;
