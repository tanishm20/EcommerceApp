import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HOME_SCREEN } from 'src/utils/routesConstants';
import { HomeScreen } from '@screens/homeScreen/homeScreen';

import { TRootStackParamList } from './types';

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
