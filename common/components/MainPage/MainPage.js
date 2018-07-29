import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import Game from '../../containers/Game/Game';
import Chat from '../../containers/Chat/Chat';
import WaitingPage from '../WaitingPage/WaitingPage';
import styles from './MainPage.scss';


const MainPage = props => (
  !props.isReady
    ? <WaitingPage message={props.message} />
    : (
      <div styleName="main">
        <Game customStyles={styles} />
        <Chat styles={styles} />
      </div>
    )
);

MainPage.propTypes = {
  isReady: PropTypes.bool,
  message: PropTypes.string,
};

MainPage.defaultProps = {
  isReady: false,
  message: null,
};

export default CSSModules(MainPage, styles);
