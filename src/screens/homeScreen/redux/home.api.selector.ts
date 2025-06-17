import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@redux/store';

const selectSelf = (state: RootState) => state?.homeSlice;

const selectFilteredData = createSelector(
  selectSelf,
  state => state?.filteredData,
);

export { selectFilteredData };
