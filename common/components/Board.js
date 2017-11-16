import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';


export default class Board extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    move: PropTypes.func.isRequired,
    squares: PropTypes.array.isRequired,
  };

  renderSquare(i) {
    return (
      <Square
        disabled={this.props.disabled}
        value={this.props.squares[i]}
        onClick={() => this.props.move(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
