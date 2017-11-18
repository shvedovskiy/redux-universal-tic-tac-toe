import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Game from '../containers/Game';
import Chat from '../containers/Chat';
import Waiting from './Waiting';


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
    return (
      !this.props.isReady
        ? <Waiting message={this.props.message} />
        : (
          <div className={classNames('page', 'main')}>
            <Game />
            <Chat />
          </div>
        )
    );
  }
}

export default Main;
