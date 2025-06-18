import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IProductDataType } from '@screens/homeScreen/redux/home.initialState';
import { CART_SCREEN } from '@utils/routesConstants';
import { useCartHook } from '@hooks/useCartHook';

export const useProductDetailsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {
    params: { product },
  } = useRoute<
    RouteProp<{
      params: { product: IProductDataType };
    }>
  >() ?? { params: { product: {} as IProductDataType } };

  const { addToCart, removeFromCart, getTotalItems, getItemCount } =
    useCartHook();
  const quantity = getItemCount(product);

  const onRemoveFromCart = (item: IProductDataType) => () =>
    removeFromCart(item);

  const onAddToCart = (item: IProductDataType) => () => addToCart(item);

  const onViewCartPress = () => navigation.navigate(CART_SCREEN);
  return {
    onViewCartPress,
    onAddToCart,
    onRemoveFromCart,
    getTotalItems,
    quantity,
    product,
  };
};
