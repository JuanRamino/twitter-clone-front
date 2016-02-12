import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers} from 'redux';
import { auth, tweets } from './reducers'
import createLogger from 'redux-logger';

const rootReducer = combineReducers({
  auth,
  tweets 
});

const createStoreWithMiddleware = applyMiddleware(thunk, createLogger());

const store = createStoreWithMiddleware(createStore)(rootReducer);

export default store;