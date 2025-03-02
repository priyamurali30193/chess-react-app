import React, { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import puzzles from "./puzzles.json"; // ✅ Import local puzzles
import "../styles/ChessPuzzle.css";

const ChessPuzzle = () => {
  const [chess, setChess] = useState(new Chess());
  const [fen, setFen] = useState("");
  const [solution, setSolution] = useState([]);
  const [playerToMove, setPlayerToMove] = useState("");
  const [userMoves, setUserMoves] = useState([]);
  const [showSolution, setShowSolution] = useState(false);
  const [hintMove, setHintMove] = useState("");

  const loadRandomPuzzle = () => {
    const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    const newChess = new Chess();
    newChess.load(puzzle.fen);

    setChess(newChess);
    setFen(puzzle.fen);
    setSolution(puzzle.solution);
    setPlayerToMove(puzzle.playerToMove === "w" ? "White" : "Black");
    setUserMoves([]);
    setShowSolution(false);
    setHintMove("");
  };

  useEffect(() => {
    loadRandomPuzzle();
  }, []);

  const onDrop = (sourceSquare, targetSquare) => {
    const move = { from: sourceSquare, to: targetSquare, promotion: "q" };
    const newGame = new Chess(chess.fen());
    const result = newGame.move(move);

    if (result) {
      const correctMove = solution[userMoves.length];
      if (result.san === correctMove) {
        setUserMoves([...userMoves, result.san]);
        setChess(newGame);
        setFen(newGame.fen());
        setHintMove("");
      } else {
        alert(`❌ Incorrect move! The correct move was: ${correctMove}`);
        setShowSolution(true);
      }
    }
  };

  return (
    <div className="container">
    <div className="chess-puzzle-container">
      <h2>♟️ Chess Puzzle</h2>
      <h3>Player to Move: {playerToMove}</h3>

      <Chessboard position={fen} width={40} onPieceDrop={onDrop} />

      <div className="puzzle-buttons">
        <button onClick={loadRandomPuzzle}>🔄 New Puzzle</button>
        <button
          onClick={() => {
            if (userMoves.length > 0) {
              const newGame = new Chess(chess.fen());
              newGame.undo();
              setUserMoves(userMoves.slice(0, -1));
              setChess(newGame);
              setFen(newGame.fen());
            }
          }}
          disabled={userMoves.length === 0}
        >
          ↩️ Undo Move
        </button>
        <button onClick={() => setHintMove(solution[userMoves.length] || "No more moves!")}>
          💡 Hint
        </button>
      </div>

      {hintMove && <h3 className="hint">Hint: {hintMove}</h3>}

      {showSolution && (
        <div className="solution">
          <h3>✔️ Solution:</h3>
          <p>{solution.length > 0 ? solution.join(" → ") : "No solution available"}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default ChessPuzzle;
