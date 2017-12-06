/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
import styles from './MessageList.scss';


class MessageList extends React.PureComponent {
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
          <li styleName={classNames('log', 'message')} key={i}>
            <span styleName={classNames('log', 'message-body')}>{message.text}</span>
          </li>
        );
      }
      return (
        <li styleName="message" key={i}>
          <span styleName="username">{message.username}</span>
          <span styleName="message-body">{message.text}</span>
        </li>
      );
    });

    return (
      <ul
        styleName="message-list"
        ref={(node) => {
          this.messagesContainer = node;
        }}
      >
        {list.length
          ? list
          : (
            <li styleName={classNames('log', 'message')}>
              <span styleName={classNames('log', 'message-body')}>Here you can chat while playing</span>
            </li>
          )
        }
      </ul>
    );
  }
}

export default CSSModules(MessageList, styles, { allowMultiple: true });
