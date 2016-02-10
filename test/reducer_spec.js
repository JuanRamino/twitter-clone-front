import expect from 'expect'
import { auth, tweets } from '../src/reducers'
import * as types from '../src/actionTypes'
import jwt from 'jsonwebtoken';


describe('auth reducer', () => {
  
  const user = { id: 'test', name: 'test' };
  const token = jwt.sign(user, 'secret', { noTimestamp: true });

  const initialState = {
    token: null,
    user: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
  };

  it('should return the initial state', () => {
    expect(
      auth(undefined, {})
    ).toEqual(initialState)
  });

  it('should handle LOGIN_USER_REQUEST', () => {
    expect(
      auth(undefined, {
        type: types.LOGIN_USER_REQUEST
      })
    ).toEqual(Object.assign({}, initialState, {
      isAuthenticating: true
      })
    )
  });

  it('should handle LOGIN_USER_SUCCESS', () => {
    expect(
      auth(undefined, {
        type: types.LOGIN_USER_SUCCESS,
        payload: {
          token: token
        }
      })
    ).toEqual(Object.assign({}, initialState, {
      isAuthenticated: true,
      user: user,
      token: token,
      statusText: 'Logged in'
      })
    )
  });

  it('should handle LOGIN_USER_FAILURE', () => {
    expect(
      auth(undefined, {
        type: types.LOGIN_USER_FAILURE,
        payload: {
          status: 404,
          statusText: 'Not found'
        }
      })
    ).toEqual(Object.assign({}, initialState, {
      statusText: 'Authentication error: 404 Not found'
      })
    )
  });

  it('should handle LOGOUT_USER', () => {
    expect(
      auth(undefined, {
        type: types.LOGOUT_USER
      })
    ).toEqual(Object.assign({}, initialState, {
      statusText: 'Logged out'
      })
    )
  });
});

describe('tweets reducer', () => {

  const initialState = {
    isFetching: false,
    statusText: null,
    data: []
  };

  it('should return the initial state', () => {
    expect(
      tweets(undefined, {})
    ).toEqual(initialState)
  });

  it('should handle USER_TWEETS_REQUEST', () => {
    expect(
      tweets(undefined, {
        type: types.USER_TWEETS_REQUEST
      })
    ).toEqual(Object.assign({}, initialState, {
      isFetching: true
      })
    )
  });

  it('should handle USER_TWEETS_SUCCESS', () => {
    expect(
      tweets(undefined, {
        type: types.USER_TWEETS_SUCCESS,
        payload: {
          tweets: [
            'tweet 1',
            'tweet 2'
          ]
        }
      })
    ).toEqual(Object.assign({}, initialState, {
      statusText: 'Successfully fetched',
      data: [
        'tweet 1',
        'tweet 2'
      ]
    }));
  });

  it('should handle USER_TWEETS_FAILURE', () => {
    expect(
      tweets(undefined, {
        type: types.USER_TWEETS_FAILURE,
        payload: {
          status: 404,
          statusText: 'Not found'
        }
     })
    ).toEqual(Object.assign({}, initialState, {
      statusText: 'Unsuccessfully fetched: 404 Not found'
    }));
  });

});