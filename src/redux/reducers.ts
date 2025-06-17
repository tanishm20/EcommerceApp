import { combineReducers } from '@reduxjs/toolkit';

const dummyReducer = () => ({});

export const rootReducer = combineReducers({
  dummy: dummyReducer,
});
