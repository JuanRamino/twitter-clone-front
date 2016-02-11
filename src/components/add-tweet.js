import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';


class AddTweet extends Component {
  constructor(props, context) {
    super(props, context)
    
    this.state = {
      text: this.props.text || ''
    }

    this.saveTweet = this.saveTweet.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  saveTweet(text) {
    let tweet = {
      text: text
    };
    this.props.actions.addTweet(undefined, tweet)
  }

  handleSubmit(e) {
    const text = e.target.value.trim()
    if (e.which === 13) {
      this.saveTweet(text)
      this.setState({ text: '' })
    }
  }

  handleChange(e) {
    this.setState({ text: e.target.value })
  }

  render() {
    return (
      <div className='col-xs-12 col-md-6 col-md-offset-3'>
        <h3>Get Tweets</h3>
        { this.props.statusText ?
          <div className='alert alert-info'>{this.props.statusText}</div> : ''
        }
        <input
          type="text"
          autoFocus="true"
          value={this.state.text}
          onChange={this.handleChange}
          onKeyDown={this.handleSubmit} />
      </div>
    )
  }
}

AddTweet.propTypes = {
  text: PropTypes.string,
  isSaving: PropTypes.bool,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  isSaving: state.addTweet.isSaving,
  statusText: state.addTweet.statusText,
  tweet: state.addTweet.tweet
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTweet);