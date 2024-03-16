import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import {BASE_URL} from '@src-common/constants';

import {fetchWrapper} from '@src-helpers/fetchWrapper';

import {Info} from '@src-types/user';

const name = 'user';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({name, initialState, reducers, extraReducers});

export const userActions = {...slice.actions, ...extraActions};
export const userReducer = slice.reducer;

export interface userState {
  info: Info | null;
  error?: string;
}

function createInitialState(): userState {
  return {
    info: null,
    error: undefined,
  };
}

function createReducers() {
  return {
    clearInfo,
  };

  function clearInfo(state: userState) {
    state.info = null;
  }
}

function createExtraActions() {
  const baseRoute = `${BASE_URL}/users`;

  return {
    me: me(),
  };

  function me() {
    return createAsyncThunk(
      `${name}/me`,
      async () => await fetchWrapper.get(`${baseRoute}/me`),
    );
  }
}

function createExtraReducers() {
  return (builder: ActionReducerMapBuilder<userState>) => {
    me();

    function me() {
      let {pending, fulfilled, rejected} = extraActions.me;
      builder.addCase(pending, state => {
        state.error = undefined;
      });
      builder.addCase(fulfilled, (state, {payload}: {payload: Info}) => {
        state.info = payload;
      });
      builder.addCase(rejected, (state, action) => {
        state.error = action.error.message;
      });
    }
  };
}
