const express = require('express')
const app = express()
const game = require('./game')()
const Handlebars = require('handlebars')
var cardsReq = require('./cards')()

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
    },
    executar: function (fn) {
      return new Handlebars.SafeString('(' +
        fn.toString().replace(/\"/g, "'") + ')()')
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
app.get('/a', function (req, res) {
  console.log('user: ', user.cards)
  game.newGame(4).then(function (resultado) {
    console.log('resultado: ', resultado)
    res.render('home', {
      users: resultado
    })
  })
})

app.get('/', function (req, res) {
  //   var cards = cardsReq.getAllCards().slice()

  //   for (var i = 0; i < 3; i++) {
  //     user.cards.push(cards.splice(Math.floor(Math.random() * cards.length), 1)[0])
  //     user2.cards.push(cards.splice(Math.floor(Math.random() * cards.length), 1)[0])
  //     user3.cards.push(cards.splice(Math.floor(Math.random() * cards.length), 1)[0])
  //     user4.cards.push(cards.splice(Math.floor(Math.random() * cards.length), 1)[0])

  //     if (i === 2) {
  game.newGame(4).then(function (resultado) {
    console.log('resultado: ', resultado)
    res.json({
      users: resultado
    // restante: cards,
    // qtde: cards.length
    })
  })
//     }
//   }
//   })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
