import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

class SignIn extends Component {

  constructor(props, context) {
    super(props);

    this.login = this.login.bind(this);
  }

  login(event) {
    event.preventDefault();
    this.props.actions.loginUser(this.usernameInput.value, this.passwordInput.value);
  }
  
  renderUsernameInput() {
    return <input 
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
    return (
      <div className='col-xs-12 col-md-6 col-md-offset-3'>
        <h3>Sign In</h3>
        { this.props.statusText ?
            <div className='alert alert-info'>{this.props.statusText}</div> : ''
        }
        <form role='form'>
          <div className='form-group'>
            {this.renderUsernameInput()}
            {this.renderPasswordInput()}
          </div>
          <button 
            type='submit'
            className='btn btn-lg'
            disabled={this.props.isAuthenticating}
            onClick={this.login}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

SignIn.propTypes = {
  isAuthenticating: PropTypes.bool,
  statusText: PropTypes.string,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  isAuthenticating: state.auth.isAuthenticating,
  statusText: state.auth.statusText
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
