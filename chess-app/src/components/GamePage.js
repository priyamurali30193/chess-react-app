import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Chess } from "chess.js"; // ✅ Import Chess.js
import socket from "../socket";
import ChessboardComponent from "./ChessboardComponent"; // Import chessboard component

const GamePage = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("room");
  const [players, setPlayers] = useState(0);
  const [game, setGame] = useState(new Chess()); // ✅ Fix missing game state

  useEffect(() => {
    if (roomId) {
      socket.emit("joinRoom", roomId);
      console.log(`🔗 Joined Room: ${roomId}`);
    }

    socket.on("updatePlayers", () => {
      setPlayers((prev) => prev + 1);
    });

    // ✅ Listen for moves and update the game state
    socket.on("move", ({ from, to, fen }) => {
      console.log(`📥 Move Received: ${from} → ${to}`);
      setGame(new Chess(fen)); // ✅ Correctly update game state
    });

    return () => {
      socket.off("updatePlayers");
      socket.off("move");
    };
  }, [roomId]);

  return (
    <div>
      <h2>Chess Game</h2>
      <p>Room ID: {roomId}</p>
      <p>Players in Room: {players}</p>
      <ChessboardComponent position={game.fen()} roomId={roomId} />
    </div>
  );
};

export default GamePage;
