import {store, authActions} from '@src-storage';

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE'),
};

type requestOptionsType = {
  method: string;
  headers: any;
  body?: any;
  jsonBody?: boolean;
};

function request(method: string) {
  return (url: string, body?: any, jsonBody = true): Promise<any> => {
    const requestOptions: requestOptionsType = {
      method,
      headers: {},
    };

    requestOptions.headers.Authorization = authHeader(url);
    if (body) {
      if (jsonBody) {
        requestOptions.headers['Content-Type'] = 'application/json';
        requestOptions.body = JSON.stringify(body);
      } else {
        requestOptions.body = body;
      }
    }

    return fetch(url, requestOptions)
      .then(handleResponse)
      .catch(response => {
        if (response === 'Unauthorized') {
          return store
            .dispatch(authActions.refresh())
            .unwrap()
            .then(() => {
              requestOptions.headers.Authorization = authHeader(url);
              return fetch(url, requestOptions).then(handleResponse);
            });
        } else {
          return Promise.reject(response);
        }
      });
  };
}

function authHeader(url: string) {
  const token = authToken();
  const isLoggedIn = !!token;
  const isApiUrl = url;
  if (isLoggedIn && isApiUrl) {
    return `Bearer ${token}`;
  } else {
    return {};
  }
}

function authToken() {
  let token = store.getState().auth.authData?.accessToken;
  return token ? token : null;
}

function handleResponse(response: Response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
