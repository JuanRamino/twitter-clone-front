import { Api } from './utils';
import * as types from './actionTypes';

// AUTH ACTIONS
export function loginUserRequest() {
  return {
    type: types.LOGIN_USER_REQUEST
  }
}

export function loginUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: types.LOGIN_USER_SUCCESS,
    payload: {
      token
    }
  }
}

export function loginUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: types.LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function logout() {
  localStorage.removeItem('token');
  return {
    type: types.LOGOUT_USER
  }
}
/*
export function loginUser(username, password) {
  return function(dispatch) {
    dispatch(loginUserRequest());
    return fetch(API + '/auth/login', {
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
*/

export function loginUser(username, password) {
  return function(dispatch) {
    dispatch(loginUserRequest());

    const options = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    };
    
    return Api.get('auth/login', options)
      .then(json => dispatch(loginUserSuccess(json.token)))
      .catch(ex =>dispatch(loginUserFailure(ex)))
  }
}
// TWWET ACTIONS

export function userTweetsRequest(){
  return {
    type: types.USER_TWEETS_REQUEST
  }
}

export function userTweetsSuccess(tweets) {
  return {
    type: types.USER_TWEETS_SUCCESS,
    payload: {
      tweets
    }
  }
}

export function userTweetsFailure(error) {
  return {
    type: types.USER_TWEETS_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

/*
export function userTweets(token, user) {
  return function(dispatch) {
    dispatch(userTweetsRequest());
    return fetch(`${API}/tweets/?userId=${user.id}&stream=profile_timeline`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      }})
      .then(checkHttpStatus)
      .then(res => res.json())
      .then(json => dispatch(userTweetsSuccess(json.tweets)))
      .catch(ex => dispatch(userTweetsFailure(ex)))
  }
}
*/
export function userTweets(token = localStorage.getItem('token'), user) {
  return function(dispatch) {
    dispatch(userTweetsRequest());

    const options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    };

    return Api.get(`tweets/?userId=${user.id}&stream=profile_timeline`, options)
      .then(json => dispatch(userTweetsSuccess(json.tweets)))
      .catch(ex => dispatch(userTweetsFailure(ex)))
  }
}

/*
types.ADD_TWEET_REQUEST
types.ADD_TWEET_FAILURE
types.ADD_TWEET_SUCCESS
*/



  