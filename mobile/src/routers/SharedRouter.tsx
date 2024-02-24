import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Splash from '@screens/shared/Splash';
import Login from '@screens/auth/Login';
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
        component={Login}
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
