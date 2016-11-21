const cardsService = require('./cards')()
const names = [ 'Rafael', 'João', 'Paulo', 'Pedro' ]
module.exports = function () {
  function newGame (players) {
    return new Promise(function (resolve, reject) {
      console.log('players: ', players)
      var users = []
      for (var i = 0; i < players; i++) {
        users.push({ name: names[i], cards: [] })
        // console.log('players: ', players, i)
        if (i === players - 1) {
          // console.log('entrou', users)
          let batata = filterCards(users)
          // console.log('batata: ', batata)
          resolve(batata)
        }
      }
    })
  }

  function filterCards (users) {
    return new Promise(function (resolve, reject) {
      var cards = cardsService.getAllCards()
      for (let i = 1; i < users.length; i++) {
        users.forEach(function (user, userIndex) {
          // console.log('user: ', user)
          user.cards.push(cards.splice(Math.floor(Math.random() * cards.length), 1)[0])
          // console.log('user: ', user)
          console.log(i, users.length - 1, userIndex)
          if (i === 3 && users.length - 1 === userIndex) {
            console.log('users: ', users)
            resolve(users)
          }
        })
      }
    })
  }

  return {
    newGame: newGame
  }
}
