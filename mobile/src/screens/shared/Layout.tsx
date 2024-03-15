import React from 'react';
import {ThemeProvider} from '@rneui/themed';
import i18n from '@src-translations';
import {I18nextProvider} from 'react-i18next';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';

import {store, persistor} from '@src-storage';

import SharedRouter from '@src-routers/SharedRouter';

import {theme} from '@src-styles';

function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <SharedRouter />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </I18nextProvider>
    </ThemeProvider>
  );
}

export default Layout;
