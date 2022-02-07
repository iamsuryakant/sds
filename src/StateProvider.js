import React, { createContext, useReducer, useContext } from 'react';

//Context Stores

export const StateContext = createContext();

//to perform action we use reducer login, logout;

export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);


export const useStateValue = () => useContext(StateContext);