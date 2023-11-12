// Function to seed the board
const seedBoard = (board, numberOfCells) => {
  let newBoard = board.map(row => row.slice());
  for (let seededCells = 0; seededCells < numberOfCells; ) {
    let x = Math.floor(Math.random() * board.length);
    let y = Math.floor(Math.random() * board[0].length);

    if (newBoard[x][y] === 0) {
      newBoard[x][y] = 1;
      seededCells++;
    }
  }
  return newBoard;
};

// Function to calculate the next generation
const nextGeneration = (board) => {
  return board.map((row, x) => row.map((cell, y) => {
    const neighbors = countNeighbors(board, x, y);
    const isAlive = cell === 1;

    if (isAlive && (neighbors < 2 || neighbors > 3)) return 0;
    if (!isAlive && neighbors === 3) return 1;
    return cell;
  }));
};

// Function to count a cell's live neighbors
const countNeighbors = (board, x, y, wrap=false) => {
  const rows = board.length;
  const cols = board[0].length;

  return [-1, 0, 1].reduce((acc, i) => {
    return acc + [-1, 0, 1].reduce((acc2, j) => {
      if (i === 0 && j === 0) return acc2; // Skip the cell itself

      if (wrap) {
        const col = (x + i + rows) % rows;
        const row = (y + j + cols) % cols;
        return acc2 + board[col][row];
      } else {
        const newX = x + i;
        const newY = y + j;

        // Check if the neighbor is within the bounds of the board
        if (newX >= 0 && newX < rows && newY >= 0 && newY < cols) {
          return acc2 + board[newX][newY];
        }
        return acc2;
      }
    }, 0);
  }, 0);
};


// Function to draw the game board
const drawBoard = (board) => {
  const table = document.createElement("table");
  table.setAttribute("id", "board");

  board.forEach((row, i) => {
    const tr = document.createElement("tr");
    row.forEach((cell, j) => {
      const td = document.createElement("td");
      td.setAttribute("data-x", i);
      td.setAttribute("data-y", j);
      td.classList.add(cell === 1 ? "alive" : "dead");
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  const container = document.getElementById("container");
  container.innerHTML = "";
  container.appendChild(table);
};

function toggleCell(e) {
  const cell = e.target;
  // TODO: Check if the cell is a td
  // TODO: update the cell's state
  cell.classList.toggle("alive");
  cell.classList.toggle("dead");
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  container.addEventListener("click", toggleCell);
});

// TODO: Add a button to start/stop the game

// TODO: Add a button to clear the board

// TODO: Add a button to seed the board

// TODO: Add a button to change the speed of the game

// TODO: Add a button to change the size of the board

// TODO: Add a button to toggle wrapping

// TODO: Add ability to click on cells to toggle them


// Initialize and run the game
const rows = 50;
const cols = 50;
const emptyBoard = Array.from({ length: rows }, () => new Array(cols).fill(0));
const initialBoard = seedBoard(emptyBoard, 400);
let board = initialBoard

setInterval(() => {
  board = nextGeneration(board);
  drawBoard(board);
}, 1000);
