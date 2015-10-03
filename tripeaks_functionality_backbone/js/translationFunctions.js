function moveCardOverTime(card, xPos, yPos, time) {
  var c = document.getElementById(''+card.suit+card.num);
  var m = c.getElementsByClassName('moveContainer')[0];

console.log(m);

  m.style.transition = 'all '+time+'ms';
  m.style.transform = 'translate('+xPos+'px,'+yPos+'px)';
  m.classList.add('moveCard');



//  c.style.transition = 'all '+time+'ms';
////  c.style.transform = 'translate('+xPos+'px,'+yPos+'px)';
//  c.style.transform = sprintf(transformString, xPos, yPos, rotate);
//  c.classList.add('moveCard');


}

function flipCardOverTime(card, time) {
  var c = document.getElementById(''+card.suit+card.num);
  var f = c.getElementsByClassName('flipContainer')[0];
  f.style.transition = 'all '+time+'ms';
  f.classList.toggle('flipCard');
}
