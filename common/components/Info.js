import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Board from './Board';


export default class GamePage extends React.Component {
  static propTypes = {
    opponent: PropTypes.string.isRequired,
    xIsNext: PropTypes.bool,
    players: PropTypes.shape({
      X: PropTypes.string.isRequired,
      O: PropTypes.string.isRequired,
    }).isRequired,
    messages: PropTypes.array.isRequired,
    winner: PropTypes.bool,
    children: PropTypes.element.isRequired,
  };

  static defaultProps = {
    xIsNext: false,
    winner: null,
  };

  render() {
    const {
      players: { X, O }, opponent, xIsNext,
      winner, children, messages,
    } = this.props;

    return (
      <div className="game">
        <div className="players">
          Move: <span className={classNames('player', { next: !winner && xIsNext })}>
            {opponent === X ? X : 'You'} (<span className={classNames('small', 'x')} />)
          </span>
          &nbsp;&mdash; <span className={classNames('player', { next: !winner && !xIsNext })}>
            {opponent === O ? O : 'You'} (<span className={classNames('small', 'o')} />)
          </span>
        </div>

        {children}

        <div className="info">
          X: {X} - O: {O}
          <ul className="info messages">
            {
              messages.map((message, i) => <li className="info-message" key={i}>{message}</li>)
            }
          </ul>
        </div>
      </div>
    );
  }
}
