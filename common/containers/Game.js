import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Info from '../components/Info';
import Board from '../components/Board';
import Modal from '../components/Modal';
import EndOfGame from '../components/EndOfGame';
import * as actions from '../actions';
import moveHigh from '../../client/assets/sounds/note-high.wav';
import moveLow from '../../client/assets/sounds/note-low.wav';
import gameOver from '../../client/assets/sounds/game-over.wav';
import gameOverTie from '../../client/assets/sounds/game-over-tie.wav';


class Game extends React.PureComponent {
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
    history: PropTypes.object.isRequired,
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
    sound: null,
  };

  componentDidMount() {
    this.unblock = this.props.history.block(() => {
      // eslint-disable-next-line no-alert
      if (window && window.confirm('Are you sure you want to leave this page?')) {
        this.props.logout();
        return true;
      }
      return false;
    });
  }

  componentWillReceiveProps(nextProps) {
    const { players: { X, O }, opponent, replay, logout, isReady, xIsNext } = this.props;
    const winner = nextProps.winner;
    let messages = this.state.infoMessages;
    let sound = this.state.sound;

    if (!isReady) {
      messages = ['Game started'];
      sound = null;
    } else if (winner) {
      let messageText;
      if (winner.username === undefined) {
        messageText = 'Tie!';
        sound = this.sounds[3];
      } else {
        messageText = winner.username !== opponent
          ? 'You win!'
          : `${winner.username} win!`;
        sound = this.sounds[2];
      }
      messages = [
        <EndOfGame replay={replay} logout={logout}>
          {messageText}
        </EndOfGame>,
      ];
    } else if (!nextProps.isReady) {
      messages = ['Wait for replay...'];
    } else if (nextProps.xIsNext !== xIsNext) {
      messages = [
        nextProps.xIsNext
          ? `${X} moved ${this.coordinates[nextProps.lastMoveNumber]}`
          : `${O} moved ${this.coordinates[nextProps.lastMoveNumber]}`,
      ];
      sound = (nextProps.xIsNext && X === opponent) || (!nextProps.xIsNext && O === opponent)
        ? this.sounds[1]
        : this.sounds[0];
    }

    this.setState((prevState) => {
      let disabled = prevState.disabled;
      if (!this.props.isReady) {
        disabled = nextProps.players.X === opponent;
      } else if (winner) {
        disabled = true;
      } else if (nextProps.xIsNext !== xIsNext) {
        disabled = !prevState.disabled;
      }

      return {
        infoMessages: messages,
        disabled,
        sound,
      };
    });
  }

  componentWillUnmount() {
    this.unblock();
  }

  sounds = [
    new Audio(moveHigh),
    new Audio(moveLow),
    new Audio(gameOver),
    new Audio(gameOverTie),
  ];

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
          sound={this.state.sound}
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
  location: state.router.location,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));
