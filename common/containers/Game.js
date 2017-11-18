import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Info from '../components/Info';
import Board from '../components/Board';
import Modal from '../components/Modal';
import * as actions from '../actions/index';


class Game extends React.Component {
  static propTypes = {
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
    this.setState((prevState) => {
      if (!prevState.messages.length && !prevState.disabled) { // start of game
        return {
          messages: [
            'Game started',
          ],
          disabled: nextProps.players.X === this.props.opponent,
        };
      }

      let messages;
      if (this.props.winner) {
        messages = [
          (
            <div className="end-of-game">
              <div className="end-of-game-message">{this.props.winner} win!</div>
              <div className="end-of-game-buttons">
                <button className="game-button" onClick={this.props.replay}>Replay</button>
                <button className="game-button" onClick={this.props.logout}>Logout</button>
              </div>
            </div>
          ),
        ];
      } else if (!this.props.isReady) {
        messages = [
          'Wait for replay...',
        ];
      } else {
        messages = [
          nextProps.xIsNext ? `${this.props.players.X} moved` : `${this.props.players.O} moved`,
        ];
      }

      return {
        messages,
        disabled: !prevState.disabled,
      };
    });
  }

  render() {
    return (
      !this.props.opponent
        ? (
          <Modal>
            {this.props.message}
            <button onClick={this.props.logout}>Logout</button>
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
