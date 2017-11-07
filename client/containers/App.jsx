/*
    ./client/components/App.jsx
 */
import React from 'react';
import axios from 'axios';
import InputBox from '../components/InputBox';
import TrumpHead from '../components/TrumpHead';
import TweetDisplay from '../components/TweetDisplay';
import { Animate } from 'react-move';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {input: "", trumped: "", displayInput: true};

    this.url = 'http://localhost:3001/api/trumpthat';

    this.trumpify = this.trumpify.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  trumpify() {
    console.log("shit is happening!");
    axios.post(this.url, {
      phrase: this.state.input
    })
      .then((res) => {
        this.setState({trumped: res.data.message, displayInput: false});
      })
      .catch((err) => {
        console.error(err);
      })
  }

  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  Display(props) {
    if (displayInput) {
      return         <InputBox
        trumpify={this.trumpify}
        input={this.state.input}
        handleChange={this.handleChange}
        display={this.state.displayInput}/>;
    } else {
      <TweetDisplay tweet={this.state.trumped} />
    }
  }

  render() {
    const displayInput = this.state.displayInput;
    let display = null;

    if (displayInput) {
      display = <InputBox
        trumpify={this.trumpify}
        input={this.state.input}
        handleChange={this.handleChange}
        display={this.state.displayInput}/>;
    } else {
      display = <TweetDisplay tweet={this.state.trumped} />;
    }

    return (
      <div style={{textAlign: 'center'}}>
        <h1>TRUMP THAT TWEET</h1>
        <TrumpHead />
          {display}
      </div>
    )
  }
}