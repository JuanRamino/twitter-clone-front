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

describe('fetch tweets action', () => {
  afterEach(() => {
    nock.cleanAll()
  });

  it('userTweets Request should create USER_TWEETS_REQUEST', () => {
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

  it('userTweets Failure should create USER_TWEETS_FAILURE', () => {
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

  it('userTweets should create USER_TWEETS_REQUEST and USER_TWEETS_SUCCESS actions when API returns 200', (done) => {
    
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

    const store = mockStore({ 
      auth: {
        token: 'token',
        user: { id: 'test' }
      }
    }, expectedActions, done)
    store.dispatch(actions.userTweets())
  });

  it('userTweets should create USER_TWEETS_REQUEST and USER_TWEETS_FAILURE actions when API returns 401', (done) => {

    nock('http://twitter.webabile.it:3000/api')
      .get('/tweets/?userId=test&stream=profile_timeline')
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

    const store = mockStore({
      auth: {
        token: 'token',
        user: { id: 'test' }
      }     
    }, expectedActions, done)
    store.dispatch(actions.userTweets())
  });

});

describe('add tweet action', () => {
  afterEach(() => {
    nock.cleanAll()
  });

  it('addTweetRequest should create ADD_TWEET_REQUEST', () => {
    expect(actions.addTweetRequest()).toEqual({type: types.ADD_TWEET_REQUEST});
  });

  it('addTweetSuccess should create ADD_TWEET_SUCCESS', () => {
    expect(actions.addTweetSuccess(
      'new tweet' 
    )).toEqual({
      type: types.ADD_TWEET_SUCCESS,
      payload: {
        tweet: 'new tweet'
      }
    });
  });

  it('addTweetFailure should create ADD_TWEET_FAILURE', () => {
    expect(actions.addTweetFailure({
      response: {
        status: 404,
        statusText: 'Not found'
      }
    })).toEqual({
      type: types.ADD_TWEET_FAILURE,
      payload: {
        status: 404,
        statusText: 'Not found'
      }
    });
  });

  it('addTweet should create ADD_TWEET_REQUEST and ADD_TWEET_SUCCESS actions when API returns 200', (done) => {
    
    let tweet = { text: 'new tweet', created: 'today', id: 'test' };
    
    nock('http://twitter.webabile.it:3000/api')
      .post('/tweets')
      .reply(200, { tweet })

    const expectedActions = [
      { type: types.ADD_TWEET_REQUEST },
      { type: types.ADD_TWEET_SUCCESS,
        payload: {
          tweet
        }
      }
    ];

    const store = mockStore({
      auth: {
        token: 'token',
        user: { id: 'test' }
      }
    }, expectedActions, done)
    store.dispatch(actions.addTweet(tweet))
  });

  it('addTweet should create ADD_TWEET_REQUEST and ADD_TWEET_FAILURE actions when API returns 401', (done) => {

    nock('http://twitter.webabile.it:3000/api')
      .post('/tweets')
      .reply(401)

    const expectedActions = [
      { type: types.ADD_TWEET_REQUEST },
      { type: types.ADD_TWEET_FAILURE,
        payload: {
          status: 401,
          statusText: 'Unauthorized'
        }
      }
    ];

    const store = mockStore({
      auth: {
        token: 'token',
        user: { id: 'test' }
      }
    }, expectedActions, done)
    store.dispatch(actions.addTweet());
  });

});

describe('delete tweet action', () => {
  afterEach(() => {
    nock.cleanAll()
  });

  it('delTweetRequest should create DEL_TWEET_REQUEST', () => {
    expect(actions.delTweetRequest()).toEqual({type: types.DEL_TWEET_REQUEST});
  });

  it('delTweetSuccess should create DEL_TWEET_SUCCESS', () => {
    expect(actions.delTweetSuccess(
      '1234'
    )).toEqual({
      type: types.DEL_TWEET_SUCCESS,
      id: '1234'
    });
  });

  it('delTweetFailure should create DEL_TWEET_FAILURE', () => {
    expect(actions.delTweetFailure({
      response: {
        status: 404,
        statusText: 'Not found'
      }
    })).toEqual({
      type: types.DEL_TWEET_FAILURE,
      payload: {
        status: 404,
        statusText: 'Not found'
      }
    });
  });

  it('delTweet should create DEL_TWEET_REQUEST and DEL_TWEET_SUCCESS actions when API returns 200', (done) => {
    
    nock('http://twitter.webabile.it:3000/api')
      .delete('/tweets/1234')
      .reply(200, {})

    const expectedActions = [
      { type: types.DEL_TWEET_REQUEST },
      { type: types.DEL_TWEET_SUCCESS, 
        id: '1234'
      }
    ];

    const store = mockStore({
      auth: {
        token: 'token',
        user: { id: 'test' }
      }
    }, expectedActions, done)
    store.dispatch(actions.delTweet('1234'));
  });

  it('delTweet should create DEL_TWEET_REQUEST and DEL_TWEET_FAILURE actions when API returns 401', (done) => {

    nock('http://twitter.webabile.it:3000/api')
      .delete('/tweets/1234')
      .reply(404)

    const expectedActions = [
      { type: types.DEL_TWEET_REQUEST },
      { type: types.DEL_TWEET_FAILURE,
        payload: {
          status: 404,
          statusText: 'Not Found'
        }
      }
    ];

    const store = mockStore({
      auth: {
        token: 'token',
        user: { id: 'test' }
      }
    }, expectedActions, done)
    store.dispatch(actions.delTweet('1234'));
  });

});
