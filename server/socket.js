module.exports = (socket) => {
  socket.on('test', () => {
    console.log('@@@@test@@@@@@@@')
  })

  socket.on('disconnect', () => {
    console.log('disconnected lolllll')
  })
}