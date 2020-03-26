import React, { useState, useEffect } from 'react';
import Users from './Users'

const RoomView = ({ roomData, switchRoom, c }) => {

  useEffect(() => {
    console.log('room full')
    console.log(roomData)
  }, []);

  const displayStart = () => {
    if ((roomData.playerRed && roomData.playerRed.socketId === c.socketId) || (roomData.playerYellow && roomData.playerYellow.socketId === c.socketId)) {
      if (roomData.playerRed && roomData.playerYellow && !roomData.isPlaying) {
        return (
          <button onClick={() => c.startGame(roomData.id)}>Let's start!</button>
        )
      }
    }
    return (
      <button disabled>Let's start!</button>
    )
  }

  const removeColor = (color) => {
    if (roomData['player' + color].socketId === c.socketId) {

      return (
        <button onClick={() => c.removeColor(roomData.id, color)}>X</button>
      )
    }
  }

  return (
    <div className="room-full-container">
      <h3>Room # {roomData.id}</h3>
      Red: {roomData.playerRed ? <label>{roomData.playerRed.name}{removeColor('Red')}</label> : <button onClick={() => c.selectColor(roomData.id, 'Red')}>Be red</button>}<br />
      Yellow: {roomData.playerYellow? <label>{roomData.playerYellow.name}{removeColor('Yellow')}</label> : <button onClick={() => c.selectColor(roomData.id, 'Yellow')}>Be yellow</button>}< br />
      Players: <Users roomData={roomData}/><br />
      {roomData.isPlaying? "Game started!" : "Waiting to start..."} <br />
      {displayStart()} <br/>
      <button onClick={() => switchRoom('lobby')}>Back to lobby</button>
    </div>
  ) 
}

export default RoomView;