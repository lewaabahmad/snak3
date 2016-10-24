$(document).ready(function() {
  var rowsX = 20;
  var colsY = 20;
  var startX = Math.floor(rowsX/2);
  var startY = Math.floor(colsY/2);
    
  var head = findLocation([startX, startY-1]);
  var neck = findLocation([startX+1, startY-1]);
  var snake = [head, neck]

  var apple = rowsX * colsY;
  var action = "none";
  var gameOver = false;
  var score = 0;
  var intervalId = intervalId = setInterval(function(){ gameAction(action)}, 200);

  var makeGrid = function() {
    $("#grid").css({"width":String(rowsX*27), "height":String(colsY*27)})
    var tile;
    for (var i = 0; i < rowsX; i++) {
      for (var j = 0; j < colsY; j++) {
        tile = '<div class="tile tile-' + findLocation([i, j]) + '"></div>'
        $("#grid").append(tile);
      }
    }
  }

  var plotSnake = function() {
    var loc;
    for (var i = 0; i < snake.length; i++) {
      loc = snake[i];
      $(".tile-" + loc).css({"background":"black"});
    }
  }

  function findLocation(coordinates) {
    return (rowsX * coordinates[0] + coordinates[1]);
  }

  var moveSnake = function(newHead) {
    newTail = snake[snake.length-1]
    for (var i = snake.length - 1; i > 0; i--) {
      snake[i] = snake[i-1];
    }
    snake[0] = newHead;
    head = snake[0];
    neck = snake[1];
    if (head == apple) {
      apple = rowsX*colsY;
      newApple();
      snake.push(newTail)
      score++;
      $("#score").text("Score: " + score);
    } else {
    }
    $(".tile-" + newTail).css({"background":"white"});
    plotSnake();
  }

  var addToSnake = function() {

  }

  function newApple() {
    if (apple == rowsX * colsY) {
      // index of apple is negative one if the number is not included
      // if it is, it is greater than 0
      apple = Math.floor(Math.random()*100);
      if (snake.indexOf(apple) > -1) {
        newApple();
      }
    }
    $(".tile-" + apple).css({"background":"red"});
  }

  $(document).keydown(function(e) {
    e.preventDefault();
    switch(e.which) {
      case 37: // left
        if (!(head === (neck + 1))) {
          action = "left";
        }
      break;
      case 38: // up
        if (!(head === (neck + rowsX))) {
          action = "up";
        }
      break;
      case 39: // right
        if (!(head === (neck - 1))) {
          action = "right";
        }
      break;
      case 40: // down
        if (!(head === (neck - rowsX))) {
          action = "down";
        }
      break;
      default: return; // exit this handler for other keys
    }
  });

  var checkMove = function(nextAction, newHead) {
    if (newHead == head) {

    }
    else if (snake.indexOf(newHead) > -1) {
      gameOver = true;
      clearInterval(intervalId);
      return false;
    }
    switch(nextAction) {
      case "left":
        if (head%rowsX == 0) {
          gameOver = true;
          clearInterval(intervalId);
        } else {
          return true
        }
      break;
      case "up":
        if (head < rowsX) {
          gameOver = true;
          clearInterval(intervalId);
        } else {
          return true
        }
      break;
      case "right":
        if (head % rowsX == rowsX - 1) {
          gameOver = true;
          clearInterval(intervalId);
        } else {
          return true
        }
      break;
      case "down":
        if (newHead > rowsX * colsY ) {
          gameOver = true;
          clearInterval(intervalId);
        } else {
          return true
        }
      break;
      default: return true;
    }
  }

  var gameAction = function(nextAction) {
    var newHead;
    switch(nextAction) {
      case "left":
        newHead = head - 1;
      break;
      case "up":
        newHead = head - rowsX;
      break;
      case "right":
        newHead = head + 1;
      break;
      case "down":
        newHead = head + rowsX;
      break;
      default: 
        newHead = head;
      break;
    }
    console.log(nextAction, newHead, checkMove(nextAction, newHead))
    if (checkMove(nextAction, newHead)) {
      moveSnake(newHead);
    } else {
      $("#score").text("Game Over! Your score was " + score + "!");
    }
  }

  var initialize = function() {
    makeGrid();
    newApple();
    plotSnake();
  }

  initialize();
});