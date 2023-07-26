"use strict";

let firstNumber = 0;
let secondNumber = 0;
let guessingNumber = 0;
let secretNumber = 0;
let score = 0;
let highscore = 0;

document.querySelector(".play-btn").addEventListener("click", function () {
  document.querySelector(".first-interface").classList.add("display-none");
  document.querySelector(".second-interface").classList.remove("display-none");
});

document.querySelector(".next-btn").addEventListener("click", function () {
  if (
    document.querySelector(".first-number").value == "" ||
    document.querySelector(".second-number").value == ""
  ) {
    alert("Please enter a number");
  } else {
    document.querySelector(".second-interface").classList.add("display-none");
    document.querySelector(".third-interface").classList.remove("display-none");
    firstNumber = Number(document.querySelector(".first-number").value);
    secondNumber = Number(document.querySelector(".second-number").value);
    if (firstNumber > secondNumber) {
      [firstNumber, secondNumber] = [secondNumber, firstNumber];
    }
    secretNumber =
      Math.trunc(Math.random() * (secondNumber - firstNumber + 1)) +
      firstNumber;
  }
});

document.querySelector(".start-btn").addEventListener("click", function () {
  if (document.querySelector(".guessing-number").value == "") {
    alert("Please enter a number");
  } else {
    score = Number(document.querySelector(".guessing-number").value);
    document.querySelector(".score").textContent = score;
    document.querySelector(".third-interface").classList.add("display-none");
    document.querySelector(".game-interface").classList.remove("display-none");

    document.querySelector(".min").textContent = firstNumber;
    document.querySelector(".max").textContent = secondNumber;
    document.querySelector(".guess").setAttribute("min", firstNumber);
    document.querySelector(".guess").setAttribute("max", secondNumber);
  }
});

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  if (guess < firstNumber || guess > secondNumber) {
    displayMessage(
      "Please enter a number between " + firstNumber + " and " + secondNumber
    );
  } else {
    // When there is no input
    if (guess == "") {
      displayMessage("⛔️ No number!");
    } else if (guess === secretNumber) {
      displayMessage("🎉 Correct Number!");
      document.querySelector(".number").textContent = secretNumber;
      document.querySelector("body").style.backgroundColor = "#60b347";
      document.querySelector(".number").style.width = "30rem";
      if (score > highscore) {
        highscore = score;
        document.querySelector(".highscore").textContent = highscore;
      }
    } else if (guess !== secretNumber) {
      if (score > 1) {
        displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
        score--;
        document.querySelector(".score").textContent = score;
      } else {
        displayMessage("💥 You lost the game!");
        document.querySelector(".score").textContent = 0;
      }
    }
  }
});

document.querySelector(".again").addEventListener("click", function () {
  score = Number(document.querySelector(".guessing-number").value);
  secretNumber =
    Math.trunc(Math.random() * (secondNumber - firstNumber + 1)) + firstNumber;

  displayMessage("Start guessing...");
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";

  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});
