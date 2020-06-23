import React, { createContext } from 'react';

export const CTX = createContext();

const initState = {
  general: [{from:'sivadej', msg:'hello'}, {from:'johndoe', msg:'hey chat'}],
  topic1: [{from:'sivadej', msg:'hi there'}],
}

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

export default function Store(props) {
  const reducerHook = React.useReducer(reducer, initState);
  return <CTX.Provider value={reducerHook}>{props.children}</CTX.Provider>;
}
