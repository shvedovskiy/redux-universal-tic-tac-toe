/* eslint-disable comma-dangle */
export default function removeTypingMessage(messages, message) {
  return messages.filter(entry =>
    !entry.service || entry.text !== message
  );
}
