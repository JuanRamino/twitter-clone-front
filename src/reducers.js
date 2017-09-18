import * as types from './actionTypes';
import jwtDecode from 'jwt-decode';

const authInitialState = {
    token: null,
    user: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};

// AUTH REDUCER
export function auth(state = authInitialState, action) {
  const payload = action.payload;
  
  switch (action.type) {
    
    case types.LOGIN_USER_REQUEST:
      return {
        ...state,
        isAuthenticating: true,
        statusText: null
      };
    
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        token: payload.token,
        user: jwtDecode(payload.token),
        isAuthenticating: false,
        isAuthenticated: true,
        statusText: 'Logged in'
      };

    case types.LOGIN_USER_FAILURE:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticating: false,
        isAuthenticated: false,
        statusText: `Authentication error: ${payload.status} ${payload.statusText}`
      };

    case types.LOGOUT_USER:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        statusText: 'Logged out'
      };

    default:
      return state;
  }
}
  
const tweetsInitialState = {
  isFetching: false,
  isSaving: false,
  isDeleting: false,
  statusText: null,
  data: []
};

// TWEET REDUCER
export function tweets(state = tweetsInitialState, action) {
  const payload = action.payload;
  
  switch (action.type) {

    case types.USER_TWEETS_REQUEST:
      return {
        ...state,
        isFetching: true,
        statusText: null
      };

    case types.USER_TWEETS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        statusText: 'Successfully fetched',
        data: payload.tweets
      };
    
    case types.USER_TWEETS_FAILURE:
      return {
        ...state,
        isFetching: false,
        statusText: `Unsuccessfully fetched: ${payload.status} ${payload.statusText}`
      };

    case types.ADD_TWEET_REQUEST:
      return {
        ...state,
        isSaving: true,
        statusText: null
      };

    case types.ADD_TWEET_SUCCESS:
      return {
        ...state,
        isSaving: false,
        statusText: 'Successfully saved',
        data: [ payload.tweet, ...state.data ]
      };
    
    case types.ADD_TWEET_FAILURE:
      return {
        ...state,
        isSaving: false,
        statusText: `Unsuccessfully saved: ${payload.status} ${payload.statusText}`
      };

    case types.DEL_TWEET_REQUEST:
      return {
        ...state,
        isDeleting: true,
        statusText: null
      };

    case types.DEL_TWEET_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        statusText: 'Successfully deleted',
        data: state.data.filter(tweet => {
          return tweet.id !== action.id
        })
      };
    
    case types.DEL_TWEET_FAILURE:
      return {
        ...state,
        isDeleting: false,
        statusText: `Unsuccessfully deleted: ${payload.status} ${payload.statusText}`
      };

    default:
      return state;

  }
}
