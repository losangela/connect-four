import React, { useState, useEffect } from 'react';

const RoomView = ({ roomData, switchRoom }) => {

  useEffect(() => {
    console.log('room full')
    console.log(roomData)
  }, []);

  return (
    <div className="room-full-container">
      <h3>Room # {roomData.id}</h3>
      Red: {roomData.playerRed ? roomData.playerRed.name : ""}<br />
      Yellow: {roomData.playerYellow? roomData.playerYellow.name : ""}< br />
      Queue: {roomData.players.length} players waiting. <br />
      <button onClick={() => switchRoom('lobby')}>Back to lobby</button>
    </div>
  ) 
}

export default RoomView;