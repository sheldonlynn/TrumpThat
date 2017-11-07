/*
    ./client/components/App.jsx
 */
import React from 'react';
import InputBox from '../components/InputBox';
const image = require('../public/images/trump.gif');

export default class App extends React.Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <img src={image} />
        <h1>Trump That Tweet</h1>
        <InputBox url='http://localhost:3001/api/trumpthat'/>
      </div>
    )
  }
}