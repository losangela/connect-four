import React from 'react';

const Users = ({allUsers}) => {
  return (
    <div className="users-container">
      {allUsers.map(user => (
        <div key={user.socketId} className="one-user">
          <b>{user.name}</b> <br />
          {user.wins} wins<br />
          {user.loses} loses<br />
        </div>
      ))}
    </div>
  )
}

export default Users