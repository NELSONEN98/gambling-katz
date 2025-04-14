"use strict";

let number = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let maxScore = 0;

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess);

  if (!guess) {
    displayMessage("No value!");
  } else if (guess != number) {
    if (score > 1) {
      displayMessage(guess > number ? "Too high!" : "Too low");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      displayMessage("You lose!");
      document.querySelector(".score").textContent = 0;
    }
  } //When guess is too low
  //When player wins
  else if (guess === number) {
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
    document.querySelector("h1").textContent = "Correct Number";
    displayMessage("you won!");
    document.querySelector(".number").textContent = number;

    if (score > maxScore) {
      maxScore = score;

      document.querySelector(".highscore").textContent = maxScore;
    }
  }
});

document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  number = Math.trunc(Math.random() * 20) + 1;
  displayMessage("Start guessing...");
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector("h1").textContent = "New Game";
  document.querySelector(".score").textContent = score;
  document.querySelector(".guess").value = "";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".number").style.width = "15rem";
});
