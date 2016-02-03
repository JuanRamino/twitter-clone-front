import React, { Component, PropTypes } from 'react';
import SignIn from './sign-in';

export default class App extends Component {
  render () {
    return (
      <div className='row'>
        <div className='col-xs-12'>
          <SignIn />
        </div>
      </div>
    );
  }
}