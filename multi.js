'use strict';

// PLAYER NAMES MODAL WINDOW

const closePLayerModal = document.querySelector('.form-btn');
const overlay = document.querySelector('.overlay');
const playerNamesForm = document.querySelector('.player-names');
const namePLayer1Form = document.querySelector('.name-1');
const namePLayer2Form = document.querySelector('.name-2');
const displayPlayer1Name = document.querySelector('.player1-name');
const displayPlayer2Name = document.querySelector('.player2-name');

let player1name;
let player2name;

closePLayerModal.addEventListener('click', function () {
  player1name = namePLayer1Form.value;
  player2name = namePLayer2Form.value;
  setNames();
  overlay.classList.add('hidden');
  playerNamesForm.classList.add('hidden');
});

// PLAYER NAMES
const setNames = function () {
  displayPlayer1Name.textContent = player1name ? player1name : 'player 1';
  displayPlayer2Name.textContent = player2name ? player2name : 'player 2';
};

// GAME LOGIC

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
};

diceBtn.addEventListener('click', function () {
  if (playing) {
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
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
