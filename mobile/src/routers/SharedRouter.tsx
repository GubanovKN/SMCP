import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Splash from '@screens/shared/Splash';
import LoginPhone from '@screens/auth/LoginPhone';
import Code from '@screens/auth/Code';
import Register from '@screens/auth/Register';
import PrivateRouter from '@routers/PrivateRouter';

const Stack = createStackNavigator();

function SharedRouter() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginPhone}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Code"
        component={Code}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PrivateRouter"
        component={PrivateRouter}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default SharedRouter;
