import React from 'react';
import PropTypes from 'prop-types';
import CSSStyles from 'react-css-modules';
import styles from './LoginPage.scss';


class LoginPage extends React.PureComponent {
  static propTypes = {
    username: PropTypes.string,
    error: PropTypes.string,
    handleSetUsername: PropTypes.func.isRequired,
  };

  static defaultProps = {
    username: null,
    error: null,
  };

  componentDidMount() {
    this.focusNameInput();
  }

  focusNameInput = () => {
    if (this.nameInput) {
      this.nameInput.focus();
    }
  };

  handleKeyDown = (e) => {
    const input = this.nameInput.value;
    if (e.keyCode === 13 && input.trim().length) {
      this.props.handleSetUsername(input);
      this.nameInput.value = '';
    }
  };

  render() {
    if (!this.props.username && this.props.error) {
      return (
        <div styleName="login-page">
          <ul styleName="login-errors">
            <li><span styleName="login-error">
              {this.props.error}
            </span></li>
          </ul>
        </div>
      ); // unknown invite token error
    }
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        styleName="login-page"
        onClick={this.focusNameInput}
      >
        <div styleName="login-form">
          <h3 styleName="login-form-title">What&#39;s your nickname?</h3>
          <input
            type="text"
            styleName="username-field"
            defaultValue=""
            ref={(node) => {
              this.nameInput = node;
            }}
            onKeyDown={this.handleKeyDown}
          />
        </div>
        {
          this.props.error &&
          <ul styleName="login-errors">
            <li><span styleName="login-error">
              {this.props.error}
            </span></li>
          </ul>
        }
      </div>
    );
  }
}

export default CSSStyles(LoginPage, styles, { allowMultiple: true });
