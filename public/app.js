'use strict';
window.onload = function() {
    var board = document.getElementById('board');
    var gameContainer = document.getElementById('game-container');
    class GameOfLife {
        constructor(width, height) {
            this.board = [];
            this.width = Number(width);
            this.height = Number(height);
        }
        startGame() {
            setInterval(() => {
            this.move();
            }, 500);
        }
        buildBoard() {
            this.board = [];
            for (var j = 0; j <= this.height + 1; j++) {
                var newRow = [];
                for (var i = 0; i <= this.width + 1; i++) {
                    if (j === 0 || j === this.height + 1 || i === 0 || i === this.width + 1) {
                        newRow.push(0);
                    } else {
                        let cell = document.createElement('div');
                        cell.addEventListener('mousedown', () => {
                            if (cell.className === 'alive') {
                                cell.className = 'dead';
                            } else {
                                cell.className = 'alive';
                            }
                        });
                        cell.className = 'dead';
                        this.setSize(cell);
                        board.appendChild(cell);
                        newRow.push(cell);
                    }
                }
                this.board.push(newRow);
            }
            this.controls();
        }
        setSize(cell) {
            switch (this.width) {
                case 20:
                    cell.style.height = '20px';
                    cell.style.width = '20px';
                    break;
                case 30:
                    cell.style.height = '16px';
                    cell.style.width = '16px';
                    break;
                case 40:
                    cell.style.height = '12px';
                    cell.style.width = '12px';
                    break;
                case 50:
                    cell.style.height = '10px';
                    cell.style.width = '10px';
                    break;
            }
        }
        controls() {
            boardStateControls.removeChild(buildBoardButton);
            boardStateControls.removeChild(boardSize);
            this.start = document.createElement('button');
            this.clear = document.createElement('button');
            this.clear.className = 'control-button';
            this.start.className = 'control-button';
            this.start.innerHTML = 'Start Life';
            this.clear.innerHTML = 'Clear Board';
            this.clear.addEventListener('click', () => {
                this.clearBoard();
                newGame = null;
            });
            this.start.addEventListener('click', () => {
                this.startGame();
            });
            boardStateControls.appendChild(this.clear);
            boardStateControls.appendChild(this.start);
        }
        move() {
            let newBoard = JSON.parse(JSON.stringify(this.board));
            for (var i = 1; i < newBoard.length - 1; i++) {
                for (var k = 1; k < newBoard[i].length - 1; k++) {
                    var neighbors = this.checkNeighbors(i, k);
                    if (neighbors === 3 && this.board[i][k].className === 'dead') {
                        newBoard[i][k].className = 'alive';
                    } else if (neighbors >= 4 || neighbors <= 1) {
                        newBoard[i][k].className = 'dead';
                    } else if ((neighbors === 3 || neighbors === 2) && this.board[i][k].className === 'alive') {
                        newBoard[i][k].className = 'alive';
                    } else {
                        newBoard[i][k].className = 'dead';
                    }
                }
            }
            this.newBoard(newBoard);
            console.log(newBoard);
        }
        newBoard(newBoard) {
            for (var i = 1; i < this.board.length - 1; i++) {
                for (var j = 1; j < this.board.length - 1; j++) {
                    this.board[i][j].className = newBoard[i][j].className;
                }
            }
        }
        checkNeighbors(m, s) {
            var neighbors = 0;
            if (m > 0 && m < this.board.length - 2) {
                if (this.board[m][s + 1].className === 'alive') {
                    neighbors += 1;
                }
                if (this.board[m][s - 1].className === 'alive') {
                    neighbors += 1;
                }
                if (this.board[m + 1][s].className === 'alive') {
                    neighbors += 1;
                }
                if (this.board[m - 1][s].className === 'alive') {
                    neighbors += 1;
                }
                if (this.board[m + 1][s + 1].className === 'alive') {
                    neighbors += 1;
                }
                if (this.board[m + 1][s - 1].className === 'alive') {
                    neighbors += 1;
                }
                if (this.board[m - 1][s - 1].className === 'alive') {
                    neighbors += 1;
                }
                if (this.board[m - 1][s + 1].className === 'alive') {
                    neighbors += 1;
                }
            }
            return neighbors;
        }
        clearBoard() {
            gameContainer.removeChild(board);
            boardStateControls.removeChild(this.clear);
            boardStateControls.removeChild(this.start);
            board = document.createElement('div');
            board.id = 'board';
            boardStateControls.appendChild(boardSize);
            boardStateControls.appendChild(buildBoardButton);
            gameContainer.appendChild(board);
        }
    }

    var newGame = null;
    var buildBoardButton = document.getElementById('build-board');
    var boardStateControls = document.getElementById('board-state-controls');
    var boardSize = document.getElementById('board-size');

    buildBoardButton.addEventListener('click', () => {
        newGame = new GameOfLife(boardSize.value[3] + boardSize.value[4], boardSize.value[0] + boardSize.value[1]);
        newGame.buildBoard();
        switch (boardSize.value[3] + boardSize.value[4]) {
            case '20':
                board.style.marginTop = '30px';
                board.style.width = "450px";
                break;
            case '30':
                board.style.width = "550px";
                break;
            case '40':
                board.style.marginTop = '-10px';
                board.style.width = "570px";
                break;
        }
    });
};
