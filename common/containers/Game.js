import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Info from '../components/Info';
import Board from '../components/Board';
import Modal from '../components/Modal';
import * as actions from '../actions/index';


class Game extends React.Component {
  static propTypes = {
    lastMoveNumber: PropTypes.number,
    opponent: PropTypes.string,
    message: PropTypes.string,
    xIsNext: PropTypes.bool,
    squares: PropTypes.array.isRequired,
    winner: PropTypes.string,
    move: PropTypes.func.isRequired,
    players: PropTypes.shape({
      X: PropTypes.string.isRequired,
      O: PropTypes.string.isRequired,
    }).isRequired,
    isReady: PropTypes.bool.isRequired,
    replay: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  static defaultProps = {
    lastMoveNumber: null,
    message: null,
    opponent: null,
    xIsNext: false,
    winner: null,
  };

  state = {
    messages: [],
    disabled: null,
  };

  componentWillReceiveProps(nextProps) {
    const {
      players: { X, O }, winner, opponent, replay,
      logout, isReady,
    } = this.props;

    this.setState((prevState) => {
      if (!prevState.messages.length && !prevState.disabled) { // start of game
        return {
          messages: [
            'Game started',
          ],
          disabled: nextProps.players.X === opponent,
        };
      }

      let messages;
      if (winner) {
        messages = [
          (
            <div className="end-of-game">
              <div className="end-of-game-message">{winner !== opponent ? 'You' : winner} win!</div>
              <div className="end-of-game-buttons">
                <button className={classNames('btn', 'game-button')} onClick={replay}>Replay</button>
                <button className={classNames('btn', 'game-button')} onClick={logout}>Logout</button>
              </div>
            </div>
          ),
        ];
      } else if (!isReady) {
        messages = [
          'Wait for replay...',
        ];
      } else {
        messages = [
          nextProps.xIsNext
            ? `${X} moved ${this.coordinates[nextProps.lastMoveNumber]}`
            : `${O} moved ${this.coordinates[nextProps.lastMoveNumber]}`,
        ];
      }

      return {
        messages,
        disabled: !prevState.disabled,
      };
    });
  }

  coordinates = [
    '(1, 1)', '(1, 2)', '(1, 3)',
    '(2, 1)', '(2, 2)', '(2, 3)',
    '(3, 1)', '(3, 2)', '(3, 3)',
  ];

  render() {
    return (
      !this.props.opponent
        ? (
          <Modal>
            <div className="message-content">
              {this.props.message}
            </div>
            <div className="message-buttons">
              <button className={classNames('btn', 'inverted-btn')} onClick={this.props.logout}>Logout</button>
            </div>
          </Modal>
        )
        : (
          <Info
            opponent={this.props.opponent}
            players={this.props.players}
            xIsNext={this.props.xIsNext}
            messages={this.state.messages}
            winner={this.props.winner}
          >
            <Board
              disabled={this.state.disabled}
              move={this.props.move}
              squares={this.props.squares}
            />
          </Info>
        )
    );
  }
}

const mapStateToProps = state => ({
  message: state.user.message,
  opponent: state.user.opponent,
  squares: state.game.squares,
  lastMoveNumber: state.game.lastMoveNumber,
  players: {
    X: state.game.X,
    O: state.game.O,
  },
  winner: state.game.winner,
  xIsNext: state.game.xIsNext,
  isReady: state.game.isReady,
});

const mapDispatchToProps = dispatch => ({
  move(i) {
    dispatch(actions.move(i));
  },
  logout() {
    dispatch(actions.logout());
  },
  replay() {
    dispatch(actions.replay());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
