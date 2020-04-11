import { CLEAR_USER, RECEIVE_USER } from '../types/user';

export const clearUser = () => ({
  type: CLEAR_USER,
});

export const receiveUser = (data: any) => ({
  type: RECEIVE_USER,
  payload: data,
});
