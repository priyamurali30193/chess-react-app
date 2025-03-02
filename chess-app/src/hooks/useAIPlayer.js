import { useEffect } from "react";
import { Chess } from "chess.js";

const useAIPlayer = (game, setGame, setCurrentTurn, setGameOver) => {
  useEffect(() => {
    if (!game || !(game instanceof Chess)) {
      console.error("❌ ERROR: game is NOT an instance of Chess", game);
      return;
    }

    console.log("Current game state:", game.fen());
    console.log("Is game an instance of Chess?", game instanceof Chess);

    if (game.turn() === "b") {
      // ✅ Corrected method call
      if (game.isGameOver()) {  
        setGameOver(true);
        return;
      }

      setTimeout(() => {
        const possibleMoves = game.moves();
        if (possibleMoves.length === 0) {
          setGameOver(true);
          return;
        }

        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        const newGame = new Chess(game.fen());
        newGame.move(randomMove);
        setGame(newGame);
        setCurrentTurn(newGame.turn());
      }, 500);
    }
  }, [game, setGame, setCurrentTurn, setGameOver]);
};

export default useAIPlayer;
