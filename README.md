# game-of-life

Live: https://play-game-of-life.herokuapp.com/

This application is based off of John Conway's game of life. It is a little
different because unlike Conway's the one I created has limited sizes and does
not grow infinitely large as Conway's Game of Life does.

I got the inspiration for this application by being asked how would I go about
recreating The Game of Life during an interview. I was confidant in my response
and answer but wanted to actually code it out because it sounded like fun.

I used OOP to program the application using ES6 class syntax. And to represent
the grid I used a simple Array data structure that is created based on the
users desired board size, there are 3 different sizes in total.

When the board is generated all the cells are dead but the user then chooses
what cells they wish to be alive. Based on what the user chooses the board will
continue to change until all cells are dead. The rules of the game are bellow.

The Rules

For a space that is 'populated':
    Each cell with one or no neighbors dies, as if by solitude.
    Each cell with four or more neighbors dies, as if by overpopulation.
    Each cell with two or three neighbors survives.

For a space that is 'empty' or 'unpopulated'
    Each cell with three neighbors becomes populated.
