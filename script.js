document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    let currentPlayer = 'X';
    const cells = Array.from({ length: 9 });

    cells.forEach((_, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cell);
    });

    function handleCellClick(index) {
        if (!cells[index] && !checkWinner()) {
            cells[index] = currentPlayer;
            renderBoard();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function renderBoard() {
        cells.forEach((value, index) => {
            const cell = board.children[index];
            cell.textContent = value || '';
            cell.classList.add('clicked'); 
        });

        const winner = checkWinner();
        if (winner) {
            alert(`Игрок ${winner} выиграл!`);
        } else if (isBoardFull()) {
            alert('Ничья!');
        }
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                return cells[a];
            }
        }

        return null;
    }

    function isBoardFull() {
        return cells.every(cell => cell !== undefined);
    }
});
