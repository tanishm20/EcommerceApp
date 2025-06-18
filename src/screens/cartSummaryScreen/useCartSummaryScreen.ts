import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IProductDataType } from '../homeScreen/redux/home.initialState';
import { useCartHook } from 'src/hooks/useCartHook';
import { selectCartItemData } from '../productDetailsScreen/redux/product.api.selector';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SUCCESS_SCREEN } from 'src/utils/routesConstants';
import { setCartItem } from '../productDetailsScreen/redux/product.api.slice';

export const useCartSummaryScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();
  const cartData = useSelector(selectCartItemData);
  const { getItemCount } = useCartHook();
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  const totalPrice =
    cartData?.reduce((acc, item) => acc + item.price * getItemCount(item), 0) ||
    0;
  const shipping = 50;
  const vat = totalPrice * 0.15;
  const totalAmount = totalPrice + shipping + vat;
  const isCartEmpty = !cartData || cartData.length === 0;

  const onPlaceOrderPress = () => {
    dispatch(setCartItem({ data: undefined }));
    navigation.navigate(SUCCESS_SCREEN);
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
  };
};
