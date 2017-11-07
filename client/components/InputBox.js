import React from 'react';
import axios from 'axios';

export default class InputBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ""};
    this.handleChange = this.handleChange.bind(this);
    this.trumpify = this.trumpify.bind(this);
  }

  trumpify(event) {
    // axios.post(this.props.url)
    console.log(this.state.value);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div>
          <textarea
            rows="5"
            cols="40"
            value={this.state.value}
            onChange={this.handleChange}>
            Input your tweet
          </textarea>
        <button onClick={(e) => this.trumpify(e)}>Trumpify</button>
      </div>
    )
  }
}