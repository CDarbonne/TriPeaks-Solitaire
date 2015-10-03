function Card(id, num, suit) {
  this.id = id;
  this.suit = suit;
  this.num = num;
  this.isFaceUp = false;
  this.leftChild = null;
  this.rightChild = null;
}

function initializeDeck(deck) {
  deck = createDeck(deck);
  deck = shuffleDeck(deck);
  return deck;
}

function createDeck(deck) {
  var i;
  var suits = ["c", "h", "s", "d"];

  for(i = 0; i < 52; i++) {
    deck[i] = new Card((i+1), (i%13)+1, suits[i%4]);
  }

  return deck;
}

function shuffleDeck(deck) {
  var shuffledDeck = [];
  var n = deck.length;
  var i;

  while(n) {
    i = Math.floor(Math.random() * n--);
    shuffledDeck.push(deck.splice(i, 1)[0]);
  }

  return shuffledDeck;
}

function separateDecks(unusedCards, usedCards, triPeaksCards) {
  /* unusedCards should contain all the cards */

  // pull top card off unused cards stack and
  // put it on the used cards stack
  usedCards.push(unusedCards.pop());  

  // pull 10 + (3 * 6) cards for the tripeaks layout
  var i;
  var n = (3 * 6) + 10;
  for(i = 0; i < n; i++) {
    triPeaksCards.push(unusedCards.pop());
  }
}

function buildTrees(deck, roots) {
  var i = 0;
  var peak = 0;
  var level = 0;
  var cardIndex = 0;
  var numCardsPerLevel = 1;

  roots[0] = deck[0].id;
  roots[1] = deck[1].id;
  roots[2] = deck[2].id;

  while(level < 3) {
    for(peak = 0; peak < 3; peak++) {
      numCardsPerPeak = level + 1;
      while(numCardsPerPeak > 0) {
        var leftIndex = i+level+peak+(2*level)+3;
        var rightIndex = i+level+peak+(2*level)+4;
        if(i > 11) {
          leftIndex--;
          rightIndex--;
        }
        if(i > 14) {
          leftIndex--;
          rightIndex--;
        }
        deck[i].leftChild = deck[leftIndex].id;
        deck[i].rightChild = deck[rightIndex].id;
        i++;
        numCardsPerPeak--;
      }
    }
    level++;
  }
}
