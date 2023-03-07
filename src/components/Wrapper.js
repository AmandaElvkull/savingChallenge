import React from 'react'
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from 'reducers/userSlice';
import Login from './Login'

const reducer = combineReducers({
  user: userSlice.reducer
});

const store = configureStore({ reducer });

const Wrapper = () => {
  return (
    <div>
      <Provider store={store}>
        <p> Welcome to the challenge of your dreams </p>
        <Login />
      </Provider>
    </div>
  )
}

export default Wrapper