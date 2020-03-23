module.exports = (socket) => {
  socket.on('test', () => {
    console.log(1, '====test====', socket.id)
  })

  socket.on('disconnect', () => {
    console.log(0, '====bye bye bye====', socket.id)
  })
}