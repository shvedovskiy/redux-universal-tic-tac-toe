import React from 'react';
import PropTypes from 'prop-types';
import CSSStyles from 'react-css-modules';
import styles from './Waiting.scss';


class Waiting extends React.PureComponent {
  static propTypes = {
    message: PropTypes.string,
  };

  static defaultProps = {
    message: null,
  };

  render() {
    return (
      <div styleName="waiting">
        <div styleName="waiting-title-container">
          <h1>Waiting for available game...</h1>
        </div>
        {
          this.props.message ? (
            <div styleName="invite-link-container">
              <span>Invitation link:</span> <span styleName="invite-link">{this.props.message}</span>
            </div>
          ) : <div styleName="loader" />
        }
      </div>
    );
  }
}

export default CSSStyles(Waiting, styles);
