import expect from 'expect'
import { auth } from '../src/reducers'
import * as types from '../src/actionTypes'

describe('auth reducer', () => {

  const initialState = {
    token: null,
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
          token: 'secret'
        }
      })
    ).toEqual(Object.assign({}, initialState, {
      isAuthenticated: true,
      token: 'secret',
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
