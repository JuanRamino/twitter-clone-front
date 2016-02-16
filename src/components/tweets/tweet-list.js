import React, { Component, PropTypes } from 'react';
import { TweetItem } from './tweet-item';

export class TweetList extends Component {

  static PropTypes = {
    delTweet: PropTypes.func.isRequired,
    tweets: PropTypes.array.isRequired
  };

  renderTweetItems() {
    const { delTweet, tweets } = this.props;

    return tweets.map((tweet, i) => {
      return <TweetItem
        delTweet={delTweet}
        key={i}
        tweet={tweet}/>
    });
  }

  render() {
    return <div className="task-list">
      { this.renderTweetItems() }
    </div>
  }
}


