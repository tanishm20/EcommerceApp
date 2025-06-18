import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IProductDataType } from '../homeScreen/redux/home.initialState';
import { useCartHook } from 'src/hooks/useCartHook';
import { selectCartItemData } from '../productDetailsScreen/redux/product.api.selector';
import { setCartItem } from '../productDetailsScreen/redux/product.api.slice';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CART_SUMMARY_SCREEN } from 'src/utils/routesConstants';

export const useCartScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();
  const cartData = useSelector(selectCartItemData);
  const { addToCart, removeFromCart, getItemCount } = useCartHook();
  const [modalVisible, setModalVisible] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<IProductDataType>();
  const isCartEmpty = !cartData || cartData.length === 0;
  const confirmRemove = () => {
    if (itemToRemove) {
      const updatedCartData = cartData?.filter(
        item => item.id !== itemToRemove.id,
      );
      dispatch(setCartItem({ data: updatedCartData }));
      setItemToRemove(undefined);
    }
    setModalVisible(false);
  };

  const onRemoveFromCart = (item: IProductDataType) => () => {
    removeFromCart(item);
  };

  const onAddToCart = (item: IProductDataType) => () => {
    addToCart(item);
  };

  const onRemovePress = (item: IProductDataType) => () => {
    setItemToRemove(item);
    setModalVisible(true);
  };

  const onCheckoutPress = () => {
    navigation.navigate(CART_SUMMARY_SCREEN);
  };
  const getTotalQuantity = useMemo(() => {
    return cartData?.reduce((acc, item) => acc + getItemCount(item), 0) || 0;
  }, [cartData]);

  return {
    confirmRemove,
    getItemCount,
    onRemoveFromCart,
    onAddToCart,
    onRemovePress,
    modalVisible,
    isCartEmpty,
    setModalVisible,
    cartData,
    onCheckoutPress,
    getTotalQuantity,
  };
};
