import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomView from './RoomView';



const Lobby = ({switchRoom}) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get('/api/room')
      .then(({data}) => setRooms(data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="lobby-container">
      Check out all these rooms!
      {rooms.map(room => (<RoomView key={room.id} room={room} switchRoom={switchRoom}/>))}
    </div>
  )
}

export default Lobby;