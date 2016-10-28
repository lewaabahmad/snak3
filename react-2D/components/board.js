var React = require('react');
var ReactDOM = require('react-dom');

var Board = React.createClass({
  getInitialState: function() {
    return {  snakePosition: [ [ 0, 0 ], [ -1, 0 ], [ -2, 0 ], [-3, 0] ],
              direction: "",
              gameOver: false,
              apple: [6, 6]
           };
  },
  componentWillMount: function() {
    //instantiate event listener for snake navigation
    this.readyForControlInput();
    this.createApple();
    this.moveSnake();
  },
  readyForControlInput: function() {
    var self = this;
    $(document).keydown(function(e) {
      if (self.state.gameOver === true) {
        return;
      }
      var currentDirection = self.state.direction;
      var newDirection = currentDirection;
      e.preventDefault();
      switch(e.which) {
        case 37: // left
          if (currentDirection !== "right") {
            newDirection = "left";
          }
        break;
        case 38: // up
          if (currentDirection !== "down") {
            newDirection = "up";
          }
        break;
        case 39: // right
          if (currentDirection !== "left") {
            newDirection = "right";
          }
        break;
        case 40: // down
          if (currentDirection !== "up") {
            newDirection = "down";
          }
        break;
        default: 
          e.resume
          return; // exit this handler for other keys
      }
      self.setState( {direction: newDirection} )
    });
  },
  createApple: function() {
    var x = Math.ceil((Math.random() * 20) - 10);
    var y = Math.ceil((Math.random() * 20) - 10);
    if ( this.isOccupiedTile(x, y) ) {
      this.createApple();
    } else {
      this.setState({ apple: [x,y] })
    }
  },
  isOccupiedTile: function(x, y) {
    var tile, i;
    var tiles = this.state.snakePosition;
    var tilesLength = tiles.length;
    for (i = 0; i < tiles.length; i++) {
      tile = tiles[i];
      if ( tile[0] === x && tile[1] === y ) {
        return true;
      }
    }
    return false;
  },
  isApple: function(x, y) {
    if (this.state.apple[0] === x && this.state.apple[1] === y) {
      return true;
    }
    return false;
  },
  generateTileClass: function (x, y) {
    var classes = "tile row-" + x + " col-" + y;
    if ( this.isOccupiedTile(x, y) ) {
      classes += " occupied-tile";
    } else if (this.state.gameOver === true) {
      classes += " game-over";
    } else if (this.isApple(x, y)) {
      classes += " apple"
    }
    return classes;
  },
  makeBoard: function() {
    var tiles = [];
    for (var i = 10; i >= -10; i--) { // i is the x-axis, row
      for (var j = -10; j <= 10; j++) { // j is the y-axis, col
        tiles.push( <div className={ this.generateTileClass(i, j) }></div> )
      }
    }
    return tiles;
  },
  isValidMove: function(move) {
    var x = move[0]
    var y = move[1]
    if ( x > 10 || x < -10 || y > 10 || y < -10) {
      this.setState({ gameOver: true })
      return false;
    } else if (this.isOccupiedTile(x, y)) {
      this.setState({ gameOver: true })
      return false;
    } else {
      return true;
    }

  },
  getNewPosition: function() {
    var direction = this.state.direction;
    var snake = this.state.snakePosition;
    var head = snake[0];
    var newHead, newSnake;
    // up? add to x
    if (direction === "up") {
      newHead = [ head[0] + 1, head[1] ];
    // down? subtract from x
    } else if (direction === "down") {
      newHead = [ head[0] - 1, head[1] ];
    // left? subtract from y
    } else if (direction === "left") {
      newHead = [ head[0], head[1] - 1 ];
    // right? add to y
    } else if (direction === "right") {
      newHead = [ head[0], head[1] + 1 ];
    }
    if ( newHead && this.isValidMove(newHead) ) {
      if ( this.isApple(newHead[0], newHead[1]) ) {
        newSnake = snake
        this.createApple();
      } else {
        newSnake = snake.slice(0, -1);
      }
      newSnake.unshift(newHead);
      return newSnake;
    }
    return snake;
  },
  moveSnake: function() {
    // console.log( this.getNewPosition() )
    var self = this;
    setInterval(function() {
      self.setState( { snakePosition: self.getNewPosition() } );
    }, 300)
  },
  render: function() {
    return (
      <div id="main-board">
        { this.makeBoard() }
      </div>
    )
  }
})

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(<Board />, document.getElementById('game'))
})