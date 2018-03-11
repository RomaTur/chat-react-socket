const socketIo = require('socket.io')

module.exports = (server) => {
  const io = socketIo(server)

  io.on('connection', socket => {
    console.log('New client connected')

    socket.on('message', (data) => {
      console.log(data)
      socket.broadcast.send(data)
    })

    socket.on('disconnect', () => {
      console.log('Client disconnected')
    })
  })
}
