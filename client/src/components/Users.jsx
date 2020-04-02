import React from 'react';

const Users = ({roomData}) => {
  return (
    <div className="users-container">
      <h3>Players</h3>
      {roomData.players.map(user => {
        if (roomData.playerRed && user.socketId === roomData.playerRed.socketId) {
          return (
            <div key={user.socketId} id="red-player" className="one-user">
              <b>{user.name}</b> <br />
              {user.wins} wins<br />
              {user.loses} loses<br />
            </div>
          )
        } else if (roomData.playerYellow && user.socketId === roomData.playerYellow.socketId){
          return (
            <div key={user.socketId} id="yellow-player" className="one-user">
              <b>{user.name}</b> <br />
              {user.wins} wins<br />
              {user.loses} loses<br />
            </div>
          )
        } else {
          return (
            <div key={user.socketId} className="one-user">
              <b>{user.name}</b> <br />
              {user.wins} wins<br />
              {user.loses} loses<br />
            </div>
          )
        }
      })}
    </div>
  )
}

export default Users