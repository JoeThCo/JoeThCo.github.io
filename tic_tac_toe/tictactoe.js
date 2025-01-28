const TicTac = {
  currentPlayer: "X",
  state: Array(9).fill(null),
  gameOver: false,

  init() {
    this.createboard();
    document
      .getElementById("reset") // reset button
      .addEventListener("click", () => this.reset()); //when clicked reset
  },

  createboard() {
    const board = document.getElementById("board"); //get board div
    board.innerHTML = ""; //clear previous board

    //make a div for each spot on the board, make the div a cell, set index to i and then add to the board
    this.state.forEach((_, index) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = index;
      board.appendChild(cell);
    });

    // when a board button gets clicked on?
    board.addEventListener("click", (e) => this.handleClick(e)); // Handle clicks on the board
  },

  handleClick(event) {
    //get info
    const cell = event.target;
    const index = cell.dataset.index;

    // Ignore clicks if the game is over or the cell is already taken
    if (this.gameOver || !cell.classList.contains("cell") || this.state[index])
      return;

    // Update board state and UI
    this.state[index] = this.currentPlayer;
    cell.textContent = this.currentPlayer;
    cell.classList.add("taken");

    // Check for a winner or a tie
    const winningCombination = this.checkWin();
    if (winningCombination) {
      this.highlightWinningCells(winningCombination);
      this.updateMessage(`Player ${this.currentPlayer} wins!`);
      this.gameOver = true;
    } else if (this.state.every((cell) => cell)) {
      this.updateMessage("It's a tie!");
      this.gameOver = true;
    } else {
      // Switch players
      this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
      this.updateMessage(`Player ${this.currentPlayer}'s turn`);
    }
  },

  checkWin() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];
    //for each combo, find a match for a winning board and the current board is the current player
    return winningCombinations.find((combination) =>
      combination.every((index) => this.state[index] === this.currentPlayer)
    );
  },

  highlightWinningCells(combo) {
    combo.forEach((index) => {
      document.getElementById("board").children[index].style.color = "red";
    });
  },

  //new array, reset player
  reset() {
    this.state = Array(9).fill(null);
    this.currentPlayer = "X";
    this.gameOver = false;
    this.createboard();
  },

  updateMessage(message) {
    document.getElementById("message").textContent = message;
  },
};

//must be called to play game!
TicTac.init();