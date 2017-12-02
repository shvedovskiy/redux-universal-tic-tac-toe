import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './EndOfGame.scss';


const EndOfGame = ({ children, replay, logout }) => (
  <div styleName="end-of-game">
    <div styleName="end-of-game-message">{children}</div>
    <div styleName="end-of-game-buttons">
      <button styleName="game-button" onClick={replay}>Replay</button>
      <button styleName="game-button" onClick={logout}>Logout</button>
    </div>
  </div>
);

EndOfGame.propTypes = {
  children: PropTypes.element,
  replay: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

EndOfGame.defaultProps = {
  children: null,
};

export default CSSModules(EndOfGame, styles);
