/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


export default class MessageList extends React.PureComponent {
  static defaultProps = {
    messages: [],
  };

  static propTypes = {
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        username: PropTypes.string,
        text: PropTypes.string.isRequired,
        service: PropTypes.bool,
      }),
    ),
  };

  componentDidUpdate() {
    this.scrolled = this.messagesContainer.scrollHeight -
      (this.messagesContainer.scrollTop + this.messagesContainer.offsetHeight) >= 50;

    if (this.scrolled) {
      return;
    }
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  render() {
    const list = this.props.messages.map((message, i) => {
      if (!message.username && message.service) {
        return (
          <li className={classNames('log', 'message')} key={i}>
            <span className={classNames('log', 'message-body')}>{message.text}</span>
          </li>
        );
      }
      return (
        <li className="message" key={i}>
          <span className="username">{message.username}</span>
          <span className="message-body">{message.text}</span>
        </li>
      );
    });

    return (
      <ul
        className="messages"
        ref={(node) => {
          this.messagesContainer = node;
        }}
      >
        {list.length
          ? list
          : (
            <li className={classNames('log', 'message')}>
              <span className={classNames('log', 'message-body')}>Here you can chat while playing</span>
            </li>
          )
        }
      </ul>
    );
  }
}
