# hw6_checkpoint_JS211_TowersOfHanoi
An interactive javascript Towers of Hanoi game

# Brandon Fuller - Towers of Hanoi Code Plan

1. **Move a Block**
2. Listen for click event on row with the stone to be moved
3. Listen for click event on row with the stone to be placed on
4. Check for Legality
5. If legal, remove stone number from row array and place into new row array.
6. Check for win
7. If not a win, return to 1.
   
1. **Check for Legality**
2. If row array to be moved to is undefined/empty, the move is legal or
3. If stone to be moved is less than the stone it will be moved onto, the move is legal.
4. If neither of those are true, the move is not legal.
   
1. **Check for Win**
2. If either of the arrays that start as empty are eventually filled with all the stones in order, that is a win. 

## Overview

- [Towers of Hanoi](https://en.wikipedia.org/wiki/Tower_of_Hanoi) is a simple logic game involving three stacks. The first stack has four (or more) blocks, each one bigger than the next, stacked like a pyramid. The point of the game is to move the blocks from one stack and arrange them in the same order into another stack, but never placing a larger block onto a smaller block. You can play the game [here](http://vornlocher.de/tower.html) to get an idea.