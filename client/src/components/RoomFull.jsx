import React, { useState, useEffect } from 'react';

const RoomView = ({ id, switchRoom }) => {
  
  return (
    <div className="room-full-container">
      <h3>Room # {id}</h3>
      
      <button onClick={() => switchRoom('lobby')}>Back to lobby</button>
    </div>
  )
}

export default RoomView;