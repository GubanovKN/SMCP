import React from 'react';
import {ThemeProvider} from '@rneui/themed';
import i18n from '@translations';
import {I18nextProvider} from 'react-i18next';
import {NavigationContainer} from '@react-navigation/native';

import SharedRouter from '@routers/SharedRouter';

import {theme} from '@styles';

function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <NavigationContainer>
          <SharedRouter />
        </NavigationContainer>
      </I18nextProvider>
    </ThemeProvider>
  );
}

export default Layout;
