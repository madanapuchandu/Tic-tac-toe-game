const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const winnerScreen = document.getElementById("winnerScreen");
const winnerText = document.getElementById("winnerText");
const turnIndicator = document.getElementById("turnIndicator");

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function checkWinner() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return boardState.includes("") ? null : "Draw";
}

function handleClick(event) {
    const index = event.target.dataset.index;
    if (boardState[index] || !gameActive) return;

    boardState[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    const winner = checkWinner();

    if (winner) {
        gameActive = false;
        winnerText.textContent = winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`;
        winnerScreen.style.display = "flex";
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        turnIndicator.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function resetGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => (cell.textContent = ""));
    currentPlayer = "X";
    gameActive = true;
    winnerScreen.style.display = "none";
    turnIndicator.textContent = "Player X's Turn";
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
