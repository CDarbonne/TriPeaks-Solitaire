function moveOverTime(xPos, yPos, time) {

}

function flipCardOverTime(card, time) {
  var c = document.getElementById(''+card.suit+card.num);
  c.style.transition = 'all '+time+'ms';
  c.classList.toggle('flip');
}
