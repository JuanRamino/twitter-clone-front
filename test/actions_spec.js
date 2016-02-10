import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as types from '../src/actionTypes';
import * as actions from '../src/actions';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('auth actions', () => {

  beforeEach(() => {
    localStorage.removeItem('token');
  });

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
    nock('http://twitter.webabile.it:3000/api/auth')
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
    
    nock('http://twitter.webabile.it:3000/api/auth')
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

});

describe('tweets action', () => {
  afterEach(() => {
    nock.cleanAll()
  });

  it('userTweetsRequest should create USER_TWEETS_REQUEST', () => {
    expect(actions.userTweetsRequest()).toEqual({type: types.USER_TWEETS_REQUEST});
  });

  it('userTweetsSuccess should create USER_TWEETS_SUCCESS', () => {
    expect(actions.userTweetsSuccess([
      'tweet 1',
      'tweet 2' 
    ])).toEqual({
      type: types.USER_TWEETS_SUCCESS,
      payload: {
        tweets: [
          'tweet 1',
          'tweet 2'
      ]}
    });
  });

  it('userTweetsFailure should create USER_TWEETS_FAILURE', () => {
    expect(actions.userTweetsFailure({
      response: {
        status: 404,
        statusText: 'Not found'
      }
    })).toEqual({
      type: types.USER_TWEETS_FAILURE,
      payload: {
        status: 404,
        statusText: 'Not found'
      }
    });
  });

  it(' UserTweets should create USER_TWEETS_REQUEST and USER_TWEETS_SUCCESS actions when API returns 200', (done) => {
    
    nock('http://twitter.webabile.it:3000/api')
      .get('/tweets/?userId=test&stream=profile_timeline')
      .reply(200, { tweets: ['tweet 1', 'tweet 2'] })

    const expectedActions = [
      { type: types.USER_TWEETS_REQUEST },
      { type: types.USER_TWEETS_SUCCESS,
        payload: {
          tweets: ['tweet 1', 'tweet 2']
        }
      }
    ];

    const store = mockStore({}, expectedActions, done)
    store.dispatch(actions.userTweets('token', { id: 'test' }))
  });

  it(' UserTweets should create USER_TWEETS_REQUEST and USER_TWEETS_FAILURE actions when API returns 401', (done) => {

    nock('http://twitter.webabile.it:3000/api')
      .get('/tweets/?userId=wrong&stream=profile_timeline')
      .reply(401)

    const expectedActions = [
      { type: types.USER_TWEETS_REQUEST },
      { type: types.USER_TWEETS_FAILURE,
        payload: {
          status: 401,
          statusText: 'Unauthorized'
        }
      }
    ];

    const store = mockStore({}, expectedActions, done)
    store.dispatch(actions.userTweets('token', { id: 'wrong' }))
  });

});
