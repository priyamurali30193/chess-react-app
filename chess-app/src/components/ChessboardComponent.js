
import React from 'react';
import { Chessboard } from 'react-chessboard';

const ChessboardComponent = ({ position, onPieceDrop }) => {
  return (
    <Chessboard
      boardOrientation="white"
      position={position}
      onPieceDrop={onPieceDrop}
    />
  );
};

export default ChessboardComponent;
