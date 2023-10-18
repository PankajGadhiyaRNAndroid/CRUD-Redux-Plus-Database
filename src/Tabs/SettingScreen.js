import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Global from '../Utils/Global';

function SettingScreen() {

  useEffect(() => {
    console.log('Same First effect :----> 1 ');
  }, []);

  useEffect(() => {
    console.log('Same Second effect :----> 2 ');
  }, []);
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

