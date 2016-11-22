const cardsService = require('./cards')
const names = ['Rafael', 'João', 'Paulo', 'Pedro']

exports.newGame = function (players) {
  return new Promise(function (resolve, reject) {
    var users = []
    for (var i = 0; i < players; i++) {
      users.push({ name: names[i], cards: [] })
      if (i === players - 1) {
        resolve(users)
      }
    }
  })
}

exports.filterCards = function (users) {
  return new Promise(function (resolve, reject) {
    var cards = cardsService.getAllCards()
    for (let i = 1; i < users.length; i++) {
      users.forEach(function (user, userIndex) {
        user.cards.push(cards.splice(Math.floor(Math.random() * cards.length), 1)[0])
        if (i === 3 && users.length - 1 === userIndex) {
          resolve(users)
        }
      })
    }
  })
}


