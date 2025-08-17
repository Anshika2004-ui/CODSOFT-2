const readline = require("readline");
const { createBoard, printBoard, checkWinner, isFull } = require("./game/board");
const { bestMove } = require("./game/ai");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, ans => resolve(ans)));
}

async function main() {
  const board = createBoard();
  const human = "X";
  const ai = "O";

  console.log("Welcome to 4x4 Tic Tac Toe with AI!");
  printBoard(board);

  while (true) {
    // Human move
    let valid = false;
    while (!valid) {
      let input = await ask("Enter your move (row col): ");
      let [row, col] = input.split(" ").map(Number);
      if (row >= 0 && row < 4 && col >= 0 && col < 4 && board[row][col] === " ") {
        board[row][col] = human;
        valid = true;
      } else {
        console.log("Invalid move, try again.");
      }
    }
    printBoard(board);

    if (checkWinner(board, human)) {
      console.log("🎉 Anshika win!");
      break;
    }
    if (isFull(board)) {
      console.log("It's a draw!");
      break;
    }

    // AI move
    console.log("AI is thinking...");
    let move = bestMove(board, ai, human);
    if (move) board[move[0]][move[1]] = ai;
    printBoard(board);

    if (checkWinner(board, ai)) {
      console.log("💻 computer wins!");
      break;
    }
    if (isFull(board)) {
      console.log("It's a draw!");
      break;
    }
  }

  rl.close();
}

main();