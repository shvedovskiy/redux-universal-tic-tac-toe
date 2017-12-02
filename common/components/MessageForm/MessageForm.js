import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './MessageForm.scss';


class MessageForm extends React.PureComponent {
  static TYPING_TIMER_LENGTH = 600;
  static defaultProps = {
    connected: false,
    typing: false,
  };

  static propTypes = {
    onSendMessage: PropTypes.func.isRequired,
    onStartTyping: PropTypes.func.isRequired,
    onStopTyping: PropTypes.func.isRequired,
    typing: PropTypes.bool,
  };

  componentDidMount() {
    this.messageInput.focus();
  }

  lastTypingTime;

  handleKeyDown = (e) => {
    if (e.which === 13) {
      const message = this.messageInput.value;
      if (message) {
        this.props.onSendMessage(message);
        this.messageInput.value = '';
      }
    }
  };

  handleInput = () => {
    if (!this.props.typing) {
      this.props.onStartTyping();
    }

    this.lastTypingTime = new Date().getTime();
    setTimeout(() => {
      const typingTimer = new Date().getTime();
      const timeDiff = typingTimer - this.lastTypingTime;
      if (timeDiff >= MessageForm.TYPING_TIMER_LENGTH && this.props.typing) {
        this.props.onStopTyping();
      }
    }, MessageForm.TYPING_TIMER_LENGTH);
  };

  render() {
    return (
      <div styleName="message-form">
        <input
          styleName="message-input"
          placeholder="Type here..."
          defaultValue=""
          ref={(node) => { this.messageInput = node; }}
          onKeyDown={this.handleKeyDown}
          onInput={this.handleInput}
        />
      </div>
    );
  }
}

export default CSSModules(MessageForm, styles, { allowMultiple: true });
