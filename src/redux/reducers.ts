import { combineReducers } from '@reduxjs/toolkit';
import { homeSlice } from 'src/screens/homeScreen/redux/home.api.slice';

export const rootReducer = combineReducers({
  homeSlice: homeSlice.reducer,
});
