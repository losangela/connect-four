import React, { useState, useEffect } from 'react';

const RoomView = ({ id, switchRoom }) => {
  const [roomData, setRoomData] = useState({});

  useEffect(() => {
    
  }, []);

  if (roomData.id) {
    return (
      <div className="room-full-container">
        <h3>Room # {id}</h3>
        Red: {roomData.playerRed ? roomData.playerRed.name : ""}<br />
        Yellow: {roomData.playerYellow? roomData.playerYellow.name : ""}< br />
        Queue: {roomData.queue.length} players waiting. <br />
        <button onClick={() => switchRoom('lobby')}>Back to lobby</button>
      </div>
    ) 
  } else {
    return (
      <div className="room-full-container">
        <h3>Room # {id}</h3>
        Could not retrieve room data
      <button onClick={() => switchRoom('lobby')}>Back to lobby</button>
      </div>
    )
  }
}

export default RoomView;