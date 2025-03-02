import { useEffect } from "react";
import { Chess } from "chess.js";

const useAIPlayer = (game, setGame, setCurrentTurn, setGameOver) => {
  useEffect(() => {
    if (game.turn() === "b" && !game.game_over()) {
      setTimeout(() => {
        const possibleMoves = game.moves();
        if (possibleMoves.length === 0) {
          setGameOver(true);
          return;
        }
        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        let newGame = new Chess(game.fen());
        newGame.move(randomMove);
        setGame(newGame);
        setCurrentTurn(newGame.turn());
      }, 500);
    }
  }, [game, setGame, setCurrentTurn, setGameOver]);
};

export default useAIPlayer;
