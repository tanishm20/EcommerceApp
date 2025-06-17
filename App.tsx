import 'react-native-reanimated';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '@redux/store';
import AppNavigation from '@navigation/navigation';
import { enableScreens } from 'react-native-screens';
enableScreens();
function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#1d2129' }}>
        <AppNavigation />
      </SafeAreaView>
    </Provider>
  );
}

export default App;
