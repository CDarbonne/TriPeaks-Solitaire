function moveCardOverTime(card, xPos, yPos, time) {
  // m = moveContainer
  var m = document.getElementById(''+card.suit+card.num);

  m.style.transition = 'all '+time+'ms';
  m.style.transform = 'translate('+xPos+'px,'+yPos+'px)';
  m.classList.toggle('moveCard');
}

function flipCardOverTime(card, time) {
	// f = flipContainer
  var m = document.getElementById(''+card.suit+card.num);
  var f = m.getElementsByClassName('flipContainer')[0];

  f.style.transition = 'all '+time+'ms';
  f.classList.toggle('flipCard');
  card.isFaceUp = !card.isFaceUp;
}

function dealDeck(cardArray, coordinatesArray, moveTime, intervalTime) {
  var cardDistributerCounter = 0;

	var cardDistributerInterval = setInterval(function() {
    moveCardOverTime(cardArray[cardDistributerCounter],
      coordinatesArray[cardDistributerCounter][0],
      coordinatesArray[cardDistributerCounter][1],
      moveTime);

    cardDistributerCounter++;
    if(cardDistributerCounter === cardArray.length) {
      clearInterval(cardDistributerInterval);
    }
  }, intervalTime);
}