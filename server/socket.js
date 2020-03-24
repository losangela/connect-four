const axios = require('axios');

class Room {
  constructor(id) {
    this.id = id;
    this.board = [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0]
      ];
    this.playerRed = null;
    this.playerYellow = null;
    this.players = [];
    this.turn = 1;
    this.winner = null;
    this.isPlaying = false;
  }
  addPlayer(player) {
    this.players.push(player)
  }
  removePlayer(id) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].socketId === id) {
        this.players.splice(i, 1)
        return
      }
    }
  }
};

class Player {
  constructor(name, socketId) {
    this.socketId = socketId;
    this.name = name;
    this.wins = 0;
    this.loses = 0;
    this.location = 'lobby';
  }
};

const allPlayers = {};
const rooms = {
  1: new Room(1),
  2: new Room(2),
  3: new Room(3),
  4: new Room(4)
}

module.exports = (socket) => {
  socket.on('new user', (name) => {
    allPlayers[socket.id] = new Player (name, socket.id)
    console.log(1, '====new user hi!====', socket.id)
    console.log(allPlayers)
  })

  socket.on('location', loc => {
    if (allPlayers[socket.id]) {
      if (loc === 'lobby') {
        rooms[allPlayers[socket.id].location].removePlayer(socket.id);
        allPlayers[socket.id].location = loc;
      } else {
        allPlayers[socket.id].location = loc;
        rooms[loc].addPlayer(allPlayers[socket.id]);
      }
    } else {
      console.log('bad connection. could not find user in mem', socket.id)
    }
  })

  socket.on('disconnect', () => {
    console.log(0, '====bye bye bye====', socket.id)
    if (allPlayers[socket.id]) {
      delete allPlayers[socket.id]
    } else {
      console.log('could not find user in mem')
    }
  //   axios.delete('http://localhost:3000/api/player', { params: { socketId: socket.id }})
  //     .catch(err => console.log(err))
  })

}