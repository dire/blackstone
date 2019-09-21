import React, {Component} from 'react'
import EnemyData from '../data/enemies.json'
import BehaviourData from '../data/enemy-actions.json'
import Overlay from './Overlay'

export default class Behaviours extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: EnemyData,
      behaviourData: BehaviourData,
      overlayToggled: false,
      overlayText: '',
      overlayActionIndex: ''
    }

    this.closeBehaviourTooltip = this.closeBehaviourTooltip.bind(this)
  }

  rollColumn() {
    return <div className="roll-number-list">
      <div className="roll-value">1-3</div>
      <div className="roll-value">4-6</div>
      <div className="roll-value">7-9</div>
      <div className="roll-value">10-12</div>
      <div className="roll-value">13-15</div>
      <div className="roll-value">16-19</div>
      <div className="roll-value">20</div>
    </div>
  }

  getBehaviourFromRoll(roll) {
    let filters = this.props.selectedEnemies
    let enemies = this.state.items.filter(function(enemy) {
      return filters.includes(enemy.name)
    })

    let behaviourIndex = 0

    switch(roll) {
      case 1:
      case 2:
      case 3:
        behaviourIndex = 1
        break
      case 4:
      case 5:
      case 6:
        behaviourIndex = 2
        break
      case 7:
      case 8:
      case 9:
        behaviourIndex = 3
        break
      case 10:
      case 11:
      case 12:
        behaviourIndex = 4
        break
      case 13:
      case 14:
      case 15:
        behaviourIndex = 5
        break
      case 16:
      case 17:
      case 18:
      case 19:
        behaviourIndex = 6
        break
      case 20:
        behaviourIndex = 7
        break
      default:
        behaviourIndex = 1
    }

    return (
      enemies.map((enemy, index) => (
        <div className="roll-result-actions box" key={`${enemy}${index}`}>
          <h3>{enemy.name}</h3>
          <div className="enemy-info">
            <span>Move: {enemy.move}</span>
            <span>Wound: {enemy.wound_value}</span>
            <span>Size: {enemy.size}</span>
          </div>
          <div className="behaviour-tables">
            {this.behaviourTable(enemy, index, roll, behaviourIndex)}
          </div>
        </div>
      ))
    )
  }

  toggleBehaviourTooltip(behaviour, enemy, actionIndex) {
    let data = this.state.behaviourData
    let behaviourInfo = data.find(item => item.name === behaviour)

    if (actionIndex === this.state.overlayActionIndex) {
      this.setState(state => ({
        overlayToggled: false,
        overlayActionIndex: '',
        overlayText: ''
      }))
    }
    else if (this.state.overlayText === behaviourInfo.simple_description) {
      this.setState(state => ({
        overlayActionIndex: actionIndex
      }))
    }
    else {
      this.setState(state => ({
        overlayToggled: true,
        overlayText: behaviourInfo.simple_description,
        overlayActionIndex: actionIndex
      }))
    }
  }

  closeBehaviourTooltip() {
    this.setState({
      overlayToggled: false,
      overlayText: '',
      overlayActionIndex: ''
    })
  }

  behaviourTable(enemy, enemyIndex, roll, behaviourIndex) {
    return (
      <div key={`${enemy.name}${enemyIndex}`} className="enemy-behaviour-table">
        {
          enemy.behaviours.map((enemyStates, stateIndex) => (
            <div className="enemy-table" key={`${stateIndex}`}>
              <div className="roll-number-section">
                <div className="column-title"><h4>Roll</h4></div>
                {this.rollColumn()}
              </div>
              <div className="status-section">
                {Object.keys(enemyStates).map((enemyStatus, statusIndex) => (
                  <div className="status-column" key={`${statusIndex}`}>
                    <div className="column-title"><h4>{enemyStatus}</h4></div>
                    {Object.keys(enemy.behaviours[stateIndex][enemyStatus]).map((action, actionIndex) => (
                      <div className={(behaviourIndex === actionIndex + 1) ? 'roll-action highlighted' : 'roll-action'} key={`${enemy.name}${enemyStatus}${actionIndex}`}>
                        <span onClick={(e) => this.toggleBehaviourTooltip(enemy.behaviours[stateIndex][enemyStatus][action], enemy, enemy.name + enemyStatus + actionIndex)}>{enemy.behaviours[stateIndex][enemyStatus][action]}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))
        }
      </div>
    )
  }

  render() {
    return (
      <div>
        <Overlay overlayToggled={this.state.overlayToggled} overlayText={this.state.overlayText} onClick={this.closeBehaviourTooltip}/>
        <div className="behaviour-results">
          {this.getBehaviourFromRoll(this.props.roll)}
        </div>
      </div>
    )
  }
}