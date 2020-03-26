const socketio = require('socket.io');
const { Room, Player, allPlayers, rooms } = require('./constructors');

module.exports.listen = (app) => {
  io = socketio.listen(app)
  users = io.of('/')
  users.on('connection', socket => {
  
    socket.on('new user', (name) => {
      allPlayers[socket.id] = new Player(name, socket.id)
      console.log(1, '====new user hi!====', name, socket.id)
      io.emit('all users', allPlayers)
    })

    socket.on('select color', (roomNum, color) => {
      rooms[roomNum].selectColor(color, socket.id)
      io.emit('all rooms', rooms)
    })

    socket.on('remove color', (roomNum, color) => {
      rooms[roomNum].removeColor(color, socket.id)
      io.emit('all rooms', rooms)
    })

    socket.on('start game', roomNum => {
      rooms[roomNum].startGame()
      io.emit('all rooms', rooms)
    })

    socket.on('click column', (roomNum, colIndex) => {
      console.log('place piece at', roomNum)
      rooms[roomNum].placePiece(socket.id, colIndex)
      console.log('clicking and runing place piece')
      io.emit('all rooms', rooms)
    })

    socket.on('load all rooms', () => {
      io.emit('all rooms', rooms)
    })

    socket.on('location', loc => {
      if (allPlayers[socket.id]) {
        if (loc === 'lobby') { // removes player from room if player returns to lobby
          if (allPlayers[socket.id].location !== 'lobby') {
            rooms[allPlayers[socket.id].location].removePlayer(socket.id);
          }
          allPlayers[socket.id].location = loc;
        } else { // adds player to room
          allPlayers[socket.id].location = loc;
          rooms[loc].addPlayer(allPlayers[socket.id]);
        }
        io.emit('all users', allPlayers)
        io.emit('all rooms', rooms)
      } else {
        console.log('bad connection. could not find user in mem', socket.id)
      }
    })

    socket.on('disconnect', () => {
      console.log(0, '====bye bye bye====', socket.id)
      if (allPlayers[socket.id]) {
        let loc = allPlayers[socket.id].location;
        if (loc !== 'lobby') { // removes player from room if not in lobby
          rooms[loc].removePlayer(socket.id)
        }
        delete allPlayers[socket.id]
      } else {
        console.log('could not find user in mem')
      }
      io.emit('all rooms', rooms)
    })
  })

  return io

}