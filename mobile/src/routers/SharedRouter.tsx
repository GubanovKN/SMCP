import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {useThemeMode} from '@rneui/themed';

import {useAppSelector} from '@src-storage';

import Splash from '@src-screens/shared/Splash';
import ChooseLanguage from '@src-screens/shared/ChooseLanguage';
import LoginPhone from '@src-screens/auth/LoginPhone';
import LoginPhonePassword from '@src-screens/auth/LoginPhonePassword';
import LoginEmail from '@src-screens/auth/LoginEmail';
import LoginEmailPassword from '@src-screens/auth/LoginEmailPassword';
import SendCodePhone from '@src-screens/auth/SendCodePhone';
import SendCodeEmail from '@src-screens/auth/SendCodeEmail';
import Code from '@src-screens/auth/Code';
import NewPassword from '@src-screens/auth/NewPassword';
import Register from '@src-screens/auth/Register';
import PrivateRouter from '@src-routers/PrivateRouter';

const Stack = createStackNavigator();

function SharedRouter() {
  const {i18n} = useTranslation();
  const {mode, setMode} = useThemeMode();
  const {language, theme} = useAppSelector(state => state.settings);

  useEffect(() => {
    i18n.changeLanguage(language);
    if (mode !== theme) {
      setMode(theme);
    }
  }, [i18n, language, setMode, mode, theme]);

  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{gestureEnabled: false, headerShown: false}}
      />
      <Stack.Screen
        name="ChooseLanguage"
        component={ChooseLanguage}
        options={{gestureEnabled: false, headerShown: false}}
      />
      <Stack.Screen
        name="LoginPhone"
        component={LoginPhone}
        options={{gestureEnabled: false, headerShown: false}}
      />
      <Stack.Screen
        name="LoginPhonePassword"
        component={LoginPhonePassword}
        options={{gestureEnabled: false, headerShown: false}}
      />
      <Stack.Screen
        name="LoginEmail"
        component={LoginEmail}
        options={{gestureEnabled: false, headerShown: false}}
      />
      <Stack.Screen
        name="LoginEmailPassword"
        component={LoginEmailPassword}
        options={{gestureEnabled: false, headerShown: false}}
      />
      <Stack.Screen
        name="SendCodePhone"
        component={SendCodePhone}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SendCodeEmail"
        component={SendCodeEmail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Code"
        component={Code}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewPassword"
        component={NewPassword}
        options={{gestureEnabled: false, headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{gestureEnabled: false, headerShown: false}}
      />
      <Stack.Screen
        name="PrivateRouter"
        component={PrivateRouter}
        options={{gestureEnabled: false, headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default SharedRouter;
