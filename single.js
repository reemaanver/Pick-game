'use strict';

// PLAYER NAMES MODAL WINDOW

const closePLayerModal = document.querySelector('.form-btn');
const overlay = document.querySelector('.overlay');
const playerNamesForm = document.querySelector('.player-names');
const namePLayerForm = document.querySelector('.name-1');
const displayPlayerName = document.querySelector('.player1-name');

let playername;

closePLayerModal.addEventListener('click', function () {
  playername = namePLayerForm.value;

  setNames();
  overlay.classList.add('hidden');
  playerNamesForm.classList.add('hidden');
});

// PLAYER NAMES
const setNames = function () {
  displayPlayerName.textContent = playername ? playername : 'player 1';
};

const player0 = document.querySelector('.player0');
const player1 = document.querySelector('.player1');
const currentScore0 = document.querySelector('.current-score-0');
const currentScore1 = document.querySelector('.current-score-1');
const totalScore0 = document.querySelector('.score-0');
const totalScore1 = document.querySelector('.score-1');
const diceBtn = document.querySelector('.btn-dice-roll');
const newBtn = document.querySelector('.btn-new-game');
const holdBtn = document.querySelector('.btn-hold');
const diceImg = document.querySelector('.dice');

// INITIAL CONDITIONS
let currentScore;
let scores;
let activePlayer;
let playing;

const init = function () {
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;
  totalScore0.textContent = 0;
  totalScore1.textContent = 0;
  player0.classList.add('player-active');
  player1.classList.remove('player-active');
  player0.classList.remove('player-winner');
  player1.classList.remove('player-winner');
  diceImg.classList.add('hidden');
};

init();

// DICE ROLL FUNCTION
const changeActive = function () {
  currentScore = 0;
  document.querySelector(`.current-score-${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 1 ? 0 : 1;
  player0.classList.toggle('player-active');
  player1.classList.toggle('player-active');
  if (activePlayer === 1) {
    playing = false;
    let times = Math.trunc(Math.random() * 5) + 1;
    console.log(`count: ${times}`);
    computerPlay(times);
  } else {
    playing = true;
  }
};

const win = function () {
  playing = false;
  diceImg.classList.add('hidden');
  document.querySelector(`.current-score-${activePlayer}`).textContent = 0;
  document
    .querySelector(`.player${activePlayer}`)
    .classList.add('player-winner');
  document
    .querySelector(`.player${activePlayer}`)
    .classList.remove('player-active');
};

const computerHold = function () {
  scores[activePlayer] += currentScore;
  document.querySelector(`.score-${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 100) {
    win();
  } else {
    changeActive();
  }
};

const computerPlay = function (count) {
  if (count <= 0) {
    let holdornot = Math.trunc(Math.random() * 2) + 1;
    console.log(holdornot);
    if (holdornot == 1) {
      computerHold();
    } else {
      changeActive();
    }

    return;
  }
  setTimeout(function () {
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
    diceImg.src = `images/dice-${diceNumber}.png`;
    console.log(`dice: ${diceNumber}, count: ${count}`);
    if (diceNumber != 1) {
      currentScore += diceNumber;
      document.querySelector(`.current-score-${activePlayer}`).textContent =
        currentScore;
    } else {
      changeActive();
      return;
    }

    computerPlay(count - 1);
  }, 1000);
};

diceBtn.addEventListener('click', function () {
  if (playing) {
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
    console.log(`dice1: ${diceNumber}`);
    diceImg.classList.remove('hidden');
    diceImg.src = `images/dice-${diceNumber}.png`;
    if (diceNumber != 1) {
      currentScore += diceNumber;
      document.querySelector(`.current-score-${activePlayer}`).textContent =
        currentScore;
    } else {
      changeActive();
    }
  }
});

// HOLD FUNCTION
holdBtn.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`.score-${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      win();
    } else {
      changeActive();
    }
  }
});

// NEW GAME
newBtn.addEventListener('click', init);

// HOME BUTTON
document.querySelector('.home').addEventListener('click', function () {
  window.location.href = 'index.html';
});
