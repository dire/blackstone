import React, {Component} from 'react'
import Behaviours from './Behaviours'
import FilterButton from './filter-button'
import EnemyData from '../data/enemies.json'

export default class CombatBoard extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.onClickEnemySelect = this.onClickEnemySelect.bind(this)
    this.enemyData = EnemyData
    this.state = { 
      roll: 1,
      selectedEnemies: []
    }
    this.selectAllEnemies = this.selectAllEnemies.bind(this)
  }

  componentDidMount(){
    this.selectAllEnemies()
  }

  selectAllEnemies() {
    let arrayOfEnemies = []
    
    EnemyData.map((enemy) => (
      arrayOfEnemies.push(enemy.name)
    ))

    this.setState({selectedEnemies: arrayOfEnemies})
  }

  handleClick() {
    const rand = Math.floor(Math.random() * 20 + 1)
    this.setState({ roll: rand })
  }

  onClickEnemySelect (props, state) {
    const currentSelection = this.state.selectedEnemies
    let newSelectedEnemies = currentSelection

    if (!state.toggled) {
      newSelectedEnemies = [...currentSelection, props.enemyName]
    } else {
      let index = newSelectedEnemies.indexOf(props.enemyName)
      newSelectedEnemies.splice(index, 1)
    }

    this.setState(({
      selectedEnemies: newSelectedEnemies
    }))
  }
  
  filterList() {
    let enemies = this.enemyData

    return(
      enemies.map((enemy, i) => (
        <FilterButton
        key={i}
        onClick={this.onClickEnemySelect.bind()}
        enemyName={enemy.name}/>
      ))
    )
  }

  render() {
    return (
      <div className="combat-board">
        <h3>Roll the Blackstone die</h3>
        <button className="d20 hex" onClick={this.handleClick.bind(this)}><span>{this.state.roll}</span></button>
        <div className="filter-list">
          {this.filterList()}
        </div>
        <Behaviours roll={this.state.roll} selectedEnemies={this.state.selectedEnemies} />
      </div>
    )
  }
}
