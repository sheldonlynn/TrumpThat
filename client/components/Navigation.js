import React from 'react';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="nav">
        <span className="span-link" onClick={this.props.about}>About</span>
        <a target='_blank' href='https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=K4L5HYRG63X2A'>Donate</a>
      </div>
    )
  }
}