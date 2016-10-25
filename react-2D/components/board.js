var React = require('react');
var ReactDOM = require('react-dom');

var Board = React.createClass({
  render: function() {
    return (
      <div id="main-board">
        hello?
      </div>
    )
  }
})

ReactDOM.render(<Board />, document.getElementById('game'))