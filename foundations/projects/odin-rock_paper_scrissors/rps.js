// variables
let playerChoice = null;
let playerScore = 0;
let computerScore = 0;
let log = null;
let rounds = 5;
let winner = "";
let playerScoreText = document.querySelector("#player-score");
let computerScoreText = document.querySelector("#computer-score");
let computerChoiceText = document.querySelector("#computer-choice");

const choices = ["rock", "paper", "scissors"];
const options = document.querySelector(".card");
const menuButton = document.querySelector("#menu__button");
const container = document.querySelector(".container");
const display = document.createElement("div");
const text = document.createElement("h3");
const nextButton = document.createElement("button");
const winnerText = document.createElement("h3");

display.setAttribute(
  "style",
  "display: flex; justify-content: center; align-items: center; margin-top: 20px; gap: 20px;",
);
nextButton.setAttribute(
  "style",
  "padding: 10px 20px; border: 2px solid black; border-radius: 5px;",
);

// get the computers choice
function getComputerChoice() {
  const random = Math.floor(Math.random() * choices.length);
  return choices[random];
}

// play the round
function playRound(humanChoice, computerChoice) {
  if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    playerScore++;
    playerScoreText.textContent = playerScore;
    const status = "You Won! " + humanChoice + " beats " + computerChoice + ".";
    log = status;
    return;
  } else if (humanChoice === computerChoice) {
    const status = "Draw! both chose " + humanChoice + ".";
    log = status;
    return;
  } else {
    computerScore++;
    computerScoreText.textContent = computerScore;
    const status =
      "You Lose! " + computerChoice + " beats " + humanChoice + ".";
    log = status;
    return;
  }
}
options.addEventListener("click", (event) => {
  const choice = event.target.closest(".card__button");
  if (!choice) {
    return;
  }

  switch (true) {
    case choice.className.includes("card__button--rock"):
      playerChoice = "rock";
      break;
    case choice.className.includes("card__button--paper"):
      playerChoice = "paper";
      break;
    case choice.className.includes("card__button--scissors"):
      playerChoice = "scissors";
      break;
  }

  if (playerChoice) {
    console.log("Player selected: " + playerChoice);
    choice.setAttribute("style", "background-color: green;");
  }
  text.textContent = null;
  playGame();
});

// button status
function buttonStatus(status) {
  const disableButton = options.querySelectorAll("button");
  disableButton.forEach((button) => {
    button.disabled = status;
    if (status === false) {
      button.setAttribute("style", "background-color: none;");
    }
  });
}

function gameWinner() {
  if (playerScore > computerScore) {
    winner = "Player Wins!";
  } else if (computerScore > playerScore) {
    winner = "Computer Wins!";
  } else {
    winner = "Draw!";
  }
  computerScore = 0;
  playerScore = 0;
}

nextButton.addEventListener("click", () => {
  if (nextButton.textContent === "Restart") {
    computerScoreText.textContent = computerScore;
    playerScoreText.textContent = playerScore;
    display.removeChild(winnerText);
  }
  buttonStatus(false);
  computerChoiceText.textContent = "...";
  container.removeChild(display);
});

// play the game
function playGame() {
  let computerChoice = getComputerChoice();
  playRound(playerChoice, computerChoice);
  computerChoiceText.textContent = computerChoice;

  buttonStatus(true);
  display.appendChild(nextButton);

  if (rounds === 1) {
    nextButton.textContent = "Restart";
    gameWinner();
    winnerText.textContent = winner;
    display.insertBefore(winnerText, nextButton);
    container.appendChild(display);
    rounds = 5;
    return;
  }

  nextButton.textContent = "Next";
  display.insertBefore(text, nextButton);
  text.textContent = log;
  container.appendChild(display);
  console.log(rounds);
  rounds--;
}

// remove screen
function mainMenu() {
  const menu = document.querySelector("#menu");
  menu.remove();
}

menuButton.addEventListener("click", mainMenu);
