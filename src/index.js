import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router'
import { syncHistory, routeReducer } from 'react-router-redux'
import { auth, tweets } from './reducers'
import Root from './components/root';
import { authRouteResolver } from './utils';
import { loginUserSuccess } from './actions';

const rootReducer = combineReducers({
  auth,
  tweets,
  routing: routeReducer
});

const reduxRouterMiddleware = syncHistory(browserHistory);
const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(thunk, loggerMiddleware, reduxRouterMiddleware)(createStore);
const store = createStoreWithMiddleware(rootReducer);

// Init Auth Action
const token = localStorage.getItem('token');
if (token !== null) {
  store.dispatch(loginUserSuccess(token));
}

// Rendering
ReactDOM.render((
  <Root 
    history = {browserHistory}
    onEnter={authRouteResolver(store.getState)}
    store={store}/>
), document.getElementById('container'));