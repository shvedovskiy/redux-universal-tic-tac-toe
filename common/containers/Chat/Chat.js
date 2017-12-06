import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import MessageList from '../../components/MessageList/MessageList';
import MessageForm from '../../components/MessageForm/MessageForm';
import * as actions from '../../actions/index';
import styles from './Chat.scss';


const Chat = props => (
  <div styleName="chat">
    <MessageList styles={styles} messages={props.messages} />
    <MessageForm
      styles={styles}
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

export default connect(
  mapStateToProps, mapDispatchToProps,
)(CSSModules(Chat, styles));
