const headAnimated = require('../public/images/trump.gif');
const headStill = require('../public/images/trump-still.gif');
import React from 'react';

export default class TrumpHead extends React.Component {
  render() {
    let displayMode = this.props.mode === 'display';
    return (
      <div className={"trump-head " + (displayMode ? 'display' : '')}>
        <img src={displayMode ? headStill : headAnimated} id="trump-gif"/>
      </div>
    )
  }
}

