const axios = require('axios');

module.exports = (socket) => {
  socket.on('new user', () => {
    console.log(1, '====new user hi!====', socket.id)
  })

  socket.on('disconnect', () => {
    console.log(0, '====bye bye bye====', socket.id)
    axios.delete('http://localhost:3000/api/player', { params: { socketId: socket.id }})
      .catch(err => console.log(err))
  })

  socket.on('lobby', () => {
    console.log('someone is in the lobby!', socket.id)
  })
}