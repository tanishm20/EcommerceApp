import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initialAuthState } from './product.initialState';
import { TProductType } from '../type/productType';

export const productDetailsSlice = createSlice({
  name: 'productDetailsSlice',
  initialState: initialAuthState,
  reducers: {
    setCartItem(state, action: PayloadAction<{ data?: TProductType[] }>) {
      state.cartItem = action.payload.data;
    },
  },
});

export const { setCartItem } = productDetailsSlice.actions;
