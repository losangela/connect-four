import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
// import axios from 'axios';
import Lobby from './Lobby';
import RoomFull from './RoomFull';

const socket = io('http://localhost:3000', {
  transports: ["websocket", "polling"]
});

const username = prompt("What is your name?");

const App = () => {
  const [user, setUser] = useState({})
  const [whichRoom, setWhichRoom] = useState('lobby')

  useEffect(() => {
    socket.on("connect", () => { // client connects
      socket.emit("new user", username);
      // axios.post('/api/player', { name: username, socketId: socket.id })
      //   .then(({data}) => setUser(data))
      //   .catch(err => console.log(err))
    });

    socket.on("ping", () => {
      console.log('pong')
    })
  }, [])

  const switchRoom = room => {
    setWhichRoom(room)
    socket.emit('location', room)
  }

  return (
    <div className="app-container">
      Welcome, {user.name}! You have {user.win} wins and {user.lose} loses.
      {whichRoom === 'lobby' ? <Lobby switchRoom={switchRoom} /> : <RoomFull id={whichRoom} switchRoom={switchRoom} /> }

    </div>
  )
}

export default App;