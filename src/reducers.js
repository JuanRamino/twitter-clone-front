import * as types from './actionTypes';

const initialState = {
    token: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};

export function auth(state = initialState, action) {
  const payload = action.payload;
  
  switch (action.type) {
    
    case types.LOGIN_USER_REQUEST:
      return Object.assign({}, state, {
        isAuthenticating: true,
        statusText: null
      });
    
    case types.LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
        token: payload.token,
        isAuthenticating: false,
        isAuthenticated: true,
        statusText: 'Logged in'
      });

    case types.LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
        token: null,
        isAuthenticating: false,
        isAuthenticated: false,
        statusText: `Authentication error: ${payload.status} ${payload.statusText}`
      });

    case types.LOGOUT_USER:
      return Object.assign({}, state, {
        token: null,
        isAuthenticated: false,
        statusText: 'Logged out'
      });

    default:
      return state;
  }
}