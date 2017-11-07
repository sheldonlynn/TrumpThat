import React from 'react';
import Typist from 'react-typist';

export default class TweetDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="tweet-display">
        <div className="trump-tweet">
          <Typist>
            {this.props.tweet}
          </Typist>
        </div>
      </div>
    )
  }


}