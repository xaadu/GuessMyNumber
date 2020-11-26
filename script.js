'use strict';


(function () {
  let secretNumber, score, highscore, isPlaying;

  const init = function () {
    score = 20;
    isPlaying = true;
    secretNumber = Math.trunc(Math.random() * 20) + 1;

    highscore = localStorage.highscore ? Number(localStorage.highscore) : 0;
    setHighScore(highscore);
  }

  const displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
  };

  const changeNumNBody = function (number, width, color) {
    document.querySelector('.number').textContent = number;
    document.querySelector('.number').style.width = width;
    document.querySelector('body').style.backgroundColor = color;
  };

  const setHighScore = function (sc) {
    highscore = sc;
    document.querySelector('.highscore').textContent = highscore;
    localStorage.highscore = highscore;
  }

  // Check Button Click Event
  document.querySelector('.check').addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value);

    if (isPlaying) {
      // When there is no input
      if (!guess) {
        displayMessage('⛔️ No number!');

        // Check for Range
      } else if (guess < 1 || guess > 20) {
        displayMessage('🙂 Number Out Of Range');

        // When player wins
      } else if (guess === secretNumber) {
        displayMessage('🎉 Correct Number!');
        changeNumNBody(secretNumber, '30rem', '#60b347');

        isPlaying = false;

        if (score > highscore) {
          setHighScore(score);
        }

        // When guess is wrong
      } else if (guess !== secretNumber) {
        if (score > 1) {
          displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
          score -= 4;
          document.querySelector('.score').textContent = score;
        } else {
          displayMessage('💥 You lost the game!');
          changeNumNBody('?', '30rem', '#c00');
          document.querySelector('.score').textContent = 0;
          isPlaying = false;
        }
      }
    }
  });

  // Again Button Click Event
  document.querySelector('.again').addEventListener('click', function () {
    score = 20;
    isPlaying = true;
    secretNumber = Math.trunc(Math.random() * 20) + 1;

    displayMessage('Start guessing...');
    document.querySelector('.score').textContent = score;
    document.querySelector('.guess').value = '';

    changeNumNBody('?', '15rem', '#222');
  });

  // Reset Button Click Event
  document.querySelector('.reset').addEventListener('click', setHighScore.bind(this, 0));

  // Initialize
  init();
})();
