'use strict';
window.onload = function() {
    var board = document.getElementById('board');
    var something = document.createElement('h1');
    something.innerHTML = 'its working';
    board.appendChild(something);
    console.log(board);
    class GameOfLife {
        constructor() {
            this.board = [];
            this.width = 12 +1;
            this.height = 12 +1;
        }
        startGame() {
            this.buildBoard();
            setInterval(() => {
                this.move();
                console.log(this.board);
            }, 300);
        }
        buildBoard() {
            this.board = [];
            for (var j = 0; j < this.height; j++) {
                var newRow = [];
                for (var i = 0; i < this.width; i++) {
                    var cell = {};
                    cell.button = document.createElement('button');
                    if (i % 2 === 0) {
                        cell.status = 1;
                        cell.className = 'alive';
                    } else {
                        cell.status = 0;
                        cell.className = 'dead';
                    }
                    cell.button.className = cell.className;
                    board.appendChild(cell.button);
                    newRow.push(cell);
                }
                this.board.push(newRow);
            }
        }
        move() {
            for (var i = 1; i < this.board.length -1; i++) {
                for (var k = 1; k < this.board[i].length-1; k++) {
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
    }
    var newGame = new GameOfLife();
    newGame.startGame();
};
