import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Global from '../Utils/Global';
import { useDispatch, useSelector } from 'react-redux';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserFriendlist.db' });

function FriendDetail({ route, navigation }) {
  const [singleFriend, setSingleFriend] = useState('');
  const { friendid } = route.params;


  const searchUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_friends where user_id = ?',
        [friendid],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setSingleFriend(results.rows.item(0));
          } else {
            alert('No user found');
          }
        }
      );
    });
  };

  useEffect(() => {
    if (friendid) {
      searchUser();
    }
  }, [])

  const gotoNewFriend = () => {
    navigation.navigate(Global.ROOT_NEW_FRIEND, { friend: '', isEdit: false })
  }

  return (
    <View style={styles.rootmaincontainer} >
      {
        singleFriend ? (
          <View style={styles.maincontainer}>
            <TouchableOpacity
              style={styles.btnAddFriend}
              onPress={gotoNewFriend}>
              <Icon
                name={Global.ICON_ADD}
                color={Global.COLOR_GRAY}
                size={Global.RIGHT_ICON} />
            </TouchableOpacity>
            <Text style={styles.txtTitle}>{singleFriend.user_fname}</Text>
            <Text style={styles.marginTop}>{singleFriend.user_lname}</Text>
            <Text style={styles.marginTop} >{singleFriend.user_age}</Text>
          </View>
        )
          :
          (
            <View style={styles.loadercontainer}>
              <ActivityIndicator color="blue" size="large" />
            </View>
          )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    marginHorizontal: 20
  },
  loadercontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rootmaincontainer: { flex: 1 },
  rowimage: { height: 60, width: 50, alignSelf: 'center', marginRight: 20 },
  txtTitle: { fontWeight: 'bold', marginTop: 30 },
  marginTop: { marginTop: 30 },
  btnAddFriend: { alignSelf: 'flex-end', marginRight: 20, marginTop: 20, borderRadius: 10, backgroundColor: 'lightblue', padding: 5 }
});

export default FriendDetail;