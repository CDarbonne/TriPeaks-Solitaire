function generalFunction(functionNumber, e) {

    switch(functionNumber) {
      case 0:
        fieldCards(e);
        break;
      case 1:
        trashCards(e);
        break;
      case 2:
        shoeCards(e);
        break;
      default:
        break;
    }

  flipLeafNodes();

  setTimeout(function() {
    if(winCheck()) {

      /* PUT ON WIN CODE HERE */

      console.log("GAME WON");
    } else {
      if(gameOverCheck()) {

        /* PUT ON GAME OVER CODE HERE */

        console.log("GAME OVER");
      }
    }
  }, MOVE_TIME + 200);

}

function fieldCards(cardDomElement) {
  var i;
  var cardIndex = 0;
  var cardObject = null;
  var elementId = cardDomElement.id;

  // find the Card object of the given card
  var objectSuit = elementId.substr(0, 1);
  var objectNumber = elementId.substr(1, elementId.length);
  objectNumber = parseInt(objectNumber);
  for(i = 0; i < TRIPEAKS_DECK.length; i++) {
    var currentCard = TRIPEAKS_DECK[i];
    if(currentCard.num == objectNumber
         && currentCard.suit == objectSuit) {
      cardObject = currentCard;
      cardIndex = i;
    }
  }

  if(cardObject == null) {
    console.log("Object for card was not found.");
    return;
  }

  // check if card can be thrown away
  if(checkIfFieldCardCanBeThrown(cardObject)) {
    moveCardOverTime(cardObject, USED_INIT_X, USED_INIT_Y, MOVE_TIME);
    setTimeout(function() {
      moveCardElementToTrash(cardDomElement);
      // move card object to USED_DECK
      // remove card object from TRIPEAKS_DECK
      USED_DECK.push(cardObject);
      TRIPEAKS_DECK.splice(cardIndex, 1);
    }, MOVE_TIME);
  }
}

/* NOT REALLY NEEDED */
function trashCards() {
}

function shoeCards(e) {
  var cardObject = UNUSED_DECK[UNUSED_DECK.length-1];
  var cardDomElement = document.getElementById(''+cardObject.suit+cardObject.num);

  moveCardOverTime(cardObject, USED_INIT_X, USED_INIT_Y, MOVE_TIME);
  flipCardOverTime(cardObject, FLIP_TIME);

  // move the dom element to the trash dom element (trashCards)
  setTimeout(function() {
    moveCardElementToTrash(cardDomElement);
    USED_DECK.push(UNUSED_DECK.pop());
  }, MOVE_TIME);
}

function replaceFunctionNumber(currentElement, number) {
  var searchString1 = 'generalFunction(';
  var parameterIndexStart = currentElement.indexOf('generalFunction(');

  parameterIndexStart = parameterIndexStart+searchString1.length;

  var parameterIndexEnd = currentElement.indexOf(',', parameterIndexStart);
  var newString = currentElement.substring(0, parameterIndexStart);

  newString += number;
  newString += currentElement.substring(parameterIndexEnd, currentElement.length);  

  return newString;
}

function moveCardElementToTrash(domElement) {
  var card = domElement;
  var cardParentId = card.parentNode.id;
  var originPile = document.getElementById(cardParentId);
  var trashPile = document.getElementById('trashCards');

  // create a copy of card (so that we can delete the old one)
  var newCard = document.createElement('div');
  newCard = card.outerHTML;
  newCard = replaceFunctionNumber(newCard, 1);

  // remove the card from its original pile
  card.remove();

  // set the trash pile to the card being thrown away
  trashPile.innerHTML = newCard;
}

function checkIfFieldCardCanBeThrown(cardObject) {
  // check if it is a leaf node and face up
  if(cardObject.isFaceUp && (cardObject.leftChild == null
       && cardObject.rightChild == null)) {

    // check if it is within range of trash card value
    var trashCardNumber = USED_DECK[USED_DECK.length-1].num;
    var lesser = trashCardNumber - 1;
    if(lesser < 1) lesser = 13;
    var greater = trashCardNumber + 1;
    if(greater > 13) greater = 1;
    
    // if it is within range cut ties from parent nodes
    if(cardObject.num == lesser || cardObject.num == greater) {
      var cIndex = 0;
      for(i = 0; i < TRIPEAKS_DECK.length; i++) {
        var currentCard = TRIPEAKS_DECK[i];
        if(currentCard.leftChild == cardObject.id) currentCard.leftChild = null;
        if(currentCard.rightChild == cardObject.id) currentCard.rightChild = null;
      }
      return true;
    }
  }
  return false;
}

function flipLeafNodes() {
  TRIPEAKS_DECK.forEach(function(e) {
    if(e.leftChild == null && e.rightChild == null && !e.isFaceUp) {
      flipCardOverTime(e, FLIP_TIME);
    }
  });
}

function moveCardToTrash(domElement) {
  var card = domElement;
  var cardParentId = card.parentNode.id;
  var originPile = document.getElementById(cardParentId);
  var trashPile = document.getElementById('trashCards');

  // create a copy of card (so that we can delete the old one)
  var newCard = document.createElement('div');
  newCard = card.outerHTML;
  newCard = replaceFunctionNumber(newCard, 1);

  // remove the card from its original pile
  card.remove();

  // set the trash pile to the card being thrown away
  trashPile.innerHTML = newCard;
}

function winCheck() {
  return (TRIPEAKS_DECK.length == 0);
}

function gameOverCheck() {
  var i;
  var gameOver = true;

  if(UNUSED_DECK.length > 0) return false;
  else console.log("OUT OF UNUSED CARDS");

  for(i = 0; i < TRIPEAKS_DECK.length; i++) {
    if(TRIPEAKS_DECK[i].isFaceUp) {

      var trashCard = document.getElementById('trashCards');
      trashCard = trashCard.getElementsByClassName('moveContainer')[0];
      var trashCardId = trashCard.id;
      var trashCardNumber = trashCardId.substr(1, trashCardId.length);
      trashCardNumber = parseInt(trashCardNumber);


      var lesser = trashCardNumber - 1;
      if(lesser < 1) lesser = 13;
      var greater = trashCardNumber + 1;
      if(greater > 13) greater = 1;

      if(TRIPEAKS_DECK[i].num == lesser || TRIPEAKS_DECK[i].num == greater) {
        return false;
      }
    }
  }

  return gameOver;
}
