import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MessageList from '../components/MessageList';
import MessageForm from '../components/MessageForm';
import * as actions from '../actions/index';


const Chat = props => (
  <div>
    <MessageList messages={props.messages} />
    <MessageForm
      onSendMessage={props.onSendMessage}
      onStartTyping={props.onStartTyping}
      onStopTyping={props.onStopTyping}
      typing={props.typing}
    />
  </div>
);

Chat.propTypes = {
  messages: PropTypes.array.isRequired,
  onSendMessage: PropTypes.func.isRequired,
  onStartTyping: PropTypes.func.isRequired,
  onStopTyping: PropTypes.func.isRequired,
  typing: PropTypes.bool,
};

Chat.defaultProps = {
  typing: false,
};


const mapStateToProps = state => ({
  messages: state.chat.messages,
  typing: state.chat.typing,
});

const mapDispatchToProps = dispatch => ({
  onSendMessage(message) {
    dispatch(actions.sendMessage(message));
  },
  onStartTyping() {
    dispatch(actions.startTyping());
  },
  onStopTyping() {
    dispatch(actions.stopTyping());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
