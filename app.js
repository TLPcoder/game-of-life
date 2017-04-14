'use strict';
window.onload = function() {
    var board = document.getElementById('board');
    var body = document.getElementsByTagName('body')[0];
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
                console.log(this.board);
            }, 100);
        }
        buildBoard() {
            this.board = [];
            for (var j = 0; j <= this.height + 1; j++) {
                var newRow = [];
                for (var i = 0; i <= this.width + 1; i++) {
                    if (j === 0 || j === this.height + 1 || i === 0 || i === this.width + 1) {
                        newRow.push(0);
                    } else {
                        let cell = {};
                        cell.button = document.createElement('button');
                        cell.button.addEventListener('mousedown', () => {
                            cell.status = 1;
                            cell.className = 'alive';
                            cell.button.className = cell.className;
                        });
                        cell.status = 0;
                        cell.className = 'dead';
                        cell.button.className = cell.className;
                        board.appendChild(cell.button);
                        newRow.push(cell);
                    }
                }
                this.board.push(newRow);
            }
            console.log(this.board);
            this.controls();
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
            console.log(this.board);
            for (var i = 1; i < this.board.length - 1; i++) {
                for (var k = 1; k < this.board[i].length - 1; k++) {
                    var neighbors = this.checkNeighbors(i, k);
                    console.log(neighbors);
                    if (neighbors === 3 && this.board[i][k].status === 0) {
                        this.board[i][k].status = 1;
                        this.board[i][k].className = 'alive';
                        this.board[i][k].button.className = this.board[i][k].className;
                    } else if (neighbors >= 4 || neighbors <= 1) {
                        this.board[i][k].status = 0;
                        this.board[i][k].className = 'dead';
                        this.board[i][k].button.className = this.board[i][k].className;
                    } else if ((neighbors === 3 || neighbors === 2) && this.board[i][k].status === 1) {
                        this.board[i][k].status = 1;
                    }
                }
            }
        }
        checkNeighbors(m, s) {
            var neighbors = 0;
            if (m > 0 && m < this.board.length - 2) {
                if (this.board[m][s + 1].status === 1) {
                    neighbors += 1;
                }
                if (this.board[m][s - 1].status === 1) {
                    neighbors += 1;
                }
                if (this.board[m + 1][s].status === 1) {
                    neighbors += 1;
                }
                if (this.board[m - 1][s].status === 1) {
                    neighbors += 1;
                }
                if (this.board[m + 1][s + 1].status === 1) {
                    neighbors += 1;
                }
                if (this.board[m + 1][s - 1].status === 1) {
                    neighbors += 1;
                }
                if (this.board[m - 1][s - 1].status === 1) {
                    neighbors += 1;
                }
                if (this.board[m - 1][s + 1].status === 1) {
                    neighbors += 1;
                }
            }
            return neighbors;
        }
        clearBoard() {
            console.log(gameContainer)
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
        newGame = new GameOfLife(boardSize.value[3]+boardSize.value[4],boardSize.value[0]+boardSize.value[1]);
        newGame.buildBoard();
        console.log(boardSize.value[4]+boardSize.value[4])
        switch (boardSize.value[3]+boardSize.value[4]) {
            case '20':
                board.style.marginTop = '30px';
                board.style.width = "400px";
                break;
            case '30':
                board.style.width = "600px";
                break;
            case '40':
                board.style.width = "800px";
                break;
        }
    });
};
