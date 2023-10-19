import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { openDatabase } from 'react-native-sqlite-storage';
import NetInfo from '@react-native-community/netinfo';
import { useDispatch, useSelector } from 'react-redux';
import { syncFriends } from '../Redux/slices/SyncSlice';
var db = openDatabase({ name: 'UserFriendlist.db' });

function HomeScreen() {
  const dispatch = useDispatch();
  const [isOnline, setOnline] = useState(false);
  const [selectedimage, setSelectedImage] = useState("");
  const [offlinedata, setOfflineData] = useState("");
  const [loadimage, setLoadImage] = useState("");

  useEffect(() => {
    console.log('Home screen Status NETWORK:==> ', isOnline);
    if (isOnline) {
      dispatch(syncFriends(offlinedata));
    }
  }, [isOnline])

  const launchNativeCamera = () => {
    let options = {
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        // setFileData(response.assets[0].base64);
        // setFileUri(response.assets[0].uri)
        setSelectedImage(response.assets[0].uri);
      }
    });

  }

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_friends'",
        [],
        (tx, res) => {
          console.log('item:----> ', res.rows.length);
          if (res.rows.length == 0) {
            console.log('inside table creation :-----------------');
            txn.executeSql('DROP TABLE IF EXISTS table_friends', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_friends(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_fname VARCHAR(50), user_lname VARCHAR(50),user_sync VARCHAR(50), user_fid INT(50), user_age INT(50))',
              []
            );
          }
        }
      );
    });

    const unsubscribe = NetInfo.addEventListener(state => {
      setOnline(state.isConnected);
    });

    return () => {
      unsubscribe();
    }
  }, [])

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_friends',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            let customObj = {
              "attributes": {
                "type": "Friend__c"
              },
              "Name": "FR-00002",
              "First_Name__c": results.rows.item(i).user_fname,
              "Last_Name__c": results.rows.item(i).user_lname,
              "Age__c": results.rows.item(i).user_age
            }
            temp.push(customObj);
          }
          if (temp) {
            setOfflineData(temp);
          }
        }
      );
    });
  }, []);

  const loadImage = () => {
    selectedimage && setLoadImage(selectedimage);
  }

  return (
    <View style={styles.maincontainer}>
      {

        loadimage && (
          <View style={styles.flexcontainer}>
            <Image
              source={{ uri: loadimage }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        )

      }

      <View style={styles.flexcontainer}>
        <TouchableOpacity style={styles.btnAddFriend} onPress={launchNativeCamera}>
          <Text style={styles.btnText}>Pick Image</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnAddFriend} onPress={loadImage}>
          <Text style={styles.btnText}>Show Image</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnAddFriend: {
    alignSelf: 'center',
    marginRight: 20,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: 'lightblue',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  btnText: {
    fontWeight: 'bold'
  },
  image: {
    flex: 1,
    height: 200,
    width: 200
  },
  flexcontainer: {
    flex: 1
  }
});

export default HomeScreen;