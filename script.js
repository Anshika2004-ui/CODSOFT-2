const boardElement = document.getElementById("game-board");
const statusElement = document.getElementById("status");
const restartButton = document.getElementById("restart");

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function createBoard() {
  boardElement.innerHTML = "";
  board.forEach((row, i) => {
    row.forEach((cell, j) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      cellElement.textContent = board[i][j];
      cellElement.addEventListener("click", () => playerMove(i, j));
      boardElement.appendChild(cellElement);
    });
  });
}

function isMovesLeft(b) {
  return b.flat().includes("");
}

function evaluate(b) {
  // Rows
  for (let i = 0; i < 3; i++) {
    if (b[i][0] && b[i][0] === b[i][1] && b[i][1] === b[i][2]) {
      return b[i][0] === "X" ? 10 : -10;
    }
  }
  // Cols
  for (let j = 0; j < 3; j++) {
    if (b[0][j] && b[0][j] === b[1][j] && b[1][j] === b[2][j]) {
      return b[0][j] === "X" ? 10 : -10;
    }
  }
  // Diags
  if (b[0][0] && b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
    return b[0][0] === "X" ? 10 : -10;
  }
  if (b[0][2] && b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
    return b[0][2] === "X" ? 10 : -10;
  }
  return 0;
}

function minimax(b, depth, isMax) {
  let score = evaluate(b);
  if (score === 10) return score - depth;
  if (score === -10) return score + depth;
  if (!isMovesLeft(b)) return 0;

  if (isMax) {
    let best = -1000;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (b[i][j] === "") {
          b[i][j] = "X";
          best = Math.max(best, minimax(b, depth + 1, false));
          b[i][j] = "";
        }
      }
    }
    return best;
  } else {
    let best = 1000;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (b[i][j] === "") {
          b[i][j] = "O";
          best = Math.min(best, minimax(b, depth + 1, true));
          b[i][j] = "";
        }
      }
    }
    return best;
  }
}

function findBestMove(b) {
  let bestVal = -1000;
  let move = { row: -1, col: -1 };
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (b[i][j] === "") {
        b[i][j] = "X";
        let moveVal = minimax(b, 0, false);
        b[i][j] = "";
        if (moveVal > bestVal) {
          move = { row: i, col: j };
          bestVal = moveVal;
        }
      }
    }
  }
  return move;
}

function checkGameOver() {
  let score = evaluate(board);
  if (score === 10) {
    statusElement.textContent = "AI Wins! 😎";
    disableBoard();
    return true;
  } else if (score === -10) {
    statusElement.textContent = "You Win! 🎉";
    disableBoard();
    return true;
  } else if (!isMovesLeft(board)) {
    statusElement.textContent = "It's a Draw 🤝";
    return true;
  }
  return false;
}

function disableBoard() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => cell.classList.add("taken"));
}

function playerMove(i, j) {
  if (board[i][j] === "") {
    board[i][j] = "O";
    createBoard();
    if (checkGameOver()) return;
    setTimeout(aiMove, 500); // AI plays after small delay
  }
}

function aiMove() {
  let bestMove = findBestMove(board);
  board[bestMove.row][bestMove.col] = "X";
  createBoard();
  checkGameOver();
}

restartButton.addEventListener("click", () => {
  board = [["", "", ""], ["", "", ""], ["", "", ""]];
  statusElement.textContent = "";
  createBoard();
});

createBoard();