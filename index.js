// Define the size of the game board
const rows = 20;
const cols = 20;

// Function to create a 2D array
function createArray(rows, cols) {
  let arr = new Array(rows);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols).fill(0);
  }
  return arr;
}

// Initialize the game board
let board = createArray(rows, cols);
seedBoard(board, 50)

function seedBoard(board, numberOfCells) {
  let seededCells = 0;

  while (seededCells < numberOfCells) {
    let x = Math.floor(Math.random() * rows);
    let y = Math.floor(Math.random() * cols);

    if (board[x][y] === 0) {
      board[x][y] = 1;
      seededCells++;
    }
  }
}

// Function to calculate the next generation
function nextGeneration(board) {
  let newBoard = createArray(rows, cols);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let state = board[i][j];
      // Count live neighbors
      let neighbors = countNeighbors(board, i, j);

      // Game of Life rules
      if (state === 0 && neighbors === 3) {
        newBoard[i][j] = 1;
      } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
        newBoard[i][j] = 0;
      } else {
        newBoard[i][j] = state;
      }
    }
  }

  return newBoard;
}

// Function to count a cell's live neighbors
function countNeighbors(board, x, y) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const col = (x + i + rows) % rows;
      const row = (y + j + cols) % cols;
      count += board[col][row];
    }
  }
  count -= board[x][y];
  return count;
}

// Run the game
setInterval(() => {
  board = nextGeneration(board);
  console.table(board); 
}, 1000); 
