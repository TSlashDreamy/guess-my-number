"use strict";

let secretNumber = generateRandomNumber(20);

let score = 20;
let highscore = 0;
let gameOver = false;
let gameWin = false;

/**
 * Returns random generated number from 1 to maxNumber
 * @param {number} maxNumber max generated number
 * @returns {number} generated number
 */
function generateRandomNumber(maxNumber) {
  return Math.trunc(Math.random() * maxNumber) + 1;
}

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

/**
 * Setting green background and strething div of guessed number
 */
const setWinStyles = function () {
  document.querySelector("body").style.backgroundColor = "#60b347";
  document.querySelector(".number").style.width = "30rem";
};

/**
 * Setting red background and strething div of guessed number
 */
const setLostStyles = function () {
  document.querySelector("body").style.backgroundColor = "#b34747";
  document.querySelector(".number").style.width = "30rem";
};

/**
 * Setting default (#222) background color and default div width (15rem) of guessed number
 */
const setDefaultStyles = function () {
  document.querySelector(".number").style.width = "15rem";
  document.querySelector("body").style.backgroundColor = "#222";
};

/**
 * Updating score number in DOM
 * @param {number} score number to show in score
 */
const updateScore = function (score) {
  document.querySelector(".score").textContent = score;
};

// "check" button functionality
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  // if player already win or lost the game, ignore button clicks
  if (gameWin || gameOver) return;

  // if nothing in input it returns 0 (0 is a (false)falsy value)
  if (!guess) {
    displayMessage("🚫 No number");

    // if player wins
  } else if (guess === secretNumber) {
    gameWin = true;
    displayMessage("🎉 Correct number");
    setWinStyles();
    // showing guessed number
    document.querySelector(".number").textContent = secretNumber;

    // updating highscore
    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
  }

  // if guess is wrong
  else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "📈 Too high" : "📉 Too low");
      score--;
      updateScore(score);
    } else {
      setLostStyles();
      displayMessage("💥 You lost");
      // showing guessed number
      document.querySelector(".number").textContent = secretNumber;
      updateScore(0);
      gameOver = true;
    }
  }
});

// "again" button functionality
document.querySelector(".again").addEventListener("click", function () {
  gameOver = false;
  gameWin = false;
  score = 20;
  secretNumber = generateRandomNumber(20);
  updateScore(score);
  displayMessage("Start guessing...");
  setDefaultStyles();
  // hide guessed number
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
});
