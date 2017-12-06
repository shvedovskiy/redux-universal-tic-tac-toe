import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
import EndOfGame from './EndOfGame';
import styles from './GameView.scss';


class GameView extends React.Component {
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
    replay: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  static defaultProps = {
    xIsNext: false,
    winner: null,
  };

  render() {
    const {
      players: { X, O }, opponent, xIsNext, replay,
      logout, winner, children, messages,
    } = this.props;

    return (
      <div styleName="game">
        <div styleName="players">
          Move: <span styleName={classNames('player', { next: !winner && xIsNext })}>
            {opponent === X ? X : 'You'} (<span styleName={classNames('small', 'x')} />)
          </span>
          &nbsp;&mdash; <span styleName={classNames('player', { next: !winner && !xIsNext })}>
            {opponent === O ? O : 'You'} (<span styleName={classNames('small', 'o')} />)
          </span>
        </div>

        {children}

        <div styleName="info">
          X: {X} - O: {O}
          <ul styleName={classNames('info', 'messages')}>
            {
              messages.map((message, i) => (
                <li styleName="info-message" key={i}>
                  {
                    winner ? (
                      <EndOfGame replay={replay} logout={logout} styles={styles}>
                        {message}
                      </EndOfGame>
                    ) : message
                  }
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default CSSModules(GameView, styles, { allowMultiple: true });
