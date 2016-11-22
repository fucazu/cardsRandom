const express = require('express'),
  app = express(),
  game = require('./game'),
  Handlebars = require('handlebars'),
  cardsReq = require('./cards')

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
      res.render('home', {
        users: resultado
      })
    })
  })
})

app.listen(3000, function () {
  console.log('Escutando a porta 3000!')
})
