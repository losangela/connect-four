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
  placePiece(socketId, colIndex) {
    console.log(this.turn)
    if (this.turn > 0 && this.playerRed.socketId === socketId) {
      console.log('its red')
      for (let i = 6; i >= 0; i--) {
        console.log(i)
        if (this.board[colIndex][i] === 0) {
          this.board[colIndex][i] = 1;
          this.turn = -1;
          return
        }
      }
    }
    if (this.turn < 0 && this.playerYellow.socketId === socketId) {
      console.log('its yellow')
      for (let i = 6; i >= 0; i--) {
        if (this.board[colIndex][i] === 0) {
          this.board[colIndex][i] = -1;
          this.turn = 1
          return
        }
      }
    }
  }
  removePlayer(id) {
    if (this.playerRed === allPlayers[id]) {
      this.removeColor('Red', id) // removes player from playerRed
    } else if (this.playerYellow === allPlayers[id]) {
      this.removeColor('Yellow', id) // removes player from playerYellow
    }
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].socketId === id) {
        this.players.splice(i, 1) // removes player from players array
        return
      }
    }
  }
  selectColor(color, socketId) {
    if (allPlayers[socketId].location === this.id) {
      console.log(allPlayers[socketId].name, 'wants to be', color)
      if (color === 'Red' && this.playerYellow === allPlayers[socketId]) {
        this.removeColor('Yellow', socketId)
      } else if (color === 'Yellow' && this.playerRed === allPlayers[socketId]) {
        this.removeColor('Red', socketId)
      }
      this['player' + color] = allPlayers[socketId];
    }
  }
  startGame() {
    this.isPlaying = true;
  }
  stopGame() {
    this.isPlaying = false;
  }
  removeColor(color, socketId) {
    this.stopGame();
    if (allPlayers[socketId].location === this.id && this['player' + color] === allPlayers[socketId]) {
      this['player' + color] = null;
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


module.exports = { Room, Player, allPlayers, rooms }