import {checkHttpStatus} from './utils';
import * as types from './actionTypes';
import fetch from 'isomorphic-fetch';

export function loginUserRequest() {
  return {
    type: types.LOGIN_USER_REQUEST
  }
}

export function loginUserSuccess(token) {
  return {
    type: types.LOGIN_USER_SUCCESS,
    payload: {
      token: token
    }
  }
}

export function loginUserFailure(error) {
  return {
    type: types.LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function logout() {
  return {
    type: types.LOGOUT_USER
  }
}

export function loginUser(username, password) {
  return function(dispatch) {
    dispatch(loginUserRequest());
    return fetch('http://twitter.webabile.it:3000/api/auth/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
        })
        .then(checkHttpStatus)
        .then(res => res.json())
        .then(json => dispatch(loginUserSuccess(json.token)))
        .catch(ex => dispatch(loginUserFailure(ex)))
  }
}

  