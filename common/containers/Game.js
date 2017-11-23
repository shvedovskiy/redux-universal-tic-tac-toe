import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Info from '../components/Info';
import Board from '../components/Board';
import Modal from '../components/Modal';
import * as actions from '../actions';


class Game extends React.Component {
  static propTypes = {
    lastMoveNumber: PropTypes.number,
    opponent: PropTypes.string,
    modalMessage: PropTypes.string,
    xIsNext: PropTypes.bool,
    squares: PropTypes.array.isRequired,
    winner: PropTypes.object.isRequired,
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
    modalMessage: null,
    opponent: null,
    xIsNext: false,
  };

  state = {
    infoMessages: [],
    disabled: null,
  };

  componentWillReceiveProps(nextProps) {
    const { players: { X, O }, opponent, replay, logout, isReady } = this.props;
    const winner = nextProps.winner;
    let messages = this.state.infoMessages;

    if (!isReady) {
      messages = [
        'Game started',
      ];
    } else if (winner) {
      messages = [
        (
          <div className="end-of-game">
            <div className="end-of-game-message">
              {
                winner.username === undefined
                  ? 'Tie!'
                  : winner.username !== opponent
                    ? 'You win!'
                    : `${winner.username} win!`
              }
            </div>
            <div className="end-of-game-buttons">
              <button className={classNames('btn', 'game-button')} onClick={replay}>Replay</button>
              <button className={classNames('btn', 'game-button')} onClick={logout}>Logout</button>
            </div>
          </div>
        ),
      ];
    } else if (!nextProps.isReady) {
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

    this.setState(prevState => ({
      infoMessages: messages,
      disabled: !this.props.isReady
        ? nextProps.players.X === opponent // start of game
        : winner
          ? true
          : !prevState.disabled,
    }));
  }

  coordinates = [
    '(1, 1)', '(1, 2)', '(1, 3)',
    '(2, 1)', '(2, 2)', '(2, 3)',
    '(3, 1)', '(3, 2)', '(3, 3)',
  ];

  render() {
    return (
      <Info
        opponent={this.props.opponent}
        players={this.props.players}
        xIsNext={this.props.xIsNext}
        messages={this.state.infoMessages}
        winner={this.props.winner}
      >
        {
          !this.props.opponent &&
            <Modal>
              <div className="message-content">
                {this.props.modalMessage}
              </div>
              <div className="message-buttons">
                <button className={classNames('btn', 'inverted-btn')} onClick={this.props.logout}>Logout</button>
              </div>
            </Modal>
        }
        <Board
          disabled={this.state.disabled}
          move={this.props.move}
          squares={this.props.squares}
          winner={this.props.winner}
        />
      </Info>
    );
  }
}

const mapStateToProps = state => ({
  modalMessage: state.user.message,
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
