import React, { useEffect } from "react";
import { calculateBestMove } from "./difficultAI.js"; // ✅ Ensure this is correctly exported

const DifficultMode = ({ game, setGame, setCurrentTurn, setBlackMoves, handleMove }) => {
  useEffect(() => {
    if (game.turn() === "b") {
      console.log("🧠 AI Thinking...");

      const bestMove = calculateBestMove(game.fen()); // ✅ AI calculates best move
      if (!bestMove) {
        console.log("⚠️ No valid move found!");
        return;
      }

      console.log("🤖 AI Move:", bestMove.from, "→", bestMove.to);
      handleMove(bestMove.from, bestMove.to); // ✅ Ensure move is executed properly
    }
  }, [game, handleMove]); // ✅ Only re-run when game state changes

  return <div>AI Difficult Mode Active</div>;
};

export default DifficultMode;
