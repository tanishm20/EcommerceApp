import { useDispatch, useSelector } from 'react-redux';
import { selectCartItemData } from '@screens/productDetailsScreen/redux/product.api.selector';
import { IProductDataType } from '@screens/homeScreen/redux/home.initialState';
import { setCartItem } from '@screens/productDetailsScreen/redux/product.api.slice';
import { TProductType } from '@screens/productDetailsScreen/type/productType';

export const useCartHook = () => {
  const dispatch = useDispatch();
  const cartData = useSelector(selectCartItemData);

  const addToCart = (productItem: IProductDataType) => {
    const exists = cartData?.find(p => p.id === productItem?.id);
    let modifiedData;
    if (exists) {
      modifiedData = cartData?.map(p =>
        p.id === productItem.id ? { ...p, count: (p.count || 1) + 1 } : p,
      );
    } else {
      if (cartData) {
        modifiedData = [...cartData, { ...productItem, count: 1 }];
      } else {
        modifiedData = [{ ...productItem, count: 1 }];
      }
    }
    dispatch(setCartItem({ data: modifiedData }));
  };

  const removeFromCart = (productItem: IProductDataType) => {
    const modifiedData = cartData
      ?.map(p =>
        p.id === productItem?.id ? { ...p, count: (p.count || 1) - 1 } : p,
      )
      .filter(p => p.count && p.count > 0);
    dispatch(setCartItem({ data: modifiedData }));
  };

  const getTotalItems = () =>
    cartData?.reduce(
      (sum: number, item: TProductType) => sum + (item.count || 1),
      0,
    );

  const getItemCount = (productItem: IProductDataType) =>
    cartData?.find((item: TProductType) => item?.id === productItem?.id)
      ?.count || 0;

  return { addToCart, removeFromCart, getTotalItems, getItemCount };
};
