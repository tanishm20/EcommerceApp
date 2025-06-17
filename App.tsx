import 'react-native-reanimated';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '@redux/store';
import AppNavigation from '@navigation/navigation';
import { enableScreens } from 'react-native-screens';
enableScreens();
function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <AppNavigation />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEEF0190',
    flex: 1,
  },
});

export default App;
