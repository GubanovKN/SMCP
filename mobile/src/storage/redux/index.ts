import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import {authReducer} from './auth.slice';

import {sharedStorage, privateStorage} from '@src-storage-mmkv';
import {settingsReducer} from './settings.slice';

const persistConfigAuth = {
  key: 'auth',
  storage: privateStorage,
  whitelist: ['authData'],
};

const persistConfigSettings = {
  key: 'settings',
  storage: sharedStorage,
};

const persistedAuthReducer = persistReducer(persistConfigAuth, authReducer);
const persistedSettingsReducer = persistReducer(
  persistConfigSettings,
  settingsReducer,
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    settings: persistedSettingsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export * from './auth.slice';
export * from './settings.slice';
