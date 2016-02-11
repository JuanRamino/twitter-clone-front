import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

class TweetList extends Component {

  constructor(props, context) {
    super(props);

    this.fetchTweets = this.fetchTweets.bind(this);
  }

  componentWillMount() {
    this.fetchTweets();
  }

  fetchTweets(event) {
    if (event) event.preventDefault();
    this.props.actions.userTweets(undefined, this.props.user);
  }
  
  renderTweets() {
    return this.props.data.map(tweet => {
      return <p>{tweet.text}</p>
    });
  }

  render() {
    return (
      <div className='col-xs-12 col-md-6 col-md-offset-3'>
        <h3>Get Tweets</h3>
        { this.props.statusText ?
            <div className='alert alert-info'>{this.props.statusText}</div> : ''
        }
        <button 
          type='submit'
          className='btn btn-lg'
          onClick={this.fetchTweets}>
          get tweets
        </button>
        {this.renderTweets()}
      </div>
    );
  }
}

TweetList.propTypes = {
  isFetching: PropTypes.bool,
  statusText: PropTypes.string,
  actions: PropTypes.object.isRequired,
  data: React.PropTypes.array,
  user: PropTypes.object
}

const mapStateToProps = (state) => ({
  isFetching: state.tweets.isFetching,
  statusText: state.tweets.statusText,
  data: state.tweets.data,
  user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(TweetList);
