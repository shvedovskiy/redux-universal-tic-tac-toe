import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import ThemeSwitcher from './ThemeSwitcher';
import MuteSwitcher from './MuteSwitcher';
import styles from './Controls.scss';


const Controls = ({ onToggleMute }) => (
  <div styleName="controls">
    <ThemeSwitcher styles={styles} />
    <MuteSwitcher styles={styles} onToggleMute={onToggleMute} />
  </div>
);

Controls.propTypes = {
  onToggleMute: PropTypes.func.isRequired,
};

export default CSSModules(Controls, styles);
