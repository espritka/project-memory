// Shuffle function from : http://stackoverflow.com/a/2450976
//prevent clicking again on the same element idea from : https://stackoverflow.com/questions/28083708/how-to-disable-clicking-inside-div
//remove attribute idea: https://www.w3schools.com/jsref/met_element_removeattribute.asp
// to-do: start timer with first click on card

// ************** variables ***************

const deck = document.querySelector('.deck');
const deckOfCards = document.querySelectorAll('.deck li');     // list that hold all the cards, next step is to shuffle it
const listOfcards = document.querySelectorAll('.card');
console.log(listOfcards);   //- test if correct list is created
let openCards = [];
let matchedCards = [];
let moves = document.querySelector('.moves');
let movesCount = 0;
let starsCount = 3;
const starOne = document.getElementById('one');
const starTwo = document.getElementById('two');
const starThree = document.getElementById('three');
const restart = document.querySelector('.restart');
let interval;


function displayCardSymbol () {
  for (let i = 0; i < listOfcards.length; i++) {
    listOfcards[i].addEventListener('click', function (event) {
      // console.log("Card was just clicked!");   - test if card is clicked
      const cardOpen = event.target.classList.toggle('open');
      const cardShow = event.target.classList.toggle('show');
      addToOpenCards(event.target);
      if (event.target.classList.contains('open', 'show')) {
        listOfcards[i].setAttribute('style', 'pointer-events: none;');
      }
    })
  }
  interval = setInterval(startTimer, 1000);
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
    // wait for another card, count this move
    console.log(openCards)
  }
  else if (openCards.length === 2) {
    console.log("Two cards!")
    console.log(openCards)
    howManyMoves();
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
      card1.removeAttribute('style');
      card2.removeAttribute('style');
    } else {
      console.log("cards are NOT equal");
      setTimeout (function removeOpenShow() {
        card1.classList.remove('open');
        card1.classList.remove('show');
        card2.classList.remove('open');
        card2.classList.remove('show');
        card1.removeAttribute('style');
        card2.removeAttribute('style');
        // reset openCards to be empty
        openCards = [];
      }, 800);
    }
  }
  allCardsUncovered();
  stars();
}

function allCardsUncovered() {
  console.log("in matched cards there are: " + matchedCards.length + " cards");   // - test how many cards are added to the array
  if (matchedCards.length === 16) {
    // say that you won the Game
    setTimeout(function youWin() {
      displayModal();
      // window.alert("You win! You only needed " + movesCount + " moves to do it. You get " + starsCount + " stars! You did in in " + seconds.innerHTML + " seconds");
      // say how many moves were used to win
    }, 0);
    stopTimer();
  }
}

// ************** moves count ***************

function howManyMoves() {
  movesCount = movesCount + 1;
  moves.innerHTML = movesCount;
  console.log(moves);
}

// ************** displaying stars ***************

function stars() {
  if (movesCount <= 12) {
    // display 3 stars
    starsCount = 3;
  } else if (movesCount > 12 && movesCount <= 20) {
    // display 2 stars
    starOne.style.display = 'none';
    starsCount = 2;
  } else if (movesCount > 20 && movesCount <= 30) {
    // display 1 stars
    starOne.style.display = 'none';
    starTwo.style.display = 'none';
    starsCount = 1;
  } else {
    // no stars
    starOne.style.display = 'none';
    starTwo.style.display = 'none';
    starThree.style.display = 'none';
    starsCount = 0;
  }
}

// ************** restart button ***************

function restartButton() {
  restart.addEventListener('click', function() {
    starsCount = 3;
    starOne.style.display = '';
    starTwo.style.display = '';
    starThree.style.display = '';
    movesCount = 0;
    moves.innerHTML = movesCount;
    // console.log("Restart button was clicked!")  // test if function is working
    // restart board Game: shuffle cards
    shuffleCards();
    resetTimer();
  });
}


// ************** shuffle cards ***************
// credit to https://gomakethings.com/converting-a-nodelist-to-an-array-with-vanilla-javascript/

const deckArray = Array.from(deckOfCards);

function shuffle(deckArray) {
  let currentIndex = deckArray.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = deckArray[currentIndex];
    deckArray[currentIndex] = deckArray[randomIndex];
    deckArray[randomIndex] = temporaryValue;
  }
  return deckArray;
}

function shuffleCards(){
  const newDeck = shuffle(deckArray);
  // console.log(deckArray);   // test if cards are shuffled
  for (let i = 0; i < newDeck.length; i++) {
    newDeck[i].classList.remove("match", "show", "open");
    newDeck[i].removeAttribute("style");
    openCards = [];
    matchedCards = [];
    deck.appendChild(newDeck[i]);
  }
  /* ~~ different ways to do it ~~
   for (let card of newDeck) {
     deck.appendChild(card);
   }
   ~~ or ~~
   newDeck.forEach(function myFunction(card) {
     deck.appendChild(card);
   });
 */
}

// ************** timer ***************
// source: https://www.w3schools.com/howto/howto_js_countdown.asp
// source: https://jsfiddle.net/Daniel_Hug/pvk6p/
// source: https://www.youtube.com/watch?v=gpFPppFU8s8

let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");

minutesCount = 0;
secondsCount = 0;

function startTimer() {
  secondsCount++;
  if (secondsCount >= 60) {
    secondsCount = 0;
    minutesCount++;
    if (minutesCount < 10) {
      minutes.innerHTML = "0" + minutesCount
    } else {
      minutes.innerHTML = minutesCount;
    }
  }
  if (secondsCount < 10) {
    seconds.innerHTML = "0" + secondsCount;
  } else {
    seconds.innerHTML = secondsCount;
  }
  // console.log(secondsCount); - test if seconds are counting
}

function resetTimer() {
  clearInterval(interval);
  seconds.innerHTML = "00";
  minutes.innerHTML = "0";
  secondsCount = 0;
  interval = setInterval(startTimer, 1000);
}

function stopTimer() {
  clearInterval(interval);
}

// ************** the MODAL ***************

const modal = document.getElementById("myModal");
const closeModal = document.getElementsByClassName("close")[0];

closeModal.onclick = function() {
  modal.style.display = "none";
}

function displayModal() {
  modal.style.display = "block";
  let message = document.getElementById("message");
  message.innerHTML = "You win! <br>You did it in " + movesCount + " moves. <br>You get " + starsCount + " stars for this! <br>You did it in " + minutes.innerHTML + " minute(s) and " + seconds.innerHTML + " seconds! Wow!"
}

// ************** game init ***************
shuffleCards();
displayCardSymbol();
restartButton();
