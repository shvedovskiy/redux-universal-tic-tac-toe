import React from 'react';
import PropTypes from 'prop-types';
import Game from '../containers/Game';
import Chat from '../containers/Chat';


class Main extends React.Component {
  static propTypes = {
    isReady: PropTypes.bool,
    message: PropTypes.string,
  };

  static defaultProps = {
    isReady: false,
    message: null,
  };

  render() {
    if (!this.props.isReady) {
      return (
        <div className="waiting-page">
          <div className="waiting-title-container">
            <h1 className="waiting-title">Waiting for available game...</h1>
          </div>
          {
            this.props.message
              ? (
                <div className="invite-link-container">
                  <span>Invitation link:</span> <span className="invite-link">{this.props.message}</span>
                </div>
              )
              : <div className="loader" />
          }
        </div>
      );
    }
    return (
      <div>
        <Game />
        <Chat />
      </div>
    );
  }
}

export default Main;
