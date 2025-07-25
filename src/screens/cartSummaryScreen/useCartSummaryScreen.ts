import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCartHook } from '@hooks/useCartHook';
import { selectCartItemData } from '@screens/productDetailsScreen/redux/product.api.selector';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { SUCCESS_SCREEN } from '@utils/routesConstants';
import { setCartItem } from '@screens/productDetailsScreen/redux/product.api.slice';

export const useCartSummaryScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();
  const cartData = useSelector(selectCartItemData);
  const { getItemCount } = useCartHook();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  const totalPrice =
    cartData?.reduce((acc, item) => acc + item.price * getItemCount(item), 0) ||
    0;
  const shipping = 50;
  const vat = totalPrice * 0.15;
  const totalAmount = totalPrice + shipping + vat;
  const isCartEmpty = !cartData || cartData.length === 0;

  const onPlaceOrderPress = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate(SUCCESS_SCREEN);
      dispatch(setCartItem({ data: undefined }));
    }, 1000);
  };

  return {
    paymentMethod,
    totalAmount,
    isCartEmpty,
    onPlaceOrderPress,
    getItemCount,
    cartData,
    totalPrice,
    shipping,
    vat,
    isLoading,
  };
};
