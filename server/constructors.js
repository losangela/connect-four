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
  checkWins() {
    console.log('lets see if someone won')
    const checkFour = (array) => {
      let streak = 0;
      let streakNum = 0;
      for (let j = 0; j < array.length; j++){
        let circle = array[j]
          if (!circle) {
            streak = 0;
            streakNum = 0;
          }
        else if (circle && streak === 0) {
          streak = circle;
          streakNum = 1;
        } else if (circle && circle === streak) {
          streakNum++;
          if (streakNum === 4) {
            if (streak === 1) {
              this.winner = this.playerRed
              this.winner.wins++
              this.playerYellow.loses++
            } else if (streak === -1) {
              this.winner = this.playerYellow
              this.winner.wins++
              this.playerRed.loses++
            }
            console.log('winner!!!')
            return
          }
        } else if (circle && streak !== circle) {
          streak = circle;
          streakNum = 1;
        }
      }
    }
    const checkHorizontal = () => {
      let arr = [];
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          arr[j] = this.board[j][i]
        }
        checkFour(arr)
      }
    }
    const checkVertical = () => {
      for (let i = 0; i < this.board.length; i++) {
        checkFour(this.board[i])
      }
    }
    const checkLeftRightDiagonal = () => {
      const makeDiagonalAndCheck = (col, row) => {
        let result = [];
        while (col < 7 && row < 7) {
          console.log(col, row)
          result.push(this.board[col][row])
          col++
          row++
        }
        console.log(result)
        checkFour(result)
      }
      makeDiagonalAndCheck(0, 3)
      makeDiagonalAndCheck(0, 2)
      makeDiagonalAndCheck(0, 1)
      makeDiagonalAndCheck(0, 0)
      makeDiagonalAndCheck(1, 0)
      makeDiagonalAndCheck(2, 0)
      makeDiagonalAndCheck(3, 0)
    }
    const checkRightLeftDiagonal = () => {
      const makeDiagonalAndCheck = (col, row) => {
        let result = [];
        while (col >= 0 && row < 7) {
          result.push(this.board[col][row])
          col--
          row++
        }
        checkFour(result)
      }
      makeDiagonalAndCheck(3, 0)
      makeDiagonalAndCheck(4, 0)
      makeDiagonalAndCheck(5, 0)
      makeDiagonalAndCheck(6, 0)
      makeDiagonalAndCheck(6, 1)
      makeDiagonalAndCheck(6, 2)
      makeDiagonalAndCheck(6, 3)
    }
    checkHorizontal()
    checkVertical()
    checkLeftRightDiagonal()
    checkRightLeftDiagonal()
  }
  placePiece(socketId, colIndex) {
    if (this.turn > 0 && this.playerRed.socketId === socketId) {
      for (let i = 6; i >= 0; i--) {
        if (this.board[colIndex][i] === 0) {
          this.board[colIndex][i] = 1;
          this.checkWins();
          this.turn = -1;
          return
        }
      }
    }
    if (this.turn < 0 && this.playerYellow.socketId === socketId) {
      for (let i = 6; i >= 0; i--) {
        if (this.board[colIndex][i] === 0) {
          this.board[colIndex][i] = -1;
          this.checkWins()
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
    this.board = [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0]
      ];
    this.winner = null;
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