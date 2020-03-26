import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
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

  const gameController = {
    socketId: socket.id,
    selectColor: (room, color) => {
      socket.emit('select color', room, color)
    },
    removeColor: (room, color) => {
      socket.emit('remove color', room, color)
    },
    startGame: room => {
      socket.emit('start game', room)
    },
    clickCol: (room, colIndex) => {
      console.log(`clicked ${colIndex} column at ${room}`)
    }
  }

  const loadAllRooms = () => {
    socket.emit('load all rooms')
  }

  return (
    <div className="app-container">
      Welcome, {user.name}! You have {user.wins} wins and {user.loses} loses. You are currently at {user.location}.
      { whichRoom === 'lobby' ?
        <Lobby switchRoom={switchRoom} allRooms={allRooms} loadRooms={loadAllRooms}/> :
        <RoomFull roomData={allRooms[whichRoom - 1]} switchRoom={switchRoom} c={gameController}/>
      }

    </div>
  )
}

export default App;