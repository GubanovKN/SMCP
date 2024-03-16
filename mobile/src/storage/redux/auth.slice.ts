import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {BASE_URL, USE_PASSWORD} from '@src-common/constants';

import {fetchWrapper} from '@src-helpers/fetchWrapper';

import {RootState} from '@src-storage';

import {
  SendCodeResponse,
  CheckCodeResponse,
  LoginData,
  RegisterData,
  RegisterResponse,
  AuthData,
  LoginResponse,
  RefreshReponse,
} from '@src-types/auth';

const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({name, initialState, reducers, extraReducers});

export const authActions = {...slice.actions, ...extraActions};
export const authReducer = slice.reducer;

export interface authState {
  loginData: LoginData;
  registerData: RegisterData | null;
  authData: AuthData | null;
  error: string | undefined;
}

function createInitialState(): authState {
  return {
    loginData: {
      type: USE_PASSWORD ? 'password' : 'token',
      privacyPolicy: false,
    },
    registerData: null,
    authData: null,
    error: undefined,
  };
}

function createReducers() {
  return {
    setLoginUsername,
    setLoginPrivacyPolicy,
    setLoginCode,
    setLoginPassword,
    setLoginNewPassword,
    setRegisterData,
    hasError,
    clearError,
  };

  function setLoginUsername(
    state: authState,
    action: PayloadAction<{
      username: string | undefined;
      usernameMasked: string | undefined;
    }>,
  ) {
    state.loginData.username = action.payload.username;
    state.loginData.usernameMasked = action.payload.usernameMasked;
  }

  function setLoginPrivacyPolicy(
    state: authState,
    action: PayloadAction<boolean>,
  ) {
    state.loginData.privacyPolicy = action.payload;
  }

  function setLoginCode(
    state: authState,
    action: PayloadAction<string | undefined>,
  ) {
    state.loginData.code = action.payload;
  }

  function setLoginPassword(
    state: authState,
    action: PayloadAction<string | undefined>,
  ) {
    state.loginData.password = action.payload;
  }

  function setLoginNewPassword(
    state: authState,
    action: PayloadAction<string | undefined>,
  ) {
    state.loginData.newPassword = action.payload;
  }

  function setRegisterData(
    state: authState,
    action: PayloadAction<RegisterData>,
  ) {
    state.registerData = action.payload;
  }

  function hasError(state: authState, action: PayloadAction<string>) {
    state.error = action.payload;
  }

  function clearError(state: authState) {
    state.error = undefined;
  }
}

function createExtraActions() {
  const baseRoute = `${BASE_URL}/users`;

  return {
    sendCode: sendCode(),
    checkCode: checkCode(),
    register: register(),
    login: login(),
    forgot: forgot(),
    refresh: refresh(),
    logout: logout(),
  };

  function sendCode() {
    return createAsyncThunk(
      `${name}/sendCode`,
      async ({type}: {type: 'byphone' | 'byemail'}, {getState}) => {
        let state = getState() as RootState;
        return await fetchWrapper.post(`${baseRoute}/sendcode${type}`, {
          value: state.auth.loginData.username,
        });
      },
    );
  }

  function checkCode() {
    return createAsyncThunk(`${name}/checkCode`, async (arg, {getState}) => {
      let state = getState() as RootState;
      return await fetchWrapper.post(`${baseRoute}/checkcode`, {
        key: state.auth.loginData.username,
        code: state.auth.loginData.code,
      });
    });
  }

  function register() {
    return createAsyncThunk(`${name}/register`, async (arg, {getState}) => {
      let state = getState() as RootState;
      if (state.auth.registerData) {
        return await fetchWrapper.post(
          `${baseRoute}/register`,
          state.auth.registerData,
        );
      } else {
        return Promise.reject('Invalid register data');
      }
    });
  }

  function login() {
    return createAsyncThunk(`${name}/login`, async (arg, {getState}) => {
      let state = getState() as RootState;
      return await fetchWrapper.post(`${baseRoute}/authenticate`, {
        type: state.auth.loginData.type,
        username: state.auth.loginData.username,
        password: state.auth.loginData.password,
      });
    });
  }

  function forgot() {
    return createAsyncThunk(`${name}/forgot`, async (arg, {getState}) => {
      let state = getState() as RootState;
      return await fetchWrapper.post(`${baseRoute}/forget-password`, {
        username: state.auth.loginData.username,
        token: state.auth.loginData.password,
        newPassword: state.auth.loginData.newPassword,
      });
    });
  }

  function refresh() {
    return createAsyncThunk(
      `${name}/refresh-token`,
      async () =>
        await fetchWrapper.post(`${baseRoute}/refresh-token`, {token: null}),
    );
  }

  function logout() {
    return createAsyncThunk(`${name}/logout`, async (arg, {getState}) => {
      let state = getState() as RootState;
      return await fetchWrapper.post(`${baseRoute}/revoke-token`, {
        token: state.auth.authData?.refreshToken,
      });
    });
  }
}

