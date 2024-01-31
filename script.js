const X_PLAYER = "x";
const CIRCLE_PLAYER = "circle";
const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cellElements = document.querySelectorAll("[data-cell]");
const boardEl = document.getElementById("board");
let circleTurn;
const winningMessageElem = document.getElementById("winningMessage");
const winningMessageTextElem = document.querySelector(
  "[data-winnig-message-text]"
);
const restartBtn = document.getElementById("restart");

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_PLAYER);
    cell.classList.remove(CIRCLE_PLAYER);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElem.classList.remove("show");
}

startGame();

function handleClick(e) {
  const cell = e.target;
  const currentPlayer = circleTurn ? CIRCLE_PLAYER : X_PLAYER;
  console.log(circleTurn);
  placeMark(cell, currentPlayer);

  //2. check wins
  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElem.innerText = "Draw!";
  } else {
    winningMessageTextElem.innerText = `${circleTurn ? "O wins!" : "X wins!"}`;
  }

  winningMessageElem.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_PLAYER) ||
      cell.classList.contains(CIRCLE_PLAYER)
    );
  });
}

function placeMark(cell, currentPlayer) {
  cell.classList.add(currentPlayer);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  boardEl.classList.remove(X_PLAYER);
  boardEl.classList.remove(CIRCLE_PLAYER);

  if (circleTurn) {
    boardEl.classList.add(CIRCLE_PLAYER);
  } else {
    boardEl.classList.add(X_PLAYER);
  }
}

function checkWin(currentPlayer) {
  return WINNING_COMBINATION.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
}

restartBtn.addEventListener("click", startGame);
