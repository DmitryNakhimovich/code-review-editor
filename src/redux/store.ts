import { Action, applyMiddleware, createStore, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer } from './root';

export const store: Store<{}, Action> = createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
