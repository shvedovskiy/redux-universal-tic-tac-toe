import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


export default class LoginPage extends React.PureComponent {
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
        <div className={classNames('page', 'login')}>
          <ul className="login-errors">
            <li><span className="login-error">
              {this.props.error}
            </span></li>
          </ul>
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
          <ul className="login-errors">
            <li><span className="login-error">
              {this.props.error}
            </span></li>
          </ul>
        }
      </div>
    );
  }
}
