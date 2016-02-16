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

export function loginUser(username, password) {
  return function(dispatch, getState) {
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

// TWEET ACTIONS

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

export function userTweets() {
  return function(dispatch, getState) {
    dispatch(userTweetsRequest());

    const { auth } = getState();
    const options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': auth.token
      }
    };

    return Api.get(`tweets/?userId=${auth.user.id}&stream=profile_timeline`, options)
      .then(json => dispatch(userTweetsSuccess(json.tweets)))
      .catch(ex => dispatch(userTweetsFailure(ex)))
  }
}

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

export function addTweet(tweet) {
  return function(dispatch, getState) {
    dispatch(addTweetRequest());

    const { auth } = getState();
    const options = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': auth.token
      },
      body: JSON.stringify({ tweet })
    };

    return Api.get('tweets', options)
      .then(json => dispatch(addTweetSuccess(json.tweet)))
      .catch(ex => dispatch(addTweetFailure(ex)))
  }
}

export function delTweetRequest(){
  return {
    type: types.DEL_TWEET_REQUEST
  }
}

export function delTweetSuccess(id) {
  return {
    type: types.DEL_TWEET_SUCCESS,
    id
  }
}

export function delTweetFailure(error) {
  return {
    type: types.DEL_TWEET_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function delTweet(tweetId) {
  return function(dispatch, getState) {
    dispatch(delTweetRequest());

    const { auth } = getState();
    const options = {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': auth.token
      }
    };

    return Api.get(`tweets/${tweetId}`, options)
      .then(json => dispatch(delTweetSuccess(tweetId)))
      .catch(ex => dispatch(delTweetFailure(ex)))
  }
}
