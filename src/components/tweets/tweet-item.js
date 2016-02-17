import React, { Component, PropTypes } from 'react';
import { formatDate } from '../../utils';

export class TweetItem extends Component {
  static propTypes = {
    delTweet: PropTypes.func.isRequired,
    tweet: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.delete = this.delete.bind(this);
  }

  delete() {
    this.props.delTweet(this.props.tweet.id)
  }

  render() {
    const { tweet } = this.props;

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <span>{ formatDate(tweet.created) }</span>
          <button 
            type="button"
            className="btn btn-danger"
            onClick={this.delete}>
            X
          </button>
        </div>
        <div className="panel-body">
          { this.props.tweet.text }
        </div>
      </div>
    )
  }
}