import React from 'react';
import { Animate } from 'react-move';

const inputStyle = {

}

export default class InputBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"input-box " + (this.props.display ? 'show' : 'hide')}>
          <textarea
            maxLength="120"
            value={this.props.input}
            onChange={this.props.handleChange}>
          </textarea>
        <button className="trump-button" onClick={this.props.trumpify}>Trumpify</button>
      </div>
    )
  }
}