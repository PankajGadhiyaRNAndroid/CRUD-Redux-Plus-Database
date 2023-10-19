import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import Global from '../Utils/Global';
import { fetchFriends } from '../Redux/slices/FriendSlice'
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserFriendlist.db' });

function FriendScreen({ route, navigation }) {
  const [isdataStored, setDataStore] = useState(false);
  const [databaserecord, setDatabaseRecord] = useState([]);
  const friends = useSelector(state => state.friends);
  const friendsData = useSelector(state => state.friends.friendData);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllRecord();
    });
    return () => {
      unsubscribe;
    };
  }, [navigation]);

  useEffect(() => {
    if (friendsData.length > 0) {
      insertFriends(friendsData)
    }
  }, [friendsData]);

  useEffect(() => {
    if (isdataStored) {
      getAllRecord();
    }
  }, [isdataStored]);


  const getAllRecord = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_friends',
        [],
        (tx, results) => {
          console.log('This is available Records :---> ', results.rows.length);
          if (results.rows.length == 0) {
            dispatch(fetchFriends());
          } else {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
            }
            if (temp.length > 0) {
              setDatabaseRecord(temp);
              setDataStore(false);
            }
          }
        }
      );
    });
  }

  const insertFriends = (friends) => {
    for (let friend of friends) {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO table_friends (user_fname, user_lname,user_sync,user_fid, user_age) VALUES (?,?,?,?,?)',
          [friend.category, friend.title, "YES", parseInt(friend.id), parseInt(friend.rating.rate)],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              console.log('Added Record :---> ');
            } else {
              alert('Registration Failed');
            }
          }
        );
      });
    }
    setDataStore(true)
  }

  const gotoDetail = (item) => () => {
    navigation.navigate(Global.ROOT_FRIEND_DETAIL, { friendid: item.user_id })
  }

  const goToEditScreen = (item) => () => {
    navigation.navigate(Global.ROOT_NEW_FRIEND, { friendid: item.user_id, isEdit: true })
  }

  const onSyncPressed = (item) => () => {
    alert('sync pressed')
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.rowcontainer}>
        <TouchableOpacity style={styles.rowButton} onPress={gotoDetail(item)}>
          <View style={styles.rowDirection}>
            <View style={styles.rowDetail}>
              <Text style={styles.txtTitle}>{item.user_fname}</Text>
              <Text style={styles.txtrow}>{item.user_lname}</Text>
              <Text style={styles.txtrow}>{item.user_age}</Text>
            </View>

            <TouchableOpacity
              disabled={item.user_sync == "YES" ? true : false}
              style={styles.editicon}
              onPress={onSyncPressed(item)}>
              <Icon
                name={Global.ICON_SYNC}
                color={item.user_sync == "YES" ? Global.COLOR_GREEN : Global.COLOR_RED}
                size={Global.RIGHT_ICON} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.editicon} onPress={goToEditScreen(item)}>
              <Icon
                name={Global.ICON_EDIT}
                color={Global.COLOR_GRAY}
                size={Global.RIGHT_ICON} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.maincontainer}>
      {
        (friends.isLoader) ?
          <View style={[styles.maincontainer, styles.extracontainer]}>
            <ActivityIndicator color="blue" size="large" />
          </View> : <View>
            <FlatList
              data={databaserecord}
              renderItem={renderItem}
              keyExtractor={item => item.user_id} />
          </View>
      }

    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  rowimage: {
    height: 60,
    width: 50,
    alignSelf: 'center',
    marginRight: 20
  },
  rowDetail: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 15
  },
  extracontainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowButton: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    elevation: 5
  },
  rowcontainer: {
    marginHorizontal: 25,
    marginVertical: 10,
  },
  rowDirection: {
    flexDirection: 'row'
  },
  txtTitle: {
    fontWeight: 'bold'
  },
  editicon: {
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  txtrow: {
    marginTop: 10
  }
});

export default FriendScreen;