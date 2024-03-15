import React, {useEffect} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '@src-screens/private/Home';
import Favorite from '@src-screens/private/Favorite';
import Messages from '@src-screens/private/Messages';
import Profile from '@src-screens/private/Profile';

import {useAppSelector} from '@src-storage';

import {useTabBarStyles} from '@src-styles';

import {TabNavigationParamList} from '@src-types/navigation';

type Props = NativeStackNavigationProp<TabNavigationParamList, 'Favorite'>;

const Tab = createBottomTabNavigator();

function PrivateRouter({navigation}: Props & any) {
  const {t} = useTranslation('privateRouter');
  const {theme} = useTheme();
  const {authData} = useAppSelector(state => state.auth);
  const tabBarStyles = useTabBarStyles();

  useEffect(() => {
    if (!authData) {
      navigation.replace('Splash');
    }
  }, [authData, navigation]);

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
          title: t('home.title'),
          tabBarLabel: t('home.tabBarLabel'),
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
          title: t('favorite.title'),
          tabBarLabel: t('favorite.tabBarLabel'),
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
          title: t('messages.title'),
          tabBarLabel: t('messages.tabBarLabel'),
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
          title: t('profile.title'),
          tabBarLabel: t('profile.tabBarLabel'),
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
