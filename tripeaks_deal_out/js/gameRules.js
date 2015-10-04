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

}


function trashCards() {
  /* NOT REALLY NEEDED */
  console.log('Im a trash card');
}

function shoeCards(e) {
  var card = UNUSED_DECK[UNUSED_DECK.length-1];
  moveCardOverTime(card, USED_INIT_X, USED_INIT_Y, MOVE_TIME);
  flipCardOverTime(card, FLIP_TIME);

  setTimeout(function() {
    var shoeCardsHTML = document.getElementById('shoeCards');
    shoeCardsHTML = shoeCardsHTML.getElementsByClassName('moveContainer');

    var trashCardsHTML = document.getElementById('trashCards');

    var currentElement = document.createElement('div');
    currentElement = shoeCardsHTML[shoeCardsHTML.length-1].outerHTML;

    // change general function parameter function number to 1
    var searchString1 = 'generalFunction(';
    var parameterIndexStart = currentElement.indexOf('generalFunction(');
    parameterIndexStart = parameterIndexStart+searchString1.length;
    var parameterIndexEnd = currentElement.indexOf(',', parameterIndexStart);
    var newString = currentElement.substring(0, parameterIndexStart);
    newString += '1';
    newString += currentElement.substring(parameterIndexEnd, currentElement.length);

    currentElement = newString;
    shoeCardsHTML[shoeCardsHTML.length-1].remove();
    trashCardsHTML.innerHTML = currentElement;
  }, MOVE_TIME);

  USED_DECK.push(UNUSED_DECK.pop());
}

function fieldCards() {

}
