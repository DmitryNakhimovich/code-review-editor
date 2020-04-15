import { CLEAR_USER, RECEIVE_USER } from '../types/user';
import { ReduxState } from 'ra-core';

export interface IAppState extends ReduxState {
  user: IUserState;
}

export interface IUserState {
  username: string;
  [key: string]: any;
}

const initialState: IUserState = {
  username: '',
};

export const user = (state = initialState, action: any) => {
  switch (action.type) {
    case RECEIVE_USER:
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_USER:
      return {
        username: '',
      };
    default:
      return state;
  }
};
