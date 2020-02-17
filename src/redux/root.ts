import { combineReducers, Reducer } from 'redux';
import { posts } from './reducers/posts';

export const reducer: Reducer<any, any> = combineReducers({ posts });
