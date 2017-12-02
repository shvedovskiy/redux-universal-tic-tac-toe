import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import Game from '../../containers/Game/Game';
import Chat from '../../containers/Chat/Chat';
import Waiting from '../Waiting/Waiting';
import styles from './MainPage.scss';


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
          <div styleName="main">
            <Game />
            <Chat styles={styles} />
          </div>
        )
    );
  }
}

export default CSSModules(Main, styles);
