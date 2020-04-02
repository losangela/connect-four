import React from 'react';
import RoomView from './RoomView';

const Lobby = ({switchRoom, allRooms}) => {

  return (
    <div className="lobby-container">
      <h1>Game Lobby</h1>
      <div className="flex">
        {allRooms.length? allRooms.map(room => (<RoomView key={room.id} room={room} switchRoom={switchRoom}/>)): "loading rooms..."}
      </div>
    </div>
  )
}

export default Lobby;