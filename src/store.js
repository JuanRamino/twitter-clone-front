import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { auth } from './reducers'
import createLogger from 'redux-logger';

const rootReducer = combineReducers({
  auth
});

const createStoreWithMiddleware = applyMiddleware(thunk, createLogger());

const store = createStoreWithMiddleware(createStore)(rootReducer);

export default store;