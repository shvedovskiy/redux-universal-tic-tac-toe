import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const Square = ({ disabled, onClick, value }) => (
  <div className="square-button-wrapper">
    <div className={classNames(
      'big',
      {
        x: value === 'X',
        o: value === 'O',
      },
    )}
    >
      <button
        className="square-button"
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
};

export default Square;
