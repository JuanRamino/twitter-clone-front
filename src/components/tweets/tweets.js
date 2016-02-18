import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { TweetList } from './tweet-list';
import { TweetForm } from './tweet-form';
import * as actionCreators from '../../actions';


export class Tweets extends Component {
  
  static PropTypes = {
    delTweet: PropTypes.func.isRequired,
    addTweet: PropTypes.func.isRequired,
    tweets: PropTypes.array.isRequired,
    statusText: PropTypes.string,
    userTweets: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.userTweets();
  }

  render() {
    const {
      delTweet,
      addTweet,
      tweets,
      statusText
    } = this.props;

    return (
      <div className='tweets'>
        <h3>Tweets</h3>
        { statusText ?
          <div className='alert alert-info'>{statusText}</div> : ''
        }
        <TweetForm
          addTweet={addTweet}
        />
        <TweetList
          delTweet={delTweet}
          tweets={tweets}
        />
      </div>
    );
  }
}

export default connect(state => ({
  tweets: state.tweets.data,
  statusText: state.tweets.statusText
}), actionCreators)(Tweets);
