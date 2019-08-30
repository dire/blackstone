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
      selectedEnemies: [],
      floatd20: false
    }
    this.selectAllEnemies = this.selectAllEnemies.bind(this)
  }

  componentDidMount() {
    this.selectAllEnemies()
    window.addEventListener('scroll', this.floatDie)
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.floatDie)
  }

  floatDie = () => {
    if (window.scrollY > 300) {
      this.setState({ floatd20: true })
    }
    else {
      this.setState({ floatd20: false })
    }
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
    const classFloat = this.state.floatd20 ? 'float' : '';
    return (
      <div className="combat-board">
        <h3>Roll the Blackstone die</h3>
        <div className="d20-wrapper">
          <button className={`d20 hex ${classFloat}`} onClick={this.handleClick.bind(this)}><span>{this.state.roll}</span></button>
        </div>
        <div className="filter-list">
          {this.filterList()}
        </div>
        <Behaviours roll={this.state.roll} selectedEnemies={this.state.selectedEnemies} />
      </div>
    )
  }
}
