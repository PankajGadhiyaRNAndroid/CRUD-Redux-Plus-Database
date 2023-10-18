import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import SettingScreen from "./SettingScreen";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Global from "../Utils/Global";
import FriendRoot from "../Screens/FriendRoot";

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              name={Global.ICON_HOME}
              color={color}
              size={size} />
          ),
        }}
        component={HomeScreen}
        name="Home" />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              name={Global.ICON_FRIEND}
              color={color}
              size={size} />
          ),
          headerShown: false,
        }}
        component={FriendRoot}
        name="FriendRoot" />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              name={Global.ICON_SETTING}
              color={color}
              size={size} />
          ),
        }}
        component={SettingScreen}
        name="Setting" />
    </Tab.Navigator>
  )
}

export default BottomTab;