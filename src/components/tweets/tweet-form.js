import React, { Component, PropTypes } from 'react';

export class TweetForm extends Component {
  
  static PropTypes = {
    addTweet: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context)
    
    this.state = {
      text: this.props.text || ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  clearInput() {
    this.setState({ text: '' });
  }

  handleSubmit(e) {
    if (e.which === 13) {
      e.preventDefault();
      let tweet = {
        text: this.state.text.trim()
      };

      this.props.addTweet(tweet)
      this.clearInput();
    }
  }

  handleChange(e) {
    this.setState({ text: e.target.value })
  }

  render() {
    return (
      <form className="form-group" onSubmit={this.handleSubmit} noValidate>
        <label>Add a tweet</label>
        <input
          type="text"
          className="form-control"
          autoFocus
          maxLength="140"
          placeholder="Be nice"
          value={this.state.text}
          onChange={this.handleChange}
          onKeyDown={this.handleSubmit} />
      </form>
    )
  }
}
