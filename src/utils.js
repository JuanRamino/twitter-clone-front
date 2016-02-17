import fetch from 'isomorphic-fetch';
import { POST_SIGN_IN_PATH, SIGN_IN_PATH } from './config';

export function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}


export const Api = {
  rootUrl: 'http://twitter.webabile.it:3000/api/',
  get: function(url, options) {
    return fetch(this.rootUrl + url, options)
      .then(checkHttpStatus)
      .then(res => res.json())
  }
}


export function formatDate(date) {
  return new Date(date * 1000).toDateString();
}


export function authRouteResolver(getState) {
  return (nextState, replace) => {
    const { auth } = getState();
    const { pathname } = nextState.location;

    if (!auth.isAuthenticated && pathname !== SIGN_IN_PATH) {
      replace(SIGN_IN_PATH);
    }
    else if (auth.isAuthenticated && pathname !== POST_SIGN_IN_PATH) {
      replace(POST_SIGN_IN_PATH);
    }
  };
}