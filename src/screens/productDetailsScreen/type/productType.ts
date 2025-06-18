import { IProductDataType } from '@screens/homeScreen/redux/home.initialState';

export type TProductType = IProductDataType & {
  count?: number; // used in cart only
};
