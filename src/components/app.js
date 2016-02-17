import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import { POST_SIGN_IN_PATH, POST_SIGN_OUT_PATH } from '../config';


export class App extends Component {
  static PropTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.signOut = this.signOut.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { auth } = this.props;
    const { router } = this.context;

    if (auth.isAuthenticated && !nextProps.auth.isAuthenticated) {
      router.replace(POST_SIGN_OUT_PATH);
    }
    else if (!auth.isAuthenticated && nextProps.auth.isAuthenticated) {
      router.replace(POST_SIGN_IN_PATH);
    }
  }

  signOut() {
    this.props.logout();
    window.location.replace('/');
  }

  render() {
    const { auth, children } = this.props;

    return (
      <div>
        <header className="header row">
          <h2 className="header-title col-md-9">Tweet Clone App </h2>

          <ul className="header-links col-md-3">
            {auth.isAuthenticated ?
              <li><a className="header-link btn btn-primary" onClick={this.signOut} href="javascript:">Sign out</a></li> : null}
          </ul>
        </header>

        <main className="main">{children}</main>
      </div>
    );
  }
}

export default connect(state => ({
  auth: state.auth
}), actionCreators)(App);
