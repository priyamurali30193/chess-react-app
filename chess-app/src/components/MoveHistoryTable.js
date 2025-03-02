import React from 'react';
import "../styles/Movehistory.css";

const MoveHistoryTable = ({ whiteMoves, blackMoves }) => {
  console.log("📜 Move History Table - White Moves:", whiteMoves);
  console.log("📜 Move History Table - Black Moves:", blackMoves);

  const maxMoves = Math.max(whiteMoves.length, blackMoves.length);

  return (
    <div className="move-history">
      <h3>Move History</h3>
      <table>
        <thead>
          <tr>
            <th>White</th>
            <th>Black</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: maxMoves }).map((_, index) => (
            <tr key={index}>
              <td>{whiteMoves[index] || "..."}</td>
              <td>{blackMoves[index] || "..."}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



export default MoveHistoryTable;
