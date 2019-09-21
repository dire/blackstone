import React from 'react'

class FilterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: true
    }
  }

  handleClick() {
    this.props.onClick(this.props, this.state)

    this.setState(state => ({
      toggled: !state.toggled,
    }))
  }

  render() {
    const classNames = ['btn']

    if (this.state.toggled === true) {
      classNames.push('selected')
    }

    return (
      <button key={this.props.value} className={classNames.join(' ')} onClick={this.handleClick.bind(this)} value={this.props.enemyName}>
        {this.props.enemyName}
      </button>
    )
  }
}

export default FilterButton
