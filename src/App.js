import React from 'react'
import './App.css'
import CombatBoard from './components/CombatBoard'

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Blackstone Fortress Companion</h1>
        <span className="slogan">Unofficial App in the 41st Millenium</span>
        <span className="version-number tiny">v0.1.0</span>
      </header>
      <div className="app-body">
        <CombatBoard />
      </div>
      <footer className="footer tiny">
        <div class="footer-content">
          <p>This is a purely unofficial fan-made helper app to accompany Warhammer Quest: Blackstone Fortress board game sessions.</p>
          <p>Made by: <a href="https://github.com/dire">dire</a></p>
          <p>© Copyright Games Workshop Limited 2019. GW, Games Workshop, Citadel, White Dwarf, Space Marine, 40K, Warhammer, Warhammer 40,000, the ‘Aquila’ Double-headed Eagle logo, Warhammer Age of Sigmar, Battletome, Stormcast Eternals, and all associated logos, illustrations, images, names, creatures, races, vehicles, locations, weapons, characters, and the distinctive likenesses thereof, are either ® or ™, and/or © Games Workshop Limited, variably registered around the world. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App
