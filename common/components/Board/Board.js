import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
import Square from '../Square/Square';
import styles from './Board.scss';


class Board extends React.PureComponent {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    move: PropTypes.func.isRequired,
    squares: PropTypes.array.isRequired,
    winner: PropTypes.object.isRequired,
    sound: PropTypes.object.isRequired,
    muteIsActive: PropTypes.bool.isRequired,
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
    if (!this.props.muteIsActive && this.props.sound) {
      this.props.sound.play();
    }
    return (
      <div styleName="game-board">
        <div styleName={classNames('square', 'top', 'left')}>
          {this.renderSquare(0)}
        </div>
        <div styleName={classNames('square', 'top')}>
          {this.renderSquare(1)}
        </div>
        <div styleName={classNames('square', 'top', 'right')}>
          {this.renderSquare(2)}
        </div>
        <div styleName={classNames('square', 'left')}>
          {this.renderSquare(3)}
        </div>
        <div styleName="square">
          {this.renderSquare(4)}
        </div>
        <div styleName={classNames('square', 'right')}>
          {this.renderSquare(5)}
        </div>
        <div styleName={classNames('square', 'bottom', 'left')}>
          {this.renderSquare(6)}
        </div>
        <div styleName={classNames('square', 'bottom')}>
          {this.renderSquare(7)}
        </div>
        <div styleName={classNames('square', 'bottom', 'right')}>
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default CSSModules(Board, styles, { allowMultiple: true });
