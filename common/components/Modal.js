import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


export default class Modal extends React.PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  componentWillMount() {
    this.root = document.createElement('div');
    document.body.appendChild(this.root);
  }

  componentWillUnmount() {
    document.body.removeChild(this.root);
  }

  render() {
    return ReactDOM.createPortal(
      <div className="modal">
        <div className="modal-content">
          {this.props.children}
        </div>
      </div>,
      this.root,
    );
  }
}
