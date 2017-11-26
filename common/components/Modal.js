import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


export default class Modal extends React.PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
    // status: PropTypes.bool.isRequired,
  };

  // state = {
  //   status: false,
  // };

  componentWillMount() {
    this.root = document.createElement('div');
    document.body.appendChild(this.root);
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     status: nextProps.status,
  //   });
  // }

  componentWillUnmount() {
    document.body.removeChild(this.root);
    // this.setState({
    //   status: false,
    // });
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
