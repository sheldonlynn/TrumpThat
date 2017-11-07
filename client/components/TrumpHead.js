const head = require('../public/images/trump.gif');
import React from 'react';

export default class TrumpHead extends React.Component {
  render() {
    return (
      <div className={"trump-head " + (this.props.mode === 'display' ? 'display' : '')}>
        <img src={head} id="trump-gif"/>
      </div>
    )
  }
}

