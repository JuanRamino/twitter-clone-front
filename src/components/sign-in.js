import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

export class SignIn extends Component {

  static PropTypes = {
    isAuthenticating: PropTypes.bool,
    statusText: PropTypes.string,
    loginUser: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props);

    this.login = this.login.bind(this);
  }

  login(event) {
    event.preventDefault();
    this.props.loginUser(this.usernameInput.value, this.passwordInput.value);
  }
  
  renderUsernameInput() {
    return <input 
      autoFocus
      type='text'
      className='form-control input-lg'
      placeholder='test' 
      ref={ node => {
        this.usernameInput = node
      }}/>
  }

  renderPasswordInput() {
    return <input 
      type='password'
      className='form-control input-lg'
      placeholder='test' 
      ref={ node => {
        this.passwordInput = node
      }}/>
  }

  render () {

    const {
      statusText,
      isAuthenticating
    } = this.props;

    return (
      <div className='sign-in'>
        <h3>Sign In</h3>
        { this.props.statusText ?
            <div className='alert alert-info'>{statusText}</div> : ''
        }
        <form role='form' className='form-group'>
          {this.renderUsernameInput()}
          {this.renderPasswordInput()}
          <button 
            type='submit'
            className='btn btn-primary btn-lg'
            disabled={isAuthenticating}
            onClick={this.login}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect(state => ({
  isAuthenticating: state.auth.isAuthenticating,
  statusText: state.auth.statusText
}), actionCreators)(SignIn);
