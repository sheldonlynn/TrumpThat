import React from 'react';

export default class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="about-dialog">
        <div className="about-dialog__close" onClick={this.props.about}>X</div>
        <div className="about-dialog__line">Enter any sentence to generate your own Trump tweet. Hilarity ensues!</div>
        <div className="about-dialog__line">Have a Trumptastic day.</div>
        <div className="about-dialog__line">
          Find me on Instagram: <a target="_blank" href="http://instagram.com/sheldon">@sheldon</a>
        </div>
      </div>
    )
  }
}