import { LOCAL_TOKEN_KEY } from './constant';

export const getToken = () => {
  return localStorage.getItem(LOCAL_TOKEN_KEY);
};

export const saveTokenToLocal = (token: string) => {
  localStorage.setItem(LOCAL_TOKEN_KEY, token);
};

export const clearToken = () => {
  localStorage.removeItem(LOCAL_TOKEN_KEY);
};
