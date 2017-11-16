import React from 'react';
import PropTypes from 'prop-types';


const Modal = props => (
  <div className="modal" data-status={props.status}>
    <div className="modal-content">
      {props.content}
    </div>
  </div>
);

Modal.propTypes = {
  content: PropTypes.element.isRequired,
  status: PropTypes.bool.isRequired,
};

export default Modal;
