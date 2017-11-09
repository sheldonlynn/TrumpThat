import React from 'react';

export default class InputBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"input-box " + (this.props.mode === 'input' ? 'show' : 'hide')}>
          <textarea
            maxLength="120"
            value={this.props.input}
            onChange={this.props.handleChange}>
          </textarea>
        <div className="button lvl1" onClick={this.props.trumpify}>TRUMPIFY</div>
      </div>
    )
  }
}