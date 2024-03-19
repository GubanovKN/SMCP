import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const name = 'settings';
const initialState = createInitialState();
const reducers = createReducers();
const slice = createSlice({name, initialState, reducers});

export const settingsActions = {...slice.actions};
export const settingsReducer = slice.reducer;

export interface settingsState {
  language: string;
  theme: 'light' | 'dark';
}

function createInitialState(): settingsState {
  return {
    language: 'en',
    theme: 'light',
  };
}

function createReducers() {
  return {
    setLanguage,
    setTheme,
  };

  function setLanguage(state: settingsState, action: PayloadAction<string>) {
    state.language = action.payload;
  }

  function setTheme(
    state: settingsState,
    action: PayloadAction<'light' | 'dark'>,
  ) {
    state.theme = action.payload;
  }
}
