import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  CART_SCREEN,
  CART_SUMMARY_SCREEN,
  HOME_SCREEN,
  PRODUCT_DETAILS_SCREEN,
  SEARCH_SCREEN,
  SUCCESS_SCREEN,
} from 'src/utils/routesConstants';
import { HomeScreen } from '@screens/homeScreen/homeScreen';
import { SearchScreen } from '@screens/searchScreen/searchScreen';
import { TRootStackParamList } from './types';
import { ProductDetailsScreen } from '@screens/productDetailsScreen/productDetailsScreen';
import { CartScreen } from '@screens/cartScreen/cartScreen';
import { CartSummaryScreen } from '@screens/cartSummaryScreen/cartSummaryScreen';
import { SuccessScreen } from '@screens/successScreen/successScreen';

const Stack = createNativeStackNavigator<TRootStackParamList>();

const InAppNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={HOME_SCREEN}>
      <Stack.Screen
        name={HOME_SCREEN}
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SEARCH_SCREEN}
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={PRODUCT_DETAILS_SCREEN}
        component={ProductDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={CART_SCREEN}
        component={CartScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={CART_SUMMARY_SCREEN}
        component={CartSummaryScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SUCCESS_SCREEN}
        component={SuccessScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <InAppNavigation />
    </NavigationContainer>
  );
};

export default AppNavigation;
