import React from 'react';
import {Chessboard} from 'react-chessboard';

const ChessboardComponent = ({ position, onMove }) => {
  const onPieceDrop = (source, target) => {
    if (typeof onMove !== "function") {
      console.error("❌ ERROR: onMove is undefined or not a function!", onMove);
      return;
    }
    onMove(source, target);
  };
  

  return (
    <div  className="chessboard">
    <Chessboard
      position={position}
      onPieceDrop={onPieceDrop}
      draggable={true}
    />
    </div>
  );
};

export default ChessboardComponent;
