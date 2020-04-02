import React from 'react';

const Game = ({ roomData, c }) => {

  const columns = ['col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7'];

  const column = (col, i) => {
    return (
      <div id={col} onClick={() => c.clickCol(roomData.id - 1, i)}>
        {roomData.board[i].map((space, j) => {
          if (space === 0) {
            return (<div id="blank" key={j}></div>)
          } if (space === 1) {
            return (<div id="red" key={j}></div>)
          } if (space === -1) {
            return (<div id="yellow" key={j}></div>)
          } 
        })}
      </div>
    )
  }

  if (roomData.isPlaying) {
    return (
      <div className="game-container">
        <table>
          <tr>
            {columns.map((col, i) => (
              <td>{column(col, i)}</td>
            ))}
          </tr>
        </table>
      </div>
    )
  } else {
    return (
      <div className="game-container pending">
        <table>
          <tr>
            {columns.map((col, i) => (
              <td>{column(col, i)}</td>
            ))}
          </tr>
        </table>
      </div>
    )
  }
}

export default Game