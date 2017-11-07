import React from 'react';
import Typist from 'react-typist';

export default class TweetDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {className: "button display-button lvl1 hidden"};
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({className: "button display-button lvl1"});
    }, (this.props.tweet.length * 70) + 500);
  }

  render() {
    return (
      <div className={"tweet-display " + (this.props.mode === 'display' ? 'display' : '')}>
        <div className="trump-tweet">
          <Typist>
            "{this.props.tweet}"
          </Typist>
        </div>
        <div className={this.state.className} onClick={this.props.reset}>AGAIN</div>
      </div>
    )
  }


}