import React from "react";
import useLeaderBoard from "../utils/getLeaderBoard";

const DisplayLeaderBoard = () => {
  const { LeaderBoard } = useLeaderBoard();
    const sortLeaderBoard = [...LeaderBoard].sort((a,b) => b.score - a.score)

  return (
    <>
      <h1>LeaderBoard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Game</th>
          </tr>
        </thead>
        <tbody>
          {sortLeaderBoard.map((entry, index) => (
            <tr key={index}>
              <td>{entry.userName}</td>
              <td>{entry.score}</td>
              <td>{entry.game}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DisplayLeaderBoard;
