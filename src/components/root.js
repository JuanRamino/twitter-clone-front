import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import { SIGN_IN_PATH, TWEETS_PATH } from '../config';
import App from './app';
import SignIn from './sign-in';
import Tweets from './tweets/tweets';

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    onEnter: PropTypes.func.isRequired
  };

  render() {
    const { store, history, onEnter } = this.props;

    return (
      <Provider store={store}>
        <Router history={history}>
        <Route component={App} onEnter={onEnter} path="/">
            <Route component={SignIn} path={SIGN_IN_PATH}/>
            <Route component={Tweets} path={TWEETS_PATH}/>
          </Route>
        </Router>
      </Provider>
    );
  }
}
