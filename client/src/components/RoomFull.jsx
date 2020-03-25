import React, { useState, useEffect } from 'react';
import Users from './Users'

const RoomView = ({ roomData, switchRoom, c }) => {

  useEffect(() => {
    console.log('room full')
    console.log(roomData)
  }, []);

  return (
    <div className="room-full-container">
      <h3>Room # {roomData.id}</h3>
      Red: {roomData.playerRed ? <label>{roomData.playerRed.name}<button onClick={() => c.removeColor(roomData.id, 'Red')}>X</button></label> : <button onClick={() => c.selectColor(roomData.id, 'Red')}>Be red</button>}<br />
      Yellow: {roomData.playerYellow? <label>{roomData.playerYellow.name}<button onClick={() => c.removeColor(roomData.id, 'Yellow')}>X</button></label> : <button onClick={() => c.selectColor(roomData.id, 'Yellow')}>Be yellow</button>}< br />
      Players: <Users allUsers={roomData.players} /><br />
      {roomData.isPlaying? "Game started!" : "Waiting to start..."} <br />
      <button onClick={() => switchRoom('lobby')}>Back to lobby</button>
    </div>
  ) 
}

export default RoomView;