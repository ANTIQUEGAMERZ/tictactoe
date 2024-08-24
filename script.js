const cells = document.querySelectorAll('.cell');

const message = document.getElementById('message');

const turnText = document.getElementById('turn-text');

const dialog = document.getElementById('dialog');

const dialogMessage = document.getElementById('dialog-message');

const restartButton = document.getElementById('restart-button');

const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';

let board = Array(9).fill(null);

const winningCombinations = [

    [0, 1, 2],

    [3, 4, 5],

    [6, 7, 8],

    [0, 3, 6],

    [1, 4, 7],

    [2, 5, 8],

    [0, 4, 8],

    [2, 4, 6]

];

function checkWinner() {

    for (let combo of winningCombinations) {

        const [a, b, c] = combo;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {

            return board[a];

        }

    }

    return board.every(cell => cell) ? 'Tie' : null;

}

function handleClick(event) {

    const index = event.target.dataset.index;

    if (board[index] || checkWinner()) return;

    board[index] = currentPlayer;

    event.target.textContent = currentPlayer;

    const winner = checkWinner();

    if (winner) {

        dialogMessage.textContent = winner === 'Tie' ? '[ Match is Draw ]' : `${winner} Wins!`;

        dialog.style.display = 'flex';

        return;

    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    turnText.textContent = `Player ${currentPlayer}'s Turn`;

}

function resetGame() {

    board = Array(9).fill(null);

    cells.forEach(cell => cell.textContent = '');

    currentPlayer = 'X';

    turnText.textContent = `Player ${currentPlayer}'s Turn`;

    message.textContent = '';

    dialog.style.display = 'none';

}

cells.forEach(cell => cell.addEventListener('click', handleClick));

resetButton.addEventListener('click', resetGame);

restartButton.addEventListener('click', resetGame);

// Initialize the turn text

turnText.textContent = `Player ${currentPlayer}'s Turn`;
