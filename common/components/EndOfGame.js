import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const EndOfGame = ({ children, replay, logout }) => (
  <div className="end-of-game">
    <div className="end-of-game-message">{children}</div>
    <div className="end-of-game-buttons">
      <button className={classNames('btn', 'game-button')} onClick={replay}>Replay</button>
      <button className={classNames('btn', 'game-button')} onClick={logout}>Logout</button>
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

export default EndOfGame;
