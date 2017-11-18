import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


export default class Waiting extends React.Component {
  static propTypes = {
    message: PropTypes.string,
  };

  static defaultProps = {
    message: null,
  };

  render() {
    return (
      <div className={classNames('page', 'waiting')}>
        <div className="waiting-title-container">
          <h1>Waiting for available game...</h1>
        </div>
        {
          this.props.message
            ? (
              <div className="invite-link-container">
                <span>Invitation link:</span> <span className="invite-link">{this.props.message}</span>
              </div>
            )
            : <div className="loader" />
        }
      </div>
    );
  }
}
