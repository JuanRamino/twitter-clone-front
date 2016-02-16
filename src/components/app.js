import React, { Component, PropTypes } from 'react';
import * as actionCreators from '../actions';
import SignIn from './sign-in';
import Tweets from './tweets/tweets';


export default class App extends Component {
  render () {
    return (
      <div>
        <SignIn />
        <Tweets />
      </div>
    );
  }
}