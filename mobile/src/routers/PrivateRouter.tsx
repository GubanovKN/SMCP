import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '@screens/private/Home';
import Favorite from '@screens/private/Favorite';
import Messages from '@screens/private/Messages';
import Profile from '@screens/private/Profile';

import {useTabBarStyles} from '@styles';

const Tab = createBottomTabNavigator();

function PrivateRouter() {
  const {theme} = useTheme();
  const tabBarStyles = useTabBarStyles();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.black,
        tabBarStyle: tabBarStyles.tab,
        tabBarBadgeStyle: tabBarStyles.badge,
      }}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Главная',
          tabBarLabel: 'Главная',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              color={color}
              size={25}
              name="home-outline"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          title: 'Избранное',
          tabBarLabel: 'Избранное',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              color={color}
              size={25}
              name="heart-outline"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          title: 'Сообщения',
          tabBarLabel: 'Сообщения',
          tabBarBadge: 3,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              color={color}
              size={25}
              name="message-outline"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Профиль',
          tabBarLabel: 'Профиль',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              color={color}
              size={25}
              name="account-outline"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default PrivateRouter;
