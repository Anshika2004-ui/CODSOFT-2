const readline = require("readline");

// Setup for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let board = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];

function printBoard() {
  console.log("\n");
  board.forEach((row) => {
    console.log(row.join(" | "));
    console.log("---------");
  });
}

function isMovesLeft(b) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (b[i][j] === " ") return true;
    }
  }
  return false;
}

function evaluate(b) {
  // Check rows
  for (let row = 0; row < 3; row++) {
    if (b[row][0] === b[row][1] && b[row][1] === b[row][2]) {
      if (b[row][0] === "X") return +10;
      else if (b[row][0] === "O") return -10;
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    if (b[0][col] === b[1][col] && b[1][col] === b[2][col]) {
      if (b[0][col] === "X") return +10;
      else if (b[0][col] === "O") return -10;
    }
  }

  // Check diagonals
  if (b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
    if (b[0][0] === "X") return +10;
    else if (b[0][0] === "O") return -10;
  }

  if (b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
    if (b[0][2] === "X") return +10;
    else if (b[0][2] === "O") return -10;
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
        if (b[i][j] === " ") {
          b[i][j] = "X";
          best = Math.max(best, minimax(b, depth + 1, !isMax));
          b[i][j] = " ";
        }
      }
    }
    return best;
  } else {
    let best = 1000;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (b[i][j] === " ") {
          b[i][j] = "O";
          best = Math.min(best, minimax(b, depth + 1, !isMax));
          b[i][j] = " ";
        }
      }
    }
    return best;
  }
}

function findBestMove(b) {
  let bestVal = -1000;
  let bestMove = { row: -1, col: -1 };

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (b[i][j] === " ") {
        b[i][j] = "X";
        let moveVal = minimax(b, 0, false);
        b[i][j] = " ";

        if (moveVal > bestVal) {
          bestMove = { row: i, col: j };
          bestVal = moveVal;
        }
      }
    }
  }
  return bestMove;
}

function checkGameOver() {
  let score = evaluate(board);
  if (score === 10) {
    console.log("computer wins!");
    rl.close();
    return true;
  } else if (score === -10) {
    console.log("Anshika win!");
    rl.close();
    return true;
  } else if (!isMovesLeft(board)) {
    console.log("It's a draw!");
    rl.close();
    return true;
  }
  return false;
}

function playerMove() {
  printBoard();
  rl.question("Enter row (1-3): ", (row) => {
    rl.question("Enter column (1-3): ", (col) => {
      row = parseInt(row) - 1;
      col = parseInt(col) - 1;

      if (row >= 0 && row < 3 && col >= 0 && col < 3 && board[row][col] === " ") {
        board[row][col] = "O";

        if (checkGameOver()) return;

        let bestMove = findBestMove(board);
        board[bestMove.row][bestMove.col] = "X";

        if (checkGameOver()) return;

        playerMove();
      } else {
        console.log("Invalid move, try again.");
        playerMove();
      }
    });
  });
}

console.log("Tic Tac Toe - You (O) vs AI (X)");
playerMove();