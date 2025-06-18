import { TProductType } from '../type/productType';

type TAuthState = {
  cartItem?: TProductType[];
};

export const initialAuthState: TAuthState = {
  cartItem: undefined,
};
