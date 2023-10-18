import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FriendScreen from "../Tabs/FriendScreen";
import FriendDetail from "./FriendDetail";
import NewFriend from "./NewFriend";

const Stack = createStackNavigator();

function FriendRoot() {
    return (
        <Stack.Navigator
            initialRouteName={'Friends'}>
            <Stack.Screen
                options={{ unmountOnBlur: true }}
                name="FriendScreen"
                component={FriendScreen} />
            <Stack.Screen
                name="FriendDetail"
                component={FriendDetail} />
            <Stack.Screen
                name="NewFriend"
                component={NewFriend} />
        </Stack.Navigator>
    );
}

export default FriendRoot;