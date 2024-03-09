import React from 'react';
import {ThemeProvider} from '@rneui/themed';
import {NavigationContainer} from '@react-navigation/native';

import SharedRouter from '@routers/SharedRouter';

import {theme} from '@styles';

function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <SharedRouter />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default Layout;
