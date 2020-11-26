'use strict';

let secretNumber, score, highscore;

score = 20;
highscore = 0;
secretNumber = Math.trunc(Math.random() * 20) + 1;


const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const changeNumNBody = function (number, width, color) {
  document.querySelector('.number').textContent = number;
  document.querySelector('.number').style.width = width;
  document.querySelector('body').style.backgroundColor = color;
};

// Check Button Click Event
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  // When there is no input
  if (!guess) {
    displayMessage('⛔️ No number!');

    // When player wins
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');

    changeNumNBody(secretNumber, '30rem', '#60b347');

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('💥 You lost the game!');
      changeNumNBody('?', '30rem', '#c00');
      document.querySelector('.score').textContent = 0;
    }
  }
});

// Again Button Click Event
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';

  changeNumNBody('?', '15rem', '#222');
});
