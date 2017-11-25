import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Square from './Square';


export default class Board extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    move: PropTypes.func.isRequired,
    squares: PropTypes.array.isRequired,
    winner: PropTypes.object.isRequired,
    sound: PropTypes.object.isRequired,
  };

  renderSquare(i) {
    return (
      <Square
        shaded={
          this.props.winner &&
          this.props.winner.values &&
          !this.props.winner.values.includes(i)
        }
        disabled={this.props.disabled}
        value={this.props.squares[i]}
        onClick={() => this.props.move(i)}
      />
    );
  }

  render() {
    if (this.props.sound) {
      this.props.sound.play();
    }
    return (
      <div className="game-board">
        <div className={classNames('square', 'top', 'left')}>
          {this.renderSquare(0)}
        </div>
        <div className={classNames('square', 'top')}>
          {this.renderSquare(1)}
        </div>
        <div className={classNames('square', 'top', 'right')}>
          {this.renderSquare(2)}
        </div>
        <div className={classNames('square', 'left')}>
          {this.renderSquare(3)}
        </div>
        <div className="square">
          {this.renderSquare(4)}
        </div>
        <div className={classNames('square', 'right')}>
          {this.renderSquare(5)}
        </div>
        <div className={classNames('square', 'bottom', 'left')}>
          {this.renderSquare(6)}
        </div>
        <div className={classNames('square', 'bottom')}>
          {this.renderSquare(7)}
        </div>
        <div className={classNames('square', 'bottom', 'right')}>
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
