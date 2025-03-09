import React, { useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { Chessboard } from "react-chessboard";
import "../styles/DailyPuzzle.css";

const DailyPuzzle = () => {
  // Puzzle data – you can later extend this with multiple puzzles and logic to select one per day
  const puzzle = {
    fen: "8/8/2k5/8/4Q3/8/2K5/8 w - - 0 1",
    solution: ["Qe4-c6#"],
    playerToMove: "w",
  };

  const [showSolution, setShowSolution] = useState(false);
  const toggleSolution = () => setShowSolution((prev) => !prev);

  return (
    <Card className="daily-puzzle-card">
      <CardContent>
        <Typography variant="h5" className="puzzle-title">
          Daily Puzzle
        </Typography>
        <Typography variant="body2" color="text.secondary" className="player-move">
          Player to Move: {puzzle.playerToMove.toUpperCase()}
        </Typography>

        {/* New container to align chessboard and solution side by side */}
        <div className="puzzle-content">
          <div className="chessboard-wrapper">
            <Chessboard position={puzzle.fen} boardWidth={150} />
          </div>
          <div className="solution-wrapper">
            <Button
              variant="contained"
              color="primary"
              onClick={toggleSolution}
              className="puzzle-button"
            >
              {showSolution ? "Hide Solution" : "Show Solution"}
            </Button>
            {showSolution && (
              <div className="puzzle-solution">
                <Typography variant="body1">
                  Solution: {puzzle.solution.join(", ")}
                </Typography>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyPuzzle;
