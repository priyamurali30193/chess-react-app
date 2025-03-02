import React, { useState, useEffect, useCallback } from "react";

const Timer = ({ currentTurn, playerColor, resetTimer, setGameOver, timerActive, setTimerActive }) => {
  const initialTime = 1200; // 20 minutes in seconds
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (resetTimer) {
      setTime(initialTime);  // ✅ Reset timer when game resets
      setTimerActive(false); // ✅ Stop timer
    }
  }, [resetTimer, setTimerActive]); // ✅ Added 'setTimerActive' to dependencies

  useEffect(() => {
    if (currentTurn === playerColor) {
      setTimerActive(true);  // ✅ Start timer when it's this player's turn
    } else {
      setTimerActive(false); // ❌ Stop timer when it's not their turn
    }
  }, [currentTurn, playerColor, setTimerActive]); // ✅ Already correct

  // ✅ Use useCallback to prevent unnecessary re-creations
  const handleTimeout = useCallback(() => {
    setGameOver(true);
    setTimerActive(false);
  }, [setGameOver, setTimerActive]);

  useEffect(() => {
    if (!timerActive) return;

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          handleTimeout(); // ✅ Call the useCallback function
          return 0; // ✅ Stop at 0
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, handleTimeout]); // ✅ Added 'handleTimeout' to dependencies

  return (
    <div>
      <h2>{playerColor === "white" ? "White Time" : "Black Time"}: {time}s</h2>
    </div>
  );
};

export default Timer;
