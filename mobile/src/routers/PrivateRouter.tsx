import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '@screens/private/Home';
import Profile from '@screens/private/Profile';

const Tab = createBottomTabNavigator();

function PrivateRouter() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Главная',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons color={color} size={25} name="home" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Профиль',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons color={color} size={25} name="account" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default PrivateRouter;
