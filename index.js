const express = require('express'),
  app = express(),
  http = require('http').Server(app),
  io = require('socket.io')(http),
  game = require('./game'),
  Handlebars = require('handlebars'),
  cardsReq = require('./cards'),
  cors = require('cors')

const exphbs = require('express-handlebars')

const hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    convert: function (suit) {
      // Hearts, Clubs, Diamonds and Spades: ♥ ♣ ♦ ♠
      let su = '♠'
      switch (suit) {
        case 'hearts':
          su = '♥'
          break
        case 'clubs':
          su = '♣'
          break
        case 'diamonds':
          su = '♦'
          break
        default:
          break
      }
      return su
    }
  }
})
app.use(cors())
app.engine('handlebars', hbs.engine)
// app.engine('handlebars', hbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
let user = {
  name: 'Rafael',
  cards: []
}
let user2 = {
  name: 'João',
  cards: []
}
let user3 = {
  name: 'Daniel',
  cards: []
}
let user4 = {
  name: 'Leonardo',
  cards: []
}
var users = [user, user2, user3, user4]

app.get('/', function (req, res) {
  game.newGame(4).then(function (resultado) {
    game.filterCards(resultado).then(function () {
      res.json({
        users: resultado
      })
    })
  })
})

const salas = [
  {
    nome: 'Sala 1',
    id: 1,
    users: []
  },
  {
    nome: 'Sala 2',
    id: 2,
    users: []
  },
  {
    nome: 'Sala 3',
    id: 3,
    users: []
  },
]
io.on('connection', function (socket) {
  console.log('alguem conectou...', socket.id)

  socket.on('entrar', function (message, cb) {
    console.log('entrou: ', message, socket.id)
    socket.profile = { username: message }
    console.log('socket.profile.username: ', socket.profile.username);
    cb('entrouuuuuu')
  })

  socket.on('disconnect', function () {
    console.log('usuario desconectou')
  })

  socket.on('listarCanais', function (cb) {
    console.log('listando...')
    cb(salas)
  })

  socket.on('sala', function (salaId, cb) {
    console.log('listando...')
    let sala = salas.filter(function (sala) { return sala.id === salaId })[0]
    console.log('sala: ', sala)

    socket.join(salaId)
    if (sala) {
      sala.users.push({ idSocket: socket.id, username: socket.profile.username })

      if (sala.users.length > 1) {
        io.to(salaId).emit('sala', sala)
      }

      cb(sala)
    }
  })

  socket.on('darCartas', function (salaId) {

    let sala = salas.filter(function (sala) { return sala.id === salaId })[0]
    console.log('sala darCartas: ', sala)

    game.newGame(sala.users).then(function (resultado) {
      console.log('resultado: ', resultado)
      game.filterCards(resultado).then(function (result) {
        console.log('result: ', result)
        sala.users.forEach(function (user, index) {
          user.cards = result[index]
          console.log('index === sala.users.length -1: ', index, sala.users.length -1, index === sala.users.length -1)
          if (index === sala.users.length -1) {
            io.to(salaId).emit('sala', sala)
            // cb(sala)
          }
        })
      })
    })
  })
})

http.listen(3000, function () {
  console.log('Escutando a porta 3000!')
})
