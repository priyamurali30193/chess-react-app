
import React from 'react';

const GameControls = ({ toggleGameOptions, showGameOptions, handleGameModeSelect, resetGame }) => {
  return (
    <div className="controls">
      <button className="play-button" onClick={toggleGameOptions}>
        Play
      </button>

      {showGameOptions && (
        <div className="game-options-dropdown">
          <ul>
            <li onClick={() => handleGameModeSelect('AI')}>Play with AI</li>
            <li onClick={() => handleGameModeSelect('Friend')}>Play with Friend</li>
            <li onClick={resetGame}>Start New Game</li>
          </ul>
        </div>
      )}

      <button className="reset-button" onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default GameControls;
