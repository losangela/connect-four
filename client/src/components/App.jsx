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
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [whichRoom, setWhichRoom] = useState('lobby');
  const [allRooms, setAllRooms] = useState([])

  useEffect(() => {
    socket.on("connect", () => { // client connects
      socket.emit("new user", username);
      loadAllRooms();
      // axios.post('/api/player', { name: username, socketId: socket.id })
      //   .then(({data}) => setUser(data))
      //   .catch(err => console.log(err))
    });

    socket.on('all users', users => {
      setUser(users[socket.id])
      setAllUsers(Object.values(users))
    })

    socket.on('all rooms', rooms => {
      setAllRooms(Object.values(rooms))
    })
  }, [])

  const switchRoom = room => {
    setWhichRoom(room)
    socket.emit('location', room)
  }

  const loadAllRooms = () => {
    socket.emit('load all rooms')
  }

  return (
    <div className="app-container">
      Welcome, {user.name}! You have {user.wins} wins and {user.loses} loses. You are currently at {user.location}
      {whichRoom === 'lobby' ? <Lobby switchRoom={switchRoom} allRooms={allRooms} loadRooms={loadAllRooms}/> : <RoomFull roomData={allRooms[whichRoom - 1]} switchRoom={switchRoom} /> }

    </div>
  )
}

export default App;