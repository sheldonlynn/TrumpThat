import React from 'react';
import Typist from 'react-typist';

export default class TweetDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {className: "button display-button lvl1 hidden"};
    this.cursorProps = {
      show: true,
      blink: true,
      element: '|',
      hideWhenDone: true,
      hideWhenDoneDelay: 0
    }
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({className: "button display-button lvl1"});
    }, (this.props.tweet.length * 30) + 500);
  }

  render() {
    return (
      <div className={"tweet-display " + (this.props.mode === 'display' ? 'display' : '')}>
        <div className="trump-tweet">
          <Typist
            avgTypingDelay={30}
            cursor={this.cursorProps}
            >
            "{this.props.tweet.trim()}"
          </Typist>
        </div>
        <div className="display-buttons">
          <div className={this.state.className} onClick={this.props.shareTweet}>TWEET</div>
          <div className={this.state.className} onClick={this.props.reset}>AGAIN</div>
        </div>
      </div>
    )
  }


}