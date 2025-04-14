"use strict";

const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const currentScore0 = document.getElementById("current--0");
const currentScore1 = document.getElementById("current--1");
const diceEL = document.querySelector(".dice");
const att = document.querySelector(".name");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const fondo0 = document.querySelector(".player--0");
const fondo1 = document.querySelector(".player--1");
const reset = document.querySelector(".btn--new");
const main = document.querySelector(".main-screen");

const player1Selection = document.querySelector("#player1-selection");
const player2Selection = document.querySelector("#player2-selection");
const characterBackgrounds = document.querySelectorAll(".player-character-bg");
const characterSelection = document.querySelector(".player-character-grid");
const playerNum = document.querySelector(".player-character-text");
const player1Image = document.querySelector(".selected-character--player1");
const player2Image = document.querySelector(".selected-character--player2");

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
let currentPlayer = 1; // 1 for Player 1, 2 for Player 2

const init = function () {
  // Reset character backgrounds
  characterBackgrounds.forEach((character) => {
    character.style.background = ""; // Clear background
    character.classList.remove("no-hover", "hover-green", "hover-blue"); // Remove hover classes
    delete character.dataset.selected; // Remove selection marker
  });

  // Set initial hover effect for Player 1
  characterBackgrounds.forEach((char) => {
    if (!char.dataset.selected) {
      char.classList.add("hover-green");
    }
  });

  // Reset player selections
  player1Selection.textContent = "None";
  player2Selection.textContent = "None";

  currentPlayer = 1; // Reset to Player 1
  playerNum.textContent = "Select Player 01";
};
init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  fondo0.classList.toggle("player--active");
  fondo1.classList.toggle("player--active");
  activePlayer = activePlayer === 0 ? 1 : 0;
};

// Dice roll functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEL.classList.remove("hidden");
    diceEL.classList.add("spin");
    setTimeout(() => {
      diceEL.src = `dices/dice-${dice}.png`;
      diceEL.classList.remove("spin"); // Quitar la animación después de que termine
    }, 500);

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold functionality
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 50) {
      playing = false;
      diceEL.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

// Character selection functionality
characterBackgrounds.forEach((character) => {
  character.addEventListener("click", () => {
    // Check if the character is already selected
    if (character.dataset.selected) {
      alert("This character has already been selected.");
      return;
    }

    // Assign character to the current player and change background
    if (currentPlayer === 1) {
      player1Selection.textContent = character.querySelector(
        ".player-character-name"
      ).textContent;
      player1Image.style.backgroundImage = `url(${
        character.querySelector(".player-character-img").src
      })`;
      character.style.background = "linear-gradient(135deg, #00ff00, #008000)"; // Green gradient
      character.dataset.selected = "player1"; // Mark as selected by Player 1
      character.classList.remove("hover-green"); // Remove green hover
      character.classList.add("no-hover"); // Disable hover for selected character
      currentPlayer = 2; // Switch to Player 2

      // Update hover effect for remaining characters
      characterBackgrounds.forEach((char) => {
        if (!char.dataset.selected) {
          char.classList.remove("hover-green");
          char.classList.add("hover-blue");
        }
      });

      playerNum.textContent = "Select Player 02";
    } else if (currentPlayer === 2) {
      player2Selection.textContent = character.querySelector(
        ".player-character-name"
      ).textContent;
      character.style.background =
        "linear-gradient(135deg, rgb(101, 119, 189), rgb(73, 76, 159))"; // Blue gradient
      character.dataset.selected = "player2";
      player2Image.style.backgroundImage = `url(${
        character.querySelector(".player-character-img").src
      })`;
      character.classList.remove("hover-blue"); // Remove blue hover
      character.classList.add("no-hover"); // Disable hover for selected character
      currentPlayer = 1; // Switch back to Player 1
      main.style.display = "flex"; // Hide main screen

      // Update hover effect for remaining characters
      characterBackgrounds.forEach((char) => {
        if (!char.dataset.selected) {
          char.classList.remove("hover-blue");
          char.classList.add("hover-green");
        }
      });

      characterSelection.style.display = "none"; // Hide character selection after both players have selected
    }
  });
});
btnNew.addEventListener("click", function () {
  // Reset game state
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Reset scores and current scores
  score0El.textContent = "0";
  score1El.textContent = "0";
  currentScore0.textContent = "0";
  currentScore1.textContent = "0";
  characterSelection.style.display = "grid";
  main.style.display = "none";

  // Remove winner class and reset player backgrounds
  fondo0.classList.remove("player--winner");
  fondo1.classList.remove("player--winner");
  fondo0.classList.add("player--active");
  fondo1.classList.remove("player--active");

  // Hide dice and reset character selection
  diceEL.classList.add("hidden");
  init();
});
// Reset game
reset.addEventListener("click", init);
