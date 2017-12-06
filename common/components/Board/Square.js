import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';


const Square = ({ disabled, onClick, value, shaded }) => (
  <div styleName="square-button-wrapper">
    <div styleName={classNames(
      'big',
      {
        x: value === 'X',
        o: value === 'O',
        shaded,
      },
    )}
    >
      <button
        styleName="square-button"
        onClick={onClick}
        disabled={disabled}
      >
        {value}
      </button>
    </div>
  </div>
);

Square.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  shaded: PropTypes.bool.isRequired,
};

export default CSSModules(Square, {}, { allowMultiple: true });
