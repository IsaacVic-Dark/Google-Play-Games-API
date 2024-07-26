import React from "react";
import useLeaderBoard from "../utils/getLeaderBoard";
import LogNav from '../Layout/LogNav'

const DisplayLeaderBoard = () => {
  const { LeaderBoard } = useLeaderBoard();
  const sortLeaderBoard = [...LeaderBoard].sort((a, b) => b.points - a.points);

  return (
    <>
      <LogNav/>
      <h1>LeaderBoard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {sortLeaderBoard.map(
            (entry, index) =>
               (
                <tr key={index}>
                  <td>{entry.userName}</td>
                  <td>{entry.points}</td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </>
  );
};

export default DisplayLeaderBoard;
