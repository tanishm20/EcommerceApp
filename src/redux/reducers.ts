import { combineReducers } from '@reduxjs/toolkit';
import { homeSlice } from '@screens/homeScreen/redux/home.api.slice';
import { productDetailsSlice } from '@screens/productDetailsScreen/redux/product.api.slice';

export const rootReducer = combineReducers({
  homeSlice: homeSlice.reducer,
  productDetailsSlice: productDetailsSlice.reducer,
});
