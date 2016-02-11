import { Api, checkHttpStatus } from './utils';
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


export function userTweets(token = localStorage.getItem('token'), user) {
  return function(dispatch) {
    dispatch(userTweetsRequest());

    let APIroot = 'http://twitter.webabile.it:3000/api'
    return fetch(`${APIroot}/tweets/?userId=${user.id}&stream=profile_timeline`, {
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

/*
export function userTweets(token = localStorage.getItem('token'), userId) {
  return function(dispatch) {
    dispatch(userTweetsRequest());

    const options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    };

    return Api.get(`tweets/?userId=${userId}&stream=profile_timeline`, options)
      .then(json => dispatch(userTweetsSuccess(json.tweets)))
      .catch(ex => dispatch(userTweetsFailure(ex)))
  }
}
*/

export function addTweetRequest(){
  return {
    type: types.ADD_TWEET_REQUEST
  }
}

export function addTweetSuccess(tweet) {
  return {
    type: types.ADD_TWEET_SUCCESS,
    payload: {
      tweet
    }
  }
}

export function addTweetFailure(error) {
  return {
    type: types.ADD_TWEET_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function addTweet(token = localStorage.getItem('token'), tweet) {
  return function(dispatch) {
    dispatch(addTweetRequest());

    const options = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify({ tweet })
    };

    return Api.get('tweets', options)
      .then(json => dispatch(addTweetSuccess(json.tweet)))
      .catch(ex => dispatch(addTweetFailure(ex)))
  }
}
