import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomView from './RoomView';



const Lobby = ({switchRoom, allRooms}) => {
  // const [rooms, setRooms] = useState(allRooms);

  useEffect(() => {
    
  }, [])

  return (
    <div className="lobby-container">
      Check out all these rooms!
      {allRooms.length? allRooms.map(room => (<RoomView key={room.id} room={room} switchRoom={switchRoom}/>)): "loading rooms..."}
    </div>
  )
}

export default Lobby;