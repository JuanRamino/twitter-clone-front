import expect from 'expect';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import * as types from '../src/actionTypes'
import * as actions from '../src/actions';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
  afterEach(() => {
    nock.cleanAll()
  });

  it('loginUserRequest should create LOGIN_USER_REQUEST action', () => {
    expect(actions.loginUserRequest()).toEqual({type: types.LOGIN_USER_REQUEST})
  });

  it('logout should create LOGOUT_USER action', () => {
    expect(actions.logout()).toEqual({type: types.LOGOUT_USER})
  });

  it('loginUserSuccess should create LOGIN_USER_SUCCESS action', () => {

      expect(actions.loginUserSuccess('secret')).toEqual({
          type: types.LOGIN_USER_SUCCESS, 
          payload: {
              token: 'secret'
          }
      })
  });

  it('loginUserFailure should create LOGIN_USER_FAILURE action', () => {

    expect(actions.loginUserFailure({
      response: {
        status: 404,
        statusText: 'Not found'
      }
    })).toEqual({
        type: types.LOGIN_USER_FAILURE, 
        payload: {
            status: 404,
            statusText: 'Not found'
        }
    })
  });

  it('loginUser should create LOGIN_USER_REQUEST and LOGIN_USER_SUCCESS actions when API returns 200', (done) => {
    nock('http://twitter.webabile.it/api')
      .post('/login')
      .reply(200, { token: 'veryLongToken' })

    const expectedActions = [
      { type: types.LOGIN_USER_REQUEST },
      { type: types.LOGIN_USER_SUCCESS, 
        payload: { 
          token: 'veryLongToken'
        }
      } 
    ];

    const store = mockStore({}, expectedActions, done)
    store.dispatch(actions.loginUser())
  });

  it('loginUser should create LOGIN_USER_REQUEST and LOGIN_USER_FAILURE actions when API returns 401', (done) => {
    
    nock('http://twitter.webabile.it/api')
      .post('/login')
      .reply(401)

    const expectedActions = [
        { type: types.LOGIN_USER_REQUEST },
        { type: types.LOGIN_USER_FAILURE,
          payload: {
              status: 401,
              statusText: 'Unauthorized'
          }
        }
    ]

    const store = mockStore({}, expectedActions, done);
    store.dispatch(actions.loginUser());
  });

})
