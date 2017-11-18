import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


export default class LoginPage extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    handleSetUsername: PropTypes.func.isRequired,
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
        <div className={classNames('page', 'login')}>
          <div className="login-errors">
            <li><span className="login-error">
              {this.props.error}
            </span></li>
          </div>
        </div>
      ); // unknown invite token error
    }
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className={classNames('page', 'login')}
        onClick={this.focusNameInput}
      >
        <div className="form">
          <h3 className="form-title">What&#39;s your nickname?</h3>
          <input
            type="text"
            className="username-field"
            defaultValue=""
            ref={(node) => {
              this.nameInput = node;
            }}
            onKeyDown={this.handleKeyDown}
          />
        </div>
        {
          this.props.error &&
          <div className="login-errors">
            <li><span className="login-error">
              {this.props.error}
            </span></li>
          </div>
        }
      </div>
    );
  }
}
