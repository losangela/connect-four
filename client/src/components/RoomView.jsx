import React, { useState, useEffect } from 'react';

const RoomView = ({room, switchRoom}) => {
  
  return (
    <div className="room-view-container">
      <h3>Room # {room.id}</h3>
      {room.players.length} players waiting in line. <br />
      Red: {room.playerRed ? room.playerRed.name : "none"}<br/>
      Yellow: {room.playerYellow? room.playerYellow.name : "none"}<br/>
      {room.isPlaying ? "Game Started!" : "Waiting to start"}
      <button onClick={() => switchRoom(room.id)}>Join room</button>
    </div>
  )
}

export default RoomView;