function createExtraReducers() {
  return (builder: ActionReducerMapBuilder<authState>) => {
    sendCode();
    checkCode();
    register();
    login();
    forgot();
    refresh();
    logout();

    function sendCode() {
      let {pending, fulfilled, rejected} = extraActions.sendCode;
      builder.addCase(pending, state => {
        state.error = undefined;
      });
      builder.addCase(
        fulfilled,
        (state, {payload}: {payload: SendCodeResponse}) => {
          state.loginData.timeRepeat = payload.repeat;
        },
      );
      builder.addCase(rejected, (state, action) => {
        state.error = action.error.message;
      });
    }
    function checkCode() {
      let {pending, fulfilled, rejected} = extraActions.checkCode;
      builder.addCase(pending, state => {
        state.error = undefined;
      });
      builder.addCase(
        fulfilled,
        (state, {payload}: {payload: CheckCodeResponse}) => {
          state.loginData.password = payload.token;
          state.loginData.exist = payload.exist;
        },
      );
      builder.addCase(rejected, (state, action) => {
        state.error = action.error.message;
      });
    }
    function register() {
      let {pending, fulfilled, rejected} = extraActions.register;
      builder
        .addCase(pending, state => {
          state.error = undefined;
        })
        .addCase(fulfilled, (state, {payload}: {payload: RegisterResponse}) => {
          state.authData = {
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
          };
        })
        .addCase(rejected, (state, action) => {
          state.error = action.error.message;
        });
    }
    function login() {
      let {pending, fulfilled, rejected} = extraActions.login;
      builder
        .addCase(pending, state => {
          state.error = undefined;
        })
        .addCase(fulfilled, (state, {payload}: {payload: LoginResponse}) => {
          state.authData = {
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
          };
        })
        .addCase(rejected, (state, action) => {
          state.error = action.error.message;
        });
    }

    function forgot() {
      let {pending, fulfilled, rejected} = extraActions.forgot;
      builder
        .addCase(pending, state => {
          state.error = undefined;
        })
        .addCase(fulfilled, state => {
          state.loginData.timeRepeat = undefined;
          state.loginData.code = undefined;
          state.loginData.password = undefined;
          state.loginData.newPassword = undefined;
        })
        .addCase(rejected, (state, action) => {
          state.error = action.error.message;
        });
    }

    function refresh() {
      let {pending, fulfilled, rejected} = extraActions.refresh;
      builder
        .addCase(pending, state => {
          state.error = undefined;
        })
        .addCase(fulfilled, (state, {payload}: {payload: RefreshReponse}) => {
          state.authData = {
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
          };
        })
        .addCase(rejected, (state, action) => {
          state.error = action.error.message;
          state.loginData = {
            type: state.loginData.type,
            privacyPolicy: false,
          };
          state.registerData = null;
          state.authData = null;
        });
    }

    function logout() {
      let {pending, fulfilled, rejected} = extraActions.logout;
      builder
        .addCase(pending, state => {
          state.error = undefined;
        })
        .addCase(fulfilled, state => {
          state.loginData = {
            type: state.loginData.type,
            privacyPolicy: false,
          };
          state.registerData = null;
          state.authData = null;
        })
        .addCase(rejected, (state, action) => {
          state.error = action.error.message;
        });
    }
  };
}
