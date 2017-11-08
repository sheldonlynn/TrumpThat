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
    this.state = {input: "", trumped: "", mode: "input"};

    this.url = process.env.NODE_ENV === 'production' ? 'http://165.227.22.2/api/trumpthat' : 'http://localhost:3001/api/trumpthat';

    this.url = 'http://165.227.22.2/api/trumpthat';

    this.trumpify = this.trumpify.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resetDisplay = this.resetDisplay.bind(this);
  }

  trumpify() {
    console.log("shit is happening!");
    axios.post(this.url, {
      phrase: this.state.input
    })
      .then((res) => {
        this.setState({trumped: res.data.message, mode: "display"});
      })
      .catch((err) => {
        console.error(err);
      })
  }

  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  resetDisplay() {
    this.setState({mode: "input", trumped: "", input: ""});
  }

  render() {
    const mode = this.state.mode;
    let display = null;

    if (mode === 'input') {
      display = <InputBox
                  trumpify={this.trumpify}
                  input={this.state.input}
                  handleChange={this.handleChange}
                  mode={this.state.mode}/>;
    } else {
      display = <TweetDisplay
                  tweet={this.state.trumped}
                  mode={this.state.mode}
                  reset={this.resetDisplay}/>;
    }

    return (
      <div style={{textAlign: 'center'}}>
        <h1>TRUMP THAT TWEET</h1>
        <TrumpHead mode={this.state.mode}/>
          {display}
      </div>
    )
  }
}