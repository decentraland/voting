import React, { Component } from 'react'

import VoteContainer from './containers/VoteContainer'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
        </header>
        <VoteContainer />
        <footer>
        </footer>
      </div>
    );
  }
}

export default App;
