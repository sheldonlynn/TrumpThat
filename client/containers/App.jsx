/*
    ./client/components/App.jsx
 */
import React from 'react';
import axios from 'axios';
import InputBox from '../components/InputBox';
import TrumpHead from '../components/TrumpHead';
import TweetDisplay from '../components/TweetDisplay';
import Navigation from '../components/Navigation';
import About from '../components/About';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {input: "", trumped: "", mode: "input", about: false};

    this.url = process.env.NODE_ENV === 'production' ? 'http://165.227.22.2/api/trumpthat' : 'http://localhost:3001/api/trumpthat';

    this.url = 'http://165.227.22.2/api/trumpthat';

    this.trumpify = this.trumpify.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.resetDisplay = this.resetDisplay.bind(this);
    this.toggleAbout = this.toggleAbout.bind(this);
  }

  trumpify() {
    if (this.state.input.length === 0) return;

    axios.post(this.url, {
      phrase: this.state.input
    })
      .then((res) => {
        console.log(res);
        // if (res.message.trim().length !== 0)
          this.setState({trumped: res.data.message, mode: "display"});
      })
      .catch((err) => {
        console.error(err);
      })
  }

  handleInputChange(e) {
    this.setState({ input: e.target.value });
  }

  resetDisplay() {
    this.setState({mode: "input", trumped: "", input: ""});
  }

  toggleAbout() {
    let ab = !this.state.about;
    this.setState({about: ab});
    console.log(this.state.about, "about");
  }

  render() {
    const mode = this.state.mode;
    const about = this.state.about;
    let display = null;
    let aboutModal = null;

    if (mode === 'input') {
      display = <InputBox
                  trumpify={this.trumpify}
                  input={this.state.input}
                  handleChange={this.handleInputChange}
                  mode={this.state.mode}/>;
    } else {
      display = <TweetDisplay
                  tweet={this.state.trumped}
                  mode={this.state.mode}
                  reset={this.resetDisplay}/>;
    }

     aboutModal = about ? <About /> : null;

    return (
      <div style={{textAlign: 'center'}}>
        <h1>TRUMP THAT TWEET</h1>
        {aboutModal}
        <Navigation about={this.toggleAbout}/>
        <TrumpHead mode={this.state.mode}/>
        {display}
      </div>
    )
  }
}