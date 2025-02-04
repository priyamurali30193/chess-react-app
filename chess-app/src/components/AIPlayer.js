import { Chess } from "chess.js";
const AIPlayer = (game, setGame, setWhiteMoves, setBlackMoves) => {
    // Check if the game is over or if no moves are left
    const possibleMoves = game.moves();
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0) return;
  
    // Select a random move
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    const move = game.move(possibleMoves[randomIndex]); // AI makes a move
  
    if (move) {
      setGame(new Chess(game.fen())); // Update the game state
  
      // Track the move in history
      if (game.turn() === 'w') {
        setWhiteMoves((prevMoves) => [...prevMoves, move.san]);
      } else {
        setBlackMoves((prevMoves) => [...prevMoves, move.san]);
      }
    }
  };
  
  export default AIPlayer;
  