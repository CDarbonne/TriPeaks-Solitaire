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
}

function trashCards() {
  /* NOT REALLY NEEDED */
  console.log('Im a trash card');
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

function moveToTrash(id) {
    var shoeCardsHTML = document.getElementById(id);
    shoeCardsHTML = shoeCardsHTML.getElementsByClassName('moveContainer');

    var trashCardsHTML = document.getElementById('trashCards');

    var currentElement = document.createElement('div');
    currentElement = shoeCardsHTML[shoeCardsHTML.length-1].outerHTML;
    currentElement = replaceFunctionNumber(currentElement, 1);

    shoeCardsHTML[shoeCardsHTML.length-1].remove();

    trashCardsHTML.innerHTML = currentElement;
}

function moveFieldCardToTrash(id, cardId) {
    // id = fieldCards
    var fieldCardsHTML = document.getElementById(cardId);
    var trashCardsHTML = document.getElementById('trashCards');

    var currentElement = document.createElement('div');
    currentElement = fieldCardsHTML.outerHTML;

    fieldCardsHTML.remove();
    trashCardsHTML.innerHTML = currentElement;
}


function shoeCards(e) {
  var card = UNUSED_DECK[UNUSED_DECK.length-1];
  moveCardOverTime(card, USED_INIT_X, USED_INIT_Y, MOVE_TIME);
  flipCardOverTime(card, FLIP_TIME);

  setTimeout(function() {
    moveToTrash('shoeCards');
  }, MOVE_TIME);

  USED_DECK.push(UNUSED_DECK.pop());
}

function fieldCards(e) {
  var i;
  var cardIndex = -1;
  var elementId = e.id;

  var suit = elementId.substr(0, 1);
  var number = elementId.substr(1, elementId.length);
  number = parseInt(number);

  var trashCard = document.getElementById('trashCards');
  trashCard = trashCard.getElementsByClassName('moveContainer')[0];
  var trashCardId = trashCard.id;
  var trashCardNumber = trashCardId.substr(1, trashCardId.length);
  trashCardNumber = parseInt(trashCardNumber);

  // find card object that matches DOM element
  for(i = 0; i < TRIPEAKS_DECK.length; i++) {
    if(TRIPEAKS_DECK[i].num == number && TRIPEAKS_DECK[i].suit == suit) {
      cardIndex = i;
    }
  }

  var card = TRIPEAKS_DECK[cardIndex];

  if(card.isFaceUp) {
    var lesser = trashCardNumber - 1;
    if(lesser < 1) lesser = 13;
    var greater = trashCardNumber + 1;
    if(greater > 13) greater = 1;

    if(card.num == lesser || card.num == greater) {
      
  for(i = 0; i < TRIPEAKS_DECK.length; i++) {
    var currentCard = TRIPEAKS_DECK[i];
    if(currentCard.leftChild == card.id) currentCard.leftChild = null;
    if(currentCard.rightChild == card.id) currentCard.rightChild = null;
  }
      moveCardOverTime(card, USED_INIT_X, USED_INIT_Y, MOVE_TIME);

      setTimeout(function() {
        moveFieldCardToTrash('fieldCards', elementId);
      }, MOVE_TIME);
    }
  }

}

function flipLeafNodes() {
  TRIPEAKS_DECK.forEach(function(e) {
    if(e.leftChild == null && e.rightChild == null && !e.isFaceUp) {
      flipCardOverTime(e, FLIP_TIME);
    }
  });
}
