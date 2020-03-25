import React from 'react';
import RoomView from './RoomView';

const Lobby = ({switchRoom, allRooms}) => {

  return (
    <div className="lobby-container">
      Check out all these rooms!
      {allRooms.length? allRooms.map(room => (<RoomView key={room.id} room={room} switchRoom={switchRoom}/>)): "loading rooms..."}
    </div>
  )
}

export default Lobby;