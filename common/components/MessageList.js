/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';


const MessageList = ({ messages }) => {
  const list = messages.map((message, i) => {
    if (!message.username && message.service) {
      return (
        <li className="log" key={i}>
          {message.text}
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
    <div className="chat-area">
      <ul className="messages">
        {list}
      </ul>
    </div>
  );
};

MessageList.defaultProps = {
  messages: [],
};

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
      text: PropTypes.string.isRequired,
      service: PropTypes.bool,
    }),
  ),
};

export default MessageList;
