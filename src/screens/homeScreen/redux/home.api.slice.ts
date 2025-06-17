import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initialAuthState, IProductDataType } from './home.initialState';

export const homeSlice = createSlice({
  name: 'homeSlice',
  initialState: initialAuthState,
  reducers: {
    setFilteredData(
      state,
      action: PayloadAction<{ data?: IProductDataType[] }>,
    ) {
      state.filteredData = action.payload.data;
    },
  },
});

export const { setFilteredData } = homeSlice.actions;
