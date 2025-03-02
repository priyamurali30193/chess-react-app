import React, { useState } from 'react';
import "../styles/GameControls.css";
import socket from "../socket"; // Import socket connection


const GameControls = ({ handleGameModeSelect, resetGame }) => {
  const [selectedMode, setSelectedMode] = useState("AI_easy");
  const [inviteLink, setInviteLink] = useState(""); // ✅ Store invite link

  // Handle mode selection
  const handleDropdownChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedMode(selectedValue);
  
    if (selectedValue.startsWith("AI")) {
      const difficulty = selectedValue.split("_")[1]; 
      handleGameModeSelect("AI", difficulty);
    } 
    else if (selectedValue === "Friends") {
      createRoom(); // ✅ Create Room when "Play with Friend" is selected
    }
    else {
      handleGameModeSelect(selectedValue);
    }
  };
  

  // ✅ Create Room & Generate Invite Link
  const createRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 9);
    const link = `${window.location.origin}/game?room=${newRoomId}`;

    setInviteLink(link);
    socket.emit("joinRoom", newRoomId);
    console.log(`✅ Room Created: ${newRoomId}`);

    // Open the game link in a new tab
    window.open(link, "_blank");
  };

  return (
    <div className="game-controls">
      <h2>Select Game Mode</h2>
      <div className="dropdown-container">
      <select 
  value={selectedMode}
  onChange={handleDropdownChange} 
  className="game-dropdown"
>
  <option value="AI_easy">Play vs AI</option>
  
  <option value="AI_difficult">Play vs AI - Difficult</option> {/* ✅ New Option */}
  <option value="Friends">Play with Friend</option>
</select>

        <button className="reset-button" onClick={resetGame}>Reset Game</button>
      </div>

      {/* ✅ Show invite link when a room is created */}
      {inviteLink && (
        <p>
          Share this link with your friend: <a href={inviteLink}>{inviteLink}</a>
        </p>
      )}
    </div>
  );
};

export default GameControls;
