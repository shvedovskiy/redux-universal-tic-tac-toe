import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Board from '../components/Board';
import Info from '../components/Info';
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
    X: PropTypes.string,
    O: PropTypes.string,
    isReady: PropTypes.bool.isRequired,
    replay: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  static defaultProps = {
    message: null,
    opponent: null,
    xIsNext: false,
    winner: null,
    X: null,
    O: null,
  };

  state = {
    history: ['Game started'],
    disabled: null,
  };

  componentWillReceiveProps(nextProps) {
    this.setState((prevState) => {
      let disabled;
      if (prevState.disabled === null) {
        disabled = nextProps.X === this.props.opponent;
      } else {
        disabled = !prevState.disabled;
      }

      if (prevState.history.length > 1) {
        return {
          history: [
            ...prevState.history,
            nextProps.xIsNext ? 'X moves' : 'O moves',
          ],
          disabled,
        };
      }
      return { disabled };
    });
  }

  render() {
    const messages = [];
    if (this.props.winner) {
      messages.push(`Winner: ${this.props.winner}`);
      messages.push(
        <div>
          <button onClick={this.props.replay}>Replay</button>
          <button onClick={this.props.logout}>Logout</button>
        </div>,
      );
    } else {
      messages.push(`Now: ${this.props.xIsNext ? 'O' : 'X'}`); // -- игрок такой-то ходил так-то
    }

    return (
      <div>
        {
          !this.props.opponent && (
            <div className="modal">
              {this.props.message}
              <button onClick={this.props.logout}>Logout</button>
            </div>
          )
        }
        {
          !this.props.isReady && (
            messages.push('Wait for replay...')
          )
        }
        <div className="game">
          <div className="game-board">
            <Board
              disabled={this.state.disabled}
              squares={this.props.squares}
              move={this.props.move}
            />
          </div>

          <div className="game-info">
            <Info
              messages={messages}
              history={this.state.history}
              players={{
                X: this.props.X,
                O: this.props.O,
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.user.message,
  opponent: state.user.opponent,
  squares: state.game.squares,
  X: state.game.X,
  O: state.game.O,
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
