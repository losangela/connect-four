import React, { useState, useEffect } from 'react';

const RoomView = ({room, switchRoom}) => {
  
  const status = (b) => {
    if (b) {
      return (
        <div classId="game-status">
          GAME PLAYING
        </div>
      )
    } else {
      return (
        <div className="game-status">
          WAITING TO PLAY
        </div>
      )
    }
  }
  return (
    <div className="room-view-container">
      <div className="room-view-label">Room # {room.id}</div>
      <div className="room-view-player">{room.players.length} players in room. </div>
      {status(room.isPlaying)} <br/>
      <button id="join" onClick={() => switchRoom(room.id)}>Join room</button>
    </div>
  )
}

export default RoomView;