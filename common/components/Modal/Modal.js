import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './Modal.scss';


class Modal extends React.PureComponent {
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
      <div styleName="modal">
        <div styleName="modal-content">
          {this.props.children}
        </div>
      </div>,
      this.root,
    );
  }
}

export default CSSModules(Modal, styles);
