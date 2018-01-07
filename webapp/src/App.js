import React, { Component } from 'react'
import { Route } from 'react-router-dom'


import VoteContainer from './containers/VoteContainer'
import ReceiptContainer from './containers/ReceiptContainer'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
        </header>
        <main>
          <Route path="/" exact component={VoteContainer} />
          <Route path="/receipt/:receiptId" component={ReceiptContainer} />
        </main>
        <footer>
        </footer>
      </div>
    );
  }
}

export default App;
