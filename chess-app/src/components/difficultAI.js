export function calculateBestMove(fen) {
    const { Chess } = require("chess.js"); // Import Chess.js
    const game = new Chess(fen); // Create a new game instance from FEN
  
    const moves = game.moves({ verbose: true }); // Get all possible moves with details
    if (moves.length === 0) return null; // No moves available
  
    const bestMove = moves[Math.floor(Math.random() * moves.length)]; // Pick a random move
  
    return { from: bestMove.from, to: bestMove.to }; // ✅ Return move, not FEN
  }
  