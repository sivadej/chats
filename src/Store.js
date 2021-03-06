import React, { createContext } from 'react';
import io from 'socket.io-client';

export const CTX = createContext();

const initState = {
  general: [
    { from: 'sivadej', msg: 'hello' },
    { from: 'johndoe', msg: 'hey chat' },
  ],
  topic1: [{ from: 'sivadej', msg: 'hi there' }],
};

function reducer(state, action) {
  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case 'RECEIVE_MESSAGE':
      return {
        ...state,
        [topic]: [
          ...state[topic],
          {
            from: from,
            msg: msg,
          },
        ],
      };
    default:
      return state;
  }
}



let socket;

function sendChatAction(value) {
  socket.emit('chat message', value);
}

export default function Store(props) {
  if (!socket) {
    socket = io(':3001');
  }

  const [allChats, dispatch] = React.useReducer(reducer, initState);
  return (
    <CTX.Provider value={{ allChats, sendChatAction }}>
      {props.children}
    </CTX.Provider>
  );
}
