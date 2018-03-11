const socketIo = require('socket.io')
const axios = require('axios')
const five = require('johnny-five')

module.exports = (server) => {
  const io = socketIo(server)
  const board = new five.Board()
  let connectionFlag = false

  io.on('connection', socket => {
    console.log('New client connected')
    setInterval(() => getApiAndEmit(socket), 5000)

    if (!connectionFlag) {
      board.on('ready', () => {
        getJoystickAndEmit(socket)
        connectionFlag = true
      })
    } else {
      getJoystickAndEmit(socket)
    }

    socket.on('message', (data) => {
      console.log(data)
    })
    socket.on('disconnect', () => {
      console.log('Client disconnected')
    })
  })
}

const getApiAndEmit = async socket => {
  try {
    const res = await axios.get('http://api.openweathermap.org/data/2.5/weather?appid=fda366a6df2c1fe18ea1439b5bb26e9d&q=Sarov,ru&units=metric')

    const resTemp = {
      name: 'wheather',
      temp: res.data.main.temp,
      city: res.data.name
    }

    socket.emit('FromAPI', resTemp)
  } catch (error) {
    console.error(`Error: ${error.code}`)
  }
}

const getJoystickAndEmit = socket => {
  const joystick = new five.Joystick({
    pins: ['A0', 'A1']
  })
  const button = new five.Button(3)
  const led = new five.Led(13)

  led.blink(100)
  joystick.on('change', joyMonit)
  button.on('press', () => butFunc(0))
  button.on('release', () => butFunc(1))

  function butFunc(val) {
    const resJoy = {
      name: 'button',
      Bin: val
    }

    socket.emit('FromAPI', resJoy)
  }

  function joyMonit() {
    // console.log('Joystick')
    // console.log('  x : ', Math.round(this.x * 100))
    // console.log('  y : ', Math.round(this.y * 100))
    // console.log('--------------------------------------');
    const resJoy = {
      name: 'Joystick',
      Xin: Math.round(joystick.x * 100),
      Yin: Math.round(joystick.y * 100)
    }

    socket.emit('FromAPI', resJoy)
  }
}
