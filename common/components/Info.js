/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';


const Control = ({ messages, players, history }) => (
  <div>
    X: {players.X} - O: {players.O}
    <div>
      Messages:
      <ul>
        {
          messages.map((message, i) => <li key={i}>{message}</li>)
        }
      </ul>
    </div>
    <div>
      History:
      <ul>
        {
          history.map((message, i) => <li key={i}>{message}</li>)
        }
      </ul>
    </div>
  </div>
);

Control.propTypes = {
  messages: PropTypes.array,
  players: PropTypes.shape({
    X: PropTypes.string.isRequired,
    Y: PropTypes.string.isRequired,
  }),
  history: PropTypes.array,
};

Control.defaultProps = {
  messages: [],
  players: {
    X: null,
    Y: null,
  },
  history: [],
};

export default Control;
