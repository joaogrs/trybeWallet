import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';

const rootReducer = combineReducers({ user });

export const store = createStore(rootReducer, composeWithDevTools());

export default rootReducer;
