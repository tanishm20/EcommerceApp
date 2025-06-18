import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@redux/store';

const selectSelf = (state: RootState) => state?.productDetailsSlice;

const selectCartItemData = createSelector(selectSelf, state => state?.cartItem);

export { selectCartItemData };
