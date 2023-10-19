import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Global from '../Utils/Global';
import NetInfo from '@react-native-community/netinfo';

function SettingScreen() {
  const [isOnline, setOnline] = useState(false);

  useEffect(() => {
    console.log('Same First effect :----> 1 ');
    const unsubscribe = NetInfo.addEventListener(state => {
      setOnline(state.isConnected);
    });

    return () => {
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    console.log('this is Internet status :---> ', isOnline);
  }, [isOnline]);

  return (
    <View style={styles.maincontainer}>
      <Icon
        name={Global.ICON_SETTING}
        color={Global.COLOR_BLUE}
        size={Global.SCREEN_ICON} />
      <Text>HomeScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default SettingScreen;

