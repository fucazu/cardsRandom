//   suit:Suit
// The suits are Hearts, Clubs, Diamonds and Spades: ♥ ♣ ♦ ♠
module.exports = function () {
  const allCards = [
    { value: 'A', suit: 'hearts' },
    { value: '2', suit: 'hearts' },
    { value: '3', suit: 'hearts' },
    { value: '4', suit: 'hearts' },
    { value: '5', suit: 'hearts' },
    { value: '6', suit: 'hearts' },
    { value: '7', suit: 'hearts' },
    { value: 'J', suit: 'hearts' },
    { value: 'Q', suit: 'hearts' },
    { value: 'K', suit: 'hearts' },
    { value: 'A', suit: 'clubs' },
    { value: '2', suit: 'clubs' },
    { value: '3', suit: 'clubs' },
    { value: '4', suit: 'clubs' },
    { value: '5', suit: 'clubs' },
    { value: '6', suit: 'clubs' },
    { value: '7', suit: 'clubs' },
    { value: 'J', suit: 'clubs' },
    { value: 'Q', suit: 'clubs' },
    { value: 'K', suit: 'clubs' },
    { value: 'A', suit: 'diamonds' },
    { value: '2', suit: 'diamonds' },
    { value: '3', suit: 'diamonds' },
    { value: '4', suit: 'diamonds' },
    { value: '5', suit: 'diamonds' },
    { value: '6', suit: 'diamonds' },
    { value: '7', suit: 'diamonds' },
    { value: 'J', suit: 'diamonds' },
    { value: 'Q', suit: 'diamonds' },
    { value: 'K', suit: 'diamonds' },
    { value: 'A', suit: 'spades' },
    { value: '2', suit: 'spades' },
    { value: '3', suit: 'spades' },
    { value: '4', suit: 'spades' },
    { value: '5', suit: 'spades' },
    { value: '6', suit: 'spades' },
    { value: '7', suit: 'spades' },
    { value: 'J', suit: 'spades' },
    { value: 'Q', suit: 'spades' },
    { value: 'K', suit: 'spades' }
  ]

  function getAllCards () {
    console.log('allCards: ', allCards.length)
    let newCards = allCards.slice()
    return newCards
  }

  return {
    getAllCards: getAllCards
  }
}
