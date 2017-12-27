# Self-Navigating-Snake-Game
A little game I made for my Web 1 class.

![A gif of game demonstration](https://media.giphy.com/media/3oFzmk2tbTwZJoYSc0/giphy.gif)<br>

Place an apple in the grid and the snake will auto-navigate to it!<br>
Algorithm: (All these movements are based on snake's head)
  <br>1)After the apple is placed, call either xFirst or YFirst function(50% chance)
 -Both of these functions are essentiall the same with one difference being snake <br>navigating to the apple by first reaching its x coordinate
  <br>2)At each iteration check if the snake's next move is colliding with any of it's body parts(except for it's tail since it cannot ever reach it)
  <br>3)If it detects collision and it is moving in x-axis, check one tile above and below it to check for collision (one of them has to be free), take one step towards that tile and call xFirst
    -else if it is moving in y-axis and detects collision, do the opposite
    -else keep on moving
  <br>4)If snake reaches apple, stop and display score
  
  <br><br>Challanges I faced: <br>
  When I dove right into the code with a presumably working solution but didn't think of test cases, my brain just froze in the middle of writing it
  Solution: deleted the half-ass algoritm, did few sketches and wrote some psudo code, then implemented it. Worked perfectly.
  
