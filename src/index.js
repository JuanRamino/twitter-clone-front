import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import store from './store';
import { loginUserSuccess } from './actions';


// auth token is in localstorage?
let token = localStorage.getItem('token');
if (token !== null) {
  store.dispatch(loginUserSuccess(token));
}

ReactDOM.render((
  <Root store={store}/>
), document.getElementById('container'));