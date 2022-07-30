'use strict';

const randomNumber = Math.trunc(Math.random() * 6 + 1);

const refs = {
  score0El: document.getElementById('score--0'),
  score1El: document.getElementById('score--1'),
  currentScore0El: document.getElementById('current--0'),
  currentScore1El: document.getElementById('current--1'),
  diceImg: document.querySelector('.dice'),
  btnRoll: document.querySelector('.btn--roll'),
  btnNew: document.querySelector('.btn--new'),
  btnHold: document.querySelector('.btn--hold'),
  sectionPlayer0El: document.querySelector('.player--0'),
  sectionPlayer1El: document.querySelector('.player--1'),
};

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  refs.score0El.textContent = 0;
  refs.score1El.textContent = 0;
  refs.diceImg.classList.add('hidden');

  refs.score0El.textContent = 0;
  refs.score1El.textContent = 0;
  refs.currentScore0El.textContent = 0;
  refs.currentScore1El.textContent = 0;
  refs.btnHold.removeAttribute('disabled');
  refs.btnRoll.removeAttribute('disabled');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  refs.sectionPlayer0El.classList.add('player--active');
  refs.sectionPlayer1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  refs.sectionPlayer0El.classList.toggle('player--active');
  refs.sectionPlayer1El.classList.toggle('player--active');
};

const handleRollDice = function () {
  const randomNumber = Math.trunc(Math.random() * 6) + 1;

  refs.diceImg.classList.remove('hidden');
  refs.diceImg.setAttribute('src', `dice-${randomNumber}.png`);
  console.log(refs.diceImg.getAttribute('src'));
  if (randomNumber !== 1) {
    currentScore += randomNumber;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
};

const handleHoldBtn = function () {
  scores[activePlayer] += currentScore;

  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    console.log(scores);
    playing = false;
    refs.diceImg.classList.add('hidden');
    refs.btnHold.setAttribute('disabled', 'disabled');
    refs.btnRoll.setAttribute('disabled', 'disabled');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    switchPlayer();
  }
};

refs.btnRoll.addEventListener('click', handleRollDice);
refs.btnHold.addEventListener('click', handleHoldBtn);
refs.btnNew.addEventListener('click', init);
