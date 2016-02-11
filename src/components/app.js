import React, { Component, PropTypes } from 'react';
import * as actionCreators from '../actions';
import SignIn from './sign-in';
import TweetList from './tweet-list';
import AddTweet from './add-tweet';


export default class App extends Component {
  render () {
    return (
      <div className='row'>
        <div className='col-xs-12'>
          <SignIn />
          <TweetList />
          <AddTweet />
        </div>
      </div>
    );
  }
}