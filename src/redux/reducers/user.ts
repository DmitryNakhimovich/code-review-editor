import { CLEAR_USER, RECEIVE_USER } from '../types/user';

export interface IUserState {
  username?: string;
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
