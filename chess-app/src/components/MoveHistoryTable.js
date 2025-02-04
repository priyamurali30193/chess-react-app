import React from 'react';

const MoveHistoryTable = ({ moves, playerColor }) => {
  return (
    <div className="move-history-section">
      <h4>{playerColor} Moves</h4>
      <table>
        <thead>
          <tr>
            <th>Move Number</th>
            <th>Move</th>
          </tr>
        </thead>
        <tbody>
          {moves.map((move, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{move}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MoveHistoryTable;
