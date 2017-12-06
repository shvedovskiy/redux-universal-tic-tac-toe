import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import Game from '../../containers/Game/Game';
import Chat from '../../containers/Chat/Chat';
import WaitingPage from '../WaitingPage/WaitingPage';
import styles from './MainPage.scss';


class MainPage extends React.Component {
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
        ? <WaitingPage message={this.props.message} />
        : (
          <div styleName="main">
            <Game customStyles={styles} />
            <Chat styles={styles} />
          </div>
        )
    );
  }
}

export default CSSModules(MainPage, styles);
