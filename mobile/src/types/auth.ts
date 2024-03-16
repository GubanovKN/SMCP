export type SendCodeResponse = {
  repeat: number;
  result: boolean;
};
export type CheckCodeResponse = {
  token: string;
  exist: boolean;
};
export type LoginData = {
  type: 'token' | 'password';
  username?: string;
  usernameMasked?: string;
  privacyPolicy: boolean;
  password?: string;
  newPassword?: string;
  code?: string;
  timeRepeat?: number;
  exist?: boolean;
};
export type LoginResponse = {
  id: string;
  accessToken: string;
  refreshToken: string;
};
export type RegisterData = {
  type: 'all' | 'phone' | 'email';
  lastName: string;
  firstName: string;
  middleName?: string;
  sex?: number;
  email?: string;
  emailToken?: string;
  phone?: string;
  phoneToken?: string;
  password?: string;
};
export type RegisterResponse = {
  id: string;
  accessToken: string;
  refreshToken: string;
};
export type AuthData = {
  accessToken: string;
  refreshToken: string;
};
export type RefreshReponse = {
  accessToken: string;
  refreshToken: string;
};
