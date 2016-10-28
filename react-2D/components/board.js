var React = require('react');
var ReactDOM = require('react-dom');

var Board = React.createClass({
  getInitialState: function() {
    return {  snakeHead: [ 0, 0 ],
              snakePosition: [ [ 0, -1 ] ] };
  },
  makeBoard: function() {
    var tiles = [];
    for (var i = 10; i >= -10; i--) { // i is the x-axis, row
      for (var j = -10; j <= 10; j++) { // j is the y-axis, col
        tiles.push( <div className={"tile row-" + i + " col-" + j}></div> )
      }
    }
    return tiles;
  },
  render: function() {
    return (
      <div id="main-board">
        { this.makeBoard() }
      </div>
    )
  }
})

ReactDOM.render(<Board />, document.getElementById('game'))