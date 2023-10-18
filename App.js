import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './src/Tabs/BottomTab';
import { Provider } from 'react-redux';
import { store } from './src/Redux/store';

function App() {
  const linking = {
    prefixes: ['peoplesapp://'],
    config: {
      initialRouteName: 'Home',
      screens: {
        FriendRoot: {
          initialRouteName: 'FriendScreen',
          screens: {
            FriendDetail: 'details/:friendid'
          }
        },
      }
    }
  };

  return (
    <Provider store={store}>
      <NavigationContainer linking={linking}
        fallback={
          <View style={styles.loadercontainer}>
            <ActivityIndicator color="blue" size="large" />
          </View>
        }>
        <BottomTab />
      </NavigationContainer>
    </Provider>
  );
}
const styles = StyleSheet.create({
  loadercontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default App;

