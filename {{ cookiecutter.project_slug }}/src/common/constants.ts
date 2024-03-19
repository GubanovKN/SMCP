import {ENV_BASE_URL, ENV_LOGIN_TYPE, ENV_USE_PASSWORD} from '@env';

export const BASE_URL: string = ENV_BASE_URL;
export const LOGIN_TYPE: 'phone' | 'email' = ENV_LOGIN_TYPE;
export const USE_PASSWORD: boolean = ENV_USE_PASSWORD === 'yes';
