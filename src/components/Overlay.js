import React from 'react'

class Overlay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    let classes = 'overlay'
    
    if (this.props.overlayToggled) {
      classes = 'overlay opened'
    }
    else {
      classes = 'overlay'
    }

    return (
      <div className={classes} onClick={this.props.onClick}>
        <span>{this.props.overlayText}</span>
      </div>
    )
  }
}

export default Overlay