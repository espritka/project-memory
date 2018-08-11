/*
* Create a list that holds all of your cards
*/


/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/

const deckOfCards = [];     // list that hold all the cards, next step is to shuffle it
const listOfcards = document.querySelectorAll('.card');
// console.log(listOfcards);   - test if correct list is created
let openCards = [];
let matchedCards = [];

function displayCardSymbol () {
  for (let i = 0; i < listOfcards.length; i++) {
    listOfcards[i].addEventListener('click', function (event) {
      // console.log("Card was just clicked!");   - test if card is clicked
      const cardOpen = event.target.classList.toggle('open');
      const cardShow = event.target.classList.toggle('show');
      addToOpenCards(event.target);
      allCardsUncovered();
    })
  }
}

function addToOpenCards(card) {
  openCards.push(card)
  // console.log(openCards);   // - test if card is added with a click to this array
  checkOpenCardsForDuplicate(card);
}

function addToMatchedCards(card) {
  matchedCards.push(card);
  card.classList.remove('open');
  card.classList.remove('show');
  card.classList.add('match');
}

function checkOpenCardsForDuplicate() {
  if (openCards.length < 2) {
    // wait for another card, do nothing
    console.log(openCards)
  }
  else if (openCards.length === 2) {
    console.log("Two cards!")
    console.log(openCards)
    //check if card1 and card2 are equal
    let card1 = openCards[0];
    let card2 = openCards[1];
    if (card1.firstElementChild.className  === card2.firstElementChild.className) {
      console.log("cards are equal");
      // add to array matchedCards
      addToMatchedCards(card1);
      addToMatchedCards(card2);
      // console.log(matchedCards);   // - test if card is added to this array
      // reset openCards to be empty
      openCards = [];
    }
    else {
      console.log("cards are NOT equal");
      setTimeout (function removeOpenShow() {
        card1.classList.remove('open');
        card1.classList.remove('show');
        card2.classList.remove('open');
        card2.classList.remove('show');
        // reset openCards to be empty
        openCards = [];
      }, 1050);
    }
  }
}

function allCardsUncovered() {
  console.log("in matched cards there are: " + matchedCards.length + " cards");   // - test how many cards are added to the array
  if (matchedCards.length === 16) {
    // say that you won the Game
    setTimeout(function winwin() {
      window.alert("You won! The game is over. You only needed X moves to do it.");
      // say how many moves were used to win
    }, 0);

  }
}


displayCardSymbol();
