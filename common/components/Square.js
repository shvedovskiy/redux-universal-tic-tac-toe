import React from 'react';
import PropTypes from 'prop-types';


const Square = ({ disabled, onClick, value }) => (
  <button
    className="square"
    onClick={onClick}
    disabled={disabled}
  >
    {value}
  </button>
);

Square.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Square;
