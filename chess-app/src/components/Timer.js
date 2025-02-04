import React, { useState, useEffect } from 'react';

const Timer = ({ currentTurn, moveMade, resetTimer, setGameOver ,playerColor }) => {
  const [whiteTime, setWhiteTime] = useState(1200); // 20 minutes for white
  const [blackTime, setBlackTime] = useState(1200); // 20 minutes for black
  const [timerActive, setTimerActive] = useState(false); // Timer state for the active player

  // Handle timer reset when resetTimer is true
  useEffect(() => {
    if (resetTimer) {
      setWhiteTime(1200); // Reset to 20 minutes for white
      setBlackTime(1200); // Reset to 20 minutes for black
      setTimerActive(false); // Stop timer when reset
      setGameOver(false); // Reset game over state
    }
  }, [resetTimer, setGameOver]);

  // Timer logic for counting down based on the current player's turn
  useEffect(() => {
    if (!moveMade || whiteTime === 0 || blackTime === 0) return; // Prevent timer when no move is made

    const timer = setInterval(() => {
      if (currentTurn === 'w' && whiteTime > 0 && timerActive) {
        setWhiteTime((prevTime) => prevTime - 1); // Decrease white's time
      } else if (currentTurn === 'b' && blackTime > 0 && timerActive) {
        setBlackTime((prevTime) => prevTime - 1); // Decrease black's time
      }

      if (whiteTime === 0 || blackTime === 0) {
        clearInterval(timer); // Stop timer when time runs out
        setGameOver(true); // End the game if time is over
      }
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, [moveMade, currentTurn, whiteTime, blackTime, timerActive, setGameOver]);

  // Function to format time in MM:SS format
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    if (moveMade) {
      setTimerActive(true); // Start timer when a move is made
    }
  }, [moveMade]);

  return (
    <div className="timer">
      {playerColor === 'white' && (
        <div>
          <h4>White's Time</h4>
          <p>{blackTime === 0 ? 'Game Over' : formatTime(blackTime)}</p>
        </div>
      )}
      {playerColor === 'black' && (
        <div>
          <h4>Black's Time</h4>
          <p>{whiteTime === 0 ? 'Game Over' : formatTime(whiteTime)}</p>
        </div>
      )}
    </div>
  );
};

export default Timer;