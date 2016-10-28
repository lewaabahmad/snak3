var React = require('react');
var ReactDOM = require('react-dom');

var Board = React.createClass({
  makeBoard: function() {
    var tiles = [];
    for (var i = 0; i < 400; i++) {
      tiles.push( <div className="tile"> {i} </div> )
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