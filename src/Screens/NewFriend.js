import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import { createFriend } from '../Redux/slices/CreateFriendSlice'
import { useDispatch, useSelector } from 'react-redux';
import { openDatabase } from 'react-native-sqlite-storage';
import NetInfo from '@react-native-community/netinfo';

var db = openDatabase({ name: 'UserFriendlist.db' });

function NewFriend({ route, navigation }) {
    const { friendid, isEdit } = route.params;
    const dispatch = useDispatch();
    const [isOnline, setOnline] = useState(true);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [age, setAge] = useState("");
    const [userid, setUserId] = useState("");

    useEffect(() => {
        if (friendid) {
            searchUser();
        }
        const unsubscribe = NetInfo.addEventListener(state => {
            setOnline(state.isConnected);
        });

        return () => {
            unsubscribe();
        }
    }, [])

    const searchUser = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM table_friends where user_id = ?',
                [friendid],
                (tx, results) => {
                    var len = results.rows.length;
                    console.log('len', len);
                    if (len > 0) {
                        setFirstname(results.rows.item(0).user_fname);
                        setLastname(results.rows.item(0).user_lname);
                        setAge(results.rows.item(0).user_age.toString());
                    } else {
                        alert('No user found');
                    }
                }
            );
        });
    };

    const updateFriend = () => {
        
        if (!firstname) {
            alert('Please fill firstname');
            return;
        }
        if (!lastname) {
            alert('Please fill lastname');
            return;
        }
        if (!age) {
            alert('Please fill Age');
            return;
        }

        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE table_friends set user_fname=?, user_lname=? , user_sync=?,user_fid=?,user_age=? where user_id=?',
                [firstname, lastname, "NO", 55, age, friendid],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Success',
                            'User updated successfully',
                            [
                                {
                                    text: 'Ok',
                                },
                            ],
                            { cancelable: false }
                        );
                    } else alert('Updation Failed');
                }
            );
        });
    };

    const register_user = () => {
        if (!firstname) {
            alert('Please fill firstname');
            return;
        }
        if (!lastname) {
            alert('Please fill lastname');
            return;
        }
        if (!age) {
            alert('Please fill Age');
            return;
        }

        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO table_friends (user_fname, user_lname,user_sync,user_fid, user_age) VALUES (?,?,?,?,?)',
                [firstname, lastname, "NO", 55, age],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        setFirstname('')
                        setLastname('')
                        setAge('')
                        Alert.alert(
                            'Success',
                            'You are Registered Successfully',
                            [
                                {
                                    text: 'Ok',
                                },
                            ],
                            { cancelable: false }
                        );
                    } else alert('Registration Failed');
                }
            );
        });
    };



    const submitFriend = () => {
        if (isOnline) {
            if (!firstname) {
                alert('Please fill firstname');
                return;
            }
            if (!lastname) {
                alert('Please fill lastname');
                return;
            }
            if (!age) {
                alert('Please fill Age');
                return;
            }
            let fArry = [];
            let singleFriend = {
                "attributes": {
                    "type": "Friend__c"
                },
                "Name": "FR-00002",
                "First_Name__c": firstname,
                "Last_Name__c": lastname,
                "Age__c": age
            }
            fArry.push(singleFriend);
            dispatch(createFriend(fArry));
        } else {
            register_user();
        }
    }
    return (
        <View style={styles.maincontainer}>
            <Text style={styles.label}>Firstname</Text>
            <TextInput
                value={firstname}
                style={styles.textInput}
                onChangeText={newText => setFirstname(newText)}
                placeholder='Firstname' />

            <Text style={styles.label}>Lastname</Text>
            <TextInput value={lastname}
                onChangeText={newText => setLastname(newText)}
                style={styles.textInput}
                placeholder='LastName' />

            <Text style={styles.label}>Age</Text>
            <TextInput value={age}
                onChangeText={newText => setAge(newText)}
                style={styles.textInput}
                keyboardType='number-pad'
                placeholder='Age' />

            <TouchableOpacity style={styles.btnAddFriend} onPress={(isEdit) ? updateFriend : submitFriend}>
                <Text style={styles.btnText}>{(isEdit) ? 'Edit Friend' : 'Create Friend'}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        flexDirection: 'column',
        margin: 25
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
    textInput: {
        backgroundColor: 'white',
        borderRadius: 6,
        marginTop: 10,
        paddingHorizontal: 15
    },
    label: {
        marginTop: 20,
        fontWeight: "bold"
    }


});

export default NewFriend;